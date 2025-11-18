// app/exam/[id]/results.tsx
import { getMockResults } from "@/constants/mock.exam";
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

export default function ResultsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [results, setResults] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, [id]);

  const fetchResults = () => {
    try {
      // Using mock data
      const mockResults = getMockResults();
      setResults(mockResults);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  const getQuestionColor = (question: any): string => {
    if (!question.userAnswer) return "#E0E0E0"; // Not attempted
    if (question.isCorrect) return "#4CAF50"; // Correct - Green
    return "#FF3B30"; // Incorrect - Red
  };

  const handleQuestionPress = (questionNumber: number) => {
    router.push(`/exam/${id}/review/${questionNumber}` as any);
  };

  const handleBackToExam = () => {
    router.push(`/exam/${id}` as any);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4FC3F7" />
      </View>
    );
  }

  if (!results) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No results found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackToExam} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preview Answers</Text>
      </View>

      {/* Info Bar */}
      <View style={styles.infoBar}>
        <Text style={styles.infoText}>
          All Question: {results.totalQuestions}
        </Text>
        <Text style={styles.infoText}>1. New Pattern UBT - 001</Text>
        <Text style={styles.infoText}>Score: {results.score}</Text>
        <Text style={styles.infoText}>Solved: {results.solvedQuestions}</Text>
        <Text style={styles.infoText}>
          Remaining Questions: {results.remainingQuestions}
        </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Reading Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reading Questions</Text>
          <View style={styles.questionsGrid}>
            {results.readingQuestions.map((question: any) => (
              <TouchableOpacity
                key={question.questionNumber}
                style={[
                  styles.questionButton,
                  {
                    backgroundColor: getQuestionColor(question),
                    borderColor: getQuestionColor(question),
                  },
                ]}
                onPress={() => handleQuestionPress(question.questionNumber)}
              >
                <Text style={styles.questionButtonText}>
                  {question.questionNumber}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Listening Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Listening Questions</Text>
          <View style={styles.questionsGrid}>
            {results.listeningQuestions.map((question: any) => (
              <TouchableOpacity
                key={question.questionNumber}
                style={[
                  styles.questionButton,
                  {
                    backgroundColor: getQuestionColor(question),
                    borderColor: getQuestionColor(question),
                  },
                ]}
                onPress={() => handleQuestionPress(question.questionNumber)}
              >
                <Text style={styles.questionButtonText}>
                  {question.questionNumber}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#4CAF50" }]}
            />
            <Text style={styles.legendText}>Correct Answer</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#FF3B30" }]}
            />
            <Text style={styles.legendText}>Incorrect Answer</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#E0E0E0" }]}
            />
            <Text style={styles.legendText}>Not Attempted</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={handleBackToExam}
        >
          <Text style={styles.footerButtonText}>◀ PREV</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerButtonPrimary}
          onPress={() => router.push(`/exam/${id}` as any)}
        >
          <Text style={styles.footerButtonText}>⊞ WHOLE QUESTIONS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => router.push("/exams" as any)}
        >
          <Text style={styles.footerButtonText}>NEXT ▶</Text>
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
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 16,
    color: "#4FC3F7",
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  infoBar: {
    flexDirection: "row",
    backgroundColor: "#4FC3F7",
    paddingVertical: 12,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  infoText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: "#FFFFFF",
    margin: 15,
    borderRadius: 15,
    padding: 20,
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
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  questionButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  legend: {
    backgroundColor: "#FFFFFF",
    margin: 15,
    borderRadius: 15,
    padding: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  legendColor: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 12,
  },
  legendText: {
    fontSize: 14,
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  footerButton: {
    backgroundColor: "#4FC3F7",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  footerButtonPrimary: {
    backgroundColor: "#4FC3F7",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  footerButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
