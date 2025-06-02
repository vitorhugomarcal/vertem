import AsyncStorage from "@react-native-async-storage/async-storage"

import { TaskProps } from "@/dtos/TaskDTO"
import { TASK_STORAGE } from "./storageConfig"

export async function storageTaskSave(task: TaskProps[]) {
  await AsyncStorage.setItem(TASK_STORAGE, JSON.stringify(task))
}

export async function storageTaskGet(): Promise<TaskProps[]> {
  const storage = await AsyncStorage.getItem(TASK_STORAGE)
  const tasks: TaskProps[] = storage ? JSON.parse(storage) : []

  return tasks
}

export async function storageTaskAdd(newTask: TaskProps) {
  const existingTasks = await storageTaskGet()
  const updatedTasks = [...existingTasks, newTask]
  await storageTaskSave(updatedTasks)
}

export async function storageTaskRemove() {
  await AsyncStorage.removeItem(TASK_STORAGE)
}

export async function storageTaskRemoveById(taskId: string) {
  const existingTasks = await storageTaskGet()
  const filteredTasks = existingTasks.filter((task) => task.id !== taskId)
  await storageTaskSave(filteredTasks)
}

export async function storageTaskRemoveFinished() {
  const existingTasks = await storageTaskGet()
  const pendingTasks = existingTasks.filter(
    (task) => task.status !== "FINISHED"
  )
  await storageTaskSave(pendingTasks)
}
