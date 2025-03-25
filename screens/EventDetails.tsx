import { Dimensions, ScrollView, StyleSheet, View, Text } from "react-native";
import BackButton from "../components/BackButton";
import EventInfo from "../components/EventInfo";
import PendingCounter from "../components/PendingCounter";
import UserPendingRow from "../components/UserPendingRow";
import LargeButton from "../components/LargeButton";
import ParticipationConfirmation from "../components/ParticipationConfirmation";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";

type Props = {
  back?: () => void;
}

export default function EventDetails({back} : Props) {
  const { apiURL, apiToken, currentEvent, setCurrentEvent, setEvents, user } = useGlobalContext();
  const [ waiting, setWaiting ] = useState<number>(0);
  const [ confirmed, setConfirmed ] = useState<number>(0);
  const [ declined, setDeclined ] = useState<number>(0);

  const [ hasAlreadyAnswered, setHasAlreadyAnswered ] = useState<boolean>(false);
  const [ currentStatus, setCurrentStatus ] = useState<number>(0);

  const handleBack = () => {
    if (back) {
      back()
    }
  }

  useEffect(() => {
    if (currentEvent != null && currentEvent.till == null) {
      resetPendingUsers(currentEvent)
    } else {
      setCurrentStatus(0)
      handleBack()
    }
  }, [currentEvent])

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

  const activateEvent = async () => {
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
        setEvents(data.events)
      }
    }

  return (
    <View style={[styles.containerWrapper, {paddingBottom: 100}]}>
      <BackButton onPress={handleBack} extraStyle={{marginLeft: 20}} isVertical={true} />

      <View style={{paddingInline: 20, width: "100%"}}>
        {currentEvent != null && <EventInfo event={currentEvent} />}
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

        <PendingCounter waiting={waiting} confirmed={confirmed} declined={declined} />
      </View>

      <View style={styles.hr}></View>

      {currentEvent != null && <ScrollView contentContainerStyle={{width: Dimensions.get("window").width, padding: 20, marginBottom: 20, paddingBottom: 0}}>
        <View style={{ width: "100%" }}>
          {currentEvent?.users?.length > 0 ? (
            currentEvent.users.map((user, index) => (
              <UserPendingRow key={index} user={user} />
            ))
          ) : (
            <Text style={{ color: "#fff", textAlign: "center", marginTop: 20, fontFamily: "Hammersmith One", fontSize: 20, }}>
              Nie sú k dispozícii žiadni používatelia
            </Text>
          )}
        </View>
      </ScrollView>}

      <View style={{height: 20, width: "100%"}}></View>
        {(currentEvent != null && currentEvent.user_id == user.id && currentEvent.till != null) && <LargeButton label="Vymazať Zásah" isPending={true} noIcon={true} extraStyle={{fontFamily: "Hammersmith One", fontSize: 20, marginLeft: 20, marginRight: 20, width: Dimensions.get("window").width - 40}} onPress={deleteEvent} />}
        {(currentEvent != null && currentEvent.user_id == user.id && currentEvent.till == null && currentEvent.status != 'V Čakaní') && <LargeButton label="Ukončiť Zásah" isPending={true} noIcon={true} extraStyle={{fontFamily: "Hammersmith One", fontSize: 20, marginLeft: 20, marginRight: 20, width: Dimensions.get("window").width - 40}} onPress={finishEvent} />}
        {(currentEvent != null && currentEvent.user_id == user.id && currentEvent.till == null && currentEvent.status == 'V Čakaní') && <LargeButton label="Aktivovat Zásah" isPending={false} noIcon={true} extraStyle={{fontFamily: "Hammersmith One", fontSize: 20, marginLeft: 20, marginRight: 20, width: Dimensions.get("window").width - 40}} onPress={activateEvent} />}
        {(currentEvent != null && currentEvent.user_id != user.id && currentEvent.till == null) && <ParticipationConfirmation event={currentEvent.id} hasAlreadyAnswered={hasAlreadyAnswered} status={currentStatus} />}
      </View>
    )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    letterSpacing: 1.76,
    color: "#ffffff",
    fontFamily: "Beiruti",
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  hr: {
    width: "100%",
    height: 1,
    backgroundColor: "#4B4B4B",
    marginTop: 10,
  },
  containerWrapper: {
    width: Dimensions.get("window").width,
    height: "100%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 150,
  },
})