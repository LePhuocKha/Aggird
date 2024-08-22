import React, {useState} from 'react'
import Tippy from '@tippyjs/react/headless'
import {BsThreeDotsVertical} from 'react-icons/bs'
import {FaLongArrowAltUp} from 'react-icons/fa'
import {FaArrowDown} from 'react-icons/fa6'
import {RiMenuAddLine, RiMenuFoldFill} from 'react-icons/ri'
import {TiPin} from 'react-icons/ti'
import 'tippy.js/dist/tippy.css'
import Tooltip from './Tooltip'

export type MenuItem = {
  label: string
  onclick: () => void
  icons: React.ReactNode
}

type Props = {
  children: React.ReactElement
  onClickHide: () => void
  classCSS: string
}

const HoverTippyHeader = ({children, onClickHide, classCSS}: Props) => {
  const [outerVisible, setOuterVisible] = useState(false)
  const [innerVisible, setInnerVisible] = useState(false)

  const menuHeader: MenuItem[] = [
    {
      icons: <FaLongArrowAltUp />,
      label: 'Sort Ascending',
      onclick: () => {},
    },
    {
      icons: <FaArrowDown />,
      label: 'Sort Descending',
      onclick: () => {},
    },
    {
      icons: <RiMenuAddLine />,
      label: 'Add Filter',
      onclick: () => {},
    },
    {
      icons: <TiPin />,
      label: 'Pin this',
      onclick: () => {},
    },
    {
      icons: <TiPin />,
      label: 'Pin left',
      onclick: () => {},
    },
    {
      icons: <TiPin />,
      label: 'Pin right',
      onclick: () => {},
    },
    {
      icons: <RiMenuFoldFill />,
      label: 'Hide this',
      onclick: onClickHide,
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
        offset={[0, -40]}
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

export default HoverTippyHeader
