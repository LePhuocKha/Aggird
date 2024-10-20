import React, {useState} from 'react'
import {GoStrikethrough} from 'react-icons/go'
import {MdFormatUnderlined} from 'react-icons/md'
import Button, {ColorButtonType} from '../../button/Button'
import Card from './Card'
import {Editor as TiptapEditor} from '@tiptap/core'
import FontEdittor from './FontEdittor'
import FontSize from './FontSize'
import {IoCodeSharp} from 'react-icons/io5'
import {CiLink} from 'react-icons/ci'
import LinkEditor from './LinkEditor'

interface ButtonProps {
  onClick: () => void
  colorButton: ColorButtonType
  className: string
  children: React.ReactNode
}

type Props = {
  editor: TiptapEditor
}

const ButtonEditor = ({editor}: Props) => {
  const is_active = 'bg-slate-100'

  const [link, setLink] = useState<boolean>(false)
  const ButtonConfig: ButtonProps[] = [
    {
      colorButton: 'white',
      children: 'B',
      className: `px-[5px] py-[1px] font-black rounded-full ${editor.isActive('bold') ? is_active : ''}`,
      onClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      colorButton: 'white',
      children: 'I',
      className: `px-[5px] py-[1px] italic rounded-full ${editor.isActive('italic') ? is_active : ''}`,
      onClick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      colorButton: 'white',
      children: <MdFormatUnderlined />,
      className: `px-[5px] py-[1px] italic rounded-full ${editor.isActive('underline') ? is_active : ''}`,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
    },

    {
      colorButton: 'white',
      children: <GoStrikethrough />,
      className: `px-[5px] py-[1px] italic rounded-full ${editor.isActive('strike') ? is_active : ''}`,
      onClick: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      colorButton: 'white',
      children: <IoCodeSharp />,
      className: `px-[5px] py-[1px] italic rounded-full ${editor.isActive('code') ? is_active : ''}`,
      onClick: () => editor.chain().focus().toggleCode().run(),
    },
    {
      colorButton: 'white',
      children: <CiLink />,
      className: `px-[5px] py-[1px] italic rounded-full ${editor.isActive('link') ? is_active : ''}`,
      onClick: () => setLink(true),
    },
  ]

  return (
    <div className=' gap-[12px] flex justify-center items-center'>
      <Card editor={editor} />
      <FontEdittor editor={editor} />
      <FontSize editor={editor} />
      {ButtonConfig.map((el, index) => {
        return (
          <Button
            key={index}
            onClick={el?.onClick}
            colorButton={el?.colorButton}
            className={el?.className}
          >
            {el?.children}
          </Button>
        )
      })}
      <LinkEditor editor={editor} setVisible={setLink} visible={link} />
    </div>
  )
}

export default ButtonEditor
