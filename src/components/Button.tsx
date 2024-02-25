import {ComponentProps} from 'react'
import { cva, VariantProps} from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'


export const buttonStyles = cva(["transition-colors"],{
  variants:{
    variant:{
      default: ["bg-secondary", "hover:bg-secondary-hover"],
      ghost:["hover:bg-gray-200"],
      dark:["bg-secondary-dark", "hover:bg-secondary-dark-hover", "text-secondary"]
    },
    size:{
      default:["p-2", "rounded"],
      icon:["rounded-full","p-2.5", "w-10", "h-10", "flex", "justify-center", "items-center"]
    }
  },
  defaultVariants:{
    variant:"default",
    size: "default"
  }
})

type ButtonProps= VariantProps<typeof buttonStyles> & ComponentProps<"button">

function Button({variant, size, className, ...props}: ButtonProps) {
  return (
    <button{...props} className={twMerge (buttonStyles({variant, size}), className)}/>
  )
}

export default Button