import React, {ForwardRefRenderFunction, forwardRef} from 'react'

import './style.scss'

type Props = React.InputHTMLAttributes<HTMLInputElement>

const InputCheckBox: ForwardRefRenderFunction<HTMLInputElement, Props> = ({...rest}, ref) => {
  return (
    <input
      type='checkbox'
      className='cursor-pointer border-[3px] border-red-700 input-check-box'
      ref={ref}
      {...rest}
    />
  )
}

export default forwardRef(InputCheckBox)
