import React, {Dispatch, useRef, useState} from 'react'

import {BsThreeDotsVertical} from 'react-icons/bs'
import {FaLongArrowAltUp, FaArrowDown} from 'react-icons/fa'
import {RiMenuAddLine, RiMenuFoldFill} from 'react-icons/ri'
import {TiPin} from 'react-icons/ti'
import {Menu} from 'primereact/menu'

import useClickOutside from '../../hooks/useClickOutside'
import Cookies from 'js-cookie'
import {ColDef} from 'ag-grid-community'

export type MenuItemType = {
  label: string
  command: () => void
  icon?: JSX.Element
}

type Props = {
  children: React.ReactElement
  classCSS: string
  id: number
  items: MenuItemType[]
  outerVisibleHeader: number
  setOuterVisibleHeader: Dispatch<React.SetStateAction<number>>
}

const HoverTippyHeader = ({
  children,
  classCSS,
  setOuterVisibleHeader,
  outerVisibleHeader,
  items = [],
  id,
}: Props) => {
  const menuLeft = useRef<any>(null)
  const configButton = useRef<any>(null)

  const [innerVisible, setInnerVisible] = useState(false)

  const handleClick = (event: React.MouseEvent) => {
    menuLeft?.current.toggle(event)
  }

  const handleMenuShow = () => {
    setInnerVisible(true)
    Cookies.set('menu', 'true')
  }

  const handleMenuHide = () => {
    Cookies.set('menu', 'false')
  }

  useClickOutside(configButton, () => {
    setTimeout(() => {
      setOuterVisibleHeader(0)
      Cookies.set('menu', 'false')
    }, 150)
  })

  return (
    <div className={`${classCSS} flex relative`}>
      <div className='cursor-pointer w-[100%] h-[100%]'>{children}</div>

      <div className='flex justify-content-center  bg-white'>
        <Menu
          model={[
            {
              items: items,
            },
          ]}
          className='bg-white p-[10px] min-w-[250px] gap-[10px] shadow-md flex flex-col'
          popup
          ref={menuLeft}
          id='popup_menu_left'
          onShow={handleMenuShow}
          onHide={handleMenuHide}
          aria-hidden='false'
        />

        {outerVisibleHeader === id && (
          <button
            ref={configButton}
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
