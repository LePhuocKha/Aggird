import React, {forwardRef, ForwardRefRenderFunction, InputHTMLAttributes, ReactNode} from 'react'
import {IoIosSearch} from 'react-icons/io'

import './style.scss'

type Props = {
  insertLeft?: ReactNode
  typeInput?: string
  handleInsertLeft?: () => void
} & InputHTMLAttributes<HTMLInputElement>

const Input: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  {typeInput, handleInsertLeft, insertLeft, ...rest}: Props,
  ref
) => {
  const checkInsertLeft = ['search'].includes(typeInput || '')
  return (
    <div className='h-[100%] w-[100%] flex justify-center '>
      {checkInsertLeft ? (
        <button className='pl-2 button-check-insert-left' onClick={handleInsertLeft}>
          <IoIosSearch />
        </button>
      ) : (
        insertLeft && insertLeft
      )}
      <input
        className={`input-wrapper h-[100%] w-[100%] ${
          checkInsertLeft || insertLeft ? 'check-insert-left' : ''
        }`}
        ref={ref}
        {...rest}
      />
    </div>
  )
}

export default forwardRef(Input)
