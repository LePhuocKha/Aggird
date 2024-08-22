import Tippy from '@tippyjs/react/headless'
import {MenuItem} from './HoverTippyHeader'

type Props = {
  children: React.ReactElement
  visible: boolean
  menuHeader: MenuItem[]
  onclick: () => void
}

const Tooltip = ({visible, menuHeader, onclick, children}: Props) => {
  return (
    <Tippy
      visible={visible}
      trigger='mouseenter'
      offset={[0, 0]}
      appendTo={document.body}
      placement='bottom'
      interactive={true}
      render={(innerProps) => (
        <div
          {...innerProps}
          className='text-gray-900 p-2 bg-white gap-10px rounded shadow-lg min-w-[200px] '
        >
          {menuHeader.map((el, index) => {
            return (
              <div
                className='flex items-center cursor-pointer hover:bg-slate-200 p-[5px] rounded-md gap-[10px]'
                onClick={() => {
                  el?.onclick()
                  onclick()
                }}
                key={index}
              >
                {el?.icons}
                <p>{el?.label}</p>
              </div>
            )
          })}
        </div>
      )}
    >
      {children}
    </Tippy>
  )
}

export default Tooltip
