import React from 'react'
import {MenuItem} from './HoverTippyHeader'

type Props = {
  children?: React.ReactElement
  visible?: boolean
  menuHeader: MenuItem[]
  onclick: () => void
}

const Menu = ({menuHeader, onclick, children}: Props) => {
  return (
    <div className='bg-white absolute right-0 p-[10px] shadow-lg rounded-md'>
      {menuHeader.map((el, index) => {
        return (
          <div
            className='flex items-center cursor-pointer min-w-[250px] hover:bg-slate-200 p-[10px] rounded-md gap-[10px] '
            onClick={() => {
              el?.onclick()
              onclick()
            }}
            key={index}
          >
            {el?.icons}
            <p>{el?.label}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Menu
