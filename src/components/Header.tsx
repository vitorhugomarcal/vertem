import { Image, Text, View } from "react-native"

import Logo from "../assets/logoB.png"

interface HeaderProps {
  title?: string
}

export function Header({ title }: HeaderProps) {
  return (
    <View className="bg-slate-300 px-8 pb-8 pt-20 flex-row items-center justify-between">
      <Image source={Logo} className="max-h-10 max-w-20" />
      <View className="flex-row items-center justify-center gap-4">
        <View className="justify-center items-end">
          <Text className="text-xs lg:text-base text-slate-800 font-mr">
            Olá,
          </Text>
          <Text className="text-sm text-slate-800 font-mr">Vitor Hugo</Text>
        </View>
      </View>
    </View>
  )
}
