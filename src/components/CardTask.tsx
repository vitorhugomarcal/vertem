import { Alert, Text, TouchableOpacity, View } from "react-native"

import clsx from "clsx"

import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors"

import { TaskProps } from "@/dtos/TaskDTO"

type CardTaskProps = {
  taskData: TaskProps
  onUpdate: (task: TaskProps) => void
  onDelete: (taskId: string) => void
}

export function CardTask({ taskData, onUpdate, onDelete }: CardTaskProps) {
  function handleToggleStatus() {
    const newStatus = taskData.status === "PENDING" ? "FINISHED" : "PENDING"
    const updatedTask: TaskProps = {
      ...taskData,
      status: newStatus,
    }
    onUpdate(updatedTask)
  }

  function handleDelete() {
    Alert.alert(
      "Excluir tarefa",
      `Tem certeza que deseja excluir a tarefa "${taskData.title}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sim",
          style: "destructive",
          onPress: () => onDelete(taskData.id),
        },
      ]
    )
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={clsx(
        "border-l-4 bg-slate-300 w-full rounded-xl p-4 mr-2 mb-2",
        {
          "border-yellow-500": taskData.status === "PENDING",
          "border-green-500": taskData.status === "FINISHED",
        }
      )}
      // onPress={handleToggleStatus}
    >
      <View className="flex-row items-center justify-between">
        <Text
          className={clsx("flex-1 text-sm font-mm pr-2", {
            "text-slate-800": taskData.status === "PENDING",
            "text-slate-600 line-through": taskData.status === "FINISHED",
          })}
        >
          {taskData.title}
        </Text>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            onPress={handleToggleStatus}
            className="p-2"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather
              name={taskData.status === "PENDING" ? "check" : "rotate-ccw"}
              size={18}
              color={
                taskData.status === "PENDING"
                  ? colors.green[600]
                  : colors.yellow[600]
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDelete}
            className="p-2"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather name="trash-2" size={16} color={colors.red[600]} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}
