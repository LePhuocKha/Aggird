import {Editor as TiptapEditor} from '@tiptap/core'
import {ButtonProps} from './ButtonEditor'
import Button from '../../button/Button'
import {MdCloudDownload, MdCloudUpload} from 'react-icons/md'
import {useState} from 'react'
import Loading from '../../loading/Loading'

type Props = {
  editor: TiptapEditor
}

const AddLoadFile = ({editor}: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const is_active = 'bg-slate-100'

  const ButtonConfigAlign: ButtonProps[] = [
    {
      colorButton: 'white',
      children: <MdCloudDownload />,
      className: `px-[5px] py-[1px] font-black rounded-full`,
      onClick: () => editor.chain().focus().export({format: 'docx'}).run(),
    },
    {
      colorButton: 'white',
      children: <MdCloudUpload />,
      className: `px-[5px] py-[1px] font-black rounded-full ${editor.isActive({textAlign: 'center'}) ? is_active : ''}`,
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
    },
  ]

  return (
    <div className='gap-[12px] flex justify-center items-center border-r-[2px] pr-[12px]'>
      {ButtonConfigAlign.map((el, index) => (
        <Button
          key={index}
          onClick={el.onClick}
          colorButton={el.colorButton}
          className={el.className}
        >
          {isLoading ? <Loading /> : el.children}
        </Button>
      ))}
    </div>
  )
}

export default AddLoadFile
