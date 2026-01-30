import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-brand-blue text-white shadow-lg shadow-brand-blue/25 hover:bg-brand-blue-dark hover:shadow-xl hover:-translate-y-0.5",
        secondary:
          "bg-brand-orange text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark hover:shadow-xl hover:-translate-y-0.5",
        outline:
          "border-2 border-brand-blue/20 bg-white text-brand-blue hover:bg-brand-blue-light hover:border-brand-blue/30",
        ghost:
          "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
        link:
          "text-brand-blue underline-offset-4 hover:underline",
        destructive:
          "bg-red-500 text-white hover:bg-red-600",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
