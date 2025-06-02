import "@/styles/global.css"

import { useEffect } from "react"
import { StatusBar, View } from "react-native"

import { Slot } from "expo-router"
import * as SplashScreen from "expo-splash-screen"

import {
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  useFonts,
} from "@expo-google-fonts/montserrat"
import Toast, {
  BaseToast,
  ErrorToast,
  type BaseToastProps,
} from "react-native-toast-message"
import colors from "tailwindcss/colors"

SplashScreen.preventAutoHideAsync()

SplashScreen.setOptions({
  duration: 500,
  fade: true,
})

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftWidth: 6,
        borderLeftColor: colors.green[500],
        backgroundColor: colors.slate[200],
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        color: colors.slate[800],
        fontSize: 12,
        fontFamily: "Montserrat_500Medium",
      }}
      text2Style={{
        color: colors.slate[700],
        fontSize: 12,
        fontFamily: "Montserrat_400Regular",
      }}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftWidth: 6,
        borderLeftColor: colors.red[500],
        backgroundColor: colors.slate[200],
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        color: colors.slate[800],
        fontSize: 12,
        fontFamily: "Montserrat_500Medium",
      }}
      text2Style={{
        color: colors.slate[700],
        fontSize: 12,
        fontFamily: "Montserrat_400Regular",
      }}
    />
  ),
}

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  })

  useEffect(() => {
    if (fontsLoaded || fontError) {
      async function prepareSplashScreen() {
        try {
          await new Promise((resolve) => setTimeout(resolve, 1500))
          await SplashScreen.hideAsync()
        } catch (e) {
          console.warn(e)
        }
      }
      prepareSplashScreen()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null
  }

  function InitialLayout() {
    return <Slot />
  }

  return (
    <View className="flex-1">
      <StatusBar barStyle="default" backgroundColor="transparent" translucent />
      <InitialLayout />
      <Toast config={toastConfig} />
    </View>
  )
}
