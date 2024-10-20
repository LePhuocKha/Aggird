import React, {useRef} from 'react'
import Button from '../../button/Button'
import {Menu} from 'primereact/menu'
import {Editor as TiptapEditor} from '@tiptap/core'
import {RiFontSize} from 'react-icons/ri'

type Props = {editor: TiptapEditor}

const FontSize = ({editor}: Props) => {
  const menuLeft = useRef<any>(null)

  const is_active = 'bg-slate-100'

  const items = [
    {
      items: [
        {
          label: 'Smaller',
          command: () => {
            editor.commands.setFontSize('12')
          },
        },
        {
          label: 'Small',
          command: () => {
            editor.commands.setFontSize('14')
          },
        },
        {
          label: 'Medium',
          command: () => {
            editor.commands.setFontSize('16')
          },
        },
        {
          label: 'Large',
          command: () => {
            editor.commands.setFontSize('118')
          },
        },
        {
          label: 'Extra Large',
          command: () => {
            editor.commands.setFontSize('118')
          },
        },
      ],
    },
  ]

  const handleClick = (event: React.MouseEvent) => {
    menuLeft?.current.toggle(event)
  }
  return (
    <div className=' border-r-[2px] pr-[12px]'>
      <Button
        onClick={handleClick}
        colorButton='white'
        className='px-[5px] py-[3px] flex gap-[2px] rounded-full items-center max-w-[70px] truncate'
      >
        <RiFontSize />
      </Button>
      <Menu
        model={items}
        className='bg-white   p-[10px] min-w-[150px] gap-[10px] shadow-md flex flex-col'
        popup
        ref={menuLeft}
        id='popup_menu_left'
        aria-hidden='true'
      />
    </div>
  )
}

export default FontSize
