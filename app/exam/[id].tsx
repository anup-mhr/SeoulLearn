import MediaRenderer from "@/components/RenderMedia";
import ProgressBar from "@/components/ui/ProgressBar";
import { formatTime } from "@/libs/helpers";
import { colors } from "@/styles/theme";
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Color theme
// const colors = {
//   primary: "#6366F1",
//   secondary: "#8B5CF6",
//   primaryLight: "#818CF8",
//   primaryExtraLight: "#E0E7FF",
//   black: "#1F2937",
//   grayLight: "#E5E7EB",
//   grayDark: "#9CA3AF",
//   grayExtraLight: "#F3F4F6",
// };

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
    media: {
      type: "image",
      url: "https://worldenglishessouthkorea.weebly.com/uploads/6/4/6/0/64607789/220290_orig.jpg",
    },
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
    media: {
      type: "video",
      url: "https://videos.pexels.com/video-files/6989176/6989176-hd_1920_1080_30fps.mp4",
    },
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
    media: {
      type: "audio",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [timeLeft, setTimeLeft] = useState(28 * 60 + 15); // 28:15 in seconds
  const [showResults, setShowResults] = useState(false);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleFinishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (optionId: string) => {
    setSelectedAnswer(optionId);
    setAnswers({ ...answers, [currentQuestion]: optionId });
  };

  const handleNext = () => {
    if (currentQuestion < examQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1] || null);
    } else {
      handleFinishExam();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || null);
    }
  };

  const handleFinishExam = () => {
    let correctAnswers = 0;
    examQuestions.forEach((question, index) => {
      const selectedOption = question.options.find(
        (option) => option.id === answers[index]
      );
      if (selectedOption?.isCorrect) {
        correctAnswers++;
      }
    });

    Alert.alert(
      "Exam Completed!",
      `Your score: ${correctAnswers}/${examQuestions.length}`,
      [
        {
          text: "OK",
          onPress: () => setShowResults(true),
        },
      ]
    );
  };

  const currentQ = examQuestions[currentQuestion];

  // const renderMedia = (media: { type: string; url: string }): JSX.Element => {
  //   switch (media.type) {
  //     case "image":
  //       return (
  //         <View style={styles.mediaContainer}>
  //           <Image
  //             source={{ uri: media.url }}
  //             style={styles.mediaImage}
  //             resizeMode="contain"
  //           />
  //         </View>
  //       );
  //     // case "video":
  //     //   return (
  //     //     <View style={styles.mediaContainer}>
  //     //       <Video
  //     //         source={{ uri: media.url }}
  //     //         style={styles.mediaVideo}
  //     //         useNativeControls
  //     //         resizeMode="contain"
  //     //         shouldPlay={false}
  //     //       />
  //     //     </View>
  //     //   );

  //     case "audio": {
  //       // Using expo-audio's useAudioPlayer hook
  //       const player = useAudioPlayer(media.url);
  //       return (
  //         <View style={styles.mediaContainer}>
  //           <TouchableOpacity onPress={() => player.play()}>
  //             <Text> Play </Text>
  //           </TouchableOpacity>
  //           <TouchableOpacity
  //             onPress={() => {
  //               player.seekTo(0);
  //               player.play();
  //             }}
  //           >
  //             <Text> Replay </Text>
  //           </TouchableOpacity>
  //         </View>
  //       );
  //     }

  //     default:
  //       return <View></View>;
  //   }
  // };

  return (
    <>
      {/* Header */}
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.timerContainer}>
            <Ionicons name="time-outline" size={16} color="white" />
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          </View>

          <TouchableOpacity style={styles.menuButton}>
            <Feather name="pause" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>TOPIK I Practice Exam</Text>
          <Text style={styles.subtitle}>Intermediate Korean Language Exam</Text>
        </View>
      </LinearGradient>

      <ProgressBar progress={currentQuestion / (examQuestions.length - 1)} />

      {/* Question Content */}
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.questionHeader}>
          <Text style={styles.questionNumber}>
            Question {currentQuestion + 1} of {examQuestions.length}
          </Text>
          <Text style={styles.questionType}>Multiple Choice</Text>
        </View>

        <Text style={styles.questionText}>{currentQ.question}</Text>

        {currentQ.media && <MediaRenderer media={currentQ.media} />}

        {/* Options */}
        <View style={styles.optionsContainer}>
          {currentQ.options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionButton,
                selectedAnswer === option.id && styles.selectedOption,
              ]}
              onPress={() => handleAnswerSelect(option.id)}
            >
              <View
                style={[
                  styles.radioButton,
                  selectedAnswer === option.id && styles.selectedRadio,
                ]}
              >
                {selectedAnswer === option.id && (
                  <View style={styles.radioInner} />
                )}
              </View>
              <Text
                style={[
                  styles.optionText,
                  selectedAnswer === option.id && styles.selectedOptionText,
                ]}
              >
                {option.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.navButton, styles.previousButton]}
          onPress={handlePrevious}
          disabled={currentQuestion === 0}
        >
          <Ionicons
            name="chevron-back"
            size={16}
            color={currentQuestion === 0 ? colors.grayDark : "#6B7280"}
          />
          <Text
            style={[
              styles.navButtonText,
              currentQuestion === 0 && styles.disabledButtonText,
            ]}
          >
            Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, styles.nextButton]}
          onPress={handleNext}
          disabled={!selectedAnswer}
        >
          <Text
            style={[
              styles.nextButtonText,
              !selectedAnswer && styles.disabledNextButtonText,
            ]}
          >
            {currentQuestion === examQuestions.length - 1 ? "Finish" : "Next"}
          </Text>

          {currentQuestion === examQuestions.length - 1 ? (
            <Ionicons
              name="trophy-outline"
              size={16}
              color={!selectedAnswer ? colors.grayDark : "white"}
            />
          ) : (
            <Ionicons
              name="chevron-forward"
              size={16}
              color={!selectedAnswer ? colors.grayDark : "white"}
            />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  headerGradient: {
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
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
  progressContainer: {
    height: 4,
    backgroundColor: colors.grayLight,
  },
  progressBar: {
    height: "100%",
    backgroundColor: colors.primary,
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
    color: colors.primaryLight,
    fontWeight: "500",
    backgroundColor: colors.primaryExtraLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.black,
    marginBottom: 32,
    lineHeight: 26,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: colors.grayLight,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  selectedOption: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryExtraLight,
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
    borderColor: colors.primary,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
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
    borderTopColor: colors.grayLight,
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
    backgroundColor: colors.grayExtraLight,
  },
  nextButton: {
    backgroundColor: colors.primary,
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
    color: colors.grayDark,
  },
  disabledNextButtonText: {
    color: colors.grayDark,
  },
  // Media styles
  mediaContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mediaImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  mediaPlaceholder: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 16,
    textAlign: "center",
  },
  audioPlayer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.grayExtraLight,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 12,
    width: "100%",
  },
  audioText: {
    flex: 1,
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
  },
  mediaVideo: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  mediaAudio: {
    width: "100%",
    height: 60, // small bar style for audio
  },
});
