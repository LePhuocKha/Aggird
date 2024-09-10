import React, {Dispatch} from 'react'
import Cookies from 'js-cookie'
import HoverTippyHeader from './HoverTippyHeader'
import {TiPin} from 'react-icons/ti'
import {RiMenuAddLine, RiMenuFoldFill} from 'react-icons/ri'
import {FaArrowDown, FaLongArrowAltUp} from 'react-icons/fa'

export type PropsHeader = {
  id: number
  title?: string
  children?: React.ReactElement
  classCSS?: string
  Tippy?: boolean
  outerVisibleHeader: number
  setOuterVisibleHeader: Dispatch<React.SetStateAction<number>>
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
  colDef: any
  api: any
}

const HeaderComponent = ({
  id,
  title,
  children,
  classCSS,
  Tippy = true,
  setOuterVisibleHeader,
  outerVisibleHeader,
  setOuterVisibleCell,
  colDef,
  api,
  ...res
}: PropsHeader) => {
  const handleMouseEnter = () => {
    if ((Cookies.get('menu') || '') !== 'true') {
      setOuterVisibleHeader(id || 0)
      setOuterVisibleCell({
        idHeader: 0,
        idTr: 0,
      })
    }
  }

  const items = [
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
      command: () => {
        api.setColumnVisible(id.toString(), false)
        api.refreshServerSide({purge: true})
      },
    },
  ]

  return (
    <div className='w-[100%] h-[100%] '>
      {Tippy ? (
        <HoverTippyHeader
          items={items}
          outerVisibleHeader={outerVisibleHeader}
          setOuterVisibleHeader={setOuterVisibleHeader}
          id={id || 0}
          classCSS='h-[100%] w-[100%]'
        >
          <div
            onMouseEnter={handleMouseEnter}
            className={`flex items-center  h-[100%] px-[5px] gap-[3px] hover:bg-blue-100 ${classCSS}`}
          >
            {title && <p className='p-0 m-0'>{title}</p>}
            {children}
          </div>
        </HoverTippyHeader>
      ) : (
        <div
          className={`flex items-center px-[5px] h-[100%] w-[100%] justify-start gap-2 ${classCSS}`}
        >
          {title && <p className='p-0 m-0'>{title}</p>}
          {children}
        </div>
      )}
    </div>
  )
}
export default HeaderComponent
