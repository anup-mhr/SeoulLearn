import { getExamWithQuestions, mockUserAnswers } from "@/constants/mock.exam";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// ---- Types ---- //
type Question = {
  questionNumber: number;
};

type Section = {
  type: "reading" | "listening" | string;
  questions: Question[];
};

type Exam = {
  title: string;
  duration: number;
  totalQuestions: number;
  sections: Section[];
};

type UserAnswers = Record<number, string>;

export default function ExamScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"whole" | "solved" | "unsolved">(
    "whole"
  );
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  useEffect(() => {
    fetchExamData();
    const mockExam = getExamWithQuestions();
    setExam(mockExam);
    startTimer();
  }, [id]);

  const fetchExamData = async () => {
    try {
      // const response = await fetch(`YOUR_API_URL/exams/${id}`);
      // const data: Exam = await response.json();
      const data = getExamWithQuestions();
      setExam(data);
      setTimeRemaining(data.duration * 60);

      // const answersResponse = await fetch(
      //   `YOUR_API_URL/exam-attempts/${id}/answers`
      // );
      // const answersData: UserAnswers = await answersResponse.json();
      const answersData = mockUserAnswers;
      setUserAnswers(answersData);
    } catch (error) {
      console.error("Error fetching exam:", error);
    } finally {
      setLoading(false);
    }
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const filterQuestions = (questions: Question[]) => {
    if (activeTab === "whole") return questions;
    if (activeTab === "solved")
      return questions.filter((q) => userAnswers[q.questionNumber]);
    return questions.filter((q) => !userAnswers[q.questionNumber]);
  };

  const handleQuestionPress = (questionNumber: number) => {
    router.push(`/exam/${id}/question/${questionNumber}`);
  };

  const handleSubmitExam = async () => {
    try {
      const id = "exam_001";
      // await fetch(`YOUR_API_URL/exam-attempts/${id}/submit`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ answers: userAnswers }),
      // });
      router.push(`/exam/${id}/results`);
    } catch (error) {
      console.error("Error submitting exam:", error);
    }
  };

  if (loading || !exam) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4FC3F7" />
      </View>
    );
  }

  const readingQuestions =
    exam.sections.find((s) => s.type === "reading")?.questions || [];
  const listeningQuestions =
    exam.sections.find((s) => s.type === "listening")?.questions || [];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{exam.title}</Text>
        <Text style={styles.timer}>{formatTime(timeRemaining)}</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {["whole", "solved", "unsolved"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab as "whole" | "solved" | "unsolved")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Scroll */}
      <ScrollView style={styles.scrollView}>
        {[
          { title: "Reading Questions", data: readingQuestions },
          { title: "Listening Questions", data: listeningQuestions },
        ].map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.questionsGrid}>
              {filterQuestions(section.data).map((question) => {
                const isSolved = userAnswers[question.questionNumber];
                return (
                  <TouchableOpacity
                    key={question.questionNumber}
                    style={[
                      styles.questionButton,
                      isSolved && styles.questionButtonSolved,
                    ]}
                    onPress={() => handleQuestionPress(question.questionNumber)}
                  >
                    <Text
                      style={[
                        styles.questionButtonText,
                        isSolved && styles.questionButtonTextSolved,
                      ]}
                    >
                      {question.questionNumber}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitExam}
        >
          <Text style={styles.submitButtonText}>Submit Exam</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
  },
  headerLeft: {
    width: 40,
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  userIconText: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  headerLocation: {
    fontSize: 14,
    color: "#666",
    width: 120,
    textAlign: "right",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tabButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: "#4FC3F7",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  timer: {
    marginLeft: "auto",
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  scrollView: {
    flex: 1,
  },
  sectionsContainer: {
    padding: 15,
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  questionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  questionButton: {
    width: (width - 90) / 5,
    height: 60,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4FC3F7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
  },
  questionButtonSolved: {
    backgroundColor: "#4FC3F7",
  },
  questionButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  questionButtonTextSolved: {
    color: "#FFFFFF",
  },
  footer: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  submitButton: {
    backgroundColor: "#4FC3F7",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
