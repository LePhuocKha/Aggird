import {useCallback, useEffect, useState} from 'react'

export const useThreads = (provider: any, editor: any, user: any) => {
  const [threads, setThreads] = useState()

  useEffect(() => {
    if (provider) {
      const updateHandler = () => {
        setThreads(provider.getThreads())
      }

      provider.watchThreads(updateHandler)
      provider.on('synced', updateHandler)

      return () => {
        provider.unwatchThreads(updateHandler)
        provider.off('synced', updateHandler)
      }
    }
  }, [provider])

  const createThread = useCallback(() => {
    const input = window.prompt('Comment content')

    if (!input) {
      return
    }

    if (!editor) {
      return
    }
    console.log('vao', {content: input, commentData: {userName: user.name}})

    editor
      .chain()
      .focus()
      .setThread({content: input, commentData: {userName: user.name}})
      .run()
  }, [editor, user])

  const removeThread = useCallback(() => {
    editor.chain().focus().removeThread().run()
  }, [editor])

  return {threads, createThread, removeThread}
}
