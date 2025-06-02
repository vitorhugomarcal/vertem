import { useState } from "react"
import { View } from "react-native"

import { Controller, useForm } from "react-hook-form"
import Toast from "react-native-toast-message"

import { TaskProps } from "@/dtos/TaskDTO"
import { Button } from "../Button"
import { Input } from "../Input"
import { Modal } from "../Modal"

enum MODALNewTask {
  NONE = 0,
  TASK = 1,
}

type Props = {
  tasks: TaskProps[]
  modal: MODALNewTask
  setShowModal: React.Dispatch<React.SetStateAction<MODALNewTask>>
  onSaveTask: (newTask: TaskProps) => Promise<void>
}

type FormData = {
  title: string
}

export function ModalNewTask({
  tasks,
  modal,
  setShowModal,
  onSaveTask,
}: Props) {
  const [buttonLoading, setButtonLoading] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
    },
    mode: "onChange",
  })

  async function handleSaveNewTask(data: FormData) {
    try {
      setButtonLoading(true)
      const taskExists = tasks.some(
        (task) =>
          task.title.toLowerCase().trim() === data.title.toLowerCase().trim()
      )

      if (taskExists) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Tarefa já existe",
          text2: "Uma tarefa com esse título já foi criada.",
          bottomOffset: 120,
        })

        return
      }

      const newTask: TaskProps = {
        id: Date.now().toString(),
        title: data.title.trim(),
        status: "PENDING",
      }

      await onSaveTask(newTask)

      reset()
      setShowModal(MODALNewTask.NONE)

      Toast.show({
        type: "success",
        position: "bottom",
        text1: `Agendamento criado com sucesso!`,
        bottomOffset: 120,
      })
    } catch (error) {
      console.log(error)
      Toast.show({
        type: "error",
        position: "bottom",
        text1: `Erro ao criar agendamento`,
        text2: "Por favor, tente novamente.",
        bottomOffset: 120,
      })
    } finally {
      setButtonLoading(false)
    }
  }

  return (
    <View>
      <Modal
        title="Nova tarefa"
        progresso={100}
        visible={modal === MODALNewTask.TASK}
        onClose={() => setShowModal(MODALNewTask.NONE)}
      >
        <View className="lg:px-64">
          <View className="w-full mb-4">
            <Input variant="secondary" className="mb-4">
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input.Field
                    value={value}
                    onBlur={onBlur}
                    placeholder="Qual tarefa será realizada?"
                    onChangeText={onChange}
                    returnKeyType="done"
                  />
                )}
                name="title"
              />
            </Input>
          </View>
          <Button
            className="mb-4"
            onPress={handleSubmit(handleSaveNewTask)}
            isLoading={buttonLoading}
            disabled={!isValid || buttonLoading}
          >
            <Button.Title>Adicionar tarefa</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}
