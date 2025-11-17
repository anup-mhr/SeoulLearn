import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const AUTH_STORAGE_KEY = "seoullearn_auth";

type User = {
  id: string;
  name: string;
  email?: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  signIn: (creds: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Memoized persist function
  const persist = useCallback(
    async (tokenValue: string | null, userValue: User | null) => {
      try {
        if (tokenValue && userValue) {
          await AsyncStorage.setItem(
            AUTH_STORAGE_KEY,
            JSON.stringify({ token: tokenValue, user: userValue })
          );
        } else {
          await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
        }
      } catch (error) {
        console.error("Failed to persist auth data:", error);
      }
    },
    []
  );

  // Restore auth from storage on mount
  useEffect(() => {
    const restore = async () => {
      try {
        const raw = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as { token: string; user: User };
          if (parsed?.token && parsed?.user) {
            setToken(parsed.token);
            setUser(parsed.user);
          }
        }
      } catch (error) {
        console.error("Failed to restore auth data:", error);
      } finally {
        setLoading(false);
      }
    };

    restore();
  }, []);

  // Simple fake API for sign-in; replace with real API call
  const fakeApiSignIn = async (creds: SignInCredentials) => {
    await new Promise((r) => setTimeout(r, 700)); // simulate network
    return {
      token: "fake-token-" + Math.random().toString(36).slice(2),
      user: {
        id: "1",
        name: creds.email,
        email: `${creds.email}@example.com`,
      } as User,
    };
  };

  const signIn = useCallback(
    async (creds: SignInCredentials) => {
      setLoading(true);
      try {
        const res = await fakeApiSignIn(creds);
        setToken(res.token);
        setUser(res.user);
        await persist(res.token, res.user);
      } catch (error) {
        console.error("Sign in failed:", error);
        throw error; // Re-throw so caller can handle
      } finally {
        setLoading(false);
      }
    },
    [persist]
  );

  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      setToken(null);
      setUser(null);
      await persist(null, null);
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setLoading(false);
    }
  }, [persist]);

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
