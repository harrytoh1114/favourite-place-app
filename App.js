import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllPlaces from "./store/AllPlaces";
import AddPlace from "./store/AddPlace";
import IconButton from "./components/UI/IconButton";
import { NavigationContainer } from "@react-navigation/native";
import { Colors } from "./constant/color";

const NativeStack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <NativeStack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary500,
            },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <NativeStack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favourite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          ></NativeStack.Screen>
          <NativeStack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: "Add a New Places",
            }}
          ></NativeStack.Screen>
        </NativeStack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
