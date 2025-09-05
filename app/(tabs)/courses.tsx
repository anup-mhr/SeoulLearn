import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Card, Chip, Text, TextInput } from "react-native-paper";

// import LoadingSpinner from "../../components/ui/LoadingSpinner";
// import { coursesService } from "../../services/api/coursesService";
// import { useCourse } from "../../store/CourseContext";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../styles/theme";

const categories = [
  "All",
  "Grammar",
  "Vocabulary",
  "Listening",
  "Speaking",
  "Reading",
  "Writing",
];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];
const { width } = Dimensions.get("window");

export default function CoursesScreen() {
  const [searchQuery, setSearchQuery] = useState<string>("sd");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [filteredCourses, setFilteredCourses] = useState([]);

  const numColumns = 2;
  const cardWidth = (width - 60) / numColumns; // Account for padding and gaps

  return (
    <>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={{
          borderBottomRightRadius: 30,
          borderBottomLeftRadius: 30,
          paddingBottom: 40,
        }}
        className="px-6 pt-10 pb-4"
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ color: "white", fontSize: 26, fontWeight: "bold" }}>
              Study Materials
            </Text>
            <Text style={{ color: "white", opacity: 0.7 }}>
              Enhance your Korean Skills
            </Text>
          </View>
          <Avatar.Icon
            size={50}
            icon="magnify"
            style={{
              backgroundColor: colors.tertiery,
              borderRadius: "100%",
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: "#8865ee",
            borderRadius: 50,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <MaterialIcons
            name="search"
            size={24}
            color="white"
            className="px-2"
          />
          <TextInput
            mode="flat"
            style={{ flex: 1, color: "white" }}
            placeholder="Search study materials..."
            textColor="white"
            autoFocus={false}
          />
        </View>
      </LinearGradient>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          Categories
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 20 }}
        >
          {categories.map((category) => (
            <Chip
              key={category}
              mode="outlined"
              onPress={() => setSelectedCategory(category)}
              selected={selectedCategory === category}
              showSelectedCheck={false}
              style={{
                marginRight: 8,
                backgroundColor:
                  selectedCategory === category
                    ? colors.primary
                    : "transparent",
                borderColor:
                  selectedCategory === category ? "transparent" : "gray",
              }}
              textStyle={{
                color: selectedCategory === category ? "white" : "black",
                fontSize: 12,
              }}
            >
              {category}
            </Chip>
          ))}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Study Materials
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="sort" size={20} color={colors.primary} />
            <Text style={{ color: colors.primary, marginLeft: 4 }}>Filter</Text>
          </View>
        </View>
        <View style={[styles.gridContainer, { marginBottom: 20 }]}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Card
              key={index}
              style={[
                styles.gridCard,
                { width: cardWidth, overflow: "hidden" },
              ]}
            >
              <View
                style={{ height: 140, position: "relative", marginBottom: 10 }}
              >
                <ImageBackground
                  source={require("../../assets/images/korean-girl.jpeg")}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
                <Text
                  style={{
                    position: "absolute",
                    bottom: 8,
                    left: 8,
                    fontSize: 10,
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: 5,
                    borderRadius: 12,
                  }}
                >
                  {Math.round(Math.random() * 100)} min
                </Text>
                <View
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "white",
                    padding: 4,
                    borderRadius: "100%",
                  }}
                >
                  {index % 3 === 0 ? (
                    <MaterialIcons name="favorite" size={18} color="red" />
                  ) : (
                    <MaterialIcons
                      name="favorite-border"
                      size={18}
                      color="gray"
                    />
                  )}
                </View>
              </View>
              <Card.Content>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    marginBottom: 5,
                  }}
                >
                  <MaterialIcons
                    name="menu-book"
                    size={16}
                    color={colors.primary}
                  />
                  <Text style={{ fontWeight: "bold", marginLeft: 5 }}>
                    Basic Korean Phrases
                  </Text>
                </View>
                <Text style={{ color: "gray", fontSize: 12, marginBottom: 8 }}>
                  Essential phrases for beginners
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialIcons name="star" size={14} color="gray" />
                    <Text style={{ color: "gray", fontSize: 12 }}>
                      {(Math.random() * 5).toFixed(1)}
                    </Text>
                  </View>
                  <Text style={{ color: "gray", fontSize: 12 }}>
                    12 Lessons
                  </Text>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          Featured Content
        </Text>
        <LinearGradient
          colors={["#a855f7", "#4f46e5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 15,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "white",
                marginBottom: 8,
              }}
            >
              Korean Culture Deep Dive
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 12,
                opacity: 0.7,
                marginBottom: 8,
              }}
            >
              Learn about Korean traditions and customs
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 3,
                backgroundColor: "white",
                padding: 8,
                borderRadius: 20,
                width: 120,
              }}
            >
              <Text style={{ color: colors.primary, fontSize: 12 }}>
                Explore
              </Text>
              <MaterialIcons
                name="navigate-next"
                size={16}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
          <Image
            source={require("../../assets/images/korean-girl.jpeg")}
            style={{ height: 80, width: 80, borderRadius: 10 }}
            resizeMode="cover"
          />
        </LinearGradient>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
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
});
