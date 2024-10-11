import {useState} from 'react'
import {EditorContent, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import './styles.scss'
import ReactComponent from './Test'
import ReactComponent2 from './Text2'

type Props = {}

const TipTap = (props: Props) => {
  const editor = useEditor({
    extensions: [StarterKit, ReactComponent, ReactComponent2],
    content: `
      <p class="hoverable">
        Try to select <em>this text</em> to see what we call the bubble menu.
      </p>
       <react-component count="0"></react-component>
    <react-component-2>
    This is editable
    </react-component-2>
    `,
  })

  const [menuVisible, setMenuVisible] = useState<number | null>(null)

  const toggleMenu = (index: number) => {
    setMenuVisible(menuVisible === index ? null : index)
  }

  return (
    <div className='p-[70px] '>
      <EditorContent className='border-none outline-none' editor={editor} />
      <div
        style={{
          position: 'absolute',
          right: '10px',
          top: '40px',
          background: 'white',
          border: '1px solid black',
          padding: '10px',
        }}
      >
        <p>This is a menu!</p>
        <button
          onClick={() => {
            const jsonData = editor?.getJSON() // Get editor content in JSON format
            const htmlData = editor?.getHTML() // Get editor content in HTML format
            console.log('Editor JSON:', jsonData)
            console.log('Editor HTML:', htmlData)
          }}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default TipTap
