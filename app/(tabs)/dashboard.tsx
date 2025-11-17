import colors from "@/constants/color";
import { MOCK_EXAMS, MOCK_STUDY_MATERIALS } from "@/constants/mok.data";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Card, ProgressBar, Text } from "react-native-paper";

const { width } = Dimensions.get("window");
const NUM_COLUMNS = 2;
const CARD_WIDTH = (width - 60) / NUM_COLUMNS;

// Memoized component for study material cardMaterialIcons
// eslint-disable-next-line react/display-name
const StudyMaterialCard = React.memo(({ item, width }: any) => (
  <Card style={[styles.gridCard, { width }]}>
    <Card.Content style={styles.cardContent}>
      <View style={styles.cardHeader}>
        <MaterialIcons name="menu-book" size={16} color={colors.primary} />
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.title}
        </Text>
      </View>
      <Text style={styles.cardDescription} numberOfLines={2}>
        {item.description}
      </Text>
      <Card.Cover
        source={require("../../assets/images/korean-girl.jpeg")}
        style={styles.cardCover}
        resizeMode="cover"
      />
    </Card.Content>
  </Card>
));

// Memoized component for exam card
// eslint-disable-next-line react/display-name
const ExamCard = React.memo(({ exam, onPress }: any) => (
  <Card style={styles.examCard}>
    <Card.Content>
      <View style={styles.examHeader}>
        <View style={styles.examInfo}>
          <Text style={styles.examTitle}>{exam.title}</Text>
          <Text style={styles.examDate}>Exam Date: {exam.date}</Text>
        </View>
        <TouchableOpacity onPress={onPress} style={styles.examButton}>
          <Text style={styles.examButtonText}>Take Exam</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progress</Text>
          <Text style={styles.progressLabel}>
            {Math.round(exam.progress * 100)}%
          </Text>
        </View>
        <ProgressBar
          progress={exam.progress}
          color={colors.primary}
          style={styles.progressBar}
        />
      </View>
    </Card.Content>
  </Card>
));

export default function DashboardScreen() {
  const [overallProgress] = useState(0.33);
  const [completedModules] = useState(4);
  const [totalModules] = useState(12);

  // Memoize avatar source
  const avatarSource = useMemo(
    () => require("./../../assets/images/korean-girl.jpeg"),
    []
  );

  const handleExamPress = useCallback((examId: number) => {
    console.log("Take exam:", examId);
    router.push("/exam/123");
  }, []);

  const renderStudyMaterial = useCallback(
    (item: any) => (
      <StudyMaterialCard key={item.id} item={item} width={CARD_WIDTH} />
    ),
    []
  );

  const renderExam = useCallback(
    (exam: any) => (
      <ExamCard
        key={exam.id}
        exam={exam}
        onPress={() => handleExamPress(exam.id)}
      />
    ),
    [handleExamPress]
  );

  return (
    <>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.subtitleText}>
              Continue your Korean journey
            </Text>
          </View>
          <Avatar.Image size={50} source={avatarSource} style={styles.avatar} />
        </View>

        <Card style={styles.progressCard}>
          <Card.Content>
            <View style={styles.progressCardHeader}>
              <View>
                <Text style={styles.progressCardTitle}>Learning Progress</Text>
                <Text style={styles.progressCardSubtitle}>
                  {completedModules} of {totalModules} modules completed
                </Text>
              </View>
              <Text style={styles.progressPercentage}>
                {Math.round(overallProgress * 100)}%
              </Text>
            </View>
            <ProgressBar
              progress={overallProgress}
              color="white"
              style={styles.mainProgressBar}
            />
          </Card.Content>
        </Card>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Study Materials</Text>
            <Link href="/courses" style={styles.seeAllLink}>
              See All
            </Link>
          </View>

          <View style={styles.gridContainer}>
            {MOCK_STUDY_MATERIALS.map(renderStudyMaterial)}
          </View>

          <View style={[styles.sectionHeader, styles.examSectionHeader]}>
            <Text style={styles.sectionTitle}>Upcoming Exams</Text>
          </View>

          {MOCK_EXAMS.map(renderExam)}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },
  welcomeText: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },
  subtitleText: {
    color: "white",
    opacity: 0.7,
  },
  avatar: {
    backgroundColor: colors.tertiery,
    borderRadius: 50,
  },
  progressCard: {
    backgroundColor: "#8865ee",
    borderRadius: 10,
  },
  progressCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressCardTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 4,
  },
  progressCardSubtitle: {
    color: "white",
    opacity: 0.7,
    fontSize: 12,
    marginBottom: 4,
  },
  progressPercentage: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  mainProgressBar: {
    backgroundColor: "#a5b4fc",
    height: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  examSectionHeader: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAllLink: {
    color: colors.primary,
  },
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
  cardContent: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 5,
  },
  cardTitle: {
    fontWeight: "bold",
    flex: 1,
  },
  cardDescription: {
    color: "gray",
    fontSize: 12,
  },
  cardCover: {
    marginTop: 10,
    borderRadius: 10,
    height: 100,
  },
  examCard: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
  },
  examHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  examInfo: {
    flex: 1,
  },
  examTitle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "uppercase",
  },
  examDate: {
    color: "gray",
    fontSize: 12,
    marginBottom: 4,
  },
  examButton: {
    borderRadius: 20,
    backgroundColor: "#dbeafe",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  examButtonText: {
    color: colors.primary,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  progressLabel: {
    color: "gray",
    fontSize: 12,
  },
  progressBar: {
    backgroundColor: "#e5e7eb",
    height: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
});
