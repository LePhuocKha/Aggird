import {Editor as TiptapEditor} from '@tiptap/core'
import Button from '../../button/Button'
import {ButtonProps} from './ButtonEditor'
import {BsSubscript, BsSuperscript} from 'react-icons/bs'

type Props = {editor: TiptapEditor}

const ScriptEditor = ({editor}: Props) => {
  const is_active = 'bg-slate-100'

  const ButtonConfigScript: ButtonProps[] = [
    {
      colorButton: 'white',
      children: <BsSubscript />,
      className: `px-[5px] py-[1px] font-black rounded-full ${editor.isActive('subscript') ? is_active : ''}`,
      onClick: () => editor.chain().focus().toggleSubscript().run(),
    },
    {
      colorButton: 'white',
      children: <BsSuperscript />,
      className: `px-[5px] py-[1px] font-black rounded-full ${editor.isActive('superscript') ? is_active : ''}`,
      onClick: () => editor.chain().focus().toggleSuperscript().run(),
    },
  ]
  return (
    <div className=' gap-[12px] flex justify-center items-center border-r-[2px] pr-[12px]'>
      {ButtonConfigScript.map((el, index) => {
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

export default ScriptEditor
