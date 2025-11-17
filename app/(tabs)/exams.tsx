import colors from "@/constants/color";
import { MOCK_EXAMS_VIEW } from "@/constants/mok.data";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Card, ProgressBar, TextInput } from "react-native-paper";

// Memoized Exam Card Component
// eslint-disable-next-line react/display-name
const ExamCard = React.memo(({ exam, onPress }: any) => (
  <Card style={styles.examCard}>
    <Card.Content>
      <View style={styles.examHeader}>
        <View style={styles.examInfo}>
          <Text style={styles.examTitle}>{exam.title}</Text>
          <Text style={styles.examDate}>Exam Date: {exam.date}</Text>
        </View>
        <TouchableOpacity
          onPress={onPress}
          style={styles.examButton}
          activeOpacity={0.7}
        >
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

export default function ExamScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const avatarIcon = useMemo(() => "magnify", []);

  const handleExamPress = useCallback((examId: number) => {
    router.push(`/exam/${examId}`);
  }, []);

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
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Study Materials</Text>
            <Text style={styles.headerSubtitle}>
              Enhance your Korean Skills
            </Text>
          </View>
          <Avatar.Icon size={50} icon={avatarIcon} style={styles.avatarIcon} />
        </View>
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color="white" />
          <TextInput
            mode="flat"
            style={styles.searchInput}
            placeholder="Search study materials..."
            placeholderTextColor="rgba(255,255,255,0.7)"
            textColor="white"
            underlineColor="transparent"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Exams</Text>
        </View>
        {MOCK_EXAMS_VIEW.map(renderExam)}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
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
  headerTitle: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "white",
    opacity: 0.7,
  },
  avatarIcon: {
    backgroundColor: colors.tertiery,
    borderRadius: 50,
  },
  searchContainer: {
    backgroundColor: "#8865ee",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
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
