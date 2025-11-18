// import { Audio, AVPlaybackStatus } from "expo-av";
import { getQuestionReview } from "@/constants/mock.exam";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ---- Types ---- //
type MCQOption = {
  optionNumber: number;
  content: {
    type: "text" | "image";
    text?: string;
    imageUrl?: string;
  };
};

type QuestionContent = {
  type: "text" | "audio";
  text?: string;
  audioUrl?: string;
};

type GroupInfo = {
  groupTitleKorean?: string;
};

type QuestionData = {
  questionNumber: number;
  content: QuestionContent;
  mcqs: MCQOption[];
  explanation?: string;
  groupInfo?: GroupInfo;
};

type ReviewResponse = {
  question: QuestionData;
  userAnswer: number | null;
  correctAnswer: number;
  isCorrect: boolean;
  totalQuestions: number;
};

export default function QuestionReviewScreen() {
  const { id, questionNumber } = useLocalSearchParams<{
    id: string;
    questionNumber: string;
  }>();
  const router = useRouter();

  const [data, setData] = useState<ReviewResponse | null>(null);
  const [loading, setLoading] = useState(false);
  //   const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const qNum = parseInt(questionNumber || "1");

  useEffect(() => {
    // fetchQuestionReview();
    const data = getQuestionReview(25) as any;
    setData(data);

    return () => {
      //   if (sound) sound.unloadAsync();
    };
  }, [questionNumber]);

  const fetchQuestionReview = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `YOUR_API_URL/exam-attempts/${id}/review/${qNum}`
      );
      const json: ReviewResponse = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error fetching question review:", err);
    } finally {
      setLoading(false);
    }
  };

  //   const playAudio = async () => {
  //     if (!data?.question.content.audioUrl) return;

  //     try {
  //       if (sound && isPlaying) {
  //         await sound.pauseAsync();
  //         setIsPlaying(false);
  //       } else if (sound) {
  //         await sound.playAsync();
  //         setIsPlaying(true);
  //       } else {
  //         const { sound: newSound } = await Audio.Sound.createAsync(
  //           { uri: data.question.content.audioUrl },
  //           { shouldPlay: true }
  //         );

  //         setSound(newSound);
  //         setIsPlaying(true);

  //         newSound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
  //           if (!status.isLoaded) return;
  //           if (status.didJustFinish) setIsPlaying(false);
  //         });
  //       }
  //     } catch (err) {
  //       console.error("Audio error:", err);
  //     }
  //   };

  const getOptionStyle = (optionNumber: number) => {
    if (!data) return styles.optionDefault;

    const { userAnswer, correctAnswer } = data;

    if (optionNumber === userAnswer) {
      return userAnswer === correctAnswer
        ? styles.optionCorrect
        : styles.optionIncorrect;
    }

    if (optionNumber === correctAnswer) return styles.optionCorrect;

    return styles.optionDefault;
  };

  const handleNext = () => {
    if (!data) return;
    const next = qNum + 1;
    if (next <= data.totalQuestions) {
      router.push(`/exam/${id}/review/${next}`);
    }
  };

  const handlePrev = () => {
    const prev = qNum - 1;
    if (prev >= 1) {
      router.push(`/exam/${id}/review/${prev}`);
    }
  };

  if (loading || !data) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4FC3F7" />
      </View>
    );
  }

  const { question, userAnswer, correctAnswer, isCorrect } = data;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push(`/exam/${id}/results`)}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preview Answers</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          {/* Group Title */}
          {!!question.groupInfo?.groupTitleKorean && (
            <View style={styles.groupHeader}>
              <Text style={styles.groupTitle}>
                {question.groupInfo.groupTitleKorean}
              </Text>
            </View>
          )}

          {/* Question */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionNumber}>
              {question.questionNumber}. {question.content.text}
            </Text>

            {question.content.type === "audio" && (
              <TouchableOpacity
                style={styles.audioPlayer}
                //   onPress={playAudio}
              >
                <View style={styles.audioButton}>
                  <Text style={styles.audioIcon}>{isPlaying ? "⏸" : "▶"}</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          {/* MCQs */}
          <View style={styles.optionsContainer}>
            {question.mcqs.map((mcq) => (
              <View
                key={mcq.optionNumber}
                style={[styles.optionButton, getOptionStyle(mcq.optionNumber)]}
              >
                <View style={styles.optionNumberCircle}>
                  <Text style={styles.optionNumberText}>
                    {mcq.optionNumber}
                  </Text>
                </View>

                <View style={styles.optionContent}>
                  {mcq.content.type === "text" ? (
                    <Text style={styles.optionText}>{mcq.content.text}</Text>
                  ) : (
                    <Image
                      source={{ uri: mcq.content.imageUrl }}
                      style={styles.optionImage}
                      resizeMode="contain"
                    />
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* Explanation */}
          {!!question.explanation && (
            <View style={styles.explanationContainer}>
              <Text style={styles.explanationTitle}>Explanation:</Text>
              <Text style={styles.explanationText}>{question.explanation}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Footer Nav */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.navButton, qNum === 1 && { opacity: 0.4 }]}
          disabled={qNum === 1}
          onPress={handlePrev}
        >
          <Text style={styles.navButtonText}>◀ PREV</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.wholeQuestionsButton}
          onPress={() => router.push(`/exam/${id}/results`)}
        >
          <Text style={styles.wholeQuestionsIcon}>⊞</Text>
          <Text style={styles.wholeQuestionsText}>WHOLE QUESTIONS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            qNum === data.totalQuestions && { opacity: 0.4 },
          ]}
          disabled={qNum === data.totalQuestions}
          onPress={handleNext}
        >
          <Text style={styles.navButtonText}>NEXT ▶</Text>
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  groupHeader: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  questionContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
    color: "#333",
  },
  audioPlayer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  audioButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4FC3F7",
    justifyContent: "center",
    alignItems: "center",
  },
  audioIcon: {
    fontSize: 30,
    color: "#FFFFFF",
  },
  optionsContainer: {
    gap: 15,
  },
  optionButton: {
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    position: "relative",
  },
  optionDefault: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E0E0E0",
  },
  optionCorrect: {
    backgroundColor: "#E8F5E9",
    borderColor: "#4CAF50",
  },
  optionIncorrect: {
    backgroundColor: "#FFEBEE",
    borderColor: "#FF3B30",
  },
  optionNumberCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  optionNumberText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  optionContent: {
    flex: 1,
  },
  optionText: {
    fontSize: 15,
    color: "#333",
  },
  optionImage: {
    width: 120,
    height: 100,
    borderRadius: 8,
  },
  feedbackBadge: {
    position: "absolute",
    top: -10,
    right: -10,
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  feedbackCorrect: {
    backgroundColor: "#4CAF50",
  },
  feedbackText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  explanationContainer: {
    backgroundColor: "#E3F2FD",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1976D2",
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
  },
  resultSummary: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#333",
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  resultLabel: {
    fontSize: 15,
    color: "#666",
  },
  resultValue: {
    fontSize: 15,
    fontWeight: "600",
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
  navButton: {
    backgroundColor: "#4FC3F7",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  navButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  wholeQuestionsButton: {
    backgroundColor: "#4FC3F7",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  wholeQuestionsIcon: {
    fontSize: 18,
    color: "#FFFFFF",
    marginRight: 8,
  },
  wholeQuestionsText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
