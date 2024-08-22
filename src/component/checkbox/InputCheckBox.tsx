import React, {ForwardRefRenderFunction, forwardRef} from 'react'

import './style.scss'

type Props = React.InputHTMLAttributes<HTMLInputElement>

const InputCheckBox: ForwardRefRenderFunction<HTMLInputElement, Props> = ({...rest}, ref) => {
  return <input type='checkbox' className='cursor-pointer input-check-box' ref={ref} {...rest} />
}

export default forwardRef(InputCheckBox)
