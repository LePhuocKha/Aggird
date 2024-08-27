import React, {Dispatch, useEffect, useRef, useState} from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs'
import {MdOutlineFilterList} from 'react-icons/md'
import {Menu} from 'primereact/menu'
import {data_type} from '../data-fake/Api'
import Cookies from 'js-cookie'
import useClickOutside from '../../hooks/useClickOutside'

export type MenuItem = {
  label: string
  onclick: () => void
  icons: React.ReactNode
}

type Props = {
  children?: React.ReactElement
  classCSS?: string
  id: number
  setOuterVisibleCell: Dispatch<
    React.SetStateAction<{
      idTr: number
      idHeader: number
    }>
  >
  outerVisibleCell: {
    idTr: number
    idHeader: number
  }
  data: data_type
  setCheckMenuOnOff: Dispatch<React.SetStateAction<boolean>>
  outerVisibleHeader: number
}

const HoverTippyCell = ({
  children,
  classCSS,
  outerVisibleCell,
  data,
  setOuterVisibleCell,
  setCheckMenuOnOff,
  outerVisibleHeader,
  id,
}: Props) => {
  const [innerVisible, setInnerVisible] = useState(false)
  const configColumnRef = useRef<any>(null)
  const menuLeft = useRef<any>(null)
  const items = [
    {
      items: [
        {
          icons: <MdOutlineFilterList />,
          label: 'Filter by',
          onclick: () => {},
        },
        {
          icons: <MdOutlineFilterList />,
          label: 'HIHI',
          onclick: () => {},
        },
      ],
    },
  ]

  const handleClick = (event: React.MouseEvent) => {
    menuLeft?.current.toggle(event)
  }

  const handleMenuShow = () => {
    setInnerVisible(true)
    Cookies.set('menu', 'true')
    // setCheckMenuOnOff(true)
  }
  useClickOutside(configColumnRef, () => {
    setTimeout(() => {
      setCheckMenuOnOff(false)
      setOuterVisibleCell({
        idHeader: 0,
        idTr: 0,
      })
      Cookies.set('menu', 'false')
    }, 150)
  })
  const handleMenuHide = () => {
    Cookies.set('menu', 'false')
    setCheckMenuOnOff(false)
  }
  return (
    <div className={`${classCSS} flex relative`}>
      <div className='cursor-pointer w-[100%] h-[100%]'>{children}</div>

      <div className='flex justify-content-center  bg-white'>
        <Menu
          model={items}
          className='bg-white p-[10px] min-w-[250px] gap-[10px] shadow-md flex flex-col'
          popup
          ref={menuLeft}
          onHide={handleMenuHide}
          onShow={handleMenuShow}
          id='popup_menu_left'
          aria-hidden={true}
        />

        {data?.id === outerVisibleCell?.idTr && id === outerVisibleCell?.idHeader && (
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

export default HoverTippyCell
