import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllPlaces from "./store/AllPlaces";
import AddPlace from "./store/AddPlace";
import Map from "./store/Map";
import IconButton from "./components/UI/IconButton";
import { NavigationContainer } from "@react-navigation/native";
import { Colors } from "./constant/color";
import { useEffect, useState, useCallback } from "react";
import { init } from "./util/database";
import * as SplashScreen from "expo-splash-screen";
import PlaceDetails from "./store/PlaceDetails";

const NativeStack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        init();
      } catch (e) {
        console.warn(e);
      } finally {
        setDbInitialized(true);
      }
    };
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (dbInitialized) {
      await SplashScreen.hideAsync();
    }
  }, [dbInitialized]);

  if (!dbInitialized) return null;

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer onReady={onLayoutRootView}>
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

          <NativeStack.Screen
            name="Map"
            component={Map}
            options={{
              title: "Pick a location",
            }}
          ></NativeStack.Screen>
          <NativeStack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{
              title: "Loading Place...",
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
