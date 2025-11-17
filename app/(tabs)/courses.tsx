import colors from "@/constants/color";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useMemo, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Card, Chip, Text, TextInput } from "react-native-paper";

const { width } = Dimensions.get("window");
const NUM_COLUMNS = 2;
const CARD_WIDTH = (width - 60) / NUM_COLUMNS;

// Static data outside component
const CATEGORIES = [
  "All",
  "Grammar",
  "Vocabulary",
  "Listening",
  "Speaking",
  "Reading",
  "Writing",
];

const MOCK_COURSES = Array.from({ length: 8 }, (_, index) => ({
  id: index,
  title: "Basic Korean Phrases",
  description: "Essential phrases for beginners",
  duration: Math.round(Math.random() * 100),
  rating: Number((Math.random() * 5).toFixed(1)),
  lessons: 12,
  isFavorite: index % 3 === 0,
}));

// Memoized Category Chip Component
// eslint-disable-next-line react/display-name
const CategoryChip = React.memo(({ category, isSelected, onPress }: any) => (
  <Chip
    mode="outlined"
    onPress={onPress}
    selected={isSelected}
    showSelectedCheck={false}
    style={[
      styles.chip,
      {
        backgroundColor: isSelected ? colors.primary : "transparent",
        borderColor: isSelected ? "transparent" : "gray",
      },
    ]}
    textStyle={{
      color: isSelected ? "white" : "black",
      fontSize: 12,
    }}
  >
    {category}
  </Chip>
));

// Memoized Course Card Component
// eslint-disable-next-line react/display-name
const CourseCard = React.memo(({ course, width, onFavoritePress }: any) => (
  <Card style={[styles.gridCard, { width }]}>
    <View style={styles.cardImageContainer}>
      <ImageBackground
        source={require("../../assets/images/korean-girl.jpeg")}
        style={styles.cardImage}
        resizeMode="cover"
      >
        <Text style={styles.durationBadge}>{course.duration} min</Text>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => onFavoritePress(course.id)}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name={course.isFavorite ? "favorite" : "favorite-border"}
            size={18}
            color={course.isFavorite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </ImageBackground>
    </View>
    <Card.Content style={styles.cardContent}>
      <View style={styles.cardTitleRow}>
        <MaterialIcons name="menu-book" size={16} color={colors.primary} />
        <Text style={styles.cardTitle} numberOfLines={1}>
          {course.title}
        </Text>
      </View>
      <Text style={styles.cardDescription} numberOfLines={2}>
        {course.description}
      </Text>
      <View style={styles.cardFooter}>
        <View style={styles.ratingContainer}>
          <MaterialIcons name="star" size={14} color="gray" />
          <Text style={styles.ratingText}>{course.rating}</Text>
        </View>
        <Text style={styles.lessonsText}>{course.lessons} Lessons</Text>
      </View>
    </Card.Content>
  </Card>
));

export default function CoursesScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState<Set<number>>(
    new Set(MOCK_COURSES.filter((c) => c.isFavorite).map((c) => c.id))
  );

  const gradientStart = useMemo(() => ({ x: 0, y: 0 }), []);
  const gradientEnd = useMemo(() => ({ x: 1, y: 0 }), []);

  // Memoize image sources
  const avatarIcon = useMemo(() => "magnify", []);
  const courseImage = useMemo(
    () => require("../../assets/images/korean-girl.jpeg"),
    []
  );

  // Memoized courses with favorite status
  const courses = useMemo(
    () =>
      MOCK_COURSES.map((course) => ({
        ...course,
        isFavorite: favorites.has(course.id),
      })),
    [favorites]
  );

  const handleCategoryPress = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handleFavoritePress = useCallback((courseId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(courseId)) {
        newFavorites.delete(courseId);
      } else {
        newFavorites.add(courseId);
      }
      return newFavorites;
    });
  }, []);

  const handleExplorePress = useCallback(() => {
    console.log("Explore featured content");
  }, []);

  const renderCategory = useCallback(
    (category: string) => (
      <CategoryChip
        key={category}
        category={category}
        isSelected={selectedCategory === category}
        onPress={() => handleCategoryPress(category)}
      />
    ),
    [selectedCategory, handleCategoryPress]
  );

  const renderCourse = useCallback(
    (course: any) => (
      <CourseCard
        key={course.id}
        course={course}
        width={CARD_WIDTH}
        onFavoritePress={handleFavoritePress}
      />
    ),
    [handleFavoritePress]
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
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {CATEGORIES.map(renderCategory)}
        </ScrollView>

        <View style={styles.materialsHeader}>
          <Text style={styles.sectionTitle}>Study Materials</Text>
          <View style={styles.filterButton}>
            <MaterialIcons name="sort" size={20} color={colors.primary} />
            <Text style={styles.filterText}>Filter</Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.gridMargin]}>
          {courses.map(renderCourse)}
        </View>

        <Text style={styles.sectionTitle}>Featured Content</Text>
        <LinearGradient
          colors={["#a855f7", "#4f46e5"]}
          start={gradientStart}
          end={gradientEnd}
          style={styles.featuredCard}
        >
          <View style={styles.featuredContent}>
            <Text style={styles.featuredTitle}>Korean Culture Deep Dive</Text>
            <Text style={styles.featuredDescription}>
              Learn about Korean traditions and customs
            </Text>
            <TouchableOpacity
              style={styles.exploreButton}
              onPress={handleExplorePress}
              activeOpacity={0.7}
            >
              <Text style={styles.exploreButtonText}>Explore</Text>
              <MaterialIcons
                name="navigate-next"
                size={16}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
          <Image
            cachePolicy="memory-disk"
            source={courseImage}
            style={styles.featuredImage}
            contentFit="cover"
          />
        </LinearGradient>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryScroll: {
    marginBottom: 20,
  },
  chip: {
    marginRight: 8,
  },
  materialsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterText: {
    color: colors.primary,
    marginLeft: 4,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  gridMargin: {
    marginBottom: 20,
  },
  gridCard: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
  },
  cardImageContainer: {
    height: 140,
    position: "relative",
    marginBottom: 10,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  durationBadge: {
    position: "absolute",
    bottom: 8,
    left: 8,
    fontSize: 10,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    borderRadius: 12,
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "white",
    padding: 4,
    borderRadius: 50,
  },
  cardContent: {
    paddingTop: 0,
  },
  cardTitleRow: {
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
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    color: "gray",
    fontSize: 12,
    marginLeft: 2,
  },
  lessonsText: {
    color: "gray",
    fontSize: 12,
  },
  featuredCard: {
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  featuredContent: {
    flex: 1,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  featuredDescription: {
    color: "white",
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 8,
  },
  exploreButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  exploreButtonText: {
    color: colors.primary,
    fontSize: 12,
  },
  featuredImage: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },
});
