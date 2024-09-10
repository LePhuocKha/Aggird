import React, {Dispatch, useRef} from 'react'
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
      idTr: string
      idHeader: number
    }>
  >
  outerVisibleCell: {
    idTr: string
    idHeader: number
  }
  data: data_type
  outerVisibleHeader: number
}

const HoverTippyCell = ({children, classCSS, outerVisibleCell, data, id}: Props) => {
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
          label: 'Click',
          onclick: () => {},
        },
      ],
    },
  ]

  const handleClick = (event: React.MouseEvent) => {
    menuLeft?.current.toggle(event)
  }

  const handleMenuShow = () => {
    Cookies.set('menu', 'true')
  }

  useClickOutside(configColumnRef, () => {
    setTimeout(() => {
      // Cookies.set('menu', 'false')
    }, 150)
  })

  const handleMenuHide = () => {
    Cookies.set('menu', 'false')
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
          aria-hidden='false'
        />

        {data?.id === outerVisibleCell?.idTr && (
          <button
            ref={configColumnRef}
            onClick={handleClick}
            aria-controls='popup_menu_left'
            aria-haspopup='true'
            className={`p-[7px] hover:bg-sky-500 hover:cursor-help absolute top-[1px] right-[10px] hover:text-white rounded shadow-lg ${'text-gray-900 bg-white'}`}
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
