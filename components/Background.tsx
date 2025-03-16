import { ImageBackground, StyleSheet, View, Dimensions } from "react-native";

const Background = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={[styles.container, {height: Dimensions.get("screen").height}]}>
      <View style={styles.backgroundColor} />
      <ImageBackground
        source={require("../assets/TEMPLATE.png")}
        style={styles.backgroundImage}
        imageStyle={styles.imageOpacity}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        {children}
      </View>
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  backgroundColor: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  imageOpacity: {
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    position: "relative",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
