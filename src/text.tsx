import React, {useState, useRef} from 'react'
import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {Mark, mergeAttributes} from '@tiptap/core'

const Highlight = Mark.create({
  name: 'highlight',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-highlight]',
      },
    ]
  },

  renderHTML({HTMLAttributes}) {
    return ['span', mergeAttributes(HTMLAttributes, {'data-highlight': ''}), 0]
  },

  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-color'),
        renderHTML: (attributes) => {
          if (!attributes.color) {
            return {}
          }
          return {
            'data-color': attributes.color,
            style: `background-color: ${attributes.color}; color: white`,
          }
        },
      },
    }
  },
})

interface Comment {
  text: string
  from: number
  to: number
}

const CommentEditor: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([])
  const [selectedCommentIndex, setSelectedCommentIndex] = useState<number | null>(null)
  const editor = useEditor({
    extensions: [StarterKit, Highlight],
    content: `
      <p>Le Phuoc Kha</p>
      <p>This is another line of text</p>
    `,
  })

  const commentInputRef = useRef<HTMLTextAreaElement | null>(null)

  const addComment = (text: string) => {
    if (editor) {
      const {from, to} = editor.state.selection

      if (from !== to) {
        const comment: Comment = {text, from, to}
        setComments([...comments, comment])

        editor.chain().focus().setMark('highlight', {color: 'red'}).run()

        if (commentInputRef.current) {
          commentInputRef.current.value = ''
          commentInputRef.current.focus()
        }
      }
    }
  }

  const clearPreviousHighlight = () => {
    if (editor) {
      editor.chain().focus().setMark('highlight', {color: null}).run()
    }
  }

  const handleCommentClick = (index: number) => {
    if (selectedCommentIndex !== index) {
      clearPreviousHighlight()
      setSelectedCommentIndex(index)
      const comment = comments[index]

      if (editor) {
        editor
          .chain()
          .focus()
          .setTextSelection({from: comment.from, to: comment.to}) // This sets the selection
          .setMark('highlight', {color: 'red'})
          .run()

        // Remove focus from editor to avoid bold selection
        editor.commands.blur()
      }
    } else {
      setSelectedCommentIndex(null)
      clearPreviousHighlight()
    }
  }

  return (
    <div>
      <h3>Editor with Comments</h3>
      <EditorContent editor={editor} />

      <div>
        <h4>Add a Comment</h4>
        <textarea ref={commentInputRef} placeholder='Enter comment here'></textarea>
        <button onClick={() => addComment((commentInputRef.current as HTMLTextAreaElement).value)}>
          Add Comment
        </button>
      </div>

      <div>
        <h4>Comments</h4>
        {comments.map((comment, index) => (
          <div
            key={index}
            onClick={() => handleCommentClick(index)}
            style={{
              backgroundColor: selectedCommentIndex === index ? 'red' : '#fffbcc',
              color: selectedCommentIndex === index ? 'white' : 'black',
              marginTop: '10px',
              padding: '10px',
              cursor: 'pointer',
            }}
          >
            <p>{comment.text}</p>
            <p>
              Comment on text from position {comment.from} to {comment.to}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentEditor
