import { createContext, useContext } from "react"
import {
  ActivityIndicator,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native"

import clsx from "clsx"

type Variants = "primary"

type ButtonProps = TouchableOpacityProps & {
  variant?: Variants
  isLoading?: boolean
}

const ThemeContext = createContext<{ variant?: Variants }>({})

function Button({
  variant = "primary",
  children,
  isLoading,
  className,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={clsx(
        "h-14 flex-row items-center justify-center rounded-lg gap-2 px-2",
        {
          "bg-slate-500": variant === "primary",
        },
        className
      )}
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
      <ThemeContext.Provider value={{ variant }}>
        {isLoading ? (
          <ActivityIndicator className="text-slate-950" />
        ) : (
          children
        )}
      </ThemeContext.Provider>
    </TouchableOpacity>
  )
}

function Title({ children }: TextProps) {
  const { variant } = useContext(ThemeContext)

  return (
    <Text
      className={clsx("text-sm font-msb text-center", {
        "text-slate-100": variant === "primary",
      })}
    >
      {children}
    </Text>
  )
}

Button.Title = Title

export { Button }
