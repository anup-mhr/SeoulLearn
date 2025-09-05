import { colors } from "@/styles/theme";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useVideoPlayer, VideoSource, VideoView } from "expo-video";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const elephantsDreamSource: VideoSource = {
  uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  useCaching: true,
};

function MediaRenderer({ media }: { media: { type: string; url: string } }) {
  const audioPlayer = useAudioPlayer({
    uri: media.url ? media.url : undefined,
  });

  const audioStatus = useAudioPlayerStatus(audioPlayer);
  const { currentTime, duration, playing, mute } = audioStatus;

  // Format time in MM:SS format
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleAudioPlayback = async () => {
    if (!audioPlayer) return;

    if (playing) {
      await audioPlayer.pause();
    } else {
      await audioPlayer.play();
    }
  };

  const restartAudio = () => {
    if (!audioPlayer) return;
    audioPlayer.seekTo(0);
    audioPlayer.play();
  };

  // Video Starts here

  const videoPlayer = useVideoPlayer(elephantsDreamSource);
  switch (media.type) {
    case "image":
      return (
        <View style={styles.mediaContainer}>
          <Image
            source={{ uri: media.url }}
            style={styles.mediaImage}
            resizeMode="contain"
          />
        </View>
      );

    case "video":
      return (
        <View style={styles.contentContainer}>
          <VideoView
            player={videoPlayer}
            style={stylesVideo.video}
            allowsPictureInPicture={true}
            // nativeControls={false}
          />
        </View>
      );

    case "audio":
      if (!audioPlayer) return null;

      return (
        <View style={styles.mediaContainer}>
          <View style={styles.audioHeader}>
            <Text style={styles.audioTitle}>🎵 Audio Track</Text>
            {duration > 0 && (
              <Text style={styles.audioDuration}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </Text>
            )}
          </View>

          {/* Progress Bar */}
          {duration > 0 && (
            <View style={styles.audioProgressContainer}>
              <View
                style={[
                  styles.audioProgressBar,
                  { width: `${(currentTime / duration) * 100}%` },
                ]}
              />
            </View>
          )}

          {/* Controls */}
          <View style={styles.audioControls}>
            <TouchableOpacity
              style={styles.audioControlButton}
              onPress={restartAudio}
            >
              <Text style={styles.audioControlIcon}>⏮</Text>
              <Text style={styles.audioControlText}>Restart</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.audioControlButton, styles.primaryControlButton]}
              onPress={toggleAudioPlayback}
            >
              <Text
                style={[styles.audioControlIcon, styles.primaryControlIcon]}
              >
                {playing ? "⏸" : "▶"}
              </Text>
              <Text
                style={[styles.audioControlText, styles.primaryControlText]}
              >
                {playing ? "Pause" : "Play"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.audioControlButton}
              onPress={() => audioPlayer.seekTo(currentTime + 10)}
              disabled={!duration}
            >
              <Text style={styles.audioControlIcon}>⏭</Text>
              <Text style={styles.audioControlText}>+10s</Text>
            </TouchableOpacity>
          </View>
        </View>
      );

    default:
      return (
        <View style={styles.mediaContainer}>
          <Text style={styles.unsupportedText}>
            Unsupported media type: {media.type}
          </Text>
        </View>
      );
  }
}

export default MediaRenderer;

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
  // Enhanced Media styles
  mediaContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  mediaImage: {
    width: "100%",
    height: 220,
    borderRadius: 12,
  },
  mediaVideo: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    backgroundColor: "#000",
  },
  // Audio Player Styles
  audioHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  audioTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  audioDuration: {
    fontSize: 14,
    color: "#6B7280",
    fontFamily: "monospace",
  },
  audioProgressContainer: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    marginBottom: 20,
    overflow: "hidden",
  },
  audioProgressBar: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  audioControls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 12,
  },
  audioControlButton: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    minWidth: 80,
  },
  primaryControlButton: {
    backgroundColor: colors.primary,
  },
  audioControlIcon: {
    fontSize: 20,
    marginBottom: 4,
    color: "#6B7280",
  },
  primaryControlIcon: {
    color: "white",
  },
  audioControlText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6B7280",
  },
  primaryControlText: {
    color: "white",
  },
  unsupportedText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    fontStyle: "italic",
  },
});

const stylesVideo = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#4630ec",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#eeeeee",
    textAlign: "center",
  },
  video: {
    width: 300,
    height: 168.75,
    marginVertical: 20,
  },
});
