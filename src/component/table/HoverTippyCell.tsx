import React, {Dispatch, useRef, useState} from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs'
import {MdOutlineFilterList} from 'react-icons/md'
import {Menu} from 'primereact/menu'
import {data_type} from '../data-fake/Api'
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
}

const HoverTippyCell = ({
  children,
  classCSS,
  id,
  setOuterVisibleCell,
  outerVisibleCell,
  data,
}: Props) => {
  const [innerVisible, setInnerVisible] = useState(false)
  const configColumnRef = useRef<any | null>(null)
  const menuLeft = useRef<any>(null)
  const items = [
    {
      items: [
        {
          icons: <MdOutlineFilterList />,
          label: 'Filter by',
          onclick: () => {},
        },
      ],
    },
  ]

  const handleClick = (event: React.MouseEvent) => {
    setInnerVisible(!innerVisible)
    menuLeft?.current.toggle(event)
  }

  // useClickOutside(configColumnRef, () => {
  //   console.log('1')

  //   // setTimeout(() => {
  //   //   setOuterVisibleCell({
  //   //     idHeader: 0,
  //   //     idTr: 0,
  //   //   })
  //   //   setInnerVisible(false)
  //   // }, 150)
  // })
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
          aria-hidden={true}
        />

        {data?.id === outerVisibleCell?.idTr && (
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
