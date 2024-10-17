import {useCallback, useState, FormEvent} from 'react'
import {useUser} from '../hooks/useUser'

interface ThreadComposerProps {
  threadId: string
  provider: {
    addComment: (threadId: string, commentData: CommentData) => void
    updateComment: (threadId: string, commentId: string, content: {content: string}) => void
    deleteComment: (threadId: string, commentId: string) => void
  }
}

export interface CommentData {
  content: string
  createdAt: number
  updatedAt: number
  data: {
    userName: string
  }
}

export const ThreadComposer: React.FC<ThreadComposerProps> = ({threadId, provider}) => {
  const user = useUser()
  const [comment, setComment] = useState<string>('')

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()

      if (!comment) {
        return
      }

      if (provider) {
        provider.addComment(threadId, {
          content: comment,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          data: {userName: user.name},
        })

        setComment('')
      }
    },
    [comment, provider, threadId, user.name]
  )

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder='Reply to thread …'
        onChange={(e) => setComment(e.currentTarget.value)}
        value={comment}
      />
      <div className='flex-row'>
        <div className='button-group'>
          <button type='submit' className='primary' disabled={!comment.length}>
            Send
          </button>
        </div>
      </div>
    </form>
  )
}
