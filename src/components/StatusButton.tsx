import { Text, TouchableOpacity } from "react-native"

interface Props {
  status: string
  label: string
  color: string
  selectedStatus: string | null
  onPress: (status: string) => void
}
export function StatusButton({
  status,
  label,
  color,
  selectedStatus,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      className={`flex px-2 ${color} rounded-lg justify-center items-center ${
        selectedStatus && selectedStatus !== status ? "opacity-50" : ""
      }`}
      onPress={() => onPress(status)}
    >
      <Text className="text-slate-900 text-xs font-mm p-1">{label}</Text>
    </TouchableOpacity>
  )
}
