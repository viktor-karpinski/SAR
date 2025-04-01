import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
import { useGlobalContext } from "../context";

type Props = {
    label: string,
    icon: string,
    isLogout?: boolean,
    onPress: () => void;
}

const iconMapping: { [key: string]: any } = {
    logout: require("../assets/logout.png"),
    edit: require("../assets/edit.png"),
    lock: require("../assets/changepassword.png"),
};

const SettingsButton = ({label, icon, isLogout, onPress} : Props) => {
    const { fonts } = useGlobalContext();
    const imageSource = iconMapping[icon];

    return (
        <TouchableOpacity style={[styles.button, isLogout && {borderBottomWidth: 0}]} onPress={onPress}>
            <View style={[styles.container]}>
                <Image source={imageSource} style={{width: 18, height: 18}} />
                <Text style={[styles.text, {fontFamily: fonts[1]}, isLogout && {color: '#DE2C1A'}]}>
                    {label}
                </Text>
            </View>
            <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <Defs>
                    <ClipPath id="clip0_111_47">
                        <Rect width="18" height="18" fill={isLogout ? '#DE2C1A' : 'white'} transform="matrix(0 1 -1 0 18 0)" />
                    </ClipPath>
                </Defs>
                <G clipPath="url(#clip0_111_47)" transform="rotate(-90 9 9)">
                    <Path d="M0 8.1225L1.5 6.75L9.003 14.625L16.5 6.75L18 8.1225L9.003 17.25L0 8.1225Z" fill={isLogout ? '#DE2C1A' : 'white'} />
                    <Path d="M0 2.1225L1.5 0.75L9.003 8.625L16.5 0.75L18 2.1225L9.003 11.25L0 2.1225Z" fill={isLogout ? '#DE2C1A' : 'white'} />
                </G>
            </Svg>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: 40,
        flexGrow: 1, 
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: "#4B4B4B",
        borderBottomWidth: 1,
    },

    container: {
        flex: 1,
        flexDirection: "row",
        gap: 15,
        alignItems: "center"
    },

    text: {
        color: "#ffffff",
        fontSize: 18,
        letterSpacing: 1.5
    },
})

export default SettingsButton