import { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Path } from 'react-native-svg';

const third = Dimensions.get("window").width / 3;

type Props = {
    extra?: Object;
    onTabSwitch?: () => void;
    currentTab: number;
    setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
};

const NavBar = ({extra, onTabSwitch, currentTab, setCurrentTab}: Props) => {
    const movablePosition = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(movablePosition, {
            toValue: (currentTab * third),
            duration: 300,
            useNativeDriver: false,
          }).start();
          if (onTabSwitch)
            onTabSwitch()
    }, [currentTab])

    return (
        <Animated.View style={[sytles.container, extra]}>
            <TouchableOpacity
                style={sytles.button}
                onPress={() => {
                    setCurrentTab(0)
                }}
            >
                <Svg width="32" height="36" viewBox="0 0 32 36" fill="none">
                    <Path
                    d="M1 12.6667L16 1L31 12.6667V31C31 31.8841 30.6488 32.7319 30.0237 33.357C29.3986 33.9821 28.5507 34.3333 27.6667 34.3333H4.33333C3.44928 34.3333 2.60143 33.9821 1.97631 33.357C1.35119 32.7319 1 31.8841 1 31V12.6667Z"
                    stroke={currentTab == 0 ? '#ffffff' : '#154FA1'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    />
                    <Path
                    d="M11 34.3333V17.6666H21V34.3333"
                    stroke={currentTab == 0 ? '#ffffff' : '#154FA1'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    />
                </Svg>
            </TouchableOpacity>
            <TouchableOpacity
                style={sytles.button}
                onPress={() => {
                    setCurrentTab(1)
                }}
            >
                <Svg width="34" height="29" viewBox="0 0 34 29" fill="none">
                    <Path 
                    d="M24.2728 27.1819V24.2728C24.2728 22.7297 23.6598 21.2498 22.5687 20.1587C21.4776 19.0676 19.9977 18.4546 18.4546 18.4546H6.81821C5.27512 18.4546 3.79524 19.0676 2.70411 20.1587C1.61299 21.2498 1 22.7297 1 24.2728V27.1819" 
                    stroke={currentTab == 1 ? '#ffffff' : '#154FA1'}
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    />
                    <Path 
                    d="M12.6363 12.6364C15.8496 12.6364 18.4545 10.0315 18.4545 6.81821C18.4545 3.6049 15.8496 1 12.6363 1C9.42302 1 6.81812 3.6049 6.81812 6.81821C6.81812 10.0315 9.42302 12.6364 12.6363 12.6364Z" 
                    stroke={currentTab == 1 ? '#ffffff' : '#154FA1'}
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    />
                    <Path 
                    d="M32.9999 27.1819V24.2728C32.9989 22.9837 32.5699 21.7314 31.78 20.7125C30.9902 19.6937 29.8844 18.966 28.6362 18.6437" 
                    stroke={currentTab == 1 ? '#ffffff' : '#154FA1'}
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    />
                    <Path 
                    d="M22.8184 1.18909C24.0699 1.50953 25.1792 2.23738 25.9713 3.25791C26.7635 4.27844 27.1934 5.53359 27.1934 6.82548C27.1934 8.11737 26.7635 9.37251 25.9713 10.393C25.1792 11.4136 24.0699 12.1414 22.8184 12.4619" 
                    stroke={currentTab == 1 ? '#ffffff' : '#154FA1'}
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    />
                </Svg>
            </TouchableOpacity>
            <TouchableOpacity
                style={sytles.button}
                onPress={() => {
                    setCurrentTab(2)
                }}
            >
                <Svg width="32" height="27" viewBox="0 0 32 27" fill="none">
                    <Path 
                    d="M5.09082 25.5456V16.0001" 
                    stroke={currentTab == 2 ? '#ffffff' : '#154FA1'}
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    />
                    <Path 
                    d="M5.09082 10.5455V1" 
                    stroke={currentTab == 2 ? '#ffffff' : '#154FA1'}
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    />
                    <Path 
                    d="M16 25.5456V13.2728" 
                    stroke={currentTab == 2 ? '#ffffff' : '#154FA1'}
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    />
                    <Path 
                    d="M16 7.81821V1" 
                    stroke={currentTab == 2 ? '#ffffff' : '#154FA1'}
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    />
                    <Path 
                    d="M26.9092 25.5455V18.7273" 
                    stroke={currentTab == 2 ? '#ffffff' : '#154FA1'}
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    />
                    <Path 
                    d="M26.9092 13.2728V1" 
                    stroke={currentTab == 2 ? '#ffffff' : '#154FA1'}
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    />
                    <Path 
                    d="M1 16.0001H9.18185" 
                    stroke={currentTab == 2 ? '#ffffff' : '#154FA1'}
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    />
                    <Path 
                    d="M11.9092 7.81824H20.091" 
                    stroke={currentTab == 2 ? '#ffffff' : '#154FA1'}
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    />
                    <Path 
                    d="M22.8181 18.7273H31" 
                    stroke={currentTab == 2 ? '#ffffff' : '#154FA1'}
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    />
                </Svg>
            </TouchableOpacity>
            <Animated.View style={[sytles.movableRect, {left: movablePosition}]}></Animated.View>
        </Animated.View>
    )

}

const sytles = StyleSheet.create({
    container: {
        backgroundColor: "#191919",
        borderColor: '#154FA1',
        borderTopWidth: 4,
        height: 80,
        position: "absolute",
        bottom: 0,
        left: 0,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        width: Dimensions.get("window").width,
        zIndex: 3

    },
    movableRect: {
        backgroundColor: '#154FA1',
        width: third,
        height: 80,
        position: "absolute",
        top: 0,
        zIndex: 0
    }, 
    button: {
        width: third,
        height: 80,
        backgroundColor: "transparent",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    }
});

export default NavBar;