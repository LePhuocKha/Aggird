import {createContext, useCallback, useContext, useState} from 'react'

// Define context types
interface ThreadContextProps {
  threads: any[]
  selectedThreads: any[]
  selectedThread: any
  onClickThread: (threadId: string) => void
  deleteThread: (threadId: string) => void
  resolveThread: (threadId: string) => void
  unresolveThread: (threadId: string) => void
  onCloseThread: () => void
  selectThread: (threadId: string) => void
  unselectThread: (threadId: string) => void
  onUpdateComment: (threadId: string, commentId: string, content: string, metaData: any) => void // Cập nhật kiểu
  onHoverThread: (threadId: string) => void
  onLeaveThread: (threadId: string) => void
}

// Create context with default values
export const ThreadsContext = createContext<ThreadContextProps>({
  threads: [],
  selectedThreads: [],
  selectedThread: null,
  onClickThread: () => null,
  deleteThread: () => null,
  resolveThread: () => null,
  unresolveThread: () => null,
  onCloseThread: () => null,
  selectThread: () => null,
  unselectThread: () => null,
  onUpdateComment: () => null,
  onHoverThread: () => null,
  onLeaveThread: () => null,
})

interface ThreadsProviderProps {
  children: React.ReactNode
  threads?: any[]
  selectedThreads?: any[]
  onClickThread?: (threadId: string) => void
  onDeleteThread?: (threadId: string) => void
  onResolveThread?: (threadId: string) => void
  onUnresolveThread?: (threadId: string) => void
  onUpdateComment?: any
  onHoverThread?: (threadId: string) => void
  onLeaveThread?: (threadId: string) => void
}

export const ThreadsProvider = ({
  children,
  threads = [],
  selectedThreads = [],
  onClickThread = () => null,
  onDeleteThread = () => null,
  onResolveThread = () => null,
  onUnresolveThread = () => null,
  onUpdateComment = () => null,
  onHoverThread = () => null,
  onLeaveThread = () => null,
}: ThreadsProviderProps) => {
  const [selectedThread, setSelectedThread] = useState<string | null>(null)

  const handleThreadClick = useCallback(
    (threadId: string) => {
      setSelectedThread((currentThreadId) => {
        if (currentThreadId !== threadId) {
          onClickThread(threadId)
          return threadId
        }
        return null
      })
    },
    [onClickThread]
  )

  const onCloseThread = useCallback(() => {
    setSelectedThread(null)
  }, [])

  const providerValue: ThreadContextProps = {
    threads,
    selectedThreads,
    selectedThread,

    deleteThread: onDeleteThread,
    resolveThread: onResolveThread,
    unresolveThread: onUnresolveThread,
    onClickThread: handleThreadClick,
    onCloseThread,
    onUpdateComment,
    selectThread: (threadId) => setSelectedThread(threadId),
    unselectThread: () => setSelectedThread(null),
    onHoverThread,
    onLeaveThread,
  }

  return <ThreadsContext.Provider value={providerValue}>{children}</ThreadsContext.Provider>
}

export const useThreadsState = () => useContext(ThreadsContext)
