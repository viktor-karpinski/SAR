import { Image, StyleSheet, Text, View } from "react-native";
import { useGlobalContext } from "../context";

type Props = {
    confirmed: number;
    declined: number;
    waiting: number;
}

const PendingCounter = ({confirmed, declined, waiting} : Props) => {
    const { fonts } = useGlobalContext();

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={[styles.text, {fontFamily: fonts[1]}]}>
                    {`${confirmed}`}
                </Text>
                <Image source={require("../assets/confirmed.png")} style={styles.image} />
            </View>
            <View style={styles.wrapper}>
                <Text style={[styles.text, {fontFamily: fonts[1]}]}>
                    {`${waiting}`}
                </Text>
                <Image source={require("../assets/waiting.png")} style={styles.image} />
            </View>
            <View style={styles.wrapper}>
                <Text style={[styles.text, {fontFamily: fonts[1]}]}>
                    {`${declined}`}
                </Text>
                <Image source={require("../assets/declined.png")} style={styles.image} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-end", 
        justifyContent: "space-between",
        flexDirection: "row", 
        gap: 15
    },

    wrapper: {
        flexDirection: "row", 
        alignItems: "center", 
        gap: 5
    },

    image: {
        width: 20,
        height: 20,
      }, 
    
      text: {
        fontSize: 25,
        color: "#ffffff",
      }
})

export default PendingCounter