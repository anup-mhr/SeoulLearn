// import { Audio, AVPlaybackStatus } from "expo-av";
import { getQuestionByNumber, mockUserAnswers } from "@/constants/mock.exam";
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

export default function QuestionScreen() {
  const { id, questionNumber } = useLocalSearchParams<{
    id: string;
    questionNumber: string;
  }>();
  const router = useRouter();

  const [question, setQuestion] = useState<any | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState<any | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(2658); // 44:18 in seconds
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    fetchQuestion();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [questionNumber]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchQuestion = () => {
    try {
      // Using mock data
      const mockQuestion = getQuestionByNumber(parseInt(questionNumber));
      if (mockQuestion) {
        setQuestion(mockQuestion);

        // Check if user has already answered
        const userAnswer = mockUserAnswers[parseInt(questionNumber)];
        if (userAnswer) {
          setSelectedAnswer(userAnswer);
        }
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  //   const playAudio = async () => {
  //     if (!question?.content.audioUrl) return;

  //     try {
  //       if (sound && isPlaying) {
  //         await sound.pauseAsync();
  //         setIsPlaying(false);
  //       } else if (sound) {
  //         await sound.playAsync();
  //         setIsPlaying(true);
  //       } else {
  //         const { sound: newSound } = await Audio.Sound.createAsync(
  //           { uri: question.content.audioUrl },
  //           { shouldPlay: true }
  //         );
  //         setSound(newSound);
  //         setIsPlaying(true);

  //         newSound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
  //           if (status.isLoaded && status.didJustFinish) {
  //             setIsPlaying(false);
  //           }
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error playing audio:", error);
  //       Alert.alert("Error", "Unable to play audio");
  //     }
  //   };

  const handleAnswerSelect = (optionNumber: number) => {
    if (!selectedAnswer) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 2000);
    }

    setSelectedAnswer(optionNumber);

    // Save answer to mock data
    mockUserAnswers[parseInt(questionNumber)] = optionNumber;
  };

  const handleNext = () => {
    const nextQuestion = parseInt(questionNumber) + 1;
    if (nextQuestion <= 40) {
      router.push(`/exam/${id}/question/${nextQuestion}` as any);
    } else {
      router.push(`/exam/${id}` as any);
    }
  };

  const handlePrev = () => {
    const prevQuestion = parseInt(questionNumber) - 1;
    if (prevQuestion >= 1) {
      router.push(`/exam/${id}/question/${prevQuestion}` as any);
    }
  };

  const handleWholeQuestions = () => {
    router.push(`/exam/${id}` as any);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4FC3F7" />
      </View>
    );
  }

  if (!question) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Question not found</Text>
      </View>
    );
  }

  const remainingQuestions = 40 - parseInt(questionNumber);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>1. New Pattern UBT - 001</Text>
        <Text style={styles.headerInfo}>Whole Question:40</Text>
        <Text style={styles.headerInfo}>
          Remaining Question:{remainingQuestions}
        </Text>
        <Text style={styles.timer}>{formatTime(timeRemaining)}</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          {/* Group Title */}
          {question.groupInfo && (
            <View style={styles.groupHeader}>
              <Text style={styles.groupTitle}>
                {question.groupInfo.groupTitleKorean}
              </Text>
            </View>
          )}

          {/* Question */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionNumber}>{questionNumber}.</Text>

            {/* Audio Player */}
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

            {/* Text Content */}
            {question.content.text && (
              <Text style={styles.questionText}>{question.content.text}</Text>
            )}

            {/* Warning Indicator */}
            {showWarning && (
              <View style={styles.warningBadge}>
                <Text style={styles.warningText}>!</Text>
              </View>
            )}
          </View>

          {/* MCQ Options */}
          <View style={styles.optionsContainer}>
            {question.mcqs.map((mcq: any) => (
              <TouchableOpacity
                key={mcq.optionNumber}
                style={[
                  styles.optionButton,
                  selectedAnswer === mcq.optionNumber &&
                    styles.optionButtonSelected,
                ]}
                onPress={() => handleAnswerSelect(mcq.optionNumber)}
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
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Navigation Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={handlePrev}
          disabled={parseInt(questionNumber) === 1}
        >
          <Text style={styles.navButtonText}>◀ PREV</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.wholeQuestionsButton}
          onPress={handleWholeQuestions}
        >
          <Text style={styles.wholeQuestionsIcon}>⊞</Text>
          <Text style={styles.wholeQuestionsText}>WHOLE QUESTIONS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={handleNext}
          disabled={parseInt(questionNumber) === 40}
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
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerText: {
    fontSize: 14,
    fontWeight: "600",
  },
  headerInfo: {
    fontSize: 12,
    color: "#666",
  },
  timer: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
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
    alignItems: "center",
    minHeight: 200,
    justifyContent: "center",
  },
  questionNumber: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  audioPlayer: {
    alignItems: "center",
    justifyContent: "center",
  },
  audioButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4FC3F7",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  audioIcon: {
    fontSize: 30,
    color: "#FFFFFF",
  },
  questionText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginTop: 15,
  },
  warningBadge: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
  },
  warningText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  optionsContainer: {
    gap: 15,
  },
  optionButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  optionButtonSelected: {
    borderColor: "#4FC3F7",
    backgroundColor: "#E3F2FD",
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
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 15,
    color: "#333",
    flex: 1,
  },
  optionImage: {
    width: 120,
    height: 100,
    borderRadius: 8,
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
