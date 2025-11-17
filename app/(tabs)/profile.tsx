import colors from "@/constants/color";
import { USER_DATA } from "@/constants/mok.data";
import { useAuth } from "@/store/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Lightweight Switch Component (replaces react-native-paper Switch)
// eslint-disable-next-line react/display-name
const CustomSwitch = React.memo(({ value, onValueChange, color }: any) => (
  <TouchableOpacity
    onPress={onValueChange}
    style={[styles.switchContainer, value && { backgroundColor: color }]}
    activeOpacity={0.8}
  >
    <View style={[styles.switchThumb, value && styles.switchThumbActive]} />
  </TouchableOpacity>
));

// Lightweight Card Component (replaces react-native-paper Card)
// eslint-disable-next-line react/display-name
const CustomCard = React.memo(({ children, style, onPress }: any) => {
  const Component = onPress ? TouchableOpacity : View;
  return (
    <Component
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {children}
    </Component>
  );
});

// Info Row Component
// eslint-disable-next-line react/display-name
const InfoRow = React.memo(({ label, value, icon }: any) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <View style={styles.infoValueContainer}>
      <Text style={styles.infoValue}>{value}</Text>
      {icon && <MaterialIcons name={icon} size={20} color="gray" />}
    </View>
  </View>
));

// Settings Item Component
// eslint-disable-next-line react/display-name
const SettingsItem = React.memo(
  ({ icon, label, onPress, color = "gray", showChevron = true }: any) => (
    <TouchableOpacity
      style={styles.settingsItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingsItemLeft}>
        <MaterialIcons name={icon} size={25} color={color} />
        <Text
          style={[styles.settingsLabel, color === "red" && { color: "red" }]}
        >
          {label}
        </Text>
      </View>
      {showChevron && (
        <MaterialIcons name="keyboard-arrow-right" size={25} color={color} />
      )}
    </TouchableOpacity>
  )
);

