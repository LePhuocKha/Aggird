import React, {Dispatch, useRef} from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs'
import {Menu} from 'primereact/menu'

import useClickOutside from '../../hooks/useClickOutside'
import Cookies from 'js-cookie'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../app/store'
import {setHoverHeaderTableHoverAggird} from '../features/table-aggrid/setHoverHeader'

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
}

const HoverTippyHeader = ({children, classCSS, items = [], id}: Props) => {
  const menuLeft = useRef<any>(null)
  const configButton = useRef<any>(null)
  const dispatch = useDispatch()
  const ojb_header = useSelector((state: RootState) => state.hoverTableAggirdHeader)
  const handleClick = (event: React.MouseEvent) => {
    menuLeft?.current.toggle(event)
  }

  const handleMenuShow = () => {
    Cookies.set('menu', 'true')
  }

  const handleMenuHide = () => {
    Cookies.set('menu', 'false')
  }

  useClickOutside(configButton, () => {
    setTimeout(() => {
      dispatch(setHoverHeaderTableHoverAggird(0))
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

        {+ojb_header?.id_header === id && (
          <button
            ref={configButton}
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

export default HoverTippyHeader
