import {useCallback, useEffect, useRef} from 'react'

interface ThreadCardProps {
  id: string
  active: boolean
  open: boolean
  children: React.ReactNode
  onClick?: (id: string) => void
  onClickOutside?: () => void
}

export const ThreadCard: React.FC<ThreadCardProps> = ({
  id,
  active,
  open,
  children,
  onClick,
  onClickOutside,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null)

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(id)
    }
  }, [id, onClick])

  useEffect(() => {
    if (!active) {
      return () => null
    }

    const clickHandler = onClickOutside
      ? (event: MouseEvent) => {
          if (!cardRef.current) {
            return
          }

          if (!cardRef.current.contains(event.target as Node)) {
            onClickOutside()
          }
        }
      : null

    if (clickHandler) {
      document.addEventListener('click', clickHandler)
    }

    return () => {
      if (clickHandler) {
        document.removeEventListener('click', clickHandler)
      }
    }
  }, [active, onClickOutside])

  return (
    <div
      ref={cardRef}
      className={`thread${open ? ' is-open' : ''}${active ? ' is-active' : ''}`}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}
