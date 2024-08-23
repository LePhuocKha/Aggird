import React, {Dispatch, useMemo, useRef, useState} from 'react'
import Tippy from '@tippyjs/react/headless'
import {BsThreeDotsVertical} from 'react-icons/bs'
import {FaLongArrowAltUp} from 'react-icons/fa'
import {FaArrowDown} from 'react-icons/fa6'
import {RiMenuAddLine, RiMenuFoldFill} from 'react-icons/ri'
import {TiPin} from 'react-icons/ti'
import Tooltip from './Tooltip'

import 'tippy.js/dist/tippy.css'
import useClickOutside from '../../hooks/useClickOutside'
import Menu from './Menu'

export type MenuItem = {
  label: string
  onclick: () => void
  icons: React.ReactNode
}

type Props = {
  children: React.ReactElement
  onClickHide: () => void
  classCSS: string
  id: number
  // outerVisibleHeader: number
  // setOuterVisibleHeader: Dispatch<React.SetStateAction<number>>
}

const HoverTippyHeader = ({
  children,
  onClickHide,
  classCSS,
  // outerVisibleHeader,
  id,
}: // setOuterVisibleHeader,
Props) => {
  const [innerVisible, setInnerVisible] = useState(false)
  const configColumnRef = useRef<HTMLDivElement>(null)
  const [outerVisibleHeader, setOuterVisibleHeader] = useState<number>(0)

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
      onclick: () => {
        onClickHide()
      },
    },
  ]
  useClickOutside(configColumnRef, () => {
    setOuterVisibleHeader(0)
    setInnerVisible(false)
  })

  return (
    <div className={`${classCSS}`}>
      <Tippy
        visible={outerVisibleHeader === id}
        trigger='mouseenter'
        offset={[-10, -40]}
        appendTo={document.body}
        placement='right'
        interactive={true}
        onClickOutside={() => {
          setOuterVisibleHeader(0)
          setInnerVisible(false)
        }}
        render={(props) => (
          <div {...props}>
            <div
              onClick={() => {
                setInnerVisible(true)
              }}
              className={` p-[7px] hover:bg-sky-500 hover:cursor-help w-[30px] hover:text-white  rounded shadow-lg ${
                !!innerVisible ? 'bg-sky-500 text-white' : 'bg-white text-gray-900'
              }`}
            >
              <BsThreeDotsVertical />
            </div>
            {innerVisible && (
              <Menu
                visible={innerVisible}
                onclick={() => {
                  setInnerVisible(false)
                  setOuterVisibleHeader(0)
                }}
                menuHeader={menuHeader}
              />
            )}
          </div>
        )}
      >
        <div
          className='w-[100%] h-[100%] cursor-pointer'
          onMouseEnter={() => {
            setOuterVisibleHeader(id)
          }}
        >
          {children}
        </div>
      </Tippy>
    </div>
  )
}

export default HoverTippyHeader
