import React, {Dispatch} from 'react'
import Cookies from 'js-cookie'
import HoverTippyHeader from './HoverTippyHeader'

export type PropsHeader = {
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
  checkMenuOnOff: boolean
  setCheckMenuOnOff: Dispatch<React.SetStateAction<boolean>>
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
  setCheckMenuOnOff,
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

  return (
    <div className='w-[100%] h-[100%] '>
      {Tippy ? (
        <HoverTippyHeader
          setCheckMenuOnOff={setCheckMenuOnOff}
          outerVisibleHeader={outerVisibleHeader}
          setOuterVisibleHeader={setOuterVisibleHeader}
          id={id || 0}
          classCSS='h-[100%] w-[100%]'
          onClickHide={() => {
            setColumnDefs((prevDefs) => [...prevDefs, id || 0])
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
