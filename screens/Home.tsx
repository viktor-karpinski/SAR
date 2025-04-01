import { Animated, Dimensions, Image, StyleSheet, Text, View, ScrollView } from "react-native";
import { useGlobalContext } from "../context"; 
import { useEffect, useRef, useState } from "react";
import LargeButton from "../components/LargeButton";
import PastEventRow from "../components/PastEventRow";
import LoadingAnimation from "../components/LoadingAnimation";
import EventForm from "./EventForm";
import EventDetails from "./EventDetails";

type Props = {
  extra: Object,
  stacked?: () => void;
  back?: () => void;
}

export default function HomeScreen({extra, stacked, back}: Props) {
  const { apiToken, apiURL, user, events, setEvents, hasEvents, setHasEvent, stackHome, setStackHome, currentEvent, setCurrentEvent, fonts } = useGlobalContext();
  const [ hasPendingEvent, setHasPendingEvent] = useState<Boolean | null>(false);
  const mainVertical = useRef(new Animated.Value(0)).current;
  const mainOpacity = useRef(new Animated.Value(1)).current;
  const secondaryOpacity = useRef(new Animated.Value(0)).current;
  const secondaryVertical = useRef(new Animated.Value(-Dimensions.get("window").height)).current
  const secondaryHorizontal = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const fetchData = async () => {
      await getEvents();

      setTimeout(() => {
        fetchData();
      }, 180000)
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (stackHome) {
      handleEvent()
      setStackHome(false)
    }
  }, [stackHome])

  useEffect(() => {
    let isPending = false
    let current = {}

    events.forEach((event: Object) => {
      if (!event.till) {
        current = event
        isPending = true
      }
    })

    if (!isPending) {
      setHasPendingEvent(false)
      handleBack()
    } else {
      setCurrentEvent(current)
    }
  }, [events])

  useEffect(() => {
    if (currentEvent != null) {
      if (currentEvent.till == null) {
        setTimeout(() => {
          getPendingEvent(currentEvent)
        }, 3000)
        setHasPendingEvent(true)
      }
    }
  }, [currentEvent])

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

  const getPendingEvent = async (event : Object) => {
      const response = await fetch(apiURL + "event/" + event.id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Authorization": "Bearer " + apiToken
        },
      });
  
      const data = await response.json();
  
      if (response.ok && data) {
        setCurrentEvent(data)
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

  const switchToEventDetails = () => {
    Animated.timing(secondaryHorizontal, {
      toValue: -Dimensions.get("window").width,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  const handlePastEventPressed = (event : Object) => {
    setCurrentEvent(event)
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

  return (
      <View style={[styles.wrapper, extra]}>
        <Animated.View style={[styles.container, {top: mainVertical, opacity: mainOpacity}]}>
          <Image source={require("./../assets/sar-logo.png")} style={styles.logo} />
          {(user.isOrganiser || hasPendingEvent) && <View style={{ padding: 20, width: "100%", marginTop: 30 }}>
            <LargeButton label="Nový zásah" extraStyle={{}} onPress={handleEvent} isPending={hasPendingEvent} />
          </View>}
          <Text style={[styles.heading, {fontFamily: fonts[1], marginTop: 40}]}>
            Minulé Zásahy
          </Text>
          <View style={styles.hr}></View>
          <View style={{height: Dimensions.get("window").height - 483 + ((user.isOrganiser || hasPendingEvent) ? 0 : 100) }}>
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
                    <Text style={{ color: "#fff", textAlign: "center", fontFamily: fonts[1], fontSize: 20, letterSpacing: 0.8, }}>
                      zatiaľ neexistujú žiadne minulé zásahy...
                    </Text>
                  </View>
                )}
            </View>}
          </ScrollView>
          </View>
        </Animated.View>

        <Animated.View style={[styles.container, {top: secondaryVertical, left: secondaryHorizontal, opacity: secondaryOpacity}, styles.secondaryContainer]}>
          <EventForm back={handleBack} switchScreen={switchToEventDetails} />
          <EventDetails back={handleBack} />
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
    paddingLeft: 20,
    paddingRight: 20,
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

});