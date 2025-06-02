import { forwardRef, ReactNode } from "react"
import {
  Platform,
  TextInput,
  TextInputProps,
  useColorScheme,
  View,
  ViewProps,
} from "react-native"

import clsx from "clsx"
import colors from "tailwindcss/colors"

type Variants = "primary"

type InputProps = ViewProps & {
  children: ReactNode
  variant?: Variants
}

function Input({
  children,
  variant = "primary",
  className,
  ...rest
}: InputProps) {
  return (
    <View
      className={clsx(
        "min-h-14 max-h-14 flex-row gap-2",
        {
          "px-4 rounded-lg border border-slate-300 dark:border-slate-800":
            variant !== "primary",
        },
        className
      )}
      {...rest}
    >
      {children}
    </View>
  )
}

const Field = forwardRef<TextInput, TextInputProps>(({ ...rest }, ref) => {
  const colorScheme = useColorScheme()

  return (
    <TextInput
      ref={ref}
      className="flex-1 w-full text-zinc-800 dark:text-zinc-100 items-center font-mm"
      placeholderTextColor={
        colorScheme === "dark" ? colors.zinc[400] : colors.zinc[600]
      }
      cursorColor={colorScheme === "dark" ? colors.zinc[100] : colors.zinc[700]}
      selectionColor={
        Platform.OS === "ios" && colorScheme === "dark"
          ? colors.zinc[100]
          : colors.zinc[700]
      }
      {...rest}
    />
  )
})

export { Field }

Input.Field = Field

export { Input }
