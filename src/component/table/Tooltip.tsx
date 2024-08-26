import Tippy from '@tippyjs/react/headless'
import {useRef} from 'react'
import {MenuItem} from './HoverTippyCell'

type Props = {
  children: React.ReactElement
  visible: boolean
  menuHeader: MenuItem[]
  onclick: () => void
  onClickOutsideTooltip: () => void
  tippyRef: React.MutableRefObject<any>
}

const Tooltip = ({
  visible,
  menuHeader,
  onclick,
  children,
  onClickOutsideTooltip,
  tippyRef,
}: Props) => {
  return (
    <div>
      <Tippy
        visible={visible}
        trigger='mouseenter'
        offset={[0, 0]}
        zIndex={10000}
        appendTo={document.body}
        placement='bottom'
        interactive={true}
        onClickOutside={onClickOutsideTooltip}
        onCreate={(instance) => {
          tippyRef.current = instance.popper // No need for additional checks
        }}
        render={(innerProps) => (
          <div
            {...innerProps}
            className='text-gray-900 p-2 bg-white gap-10px rounded shadow-lg min-w-[200px]'
          >
            {menuHeader.map((el, index) => (
              <div
                className='flex items-center cursor-pointer hover:bg-slate-200 p-[5px] rounded-md gap-[10px]'
                onClick={() => {
                  console.log('1')
                  el?.onclick()
                  onclick()
                }}
                key={index}
              >
                {el?.icons}
                <p>{el?.label}</p>
              </div>
            ))}
          </div>
        )}
      >
        {children}
      </Tippy>
    </div>
  )
}

export default Tooltip
