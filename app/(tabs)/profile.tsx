import { colors } from "@/styles/theme";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Card, Switch } from "react-native-paper";

// import { useAuth } from '../../store/AuthContext';
// import { useCourse } from '../../store/CourseContext';
// import { useExam } from '../../store/ExamContext';

const Profile = () => {
  //   const { user, signOut, updateUser } = useAuth();
  //   const { progress } = useCourse();
  //   const { examResults } = useExam();
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  const handleImagePicker = async () => {
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
      //   updateUser({ profilePicture: result.assets[0].uri });
      setProfilePhoto(result.assets[0].uri);
      console.log(result.assets[0].uri);
    }
  };

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  // const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const toggleSwitch = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  const [visible, setVisible] = useState(false);

  const handleConfirmLogout = () => {
    setVisible(false);
    console.log("User logged out");
    router.replace("/(auth)/login");
  };
  return (
    <>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={{
          borderBottomRightRadius: 30,
          borderBottomLeftRadius: 30,
          paddingBottom: 40,
        }}
        className="px-6 pt-10 pb-4"
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              My Profile
            </Text>
          </View>
          <Avatar.Icon
            size={30}
            icon="pencil"
            style={{
              backgroundColor: colors.tertiery,
              borderRadius: "100%",
            }}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <View
            style={{
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 55,
              padding: 5,
            }}
          >
            <ImageBackground
              source={
                profilePhoto
                  ? { uri: profilePhoto }
                  : require("./../../assets/images/korean-girl.jpeg")
              }
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                overflow: "hidden",
              }}
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={handleImagePicker}
              style={{
                backgroundColor: colors.primary,
                borderRadius: 50,
                padding: 5,
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            >
              <MaterialIcons name="photo-camera" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <View>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              Aarav Maharjan
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 12,
                opacity: 0.9,
                marginBottom: 5,
              }}
            >
              Korean Language Learner
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <MaterialIcons
                name="location-pin"
                size={14}
                color="white"
                style={{ opacity: 0.9 }}
              />
              <Text style={{ color: "white", fontSize: 12, opacity: 0.9 }}>
                Kathmandu, Nepal
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Personal Information
          </Text>
          <Card style={{ backgroundColor: "white", borderRadius: 5 }}>
            <Card.Content>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ color: "gray" }}>Full Name</Text>
                <Text>Aarav Maharjan</Text>
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ color: "gray" }}>Email Address</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>aarav.maharjan@mail.com</Text>
                  <MaterialIcons name="mail" size={20} color="gray" />
                </View>
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ color: "gray" }}>Phone Number</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>+977 9841234567</Text>
                  <MaterialIcons name="phone" size={20} color="gray" />
                </View>
              </View>
              <View>
                <Text style={{ color: "gray" }}>Member Since</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>Janaury 2024</Text>
                  <MaterialIcons name="calendar-month" size={20} color="gray" />
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Settings
          </Text>
          <Card
            style={{
              backgroundColor: "white",
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }}
            onPress={toggleSwitch}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <MaterialIcons name="notifications" size={25} color="gray" />
                <Text style={{}}>Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={toggleSwitch}
                color={colors.primary}
              />
            </View>
            {notificationsEnabled && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    paddingLeft: 35,
                  }}
                >
                  <Text style={{}}>Email Notifications</Text>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={toggleSwitch}
                  color={colors.primary}
                />
              </View>
            )}
          </Card>

          <Card
            style={{
              backgroundColor: "white",
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBlock: 10,
                borderBottomColor: "gray",
                borderBottomWidth: 0.2,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",

                  gap: 10,
                }}
              >
                <MaterialIcons name="lock" size={25} color="gray" />
                <Text style={{}}>Change Password</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={25}
                color="gray"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBlock: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <MaterialIcons name="shield" size={25} color="gray" />
                <Text style={{}}>Privacy Settings</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={25}
                color="gray"
              />
            </TouchableOpacity>
          </Card>

          <Card
            style={{ backgroundColor: "white", borderRadius: 5, padding: 10 }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBlock: 10,
                borderBottomColor: "gray",
                borderBottomWidth: 0.2,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",

                  gap: 10,
                }}
              >
                <MaterialIcons name="help" size={25} color="gray" />
                <Text style={{}}>Help & Support</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={25}
                color="gray"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBlock: 10,
              }}
              onPress={() => setVisible(true)}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <MaterialIcons name="logout" size={25} color="red" />
                <Text style={{ color: "red" }}>Logout</Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={25}
                color="red"
              />
            </TouchableOpacity>
          </Card>
        </View>
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 14,
              fontFamily: "bold",
              opacity: 0.6,
            }}
          >
            Seoul Institute v1.0.0
          </Text>
          <Text style={{ textAlign: "center", fontSize: 12, opacity: 0.5 }}>
            Copyright © 2025 Seoul Institute. All rights reserved.
          </Text>
        </View>

        {/* Study Materials Grid */}
      </ScrollView>
      <Modal transparent visible={visible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Are you sure you want to logout?</Text>

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Text style={styles.cancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleConfirmLogout}>
                <Text style={styles.logout}>Logout</Text>
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "80%",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cancel: {
    fontSize: 16,
    color: "gray",
  },
  logout: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
});
