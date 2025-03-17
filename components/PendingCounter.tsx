import { Image, StyleSheet, Text, View } from "react-native";

type Props = {
    confirmed: number;
    declined: number;
    waiting: number;
}

const PendingCounter = ({confirmed, declined, waiting} : Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.text}>
                    {`${confirmed}`}
                </Text>
                <Image source={require("../assets/images/confirmed.png")} style={styles.image} />
            </View>
            <View style={styles.wrapper}>
                <Text style={styles.text}>
                    {`${waiting}`}
                </Text>
                <Image source={require("../assets/images/waiting.png")} style={styles.image} />
            </View>
            <View style={styles.wrapper}>
                <Text style={styles.text}>
                    {`${declined}`}
                </Text>
                <Image source={require("../assets/images/declined.png")} style={styles.image} />
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
        fontFamily: "BeirutiRegular",
        color: "#ffffff",
      }
})

export default PendingCounter