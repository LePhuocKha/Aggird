import {Editor as TiptapEditor} from '@tiptap/core'
import Button from '../../../button/Button'
import {IoMdImages} from 'react-icons/io'
import {useState} from 'react'
import ModelImage from './ModelImage'

type Props = {
  editor: TiptapEditor
}
const ImageEditor = ({editor}: Props) => {
  const [openImage, setOpenImage] = useState(false)
  return (
    <div>
      <Button
        onClick={() => {
          setOpenImage(true)
        }}
        colorButton={'white'}
        className={`px-[5px] py-[1px] font-black rounded-full `}
      >
        <IoMdImages />
      </Button>
      <ModelImage editor={editor} visible={openImage} setVisible={setOpenImage} />
    </div>
  )
}

export default ImageEditor
