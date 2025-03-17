import { Animated, Dimensions, Image, StyleSheet, Text, View, ScrollView } from "react-native";
import { useGlobalContext } from "../context"; 
import { useEffect, useRef, useState } from "react";
import LargeButton from "../components/LargeButton";
import PastEventRow from "../components/PastEventRow";
import BackButton from "../components/BackButton";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import EventDetails from "../components/EventDetails";
import UserPendingRow from "../components/UserPendingRow";
import PendingCounter from "../components/PendingCounter";
import ParticipationConfirmation from "../components/ParticipationConfirmation";
import LoadingAnimation from "../components/LoadingAnimation";

type Props = {
  extra: Object,
  stacked?: () => void;
  back?: () => void;
}

export default function HomeScreen({extra, stacked, back}: Props) {
  const { apiToken,apiURL, user } = useGlobalContext();
  const [ events, setEvents ] = useState<Array<Object>>([]);
  const [ hasEvents, setHasEvent ] = useState<Boolean>(false);
  const [ hasPendingEvent, setHasPendingEvent] = useState<Boolean | null>(false);
  const mainVertical = useRef(new Animated.Value(0)).current;
  const mainOpacity = useRef(new Animated.Value(1)).current;
  const secondaryOpacity = useRef(new Animated.Value(0)).current;
  const secondaryVertical = useRef(new Animated.Value(-Dimensions.get("window").height)).current
  const secondaryHorizontal = useRef(new Animated.Value(0)).current

  const [ location, setLocation ] = useState<string>("");
  const [ latitude, setLatitude ] = useState<string>("");
  const [ longitude, setLongitude ] = useState<string>("");
  const [ description, setDescription ] = useState<string>("");

  const [ currentEvent, setCurrentEvent ] = useState<Object>({});

  const [ wating, setWaiting ] = useState<number>(0);
  const [ confirmed, setConfirmed ] = useState<number>(0);
  const [ declined, setDeclined ] = useState<number>(0);

  const [ hasAlreadyAnswered, setHasAlreadyAnswered ] = useState<boolean>(false);
  const [ currentStatus, setCurrentStatus ] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      await getEvents();
    };

    fetchData();
  }, []);

  useEffect(() => {
    events.forEach((event: Object) => {
      if (!event.till) {
       handleSetCurrentEvent(event)
      }
    })
  }, [events])

  const getEvents = async () => {
    const response = await fetch(apiURL + "events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": "Bearer " + apiToken
      },
    });

    const data = await response.json();

    if (response.ok && data) {
      setEvents(data)
      setHasEvent(true)
    }
  }

  const handleEvent = () => {
    Animated.timing(mainVertical, {
      toValue: Dimensions.get("window").height,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.timing(mainOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(secondaryVertical, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.timing(secondaryOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    if (stacked) {
      stacked()
    }

    if (hasPendingEvent) {
      Animated.timing(secondaryHorizontal, {
        toValue: -Dimensions.get("window").width,
        duration: 0,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(secondaryHorizontal, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();
    }
  }

  const handleBack = () => {
    Animated.timing(secondaryVertical, {
      toValue: -Dimensions.get("window").height,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.timing(secondaryOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(mainVertical, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.timing(mainOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

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
      handleSetCurrentEvent(data)
      Animated.timing(secondaryHorizontal, {
        toValue: -Dimensions.get("window").width,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }

  const handleSetCurrentEvent = (data : Object) => {
    setCurrentEvent(data)
    setHasPendingEvent(true)
    resetPendingUsers(data)
  }

  const resetPendingUsers = (data : Object) => {
    let waiting = 0;
    let confirmed = 0;
    let declined = 0;

    data.users.forEach((loopUser) => {
      if (loopUser.user.id == user.id) {
        if (loopUser.status != 0) {
          setHasAlreadyAnswered(true)
          setCurrentStatus(loopUser.status)
        }
      }
      if (loopUser.status === 0) waiting++;
      if (loopUser.status === 1) confirmed++;
      if (loopUser.status === 2) declined++;
    });

    setWaiting(waiting);
    setConfirmed(confirmed);
    setDeclined(declined);
  }

  const finishEvent = async () => {
    const response = await fetch(apiURL + "event/" + currentEvent.id + "/finish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": "Bearer " + apiToken
      },
    });

    const data = await response.json();

    if (response.ok && data) {
      setCurrentEvent(data.event)
      setEvents(data.events)
      setHasPendingEvent(false)
      handleBack()
    }
  }

  const handleFinishEvent = () => {
    finishEvent()
  }

  const handleConfirmation = (event : Object) => {
    handleSetCurrentEvent(event)
  }

  const handlePastEventPressed = (event : Object) => {
    setCurrentEvent(event)
    resetPendingUsers(event)
    Animated.timing(mainVertical, {
      toValue: Dimensions.get("window").height,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.timing(mainOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(secondaryVertical, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.timing(secondaryHorizontal, {
      toValue: -Dimensions.get("window").width,
      duration: 0,
      useNativeDriver: false,
    }).start();

    Animated.timing(secondaryOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    if (stacked) {
      stacked()
    }
  }

  const handleActivate = async () => {
    const response = await fetch(apiURL + "event/" + currentEvent.id + "/activate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": "Bearer " + apiToken
      },
    });

    const data = await response.json();

    if (response.ok && data) {
      setCurrentEvent(data.event)
    }

  }

  const deleteEvent = async () => {
    const response = await fetch(apiURL + "event/" + currentEvent.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": "Bearer " + apiToken
      },
    });

    const data = await response.json();

    if (response.ok && data) {
      setEvents(data.events)
      handleBack()
    }
  }

  return (
      <View style={[styles.wrapper, extra]}>
        <Animated.View style={[styles.container, {top: mainVertical, opacity: mainOpacity}]}>
          <Image source={require("./../assets/sar-logo.png")} style={styles.logo} />
          <View style={{ padding: 20, width: "100%", marginTop: 30 }}>
            <LargeButton label="Nový zásah" extraStyle={{}} onPress={handleEvent} isPending={hasPendingEvent} />
          </View>
          <Text style={[styles.heading, {marginTop: 40}]}>
            Minulé Zásahy
          </Text>
          <View style={styles.hr}></View>
          <View style={{height: (Dimensions.get("window").height - 483),}}>
          <ScrollView contentContainerStyle={[styles.eventContainer]}>
            {!hasEvents && <View style={[styles.eventContainerWrapper, {height: (Dimensions.get("window").height - 603),}]}>
              <LoadingAnimation />
            </View>}
            {hasEvents && <View style={styles.eventContainerWrapper}>
                {events.length > 0 ? (
                  events.map((event, index) => 
                    (event.till != null)  && (
                      <PastEventRow
                        key={index}
                        address={event.address}
                        date={event.created_at}
                        from={event.from.substring(0, 5)}
                        till={event.till.substring(0, 5)}
                        extra={{ width: Dimensions.get("window").width - 40 }}
                        pressed={() => {
                          handlePastEventPressed(event)
                        }}
                      />
                    )
                  )
                ) : (
                  <View style={{height: Dimensions.get("window").height - 593, justifyContent: "center"}}>
                    <Text style={{ color: "#fff", textAlign: "center", fontFamily: "BeirutiRegular", fontSize: 20, letterSpacing: 0.8, }}>
                      zatiaľ neexistujú žiadne minulé zásahy...
                    </Text>
                  </View>
                )}
            </View>}
          </ScrollView>
          </View>
        </Animated.View>

        <Animated.View style={[styles.container, {top: secondaryVertical, left: secondaryHorizontal, opacity: secondaryOpacity}, styles.secondaryContainer]}>
            <View style={[{width: "50%",}]}>
              <BackButton onPress={handleBack} extraStyle={{zIndex: 2}} isVertical={true} />
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
                extraStyle={{fontFamily: "Hammersmith", fontSize: 20,}} 
                isPending={false} 
                onPress={handleEventSave} 
                />
              </ScrollView>
              
            </View>

            <View style={[styles.containerWrapper, {paddingBottom: 100}]}>
              <BackButton onPress={handleBack} extraStyle={{}} isVertical={true} />

              <View style={{paddingInline: 20, width: "100%"}}>
                <EventDetails event={currentEvent} />
              </View>

              <View style={{
                  width: "100%", 
                  alignItems: "center", 
                  justifyContent: "space-between", 
                  flexDirection: "row",
                  marginTop: 40,
                  paddingRight: 20,
                }}>
                <Text style={styles.heading}>
                  Zoznam členov
                </Text>

                <PendingCounter waiting={wating} confirmed={confirmed} declined={declined} />
              </View>

              <View style={styles.hr}></View>

              <ScrollView contentContainerStyle={{width: Dimensions.get("window").width, padding: 20,}}>
                <View style={{ width: "100%" }}>
                  {currentEvent?.users?.length > 0 ? (
                    currentEvent.users.map((user, index) => (
                      <UserPendingRow key={index} user={user} />
                    ))
                  ) : (
                    <Text style={{ color: "#fff", textAlign: "center", marginTop: 20, fontFamily: "Hammersmith", fontSize: 20, }}>
                      Nie sú k dispozícii žiadni používatelia
                    </Text>
                  )}
                </View>
              </ScrollView>

              {(currentEvent.user_id == user.id && currentEvent.till != null) && <LargeButton label="Vymazať Zásah" isPending={true} noIcon={true} extraStyle={{fontFamily: "Hammersmith", fontSize: 20, marginLeft: 20, marginRight: 20, width: Dimensions.get("window").width - 40}} onPress={deleteEvent} />}
              {(currentEvent.user_id == user.id && currentEvent.till == null && currentEvent.status != 'V Čakaní') && <LargeButton label="Ukončiť Zásah" isPending={true} noIcon={true} extraStyle={{fontFamily: "Hammersmith", fontSize: 20, marginLeft: 20, marginRight: 20, width: Dimensions.get("window").width - 40}} onPress={handleFinishEvent} />}
              {(currentEvent.user_id == user.id && currentEvent.till == null && currentEvent.status == 'V Čakaní') && <LargeButton label="Aktivovat Zásah" isPending={false} noIcon={true} extraStyle={{fontFamily: "Hammersmith", fontSize: 20, marginLeft: 20, marginRight: 20, width: Dimensions.get("window").width - 40}} onPress={handleActivate} />}
              {(currentEvent.user_id != user.id && currentEvent.till == null) && <ParticipationConfirmation event={currentEvent.id} confirmation={handleConfirmation} hasAlreadyAnswered={hasAlreadyAnswered} status={currentStatus} />}
            </View>
        </Animated.View>
      </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: Dimensions.get("window").width,
  },
  container: {
    backgroundColor: "transparent",
    paddingTop: 100,
    alignItems: "center",
    position: "absolute"
  },
  logo: {
    height: 160,
    width: 160,
  },
  heading: {
    fontSize: 22,
    letterSpacing: 1.76,
    color: "#ffffff",
    fontFamily: "BeirutiRegular",
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  hr: {
    width: "100%",
    height: 1,
    backgroundColor: "#4B4B4B",
    marginTop: 10,
  },
  eventContainerWrapper: {
    flexGrow: 1,
    gap: 10,
    flexDirection: "column",
    width: Dimensions.get("window").width - 40,
    padding: 0,
    
  },
  eventContainer: {
    width: "100%",
    paddingTop: 20,
    paddingInline: 20,
    paddingBottom: 100,
  },

  secondaryContainer: {
    width: Dimensions.get("window").width * 2,
    height: "100%",
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingTop: 0
  },

  containerWrapper: {
    width: Dimensions.get("window").width,
    height: "100%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 150,
  },
});