import {Editor as TiptapEditor} from '@tiptap/core'
import {ButtonProps} from './ButtonEditor'
import Button from '../../button/Button'
import {AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight} from 'react-icons/ai'
import {FiAlignJustify} from 'react-icons/fi'

type Props = {
  editor: TiptapEditor
}

const AlignEditor = ({editor}: Props) => {
  const is_active = 'bg-slate-100'

  const ButtonConfigAlign: ButtonProps[] = [
    {
      colorButton: 'white',
      children: <AiOutlineAlignLeft />,
      className: `px-[5px] py-[1px] font-black rounded-full ${editor.isActive({textAlign: 'left'}) ? is_active : ''}`,
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
    },
    {
      colorButton: 'white',
      children: <AiOutlineAlignCenter />,
      className: `px-[5px] py-[1px] font-black rounded-full ${editor.isActive({textAlign: 'center'}) ? is_active : ''}`,
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
    },
    {
      colorButton: 'white',
      children: <FiAlignJustify />,
      className: `px-[5px] py-[1px] font-black rounded-full ${editor.isActive({textAlign: 'justify'}) ? is_active : ''}`,
      onClick: () => editor.chain().focus().setTextAlign('justify').run(),
    },
    {
      colorButton: 'white',
      children: <AiOutlineAlignRight />,
      className: `px-[5px] py-[1px] font-black rounded-full ${editor.isActive({textAlign: 'right'}) ? is_active : ''}`,
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
    },
  ]

  return (
    <div className=' gap-[12px] flex justify-center items-center border-r-[2px] pr-[12px]'>
      {ButtonConfigAlign.map((el, index) => {
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
    </div>
  )
}

export default AlignEditor
