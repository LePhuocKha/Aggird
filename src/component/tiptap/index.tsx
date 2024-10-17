import {useState, useCallback} from 'react'
import {EditorContent, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {BubbleMenu} from '@tiptap/react'
import './styles.scss'
import ReactComponent from './Test'
import ReactComponent2 from './Text2'
import TaskItem from '@tiptap/extension-task-item'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Heading from '@tiptap/extension-heading'
import TaskList from '@tiptap/extension-task-list'
import Loading from '../loading/Loading'
import {TiptapCollabProvider} from '@hocuspocus/provider'
import {Collaboration} from '@tiptap/extension-collaboration'
import {CollaborationCursor} from '@tiptap/extension-collaboration-cursor'
import Image from '@tiptap/extension-image'
import {Comments, CommentsKit} from '@tiptap-pro/extension-comments'
import {v4 as uuid} from 'uuid'
import * as Y from 'yjs'
import {ThreadsProvider} from './comment/context'
import {useUser} from './hooks/useUser'
import {useThreads} from './hooks/useThreads'
import {Thread} from './comment/ThreadsListItem'
import Placeholder from '@tiptap/extension-placeholder'

type Props = {}

const doc = new Y.Doc()

const provider = new TiptapCollabProvider({
  appId: '7j9y6m10',
  name: `tiptap-comments-demo/${uuid()}`,
  document: doc,
})

const TipTap = (props: Props) => {
  const [showUnresolved, setShowUnresolved] = useState(true)
  const user = useUser()
  const editor = useEditor({
    content: `
    <p class="hoverable">
      → - Try to select <em>this text</em> to see what we call the bubble menu.
    </p>
    <react-component count="0"></react-component>
    <react-component-2>
      This is editable
    </react-component-2>
    <ul data-type="taskList">
      <li data-type="taskItem" data-checked="true">A list item</li>
      <li data-type="taskItem" data-checked="false">And another one</li>
    </ul>
  `,
    extensions: [
      StarterKit,
      ReactComponent,
      ReactComponent2,
      Bold,
      Italic,
      TaskList,
      Image,
      TaskItem.configure({
        nested: true,
        onReadOnlyChecked: (node, checked) => {
          console.log(node)
          return true
        },
        HTMLAttributes: {
          class: 'my-custom-class',
        },
      }),
      Comments.configure({}),
      // Collaboration.configure({
      //   document: doc,
      // }),

      // CollaborationCursor.configure({
      //   provider,
      //   user: {
      //     name: user.name,
      //     color: user.color,
      //   },
      // }),
      Placeholder.configure({
        placeholder: 'Write a text to add comments …',
      }),
      CommentsKit.configure({provider}),
      Heading.configure({levels: [1, 2, 3]}),
    ],
  })

  const [menuVisible, setMenuVisible] = useState<number | null>(null)
  const {threads = [], createThread} = useThreads(provider, editor, user)

  // Move useCallback hooks to the top level
  const selectThreadInEditor = useCallback(
    (threadId: string) => {
      editor?.chain().selectThread({id: threadId}).run()
    },
    [editor]
  )

  const deleteThread = useCallback(
    (threadId: string) => {
      if (editor) {
        provider.deleteThread(threadId)
        editor.commands.removeThread({id: threadId})
      }
    },
    [editor]
  )

  const resolveThread = useCallback(
    (threadId: string) => {
      editor?.commands.resolveThread({id: threadId})
    },
    [editor]
  )

  const unresolveThread = useCallback(
    (threadId: string) => {
      editor?.commands.unresolveThread({id: threadId})
    },
    [editor]
  )

  const updateComment = useCallback(
    (threadId: string, commentId: string, content: string, metaData: any) => {
      editor?.commands.updateComment({
        threadId: threadId,
        id: commentId,
        content: content,
        data: metaData,
      })
    },
    [editor]
  )

  const onHoverThread = useCallback(
    (threadId: string) => {
      if (editor) {
        const {tr} = editor.state
        tr.setMeta('threadMouseOver', threadId)
        editor.view.dispatch(tr)
      }
    },
    [editor]
  )

  const onLeaveThread = useCallback(
    (threadId: string) => {
      if (editor) {
        const {tr} = editor.state
        tr.setMeta('threadMouseOut', threadId)
        editor.view.dispatch(tr)
      }
    },
    [editor]
  )

  // Avoid conditional hooks: declare them outside the filtering logic
  const filteredThreads = threads.filter((t: Thread) =>
    showUnresolved ? !t.resolvedAt : !!t.resolvedAt
  )
  // console.log(threads, 'threads')

  if (!editor) {
    return <Loading />
  }

  return (
    <div className='p-[70px] '>
      <ThreadsProvider
        onClickThread={selectThreadInEditor}
        onDeleteThread={deleteThread}
        onHoverThread={onHoverThread}
        onLeaveThread={onLeaveThread}
        onResolveThread={resolveThread}
        onUpdateComment={updateComment}
        onUnresolveThread={unresolveThread}
        selectedThreads={editor.storage.comments.focusedThreads}
        threads={threads}
      >
        <div className='col-group'>
          <div className='main'>
            <div className='control-group'>
              <div className='button-group'>
                <button onClick={createThread} disabled={editor.state.selection.empty}>
                  Add comment
                </button>
                <button
                  onClick={() =>
                    editor?.chain().focus().setImage({src: 'https://placehold.co/800x500'}).run()
                  }
                >
                  Add image
                </button>
              </div>
            </div>
            <EditorContent editor={editor} />
          </div>
          <div className='sidebar'>
            <div className='sidebar-options'>
              <div className='option-group'>
                <div className='label-large'>Comments</div>
                <div className='switch-group'>
                  <label>
                    <input
                      type='radio'
                      name='thread-state'
                      onChange={() => setShowUnresolved(true)}
                      checked={showUnresolved}
                    />
                    Open
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='thread-state'
                      onChange={() => setShowUnresolved(false)}
                      checked={!showUnresolved}
                    />
                    Resolved
                  </label>
                </div>
              </div>
              {/* Uncomment and add missing props */}
              {/* {filteredThreads.map((thread: Thread) => (
                <ThreadsListItem 
                  key={thread.id} 
                  provider={provider} 
                  thread={thread} 
                  active={false} // Set appropriate value
                  open={false}   // Set appropriate value
                />
              ))} */}
            </div>
          </div>
        </div>
      </ThreadsProvider>
      {editor && (
        <BubbleMenu className='bubble-menu' tippyOptions={{duration: 100}} editor={editor}>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            Strike
          </button>
        </BubbleMenu>
      )}

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
