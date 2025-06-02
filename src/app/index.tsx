import { useEffect, useState } from "react"
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native"

import {
  storageTaskGet,
  storageTaskRemoveFinished,
  storageTaskSave,
} from "@/storage/storageTask"
import { Feather } from "@expo/vector-icons"
import Toast from "react-native-toast-message"
import colors from "tailwindcss/colors"

import { Button } from "@/components/Button"
import { CardTask } from "@/components/CardTask"
import { Header } from "@/components/Header"
import { ModalNewTask } from "@/components/Modal/NewTask"
import { StatusButton } from "@/components/StatusButton"
import type { TaskProps } from "@/dtos/TaskDTO"

enum MODALNewTask {
  NONE = 0,
  TASK = 1,
}

export default function Tasks() {
  const [showModalNewTask, setShowModalNewTask] = useState<MODALNewTask>(
    MODALNewTask.NONE
  )
  const [tasks, setTasks] = useState<TaskProps[]>([])

  const [filteredTasks, setFilteredTasks] = useState<TaskProps[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadTasks()
  }, [])

  function handleStatusFilter(status: string) {
    if (selectedStatus === status) {
      setSelectedStatus(null)
      setFilteredTasks(tasks.filter((task) => task.status !== ""))
    } else {
      setSelectedStatus(status)
      setFilteredTasks(tasks.filter((task) => task.status === status))
    }
  }

  async function loadTasks() {
    try {
      setIsLoading(true)
      const storedTasks = await storageTaskGet()
      setTasks(storedTasks)
    } catch (error) {
      console.log("Erro ao carregar tarefas.", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function saveTasks(newTasks: TaskProps[]) {
    try {
      await storageTaskSave(newTasks)
      setTasks(newTasks)
    } catch (error) {
      console.error("Error ao salvar tarefas", error)
    }
  }

  function createNewTask() {
    setShowModalNewTask(MODALNewTask.TASK)
  }

  async function handleSaveNewTask(newTask: TaskProps) {
    try {
      const updatedTasks = [...tasks, newTask]
      await saveTasks(updatedTasks)
    } catch (error) {
      console.error("Erro ao salvar nova tarefa", error)
    }
  }

  async function handleUpdateTask(updatedTask: TaskProps) {
    try {
      const updatedTasks = tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
      await saveTasks(updatedTasks)
    } catch (error) {
      console.error("Erro ao atualizar tarefa", error)
    }
  }

  async function handleDeleteTask(taskId: string) {
    try {
      const updatedTasks = tasks.filter((task) => task.id !== taskId)
      await saveTasks(updatedTasks)
    } catch (error) {
      console.error("Erro ao deletar tarefa", error)
    }
  }

  async function handleClearAllFinishedTasks() {
    try {
      Alert.alert(
        "Excluir tarefa",
        `Tem certeza que deseja excluir todas tarefas concluídas?`,
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Sim",
            style: "destructive",
            onPress: async () => {
              await storageTaskRemoveFinished()
              await loadTasks()
              setSelectedStatus(null)
              Toast.show({
                type: "success",
                text1: "Tarefas concluídas removidas!",
                position: "bottom",
                bottomOffset: 120,
              })
            },
          },
        ]
      )
    } catch (error) {
      console.error("Erro ao limpar todas as tarefas", error)
    }
  }

  const tasksToShow = selectedStatus ? filteredTasks : tasks

  return (
    <View className="flex flex-1 bg-slate-200 relative">
      <Header title="Agenda" />
      <View className="px-8 pt-4 gap-4 ">
        <View className="flex-row items-center justify-between">
          <Text className="font-mb text-slate-800">Minhas tarefas</Text>
          <View className="flex-row gap-2">
            <StatusButton
              status="PENDING"
              label="PENDENTE"
              color="bg-yellow-500"
              selectedStatus={selectedStatus}
              onPress={handleStatusFilter}
            />
            <StatusButton
              status="FINISHED"
              label="CONCLUÍDO"
              color="bg-green-500"
              selectedStatus={selectedStatus}
              onPress={handleStatusFilter}
            />
            <TouchableOpacity onPress={handleClearAllFinishedTasks}>
              <Feather name="trash-2" size={20} color={colors.red[600]} />
            </TouchableOpacity>
          </View>
        </View>

        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-slate-600"> Carregando tarefas...</Text>
          </View>
        ) : (
          <FlatList
            data={tasksToShow}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CardTask
                taskData={item}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 320 }}
            ListEmptyComponent={() => (
              <View className="flex-1 justify-center items-center py-20">
                <Text className="text-slate-500 text-center">
                  {selectedStatus
                    ? `Nenhuma tarefa ${
                        selectedStatus === "PENDING" ? "pendente" : "concluída"
                      } encontrada`
                    : 'Nenhuma tarefa encontrada\nToque em "Nova tarefa" para começar'}
                </Text>
              </View>
            )}
          />
        )}
      </View>
      <View className="absolute z-10  bottom-0 w-full max-h-32 px-8 bg-slate-200/80">
        <Button
          className="mt-8 mb-10"
          onPress={createNewTask}
          variant="primary"
        >
          <Button.Title>Nova tarefa</Button.Title>
        </Button>
      </View>
      <ModalNewTask
        tasks={tasks}
        modal={showModalNewTask}
        setShowModal={setShowModalNewTask}
        onSaveTask={handleSaveNewTask}
      />
    </View>
  )
}
