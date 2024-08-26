import React, {Dispatch, useRef, useState} from 'react'

import {BsThreeDotsVertical} from 'react-icons/bs'
import {FaLongArrowAltUp, FaArrowDown} from 'react-icons/fa'
import {RiMenuAddLine, RiMenuFoldFill} from 'react-icons/ri'
import {TiPin} from 'react-icons/ti'
import {Menu} from 'primereact/menu'

import useClickOutside from '../../hooks/useClickOutside'

export type MenuItemType = {
  label: string
  onclick: () => void
  icons: React.ReactNode
}

type Props = {
  children: React.ReactElement
  onClickHide: () => void
  classCSS: string
  id: number
  outerVisibleHeader: number
  setOuterVisibleHeader: Dispatch<React.SetStateAction<number>>
}

const HoverTippyHeader = ({
  children,
  onClickHide,
  classCSS,
  setOuterVisibleHeader,
  outerVisibleHeader,
  id,
}: Props) => {
  const menuLeft = useRef<any>(null)
  const configColumnRef = useRef<any>(null)

  const [innerVisible, setInnerVisible] = useState(false)

  const items = [
    {
      items: [
        {
          label: 'Sort Ascending',
          icon: <FaLongArrowAltUp />,
          command: () => {
            console.log('Sort Ascending')
          },
        },
        {
          label: 'Sort Descending',
          icon: <FaArrowDown />,
          command: () => {},
        },
        {
          label: 'Add Filter',
          icon: <RiMenuAddLine />,
          command: () => {},
        },
        {
          label: 'Pin this',
          icon: <TiPin />,
          command: () => {},
        },
        {
          label: 'Pin left',
          icon: <TiPin />,
          command: () => {},
        },
        {
          label: 'Pin right',
          icon: <TiPin />,
          command: () => {},
        },
        {
          label: 'Hide this',
          icon: <RiMenuFoldFill />,
          command: () => onClickHide(),
        },
      ],
    },
  ]

  const handleClick = (event: React.MouseEvent) => {
    setInnerVisible(!innerVisible)
    menuLeft?.current.toggle(event)
  }

  useClickOutside(configColumnRef, () => {
    setTimeout(() => {
      setOuterVisibleHeader(0)
      setInnerVisible(false)
    }, 150)
  })

  return (
    <div className={`${classCSS} flex relative`}>
      <div className='cursor-pointer w-[100%] h-[100%]'>{children}</div>

      <div className='flex justify-content-center  bg-white'>
        <Menu
          model={items}
          className='bg-white p-[10px] min-w-[250px] gap-[10px] shadow-md flex flex-col'
          popup
          ref={menuLeft}
          id='popup_menu_left'
          aria-hidden='false'
        />

        {outerVisibleHeader === id && (
          <button
            ref={configColumnRef}
            onClick={handleClick}
            aria-controls='popup_menu_left'
            aria-haspopup='true'
            className={`p-[7px] hover:bg-sky-500 hover:cursor-help absolute top-[1px] right-[10px] hover:text-white rounded shadow-lg ${
              innerVisible ? 'bg-sky-500 text-white' : 'text-gray-900 bg-white'
            }`}
          >
            <div>
              <BsThreeDotsVertical />
            </div>
          </button>
        )}
      </div>
    </div>
  )
}

export default HoverTippyHeader
