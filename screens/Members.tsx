import { StyleSheet, Text, Dimensions, View, ScrollView } from 'react-native';
import { useGlobalContext } from "../context";
import { useEffect } from 'react';
import UserRow from '../components/UserRow';

type InputProps = {
  extra: Object,
}

export default function MembersScreen({extra}: InputProps) {
  const { apiToken, apiURL, setUsers, users } = useGlobalContext()

  useEffect(() => {
    getUsers()
  }, [apiToken])

  const getUsers = async () => {
    const response = await fetch(apiURL + "users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": "Bearer " + apiToken
      },
    });

    const data = await response.json();

    if (response.ok && data) {
      setUsers(data)
    }
  }
  
  return (
      <View style={[styles.container, extra]}>
        <Text style={styles.heading}>
          Členovia Nášho Tímu
        </Text>
        <View style={styles.hr}></View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.usersContainer}>
            {users.map((user, index) => 
              <UserRow user={user} key={index} />
            )}
          </View>
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    alignItems: "center",
    flexDirection: "column"
  },

  scrollContainer: {
    width: "100%",
    marginTop: 20,
  },

  usersContainer: {
    width: Dimensions.get("window").width,
    flexDirection: "column",
    gap: 0,
    paddingInline: 20,
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
});