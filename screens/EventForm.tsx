import { ScrollView, View } from "react-native";
import BackButton from "../components/BackButton";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import LargeButton from "../components/LargeButton";
import { useState } from "react";
import { useGlobalContext } from "../context";

type Props = {
    switchScreen?: () => void;
    back?: () => void;
}

export default function EventForm({switchScreen, back} : Props) {
    const { apiToken, apiURL, setEvents, events, fonts } = useGlobalContext();
    const [ location, setLocation ] = useState<string>("");
    const [ latitude, setLatitude ] = useState<string>("");
    const [ longitude, setLongitude ] = useState<string>("");
    const [ description, setDescription ] = useState<string>("");

    const handleBack = () => {
        if (back) {
            back()
        }
    }

    const handleEventSave = () => {
        try {
          saveEvent()
        } catch (error) {
          console.log(error)
        }
      }
    
    const saveEvent = async () => {
        const response = await fetch(apiURL + "event", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Authorization": "Bearer " + apiToken
            },
            body: JSON.stringify({
            'address': location,
            'lat': parseFloat(latitude),
            'lon': parseFloat(longitude),
            'description': description
            })
        });
    
        const data = await response.json();
    
        if (response.ok && data) {
            setEvents([...events, data])
            setTimeout(() => {
                setLocation("")
                setDescription("")
            }, 1000)

            if (switchScreen) {
                switchScreen()
            }
        }
    }

    return (
        <View style={[{width: "50%",}]}>
            <BackButton onPress={handleBack} extraStyle={{zIndex: 2, marginLeft: 20}} isVertical={true} />
            <ScrollView contentContainerStyle={{padding: 20, width: "100%", marginTop: 120, zIndex: 1, justifyContent: "center", flex: 1, paddingBottom: 120}}>
                <Input 
                label="Kde? Adresa?" 
                placeholder="Brezovica 471, 028 01 Brezovica" 
                icon="location" value={location} 
                onChangeText={setLocation} 
                extraStyle={{marginBottom: 40}} 
                />

                <TextArea 
                label="Popis situácie" 
                placeholder="povodeň, pohyb lavíny, zmiznutie osoby." 
                value={description} 
                onChangeText={setDescription} 
                extraStyle={{marginBottom: 40}} 
                />

                <LargeButton 
                noIcon={true} 
                label="Oznámiť všetkým" 
                extraStyle={{fontFamily: fonts[2], fontSize: 20,}} 
                isPending={false} 
                onPress={handleEventSave} 
                />
            </ScrollView>
        </View>
    )
}