const Profile = () => {
  const { signOut } = useAuth();
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] =
    useState(true);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  // Memoize default avatar
  const defaultAvatar = useMemo(
    () => require("./../../assets/images/korean-girl.jpeg"),
    []
  );

  const handleImagePicker = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Sorry, we need camera roll permissions to change your profile picture!"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfilePhoto(result.assets[0].uri);
    }
  }, []);

  const toggleNotifications = useCallback(() => {
    setNotificationsEnabled((prev) => !prev);
  }, []);

  const toggleEmailNotifications = useCallback(() => {
    setEmailNotificationsEnabled((prev) => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    setLogoutModalVisible(false);
    signOut();
    router.replace("/(auth)/login");
  }, [signOut]);

  const showLogoutModal = useCallback(() => {
    setLogoutModalVisible(true);
  }, []);

  const hideLogoutModal = useCallback(() => {
    setLogoutModalVisible(false);
  }, []);

  const handleChangePassword = useCallback(() => {
    console.log("Change password");
    // Navigate to change password screen
  }, []);

  const handlePrivacySettings = useCallback(() => {
    console.log("Privacy settings");
    // Navigate to privacy settings screen
  }, []);

  const handleHelpSupport = useCallback(() => {
    console.log("Help & Support");
    // Navigate to help & support screen
  }, []);

  return (
    <>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <View style={styles.editIconContainer}>
            <MaterialIcons name="person" size={20} color={colors.primary} />
          </View>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <Image
              source={profilePhoto ? { uri: profilePhoto } : defaultAvatar}
              style={styles.avatar}
              contentFit="cover"
              cachePolicy="memory-disk"
            />
            <TouchableOpacity
              onPress={handleImagePicker}
              style={styles.cameraButton}
              activeOpacity={0.7}
            >
              <MaterialIcons name="photo-camera" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userName}>{USER_DATA.name}</Text>
            <Text style={styles.userRole}>{USER_DATA.role}</Text>
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-pin" size={14} color="white" />
              <Text style={styles.locationText}>{USER_DATA.location}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <CustomCard>
            <InfoRow label="Full Name" value={USER_DATA.name} />
            <InfoRow
              label="Email Address"
              value={USER_DATA.email}
              icon="mail"
            />
            <InfoRow
              label="Phone Number"
              value={USER_DATA.phone}
              icon="phone"
            />
            <InfoRow
              label="Member Since"
              value={USER_DATA.memberSince}
              icon="calendar-month"
            />
          </CustomCard>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>

          {/* Notifications Card */}
          <CustomCard style={styles.notificationsCard}>
            <View style={styles.notificationMain}>
              <View style={styles.settingsItemLeft}>
                <MaterialIcons name="notifications" size={25} color="gray" />
                <Text style={styles.settingsLabel}>Notifications</Text>
              </View>
              <CustomSwitch
                value={notificationsEnabled}
                onValueChange={toggleNotifications}
                color={colors.primary}
              />
            </View>

            {notificationsEnabled && (
              <View style={styles.subNotification}>
                <Text style={styles.settingsLabel}>Email Notifications</Text>
                <CustomSwitch
                  value={emailNotificationsEnabled}
                  onValueChange={toggleEmailNotifications}
                  color={colors.primary}
                />
              </View>
            )}
          </CustomCard>

          {/* Security Card */}
          <CustomCard style={styles.settingsCard}>
            <SettingsItem
              icon="lock"
              label="Change Password"
              onPress={handleChangePassword}
            />
            <View style={styles.divider} />
            <SettingsItem
              icon="shield"
              label="Privacy Settings"
              onPress={handlePrivacySettings}
            />
          </CustomCard>

          {/* Help & Logout Card */}
          <CustomCard style={styles.settingsCard}>
            <SettingsItem
              icon="help"
              label="Help & Support"
              onPress={handleHelpSupport}
            />
            <View style={styles.divider} />
            <SettingsItem
              icon="logout"
              label="Logout"
              onPress={showLogoutModal}
              color="red"
            />
          </CustomCard>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Seoul Institute v1.0.0</Text>
          <Text style={styles.footerSubtext}>
            Copyright © 2025 Seoul Institute. All rights reserved.
          </Text>
        </View>
      </ScrollView>

      {/* Logout Modal */}
      <Modal
        transparent
        visible={logoutModalVisible}
        animationType="fade"
        onRequestClose={hideLogoutModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={hideLogoutModal}
                style={styles.cancelButton}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}
                activeOpacity={0.7}
              >
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  editIconContainer: {
    backgroundColor: colors.tertiery,
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  avatarWrapper: {
    backgroundColor: "white",
    borderRadius: 55,
    padding: 5,
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraButton: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    padding: 5,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userRole: {
    color: "white",
    fontSize: 12,
    opacity: 0.9,
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  locationText: {
    color: "white",
    fontSize: 12,
    opacity: 0.9,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoRow: {
    marginBottom: 16,
  },
  infoLabel: {
    color: "gray",
    fontSize: 14,
    marginBottom: 4,
  },
  infoValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoValue: {
    fontSize: 16,
    color: "#000",
  },
  notificationsCard: {
    marginBottom: 10,
  },
  notificationMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  subNotification: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 35,
    paddingVertical: 8,
    marginTop: 8,
  },
  settingsCard: {
    marginBottom: 10,
    padding: 0,
  },
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  settingsItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  settingsLabel: {
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 16,
  },
  switchContainer: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#d1d5db",
    justifyContent: "center",
    padding: 2,
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  switchThumbActive: {
    alignSelf: "flex-end",
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    opacity: 0.6,
  },
  footerSubtext: {
    textAlign: "center",
    fontSize: 12,
    opacity: 0.5,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 24,
    width: "80%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 16,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    color: "gray",
    fontWeight: "500",
  },
  logoutButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
});
