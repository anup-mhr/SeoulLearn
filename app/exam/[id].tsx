import MediaRenderer from "@/components/RenderMedia";
import ProgressBar from "@/components/ui/ProgressBar";
import colors from "@/constants/color";
import { EXAM_QUESTIONS } from "@/constants/mok.data";
import { formatTime } from "@/libs/helpers";
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const INITIAL_TIME = 28 * 60 + 15; // 28:15 in seconds
const TOTAL_QUESTIONS = EXAM_QUESTIONS.length;

// Memoized Option Button Component
// eslint-disable-next-line react/display-name
const OptionButton = React.memo(({ option, isSelected, onPress }: any) => (
  <TouchableOpacity
    style={[styles.optionButton, isSelected && styles.selectedOption]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={[styles.radioButton, isSelected && styles.selectedRadio]}>
      {isSelected && <View style={styles.radioInner} />}
    </View>
    <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
      {option.text}
    </Text>
  </TouchableOpacity>
));

export default function ExamScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize current question
  const currentQ = useMemo(
    () => EXAM_QUESTIONS[currentQuestion],
    [currentQuestion]
  );

  // Memoize progress calculation
  const progress = useMemo(
    () => currentQuestion / (TOTAL_QUESTIONS - 1),
    [currentQuestion]
  );

  // Calculate score
  const calculateScore = useCallback(() => {
    let correctAnswers = 0;
    EXAM_QUESTIONS.forEach((question, index) => {
      const selectedOption = question.options.find(
        (option) => option.id === answers[index]
      );
      if (selectedOption?.isCorrect) {
        correctAnswers++;
      }
    });
    return correctAnswers;
  }, [answers]);

  const handleFinishExam = useCallback(() => {
    const correctAnswers = calculateScore();
    Alert.alert(
      "Exam Completed!",
      `Your score: ${correctAnswers}/${TOTAL_QUESTIONS}`,
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]
    );
  }, [calculateScore]);

  // Screen orientation effect
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, []);

  // Timer effect
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleFinishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [handleFinishExam]);

  // Update selected answer when question changes
  useEffect(() => {
    setSelectedAnswer(answers[currentQuestion] || null);
  }, [currentQuestion, answers]);

  const handleAnswerSelect = useCallback(
    (optionId: string) => {
      setSelectedAnswer(optionId);
      setAnswers((prev) => ({ ...prev, [currentQuestion]: optionId }));
    },
    [currentQuestion]
  );

  const handleNext = useCallback(() => {
    if (currentQuestion < TOTAL_QUESTIONS - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleFinishExam();
    }
  }, [currentQuestion, handleFinishExam]);

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }, [currentQuestion]);

  const handleBack = useCallback(() => {
    Alert.alert(
      "Exit Exam",
      "Are you sure you want to exit? Your progress will be lost.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Exit", style: "destructive", onPress: () => router.back() },
      ]
    );
  }, []);

  const renderOption = useCallback(
    (option: any) => (
      <OptionButton
        key={option.id}
        option={option}
        isSelected={selectedAnswer === option.id}
        onPress={() => handleAnswerSelect(option.id)}
      />
    ),
    [selectedAnswer, handleAnswerSelect]
  );

  const isLastQuestion = currentQuestion === TOTAL_QUESTIONS - 1;
  const isFirstQuestion = currentQuestion === 0;

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
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.timerContainer}>
            <Ionicons name="time-outline" size={16} color="white" />
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          </View>

          <TouchableOpacity style={styles.menuButton} activeOpacity={0.7}>
            <Feather name="pause" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>TOPIK I Practice Exam</Text>
          <Text style={styles.subtitle}>Intermediate Korean Language Exam</Text>
        </View>
      </LinearGradient>

      <ProgressBar progress={progress} />

      {/* Question Content */}
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.questionHeader}>
          <Text style={styles.questionNumber}>
            Question {currentQuestion + 1} of {TOTAL_QUESTIONS}
          </Text>
          <Text style={styles.questionType}>Multiple Choice</Text>
        </View>

        <Text style={styles.questionText}>{currentQ.question}</Text>

        {currentQ.media && <MediaRenderer media={currentQ.media} />}

        <View style={styles.optionsContainer}>
          {currentQ.options.map(renderOption)}
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[
            styles.navButton,
            styles.previousButton,
            isFirstQuestion && styles.disabledButton,
          ]}
          onPress={handlePrevious}
          disabled={isFirstQuestion}
          activeOpacity={0.7}
        >
          <Ionicons
            name="chevron-back"
            size={16}
            color={isFirstQuestion ? colors.grayDark : "#6B7280"}
          />
          <Text
            style={[
              styles.navButtonText,
              isFirstQuestion && styles.disabledButtonText,
            ]}
          >
            Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            styles.nextButton,
            !selectedAnswer && styles.disabledNextButton,
          ]}
          onPress={handleNext}
          disabled={!selectedAnswer}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.nextButtonText,
              !selectedAnswer && styles.disabledNextButtonText,
            ]}
          >
            {isLastQuestion ? "Finish" : "Next"}
          </Text>

          <Ionicons
            name={isLastQuestion ? "trophy-outline" : "chevron-forward"}
            size={16}
            color={!selectedAnswer ? colors.grayDark : "white"}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
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
  disabledButton: {
    opacity: 0.5,
  },
  disabledNextButton: {
    backgroundColor: colors.grayLight,
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
});
