import {Editor as TiptapEditor} from '@tiptap/core'
import {IoColorWand} from 'react-icons/io5'
import {useRef} from 'react'

type Props = {editor: TiptapEditor}

const ColorEditor = ({editor}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <div className='relative inline-block'>
      <IoColorWand
        onClick={handleIconClick}
        className='hover:bg-slate-100 cursor-pointer px-[5px] py-[1px] text-[25px]'
        style={{color: editor.getAttributes('textStyle').color || '#000000'}}
      />
      <input
        ref={inputRef}
        type='color'
        onInput={(event) => {
          const target = event.target as HTMLInputElement
          editor.chain().focus().setColor(target.value).run()
        }}
        value={editor.getAttributes('textStyle').color || '#000000'}
        data-testid='setColor'
        className='absolute top-full left-0  h-[10px] opacity-0'
        style={{visibility: 'hidden', position: 'absolute'}}
        onClick={(e) => (e.currentTarget.style.visibility = 'visible')}
        onBlur={(e) => (e.currentTarget.style.visibility = 'hidden')}
      />
    </div>
  )
}

export default ColorEditor
