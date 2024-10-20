import TextStyle from '@tiptap/extension-text-style'
import {Mark} from '@tiptap/core'

// Định nghĩa lại module cho các lệnh mở rộng
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set the font size
       */
      setFontSize: (size: string) => ReturnType
      /**
       * Unset the font size
       */
      unsetFontSize: () => ReturnType
    }
  }
}

// Tạo extension mở rộng từ TextStyle
export const TextStyleExtended = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: null,
        parseHTML: (element) => element.style.fontSize.replace('px', ''),
        renderHTML: (attributes) => {
          if (!attributes['fontSize']) {
            return {}
          }
          return {
            style: `font-size: ${attributes['fontSize']}px`,
          }
        },
      },
    }
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({commands}) => {
          return commands.setMark(this.name, {fontSize})
        },
      unsetFontSize:
        () =>
        ({chain}) => {
          return chain().setMark(this.name, {fontSize: null}).removeEmptyTextStyle().run()
        },
    }
  },
})
