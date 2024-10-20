import {EditorContent, useEditor} from '@tiptap/react'
import React, {useEffect, useState} from 'react'
import {TiptapCollabProvider} from '@hocuspocus/provider'
import * as Y from 'yjs'
import {v4 as uuid} from 'uuid'
import StarterKit from '@tiptap/starter-kit'
import {CollaborationCursor} from '@tiptap/extension-collaboration-cursor'
import {Collaboration} from '@tiptap/extension-collaboration'
import {ThreadsProvider} from './ThreadsProvider'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Bold from '@tiptap/extension-bold'
import Image from '@tiptap/extension-image'
import Heading from '@tiptap/extension-heading'
import ImageResize from 'tiptap-extension-resize-image'
import Paragraph from '@tiptap/extension-paragraph'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import FontFamily from '@tiptap/extension-font-family'
import Loading from '../loading/Loading'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import ButtonEditor from './button_editor/ButtonEditor'
import Button from '../button/Button'
import TextStyle from '@tiptap/extension-text-style'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Code from '@tiptap/extension-code'

import './styles.scss'
import {TextStyleExtended} from './FontSize'

type Props = {}
const doc = new Y.Doc()

const provider = new TiptapCollabProvider({
  appId: '7j9y6m10',
  name: `tiptap-comments-demo/${uuid()}`,
  document: doc,
})

const Edittor = (props: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Bold,
      Underline,
      Paragraph,
      TextStyleExtended,
      FontFamily.configure({
        types: ['textStyle'],
      }),
      Code,
      TextStyle,
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: 'https',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      BulletList,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      ListItem,
      // Collaboration.configure({
      //   document: doc,
      // }),
      // CollaborationCursor.configure({
      //   provider,
      //   user: {
      //     name: 'le phuoc kha ',
      //     color: '#FFA07A',
      //   },
      // }),
      Placeholder.configure({
        placeholder: 'Write a text to add comments …',
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal ml-3',
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc ml-3',
        },
      }),
      Highlight,
      Image,
      ImageResize,
    ],
    content: ` <p class="hoverable">
      → - Try to select <em>this text</em> to seecthe bubble menu.
    </p>
    <react-component count="0"></react-component>
    <react-component-2>
      This is editable
    </react-component-2>
    <ul data-type="taskList">
      <li data-type="taskItem" data-checked="true">A list item</li>
      <li data-type="taskItem" data-checked="false">And another one</li>
    </ul>`,
    onCreate: ({editor}) => {
      editor.chain().focus().setFontFamily('Inter').run()
    },
  })

  if (!editor) {
    return <Loading />
  }

  return (
    <div className='flex items-center flex-col py-[30px] gap-[30px] justify-center '>
      <div className='w-[1024px] sticky top-0 flex  border-[1px] bg-white rounded-lg shadow-md z-10 px-[10px] py-[10px]'>
        <ButtonEditor editor={editor} />
      </div>
      <div className='w-[1024px]'>
        <ThreadsProvider>
          <EditorContent editor={editor} />
        </ThreadsProvider>
      </div>
      <Button
        className=''
        onClick={() => {
          const jsonData = editor?.getJSON()
          const htmlData = editor?.getHTML()
          console.log('Editor JSON:', jsonData)
          console.log('Editor HTML:', htmlData)
        }}
      >
        submit
      </Button>
    </div>
  )
}

export default Edittor
