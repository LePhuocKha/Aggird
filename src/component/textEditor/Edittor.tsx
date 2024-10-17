import {EditorContent, useEditor} from '@tiptap/react'
import React from 'react'
import {TiptapCollabProvider} from '@hocuspocus/provider'
import * as Y from 'yjs'
import {v4 as uuid} from 'uuid'
import StarterKit from '@tiptap/starter-kit'
import {CollaborationCursor} from '@tiptap/extension-collaboration-cursor'
import {Collaboration} from '@tiptap/extension-collaboration'
import {ThreadsProvider} from './ThreadsProvider'

import './styles.scss'

type Props = {}

const doc = new Y.Doc()

const provider = new TiptapCollabProvider({
  appId: '7j9y6m10',
  name: `tiptap-comments-demo/${uuid()}`,
  document: doc,
})

const Edittor = (props: Props) => {
  console.log(doc)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Collaboration.configure({
        document: doc,
      }),
      CollaborationCursor.configure({
        provider,
        user: {
          name: 'le phuoc kha ',
          color: '#FFA07A',
        },
      }),
    ],
  })

  return (
    <ThreadsProvider>
      <EditorContent editor={editor} />
    </ThreadsProvider>
  )
}

export default Edittor
