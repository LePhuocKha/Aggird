import React, {Dispatch, useRef, useState} from 'react'
import useClickOutside from '../../hooks/useClickOutside'

import Cookies from 'js-cookie'
import {Menu} from 'primereact/menu'
import {BsThreeDotsVertical} from 'react-icons/bs'
import {MdOutlineFilterList} from 'react-icons/md'
import {data_type} from '../data-fake/Api'

import {IoMdAdd} from 'react-icons/io'
import TableChidlren from './TableChidlren'
import {useSelector} from 'react-redux'
import {RootState} from '../../app/store'

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

const HoverTippyCell = ({children, classCSS, outerVisibleCell, data}: Props) => {
  const configColumnRef = useRef<any>(null)
  const menuLeft = useRef<any>(null)
  const ojb_cell = useSelector((state: RootState) => state.hoverTableAggirdCell)
  const [menuOpen, setMenuOpen] = useState(false)
  const [addAdObjects, setAddAdObjects] = useState(false)
  const [tablePlacet, setTable_placet] = useState<{
    top: number
    left: number
    right: number
    bottom: number
  }>({top: 0, left: 0, right: 0, bottom: 0})
  const items = [
    {
      items: [
        {
          icon: <MdOutlineFilterList />,
          label: 'Filter by',
          onclick: () => {},
        },
        {
          icon: <MdOutlineFilterList />,
          label: 'Click',
          onclick: () => {},
        },
        {
          icon: <IoMdAdd />,
          label: 'Add ad objects',
          command: () => {
            setAddAdObjects(true)
          },
        },
      ],
    },
  ]

  const handleClick = (event: React.MouseEvent) => {
    menuLeft?.current.toggle(event)
    const buttonRect = (event.target as HTMLElement).getBoundingClientRect()
    const {top, left, right, bottom} = buttonRect
    setTable_placet({top, left, right, bottom})
  }

  const handleMenuShow = () => {
    setMenuOpen(true)
    Cookies.set('menu', 'true')
  }

  useClickOutside(configColumnRef, () => {
    setTimeout(() => {
      // Cookies.set('menu', 'false')
    }, 150)
  })

  const handleMenuHide = () => {
    Cookies.set('menu', 'false')
    setMenuOpen(false)
  }

  return (
    <div className={`${classCSS} w-[100%] flex relative`}>
      <div className='cursor-pointer w-[100%] h-[100%]'>{children}</div>
      <TableChidlren
        tablePlacet={tablePlacet}
        open={addAdObjects}
        handleClose={() => {
          setAddAdObjects(false)
        }}
      />
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

        {data?.id === ojb_cell?.id_Cell?.idTr && (
          <button
            ref={configColumnRef}
            onClick={handleClick}
            aria-controls='popup_menu_left'
            aria-haspopup='true'
            className={`p-[7px] hover:bg-sky-500 hover:cursor-help absolute top-[50%] right-[10px] transform -translate-y-1/2 hover:text-white rounded shadow-lg ${
              menuOpen ? 'bg-sky-500 text-white' : 'text-gray-900 bg-white'
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
