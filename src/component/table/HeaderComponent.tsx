import React, {Dispatch, useEffect, useRef, useState} from 'react'
import HoverTippyHeader from './HoverTippyHeader'

type Props = {
  setColumnDefs: Dispatch<React.SetStateAction<number[]>>
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
}

const HeaderComponent = ({
  setColumnDefs,
  id,
  title,
  children,
  classCSS,
  Tippy = true,
  setOuterVisibleHeader,
  outerVisibleHeader,
  setOuterVisibleCell,
  outerVisibleCell,
}: Props) => {
  const handleMouseEnter = () => {
    if (!outerVisibleHeader) {
      setOuterVisibleHeader(id)
      setOuterVisibleCell({
        idHeader: 0,
        idTr: 0,
      })
    }
  }

  return (
    <div className='w-[100%] h-[100%] '>
      {Tippy ? (
        <HoverTippyHeader
          outerVisibleHeader={outerVisibleHeader}
          setOuterVisibleHeader={setOuterVisibleHeader}
          id={id}
          classCSS='h-[100%] w-[100%]'
          onClickHide={() => {
            setColumnDefs((prevDefs) => [...prevDefs, id])
          }}
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
        <div className={`flex items-center px-[5px] h-[100%] w-[100%] ${classCSS}`}>
          {title && <p className='p-0 m-0'>{title}</p>}
          {children}
        </div>
      )}
    </div>
  )
}
export default HeaderComponent
