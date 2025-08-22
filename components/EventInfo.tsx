import { StyleSheet, Text, View } from "react-native";
import { useGlobalContext } from "../context";

type Props = {
    event: Object;
}

const EventInfo = ({event} : Props) => {
    const { fonts } = useGlobalContext(); 

    return (
        <View>
            <View style={styles.container}>
                <Text style={[styles.text, styles.heading, {fontFamily: fonts[2]}]}>
                    {event.address}
                </Text>

                <View style={styles.line}></View>

                <Text style={styles.text}>
                    {(event.description != undefined && event.description.length )> 0 ? event.description : 'nie je k dispozícii žiadny popis'}
                </Text>
            </View>

            {event.till == null && <View style={[styles.status, event.status == 'active' && {backgroundColor: "#154FA1"}]}>
                <Text style={[styles.text, {fontFamily: fonts[2]}]}>
                    Aktuálny Stav: {event.status != 'active' ? 'Stand-By' : 'Zásah je v Akcii'}
                </Text>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexShrink: 1,

        flexDirection: "column",

        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "#191919B3",
        borderWidth: 2,
        borderColor: "#154FA1",
    }, 

    heading: {
        fontSize: 20,
    }, 

    text: {
        fontSize: 18,
        color: "#ffffff"
    },

    line: {
        width: "100%",
        height: 1,
        backgroundColor: "#4B4B4B",
        marginTop: 25,
        marginBottom: 25,
    },

    status: {
        width: "100%",
        backgroundColor: '#47484880',
        height: 50,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default EventInfo;