import React, {useRef} from 'react'
import {LiaParagraphSolid} from 'react-icons/lia'
import {LuHeading1, LuHeading2, LuHeading3, LuListTodo} from 'react-icons/lu'
import {MdFormatListBulleted, MdFormatListNumbered} from 'react-icons/md'
import Button from '../../button/Button'
import {TfiMenuAlt} from 'react-icons/tfi'
import {IoMdArrowDropdown} from 'react-icons/io'
import {Menu} from 'primereact/menu'
import {Editor as TiptapEditor} from '@tiptap/core'

type Props = {editor: TiptapEditor}

const Card = ({editor}: Props) => {
  const menuLeft = useRef<any>(null)

  const is_active = 'bg-slate-100'

  const items = [
    {
      items: [
        {
          icon: <LiaParagraphSolid />,
          label: 'Paragraph',
          command: () => {
            editor.chain().focus().setNode('paragraph').run()
          },
        },
        {
          icon: <LuHeading1 />,
          label: 'Heading 1',
          className: `${editor.isActive('heading', {level: 1}) ? is_active : ''}`,
          command: () => {
            editor.chain().focus().toggleHeading({level: 1}).run()
          },
        },
        {
          icon: <LuHeading2 />,
          label: 'Heading 2',
          className: `${editor.isActive('heading', {level: 2}) ? is_active : ''}`,
          command: () => {
            editor.chain().focus().toggleHeading({level: 2}).run()
          },
        },
        {
          icon: <LuHeading3 />,
          label: 'Heading 3',
          className: `${editor.isActive('heading', {level: 3}) ? is_active : ''}`,
          command: () => {
            editor.chain().focus().toggleHeading({level: 3}).run()
          },
        },
        {
          icon: <MdFormatListBulleted />,
          label: 'Bullet list',
          className: `${editor.isActive('bulletList') ? is_active : ''}`,
          command: () => {
            editor.chain().focus().toggleBulletList().run()
          },
        },
        {
          icon: <MdFormatListNumbered />,
          label: 'Numbered list',
          className: `${editor.isActive('orderedList') ? is_active : ''}`,
          command: () => {
            editor.chain().focus().toggleOrderedList().run()
          },
        },
        {
          icon: <LuListTodo />,
          label: 'Todo list',
          className: `${editor.isActive('taskList') ? is_active : ''}`,
          command: () => {
            editor.chain().focus().toggleTaskList().run()
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
        className='px-[5px] py-[3px] italic flex gap-[2px] rounded-full items-center'
      >
        <TfiMenuAlt /> <IoMdArrowDropdown className='text-[12px]' />
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

export default Card
