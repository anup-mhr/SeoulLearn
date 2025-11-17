import colors from "@/constants/color";
import { useAuth } from "@/store/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Button, Checkbox, Text, TextInput } from "react-native-paper";

// Simple email validation
const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState({ email: false, password: false });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn } = useAuth();

  // Validate form
  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Invalid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [email, password]);

  const handleLogin = useCallback(async () => {
    // Mark all fields as touched
    setTouched({ email: true, password: true });

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await signIn({ email, password });
      router.push("/(tabs)/dashboard");
    } catch (error: any) {
      Alert.alert(
        "Login Error",
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [email, password, signIn, validate]);

  const handleEmailChange = useCallback(
    (text: string) => {
      setEmail(text);
      if (touched.email) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          if (!text.trim()) {
            newErrors.email = "Email is required";
          } else if (!isValidEmail(text)) {
            newErrors.email = "Invalid email";
          } else {
            delete newErrors.email;
          }
          return newErrors;
        });
      }
    },
    [touched.email]
  );

  const handlePasswordChange = useCallback(
    (text: string) => {
      setPassword(text);
      if (touched.password) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          if (!text) {
            newErrors.password = "Password is required";
          } else {
            delete newErrors.password;
          }
          return newErrors;
        });
      }
    },
    [touched.password]
  );

  const handleEmailBlur = useCallback(() => {
    setTouched((prev) => ({ ...prev, email: true }));
    if (!email.trim()) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
    } else if (!isValidEmail(email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email" }));
    }
  }, [email]);

  const handlePasswordBlur = useCallback(() => {
    setTouched((prev) => ({ ...prev, password: true }));
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
    }
  }, [password]);

  const toggleRememberMe = useCallback(() => {
    setRememberMe((prev) => !prev);
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleForgotPassword = useCallback(() => {
    router.push("/(auth)/forgot-password");
  }, []);

  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>
            Sign in to continue learning Korean
          </Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={handleEmailChange}
            onBlur={handleEmailBlur}
            error={touched.email && !!errors.email}
            style={styles.input}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
            returnKeyType="next"
            editable={!isSubmitting}
          />
          {touched.email && errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}

          <TextInput
            label="Password"
            value={password}
            onChangeText={handlePasswordChange}
            onBlur={handlePasswordBlur}
            error={touched.password && !!errors.password}
            style={styles.input}
            mode="outlined"
            secureTextEntry={!showPassword}
            autoComplete="password"
            textContentType="password"
            returnKeyType="done"
            onSubmitEditing={handleLogin}
            editable={!isSubmitting}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={togglePasswordVisibility}
              />
            }
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <View style={styles.checkboxContainer}>
            <Checkbox
              color={colors.primary}
              status={rememberMe ? "checked" : "unchecked"}
              onPress={toggleRememberMe}
              disabled={isSubmitting}
            />
            <Text style={styles.checkboxLabel} onPress={toggleRememberMe}>
              Remember me
            </Text>
          </View>

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={isSubmitting}
            disabled={isSubmitting}
            style={styles.loginButton}
            labelStyle={styles.loginButtonLabel}
          >
            Sign In
          </Button>

          <Button
            mode="text"
            onPress={handleForgotPassword}
            style={styles.forgotButton}
            labelStyle={styles.forgotButtonLabel}
            disabled={isSubmitting}
          >
            Forgot Password?
          </Button>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don&apos;t have an account? </Text>
          <Link href="/(auth)/register" asChild>
            <Text style={styles.signUpLabel}>Sign Up</Text>
          </Link>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    opacity: 0.9,
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    marginBottom: 16,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: -12,
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    flex: 1,
  },
  loginButton: {
    paddingVertical: 8,
    marginBottom: 16,
    backgroundColor: colors.primary,
  },
  loginButtonLabel: {
    color: "white",
  },
  forgotButton: {
    alignSelf: "center",
  },
  forgotButtonLabel: {
    color: colors.primary,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "white",
  },
  signUpLabel: {
    color: "white",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
