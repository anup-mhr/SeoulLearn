import colors from "@/constants/color";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Avatar, Card, ProgressBar, TextInput } from "react-native-paper";

export default function ExamScreen() {
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
              Study Materials
            </Text>
            <Text style={{ color: "white", opacity: 0.7 }}>
              Enhance your Korean Skills
            </Text>
          </View>
          <Avatar.Icon
            size={50}
            icon="magnify"
            style={{
              backgroundColor: colors.tertiery,
              borderRadius: "100%",
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: "#8865ee",
            borderRadius: 50,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <MaterialIcons
            name="search"
            size={24}
            color="white"
            className="px-2"
          />
          <TextInput
            mode="flat"
            style={{ flex: 1, color: "white" }}
            placeholder="Search study materials..."
            textColor="white"
            autoFocus={false}
          />
        </View>
      </LinearGradient>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
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
        {Array.from({ length: 7 }).map((_, i) => (
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
                  onPress={() => {
                    router.push(`/exam/${i}`);
                  }}
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
                  <Text style={{ color: "gray", fontSize: 12 }}>Progress</Text>
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
      </ScrollView>
    </>
  );
}
