import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import store from "../store";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) {
      console.log(error);
      throw new Error("Fonts not loaded");
    }

    if (fontsLoaded) {
      console.log("Fonts loaded");
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  useEffect(() => {}, []);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="todo/add"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="todo/[query]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="edit-profile"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="add-meal/[query]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="all-nutrients"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="unauthenticated"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="add-transaction/[query]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </Provider>
  );
};

export default RootLayout;
