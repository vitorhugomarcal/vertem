import { AntDesign } from "@expo/vector-icons"
import {
  KeyboardAvoidingView,
  ModalProps,
  Platform,
  Modal as RNModal,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native"

import { BlurView } from "expo-blur"
import Toast from "react-native-toast-message"
import colors from "tailwindcss/colors"

import { Progress } from "./Progress"

type Props = ModalProps & {
  progresso: number
  title: string
  subtitle?: string
  onClose?: () => void
}

const keyboardAvoidingViewBehavior =
  Platform.OS === "android" ? "height" : "position"

export function Modal({
  title,
  progresso,
  subtitle = "",
  onClose,
  children,
  ...rest
}: Props) {
  const colorScheme = useColorScheme()

  return (
    <RNModal transparent animationType="slide" {...rest}>
      <BlurView
        className="flex-1 z-10"
        intensity={7}
        tint="dark"
        experimentalBlurMethod="dimezisBlurView"
      >
        <View className="flex-1 justify-end bg-slate-950/60 z-10">
          <Toast position="bottom" />
          <KeyboardAvoidingView behavior={keyboardAvoidingViewBehavior}>
            <View className="dark:bg-slate-700 bg-slate-200 border-t dark:border-zinc-700 border-zinc-300 px-6 pt-5 pb-10 z-10">
              <ScrollView showsVerticalScrollIndicator={false}>
                <Progress progress={progresso} />
                <View className="flex-row justify-between items-center pt-5">
                  <Text className="dark:text-white text-slate-800 font-msb text-xl">
                    {title}
                  </Text>
                  {onClose && (
                    <TouchableOpacity activeOpacity={0.7} onPress={onClose}>
                      <View className="p-1">
                        <AntDesign
                          name="close"
                          color={
                            colorScheme === "dark"
                              ? colors.zinc[300]
                              : colors.zinc[800]
                          }
                          size={20}
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
                {subtitle.trim().length > 0 && (
                  <Text className="dark:text-zinc-400 text-zinc-700 font-mr leading-6  my-2">
                    {subtitle}
                  </Text>
                )}
                {children}
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </BlurView>
    </RNModal>
  )
}
