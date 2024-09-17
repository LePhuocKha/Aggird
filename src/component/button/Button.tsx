import {ButtonHTMLAttributes, forwardRef, ForwardRefRenderFunction, ReactNode} from 'react'

type ColorButtonType = 'primary' | 'gray' | 'white'

type Props = {
  children?: ReactNode
  loading?: boolean
  textLoading?: string
  className?: string
  colorButton?: ColorButtonType
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: ForwardRefRenderFunction<HTMLButtonElement, Props> = ({
  loading,
  textLoading,
  children,
  className,
  colorButton = 'primary',
  ...rest
}: Props) => {
  const ojbectColorButton: Record<ColorButtonType, string> = {
    primary: 'text-white bg-sky-600 hover:bg-sky-700',
    white: 'hover:text-white hover:bg-slate-300',
    gray: 'text-gray-600 bg-slate-200 hover:bg-slate-300',
  }

  return (
    <button
      className={`font-medium px-[16px] py-[5px] rounded-sm text-[16px]  ${ojbectColorButton[colorButton]} ${className}`}
      {...rest}
    >
      {loading ? textLoading || 'Please wait...' : children}
    </button>
  )
}

export default forwardRef(Button)
