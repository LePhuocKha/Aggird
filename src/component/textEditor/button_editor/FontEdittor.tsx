import React, {useEffect, useRef, useState} from 'react'
import {LiaParagraphSolid} from 'react-icons/lia'
import {LuHeading1, LuHeading2, LuHeading3, LuListTodo} from 'react-icons/lu'
import {MdFormatListBulleted, MdFormatListNumbered} from 'react-icons/md'
import Button from '../../button/Button'
import {TfiMenuAlt} from 'react-icons/tfi'
import {IoMdArrowDropdown} from 'react-icons/io'
import {Menu} from 'primereact/menu'
import {Editor as TiptapEditor} from '@tiptap/core'
import {FaFont} from 'react-icons/fa'

type Props = {editor: TiptapEditor}

const FontEdittor = ({editor}: Props) => {
  const menuLeft = useRef<any>(null)
  const [title, setTitle] = useState('Inter')
  const is_active = 'bg-slate-100'

  const items = [
    {
      items: [
        {
          className: `${editor.isActive('textStyle', {fontFamily: 'Inter'}) ? is_active : ''}`,
          label: 'Inter',
          command: () => {
            setTitle('Inter')
            editor.chain().focus().setFontFamily('Inter').run()
          },
        },
        {
          label: 'Comic Sans',
          className: `${editor.isActive('textStyle', {fontFamily: 'Comic Sans MS, Comic Sans'}) ? is_active : ''}`,
          command: () => {
            setTitle('Comic Sans')
            editor.chain().focus().setFontFamily('Comic Sans MS, Comic Sans').run()
          },
        },
        {
          label: 'Serif',
          className: `${editor.isActive('textStyle', {fontFamily: 'monospace'}) ? is_active : ''}`,
          command: () => {
            setTitle('Serif')
            editor.chain().focus().setFontFamily('monospace').run()
          },
        },
        {
          label: 'Monospace',
          className: `${editor.isActive('heading', {level: 3}) ? is_active : ''}`,
          command: () => {
            setTitle('Monospace')
            editor.chain().focus().toggleHeading({level: 3}).run()
          },
        },
        {
          label: 'Cursive',
          className: `${editor.isActive('textStyle', {fontFamily: 'cursive'}) ? is_active : ''}`,
          command: () => {
            setTitle('Cursive')
            editor.chain().focus().setFontFamily('cursive').run()
          },
        },
        {
          label: 'CSS variable',
          className: `${editor.isActive('textStyle', {fontFamily: 'var(--title-font-family)'}) ? is_active : ''}`,
          command: () => {
            setTitle('CSS variable')
            editor.chain().focus().setFontFamily('var(--title-font-family)').run()
          },
        },
        {
          label: 'Comic Sans quoted',
          className: `${editor.isActive('textStyle', {fontFamily: '"Comic Sans"'}) ? is_active : ''}`,
          command: () => {
            setTitle('Comic Sans quoted')
            editor.chain().focus().setFontFamily('"Comic Sans MS", "Comic Sans"').run()
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
        <FaFont />
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

export default FontEdittor
