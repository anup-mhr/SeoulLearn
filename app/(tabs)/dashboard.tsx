// app/(tabs)/dashboard.js
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Card, ProgressBar, Text } from "react-native-paper";

// import { useAuth } from "../../store/AuthContext";
// import { useCourse } from "../../store/CourseContext";
// import { useExam } from "../../store/ExamContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { colors } from "../../styles/theme";

const { width } = Dimensions.get("window");

export default function DashboardScreen() {
  //   const { user } = useAuth();
  //   const { courses, progress } = useCourse();
  //   const { examResults } = useExam();
  const user = { fullName: "User" };

  const [recentActivity, setRecentActivity] = useState<any>([]);

  useEffect(() => {
    // Load dashboard data
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    // Mock data for demonstration
    setRecentActivity([
      { type: "lesson", title: "Basic Greetings", time: "2 hours ago" },
      { type: "exam", title: "Grammar Test 1", score: 85, time: "1 day ago" },
      { type: "lesson", title: "Korean Numbers", time: "3 days ago" },
    ]);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const calculateOverallProgress = () => {
    // const progressValues = Object.values(progress);
    // if (progressValues.length === 0) return 0;
    // return (
    //   progressValues.reduce((sum, val) => sum + val, 0) / progressValues.length
    // );
    return 40;
  };

  const numColumns = 2;
  const cardWidth = (width - 60) / numColumns; // Account for padding and gaps
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
            <Text style={{ color: "white", fontSize: 26, fontWeight: "bold" }}>
              Welcome Back!
            </Text>
            <Text style={{ color: "white", opacity: 0.7 }}>
              Continue your Korean journey
            </Text>
          </View>
          <Avatar.Image
            size={50}
            source={require("./../../assets/images/korean-girl.jpeg")}
            // source={{ uri: user?.avatarUrl || undefined }}
            style={{ backgroundColor: colors.tertiery, borderRadius: "100%" }}
          />
          {/* Fallback to initials if no avatar */}

          {/* <Avatar.Text
            size={50}
            label={user?.fullName?.charAt(0) || "U"}
            style={{ backgroundColor: colors.tertiery }}
          /> */}
        </View>
        <Card
          style={{
            backgroundColor: "#8865ee",
            borderRadius: 10,
          }}
        >
          <Card.Content>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 15,
                    marginBottom: 4,
                  }}
                >
                  Learning Progress
                </Text>
                <Text
                  style={{
                    color: "white",
                    opacity: 0.7,
                    fontSize: 12,
                    marginBottom: 4,
                  }}
                >
                  4 of 12 modules completed
                </Text>
              </View>
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                33%
                {/* {Math.round(calculateOverallProgress() * 100)}% Complete */}
              </Text>
            </View>
            <ProgressBar
              progress={0.4}
              color={"white"}
              style={{
                backgroundColor: "#a5b4fc",
                height: 8,
                borderRadius: 5,
                marginBottom: 10,
              }}
            />
          </Card.Content>
        </Card>
      </LinearGradient>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Study Materials
            </Text>
            <Link href="/courses" style={{ color: colors.primary }}>
              See All
            </Link>
          </View>

          {/* Study Materials Grid */}

          <View style={styles.gridContainer}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} style={[styles.gridCard, { width: cardWidth }]}>
                <Card.Content style={{ padding: 0 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      marginBottom: 5,
                    }}
                  >
                    <MaterialIcons
                      name="menu-book"
                      size={16}
                      color={colors.primary}
                    />
                    <Text style={{ fontWeight: "bold", marginTop: 0 }}>
                      Basic Korean Phrases
                    </Text>
                  </View>
                  <Text style={{ color: "gray" }}>
                    Essential phrases for beginners
                  </Text>
                  <Card.Cover
                    source={require("../../assets/images/korean-girl.jpeg")}
                    style={{ marginTop: 10, borderRadius: 10, height: 100 }}
                    resizeMode="cover"
                  />
                </Card.Content>
              </Card>
            ))}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Upcoming Exams
            </Text>
          </View>
          {Array.from({ length: 2 }).map((_, i) => (
            <Card
              key={i}
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              <Card.Content>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: 14,
                        textTransform: "uppercase",
                      }}
                    >
                      Topik i Exam
                    </Text>
                    <Text
                      style={{
                        color: "gray",
                        fontSize: 12,
                        marginBottom: 4,
                      }}
                    >
                      Exam Date: 2024-12-15
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {}}
                    style={{
                      borderRadius: 20,
                      backgroundColor: "#dbeafe",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingVertical: 6,
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text style={{ color: colors.primary }}>Take Exam</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 4,
                    }}
                  >
                    <Text style={{ color: "gray", fontSize: 12 }}>
                      Progress
                    </Text>
                    <Text style={{ color: "gray", fontSize: 12 }}>40%</Text>
                  </View>
                  <ProgressBar
                    progress={0.4}
                    color={colors.primary}
                    style={{
                      backgroundColor: "#e5e7eb",
                      height: 8,
                      borderRadius: 5,
                      marginBottom: 10,
                    }}
                  />
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  gridCard: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 15,
  },
});
