import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
    user: Object;
}

const UserPendingRow = ({user} : Props) => {
    const statusImages = {
        0: require("../assets/waiting.png"),
        1: require("../assets/confirmed.png"),
        2: require("../assets/declined.png"),
    };

    const phone = require("../assets/phone.png");

    const handlePress = () => {
        Linking.openURL(`tel:${user.user.phone}`)
        .then(supported => {
        if (!supported) {
            console.log('Phone number is not supported');
        }
        })
        .catch(err => console.log(err));
    }

    return (
        <TouchableOpacity style={[styles.container]} onPress={handlePress}>
            <View style={styles.row}>
                <Text style={[styles.text]}>
                    {user.user.name}
                </Text>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Image source={statusImages[user.status]} style={styles.image} />
                    <View style={styles.phonebox}>
                        <Image source={phone} style={{width: 22, height: 22}} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#4B4B4B",
        paddingLeft: 15,
        backgroundColor: "#191919B3",
        
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    text: {
        fontSize: 20,
        fontFamily: "Beiruti",
        letterSpacing: 1.4,
        color: "#ffffff"
    },

    row: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
    },

    image: {
        width: 20,
        height: 20,
    }, 

    phonebox: {
        backgroundColor: "#191919B3",
        width: 60,
        height: 60,
        borderLeftWidth: 1,
        borderLeftColor: "#4B4B4B",
        marginLeft: 18,
        alignItems: "center",
        justifyContent: "center",
    },
})

export default UserPendingRow