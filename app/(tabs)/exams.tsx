import { colors } from "@/styles/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Card, ProgressBar, TextInput } from "react-native-paper";

// Mock exam data
const examQuestions = [
  {
    id: 1,
    question: '다음 중 "감사합니다"의 뜻은 무엇인가요?',
    options: [
      { id: "A", text: "안녕하세요", isCorrect: false },
      { id: "B", text: "고맙습니다", isCorrect: true },
      { id: "C", text: "죄송합니다", isCorrect: false },
      { id: "D", text: "안녕히 가세요", isCorrect: false },
    ],
  },
  {
    id: 2,
    question: "다음 중 아침 인사말은 무엇인가요?",
    options: [
      { id: "A", text: "안녕히 주무세요", isCorrect: false },
      { id: "B", text: "좋은 아침이에요", isCorrect: true },
      { id: "C", text: "안녕히 가세요", isCorrect: false },
      { id: "D", text: "수고하세요", isCorrect: false },
    ],
  },
  {
    id: 3,
    question: '"학교"는 영어로 무엇인가요?',
    options: [
      { id: "A", text: "Hospital", isCorrect: false },
      { id: "B", text: "Library", isCorrect: false },
      { id: "C", text: "School", isCorrect: true },
      { id: "D", text: "Market", isCorrect: false },
    ],
  },
  {
    id: 4,
    question: "다음 중 가족 관계가 아닌 것은?",
    options: [
      { id: "A", text: "아버지", isCorrect: false },
      { id: "B", text: "어머니", isCorrect: false },
      { id: "C", text: "친구", isCorrect: true },
      { id: "D", text: "형", isCorrect: false },
    ],
  },
  {
    id: 5,
    question: '"물"을 마실 때 사용하는 것은?',
    options: [
      { id: "A", text: "젓가락", isCorrect: false },
      { id: "B", text: "숟가락", isCorrect: false },
      { id: "C", text: "컵", isCorrect: true },
      { id: "D", text: "접시", isCorrect: false },
    ],
  },
];

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#6366F1",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  timerContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  timerText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  menuButton: {
    padding: 8,
  },
  titleContainer: {
    backgroundColor: "#6366F1",
    paddingHorizontal: 16,
    paddingBottom: 20,
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  questionNumber: {
    fontSize: 14,
    color: "#6B7280",
  },
  questionType: {
    fontSize: 14,
    color: "#6366F1",
    fontWeight: "500",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1F2937",
    marginBottom: 32,
    lineHeight: 26,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  selectedOption: {
    borderColor: "#6366F1",
    backgroundColor: "#F0F0FF",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRadio: {
    borderColor: "#6366F1",
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#6366F1",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: "#374151",
  },
  selectedOptionText: {
    color: "#1F2937",
    fontWeight: "500",
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  previousButton: {
    backgroundColor: "#F3F4F6",
  },
  nextButton: {
    backgroundColor: "#6366F1",
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  nextButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
  },
  disabledButtonText: {
    color: "#9CA3AF",
  },
  disabledNextButtonText: {
    color: "#9CA3AF",
  },
});
