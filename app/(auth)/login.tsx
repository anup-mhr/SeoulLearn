import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Button, Checkbox, Text, TextInput } from "react-native-paper";
import * as Yup from "yup";

import colors from "@/constants/color";
import { useAuth } from "@/store/AuthContext";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginScreen() {
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async (values: any, { setSubmitting }: any) => {
    try {
      await signIn(values);
      console.log("valuse", values);
      router.push("/(tabs)/dashboard");
    } catch (error: any) {
      Alert.alert(
        "Login Error",
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    // <KeyboardAvoidingView
    //   style={{ flex: 1 }}
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    // >
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>
            Sign in to continue learning Korean
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <>
                <TextInput
                  label="Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={touched.email && !!errors.email}
                  style={styles.input}
                  mode="outlined"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <TextInput
                  label="Password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  error={touched.password && !!errors.password}
                  style={styles.input}
                  mode="outlined"
                  secureTextEntry
                  right={<TextInput.Icon icon="eye" />}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <View style={styles.checkboxContainer}>
                  <Checkbox
                    color={"black"}
                    status={rememberMe ? "checked" : "unchecked"}
                    onPress={() => setRememberMe(!rememberMe)}
                  />
                  <Text style={styles.checkboxLabel}>Remember me</Text>
                </View>

                <Button
                  mode="contained"
                  onPress={() => handleSubmit()}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  style={styles.loginButton}
                >
                  Sign In
                </Button>

                <Button
                  mode="text"
                  onPress={() => router.push("/(auth)/forgot-password")}
                  style={styles.forgotButton}
                >
                  Forgot Password?
                </Button>
              </>
            )}
          </Formik>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don&apos;t have an account?</Text>
          <Link href="/(auth)/register" style={styles.signUpLabel}>
            Sign Up
          </Link>
        </View>
      </ScrollView>
    </LinearGradient>
    // </KeyboardAvoidingView>
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
  },
  loginButton: {
    paddingVertical: 8,
    marginBottom: 16,
    backgroundColor: colors.primary,
    color: "white",
  },
  forgotButton: {
    alignSelf: "center",
    color: "black",
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
    marginLeft: 4,
  },
});
