import {mergeAttributes, Node} from '@tiptap/core'
import {ReactNodeViewRenderer} from '@tiptap/react'
import ComponentTitle from './ComponentTitle'

export default Node.create({
  name: 'ReactComponent2',

  group: 'block',
  inline: true,
  content: 'inline*',

  parseHTML() {
    return [
      {
        tag: 'react-component-2',
      },
    ]
  },

  renderHTML({HTMLAttributes}) {
    return ['react-component-2', mergeAttributes(HTMLAttributes), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(ComponentTitle)
  },
})
