// app/(auth)/register.js
import colors from "@/constants/color";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import * as Yup from "yup";

// import { authService } from "../../services/api/authService";

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and number"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
  educationLevel: Yup.string().required("Education level is required"),
});

const educationLevels = [
  "High School",
  "Undergraduate",
  "Graduate",
  "Postgraduate",
  "Other",
];

export default function RegisterScreen() {
  const handleRegister = async (values: any, { setSubmitting }: any) => {
    try {
      //   await authService.register(values);
      Alert.alert(
        "Registration Successful",
        "Please check your email for verification instructions.",
        [{ text: "OK", onPress: () => router.push("/(auth)/login") }]
      );
    } catch (error: any) {
      Alert.alert(
        "Registration Error",
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join thousands learning Korean</Text>
        </View>

        <View style={styles.formContainer}>
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              phone: "",
              password: "",
              confirmPassword: "",
              educationLevel: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
              setFieldValue,
            }) => (
              <>
                <TextInput
                  label="Full Name"
                  value={values.fullName}
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  error={touched.fullName && !!errors.fullName}
                  style={styles.input}
                  mode="outlined"
                />
                {touched.fullName && errors.fullName && (
                  <Text style={styles.errorText}>{errors.fullName}</Text>
                )}

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
                  label="Phone Number"
                  value={values.phone}
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  error={touched.phone && !!errors.phone}
                  style={styles.input}
                  mode="outlined"
                  keyboardType="numeric"
                />
                {touched.phone && errors.phone && (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                )}

                <View style={styles.pickerContainer}>
                  <Text style={styles.pickerLabel}>Education Level</Text>
                  <Picker
                    selectedValue={values.educationLevel}
                    onValueChange={(itemValue: any) =>
                      setFieldValue("educationLevel", itemValue)
                    }
                    style={styles.picker}
                  >
                    <Picker.Item label="Select Education Level" value="" />
                    {educationLevels.map((level) => (
                      <Picker.Item key={level} label={level} value={level} />
                    ))}
                  </Picker>
                </View>
                {touched.educationLevel && errors.educationLevel && (
                  <Text style={styles.errorText}>{errors.educationLevel}</Text>
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
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <TextInput
                  label="Confirm Password"
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  error={touched.confirmPassword && !!errors.confirmPassword}
                  style={styles.input}
                  mode="outlined"
                  secureTextEntry
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}

                <Button
                  mode="contained"
                  onPress={() => handleSubmit}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  style={styles.registerButton}
                >
                  Create Account
                </Button>
              </>
            )}
          </Formik>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Button
            mode="text"
            onPress={() => router.push("/(auth)/login")}
            labelStyle={styles.signInLabel}
          >
            Sign In
          </Button>
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
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    marginTop: 8,
  },
  formContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  input: {
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    overflow: "hidden",
  },
  pickerLabel: {
    marginLeft: 8,
    marginTop: 8,
    color: "#555",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
  registerButton: {
    marginTop: 10,
    paddingVertical: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    color: "white",
  },
  signInLabel: {
    color: "white",
    textDecorationLine: "underline",
  },
});
