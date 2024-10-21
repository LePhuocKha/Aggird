import {useRef} from 'react'
import {Editor as TiptapEditor} from '@tiptap/core'
import {IoMdColorFill} from 'react-icons/io'
import Button from '../../button/Button'

type Props = {editor: TiptapEditor}

const BackgroundEditor = ({editor}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <div className='relative inline-block border-r-[2px] pr-[12px]'>
      <Button
        onClick={handleIconClick}
        colorButton={'white'}
        className={`px-[5px] py-[1px] italic rounded-full`}
      >
        <IoMdColorFill />
      </Button>
      <input
        ref={inputRef}
        type='color'
        onInput={(event) => {
          const target = event.target as HTMLInputElement
          editor.commands.setBackgroundColor(target.value)
        }}
        value={'#000000'}
        data-testid='setBackgroundColor'
        className='absolute top-full left-0  h-[10px] opacity-0'
        style={{visibility: 'hidden', position: 'absolute'}}
        onClick={(e) => (e.currentTarget.style.visibility = 'visible')}
        onBlur={(e) => (e.currentTarget.style.visibility = 'hidden')}
      />
    </div>
  )
}

export default BackgroundEditor
