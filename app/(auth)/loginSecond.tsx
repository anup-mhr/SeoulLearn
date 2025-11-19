import colors from "@/constants/color";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { Checkbox, TextInput } from "react-native-paper";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginSecond = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  return (
    <View className="flex-1">
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={{ borderBottomRightRadius: 30, borderBottomLeftRadius: 30 }}
        className="h-[300px] justify-center items-center rounded-b-3xl"
      >
        <Text className="text-3xl font-bold text-white">Welcome Back</Text>
        <Text className="text-xs text-white">
          Sign in to continue your Korean learning journey
        </Text>
        <Image
          cachePolicy="memory-disk"
          source={require("../../assets/icons/adaptive-icon.png")}
          style={{ width: 100, height: 100, marginTop: 20 }}
          contentFit="contain"
          className="border-2 border-white rounded-full"
        />
      </LinearGradient>
      <ScrollView className="flex-1">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => console.log(values)}
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
            <View className="p-6 mt-8 mx-5 rounded-xl bg-white shadow-lg">
              <TextInput
                label="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                error={touched.email && !!errors.email}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
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
                mode="outlined"
                style={styles.input}
                secureTextEntry
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
              <TouchableHighlight
                disabled={isSubmitting}
                underlayColor={colors.accent}
                style={styles.loginButton}
                onPress={(e) => handleSubmit}
              >
                <Text className="text-center text-white">Sign In</Text>
              </TouchableHighlight>

              <Text className="text-center text-xs text-gray-500">
                Don&apos;t have an account?
                <Link href="/register" className="text-blue-500 ml-2">
                  Sign Up
                </Link>
              </Text>
              {/* 
              <TouchableWithoutFeedback
                onPress={() => router.push("/forgot-password")}
              >
                <Text>Forgot Password?</Text>
              </TouchableWithoutFeedback> */}
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default LoginSecond;

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
