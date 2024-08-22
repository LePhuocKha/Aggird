import React, {useState} from 'react'
import Tippy from '@tippyjs/react/headless'
import {BsThreeDotsVertical} from 'react-icons/bs'
import {MdOutlineFilterList} from 'react-icons/md'
import 'tippy.js/dist/tippy.css'
import Tooltip from './Tooltip'

export type MenuItem = {
  label: string
  onclick: () => void
  icons: React.ReactNode
}

type Props = {
  children: React.ReactElement
  classCSS: string
}

const HoverTippyCell = ({children, classCSS}: Props) => {
  const [outerVisible, setOuterVisible] = useState(false)
  const [innerVisible, setInnerVisible] = useState(false)

  const menuHeader: MenuItem[] = [
    {
      icons: <MdOutlineFilterList />,
      label: 'Filter by',
      onclick: () => {},
    },
  ]

  return (
    <div
      className={`${classCSS}`}
      onMouseLeave={() => {
        setInnerVisible(false)
        setOuterVisible(false)
      }}
    >
      <Tippy
        visible={outerVisible}
        trigger='mouseenter'
        offset={[-10, -30]}
        appendTo={document.body}
        placement='right'
        interactive={true}
        render={(props) => (
          <Tooltip
            visible={innerVisible}
            onclick={() => {
              setInnerVisible(false)
              setOuterVisible(false)
            }}
            menuHeader={menuHeader}
          >
            <div
              {...props}
              onClick={() => {
                setInnerVisible(true)
              }}
              className={`text-gray-900 p-2 hover:bg-sky-500 hover:cursor-help hover:text-white bg-white rounded shadow-lg ${
                !!innerVisible && 'bg-sky-500 text-white'
              }`}
            >
              <BsThreeDotsVertical />
            </div>
          </Tooltip>
        )}
      >
        <div
          className='w-[100%] h-[100%] cursor-pointer'
          onMouseEnter={() => {
            setOuterVisible(true)
          }}
        >
          {children}
        </div>
      </Tippy>
    </div>
  )
}

export default HoverTippyCell
