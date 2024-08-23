import React, {Dispatch, useState} from 'react'
import HoverTippyHeader from './HoverTippyHeader'

type Props = {
  setColumnDefs: Dispatch<React.SetStateAction<number[]>>
  id: number
  title?: string
  children?: React.ReactElement
  classCSS?: string
  Tippy?: boolean
}

const HeaderComponent = ({setColumnDefs, id, title, children, classCSS, Tippy = true}: Props) => {
  return (
    <div className='w-[100%] h-[100%]'>
      {Tippy ? (
        <HoverTippyHeader
          //   outerVisibleHeader={outerVisibleHeader}
          //   setOuterVisibleHeader={setOuterVisibleHeader}
          id={id}
          classCSS='h-[100%] w-[100%]'
          onClickHide={() => {
            setColumnDefs((prevDefs) => [...prevDefs, id])
          }}
        >
          <div
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
