import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function Home() {
  return (
    <View style={{ flex: 1, backgroundColor: "#CFA875" }}>
      <View style={styles.container}>
        {/*--------------------------- Text au top du nav bar --------------------------- */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: "56%" }}>
            <Text style={{ color: "white", fontSize: 15 }}>Bonjour ! </Text>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
              Prenons soins de notre maison ensemble ✨{" "}
            </Text>
          </View>
          <View
            style={{
              marginLeft: "5%",
              backgroundColor: "#848B66",
              height: 45,
              width: 45,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 11,
              marginTop: 15,
            }}
          >
            <Image
              source={require("./images/profile.png")}
              style={{ width: 15, height: 15 }}
            />
          </View>
        </View>
        {/*--------------------------- Card du nav bar --------------------------- */}
        <View
          style={{
            backgroundColor: "#F9C877",
            marginTop: 25,
            padding: 20,
            borderRadius: 9,
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={{ width: "40%" }}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 21 }}
              >
                Notification
              </Text>
              <Text style={{ color: "white", marginTop: 5 }}>
                Laisser votre maison vous aider
              </Text>
            </View>
            <View
              style={{ position: "absolute", top: -70, right: 0, bottom: 150 }}
            >
              <Image
                source={require("./images/house1.png")}
                style={{ width: 160, height: 160 }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#848B66",
                paddingHorizontal: 12,
                paddingVertical: 7,
                borderRadius: 11,
              }}
            >
              <Text style={{ color: "white" }}>Note de maison</Text>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: "white",
                width: 135,
                height: 1,
                bordeColor: "white",
              }}
            ></View>
            <Image
              source={require("./images/info.png")}
              style={{ width: 15, height: 15 }}
            />
          </View>
        </View>

        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CFA875",
    marginHorizontal: '4%',
    marginTop: 45,
  },
});
