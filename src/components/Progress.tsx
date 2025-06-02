import { View } from "react-native"

type Props = {
  progress: number
}

export function Progress({ progress }: Props) {
  return (
    <View className="flex-1 w-full h-2 bg-slate-400 rounded-md">
      <View
        className="h-2 rounded-md bg-orange-500"
        style={{ width: `${progress}%`, overflow: "hidden" }}
      />
    </View>
  )
}
