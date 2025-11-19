import { getExamWithQuestions, mockUserAnswers } from "@/constants/mock.exam";
import { formatTime } from "@/libs/helpers";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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

  // Screen orientation effect
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, []);

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
        <Text style={styles.username}>Nibangsh Rai</Text>
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
        <View
          style={[
            {
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "auto",
            },
            styles.tabButton,
          ]}
        >
          <Text>Time:</Text>
          <Text style={styles.timer}>{formatTime(timeRemaining)}</Text>
        </View>
      </View>

      {/* Scroll with side-by-side sections */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.sectionsRow}>
          {[
            { title: "Reading Questions", data: readingQuestions },
            { title: "Listening Questions", data: listeningQuestions },
          ].map((section) => (
            <View key={section.title} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <ScrollView showsVerticalScrollIndicator={false}>
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
                        onPress={() =>
                          handleQuestionPress(question.questionNumber)
                        }
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
              </ScrollView>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Submit Button */}
      {/* <View style={styles.footer}> */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitExam}>
        <Text style={styles.submitButtonText}>Submit Exam</Text>
      </TouchableOpacity>
      {/* </View> */}
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
    paddingTop: 30,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  username: {},
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tabButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: "#4FC3F7",
  },
  tabText: {
    fontSize: 12,
    color: "#666",
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  timer: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 60,
  },
  sectionsRow: {
    flexDirection: "row",
    gap: 15,
    flex: 1,
  },
  section: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
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
    gap: 10,
  },
  questionButton: {
    width: 60,
    height: 40,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#4FC3F7",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  questionButtonSolved: {
    backgroundColor: "#4FC3F7",
  },
  questionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  questionButtonTextSolved: {
    color: "#FFFFFF",
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  submitButton: {
    position: "absolute",
    width: 200,
    bottom: 10,
    right: 10,
    backgroundColor: "#4FC3F7",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
