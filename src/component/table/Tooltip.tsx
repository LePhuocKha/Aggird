import Tippy from '@tippyjs/react/headless'
import {useRef} from 'react'

type Props = {
  children: React.ReactElement
  visible: boolean
  menuHeader: any[]
  onclick: () => void
  onClickOutsideTooltip: () => void
}

const Tooltip = ({visible, menuHeader, onclick, children}: Props) => {
  const tippyRef = useRef<any>()
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
        // onClickOutside={onClickOutsideTooltip}
        // onCreate={(instance) => {
        //   tippyRef.current = instance.popper
        // }}
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
