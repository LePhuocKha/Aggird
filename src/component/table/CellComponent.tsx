import React, {Dispatch, useMemo} from 'react'

import {data_type} from '../data-fake/Api'
import HoverTippyCell from './HoverTippyCell'
import InputCheckBox from '../checkbox/InputCheckBox'
import Status from './Status'
import {formatDate} from '../../utils/common'

import {GoDotFill} from 'react-icons/go'
import countries from 'i18n-iso-countries'
import Flag from 'react-world-flags'
import Cookies from 'js-cookie'

export type PropsCell = {
  data?: data_type | any
  children?: React.ReactElement
  id?: number
  Tippy?: boolean
  setOuterVisibleHeader: Dispatch<React.SetStateAction<number>>
  setSelectRow: Dispatch<React.SetStateAction<number[]>>
  selectRow: number[]
  setOuterVisibleCell: Dispatch<
    React.SetStateAction<{
      idTr: number
      idHeader: number
    }>
  >
  icons: React.ReactNode
  configData?: any[]
  outerVisibleCell: {
    idTr: number
    idHeader: number
  }
  classCSS?: string
  type?: string
  outerVisibleHeader: number
}
countries.registerLocale(require('i18n-iso-countries/langs/en.json'))
const CellComponent = ({
  data,
  id,
  Tippy = true,
  selectRow,
  setSelectRow,
  outerVisibleCell,
  setOuterVisibleHeader,
  setOuterVisibleCell,
  configData = [],
  outerVisibleHeader,
  icons,
  type,
  classCSS,
}: PropsCell) => {
  // const render = useMemo(() => {
  //   if (['Campaign', 'Storefront'].includes(title || '')) {
  //     return (
  //       <div className='flex justify-start items-center gap-[3px] '>
  //
  //         <div >
  //           <a className='leading-[11px] text-[10px] text-sky-500'>{data?.shop} Shop</a>
  //           <p className='leading-[15px] font-semibold text-[14px] text-sky-800'>{data?.title} </p>
  //           <div>
  //             <p className='leading-[12px] text-[12px] text-gray-400'>{data?.marketplace}</p>
  //             <GoDotFill className='text-gray-400' />
  //             <p className='leading-[12px] text-[12px] text-gray-400'>{data?.adTool}</p>
  //             <GoDotFill className='text-gray-400' />
  //             <p className='leading-[12px] text-[12px] text-gray-400'>
  //               {['Campaign'].includes(title || '') ? data?.code : data?.number}
  //             </p>
  //           </div>
  //         </div>
  //       </div>
  //     )
  //   }

  // }, [data, selectRow])
  console.log(configData.length)

  const handleCheckboxClick = () => {
    setSelectRow((prev: number[] | any) => {
      if (!Array.isArray(prev)) {
        return [data?.id]
      }

      if (prev.includes(data?.id || 0)) {
        return prev.filter((id) => id !== data?.id)
      } else {
        return [...prev, data?.id]
      }
    })
  }

  const render = useMemo(() => {
    if (type === 'checkbox') {
      return (
        <div className='flex justify-center h-[100%] items-center '>
          <InputCheckBox onChange={handleCheckboxClick} checked={selectRow.includes(data?.id)} />
        </div>
      )
    }

    if (type === 'red_dot') {
      return (
        <div className='flex justify-center h-[100%] w-[100%] items-center'>
          <div className='bg-red-500 w-[13px] h-[13px] rounded-full shrink-0'></div>
        </div>
      )
    }
    switch (!!configData) {
      case configData?.length === 1 || !!icons:
        return (
          <div
            className={`flex gap-[3px] h-[100%] ${
              classCSS ? classCSS : ' justify-start items-center'
            }`}
          >
            {icons && icons}
            {configData.map((config: []) =>
              config.map((key, index) => {
                let value = data?.[key]
                if (key === 'black_dot') {
                  value = <GoDotFill className='w-[10px]' />
                }
                if (key === 'dash') {
                  value = '-'
                }
                if (key === 'flag_country') {
                  value = (
                    <Flag code={data?.country} className='w-[20px] min-w-[20px] flex-shrink-0' />
                  )
                }
                if (key === 'country') {
                  value = `${countries.getName(data?.country, 'en') || 'Unknown Country'}`
                }
                if (type === 'date' && !['black_dot', 'dash'].includes(key)) {
                  value = formatDate((data?.[key] as string) || '')
                }
                if (type === 'status') {
                  value = (
                    <Status status={data?.status || 0} update_time={data?.update_time as string} />
                  )
                }
                return (
                  <p
                    key={index}
                    className='font-medium whitespace-break-spaces leading-[15px] break-words'
                  >
                    {value}
                  </p>
                )
              })
            )}
          </div>
        )
      case configData?.length === 3:
        return (
          <div
            className={`flex gap-[3px] h-[100%] ${
              classCSS ? classCSS : ' justify-start items-center'
            }`}
          >
            <div>{icons && icons}</div>
            <div className='flex flex-col gap-[3px]'>
              {configData.map((config: []) => (
                <div className=''>
                  {config.map((key, index) => {
                    let value = data?.[key]
                    if (key === 'black_dot') {
                      value = <GoDotFill className='w-[10px]' />
                    }
                    if (key === 'dash') {
                      value = '-'
                    }
                    if (key === 'flag_country') {
                      value = (
                        <Flag
                          code={data?.country}
                          className='w-[20px] min-w-[20px] flex-shrink-0'
                        />
                      )
                    }
                    if (key === 'country') {
                      value = `${countries.getName(data?.country, 'en') || 'Unknown Country'}`
                    }
                    if (type === 'date' && !['black_dot', 'dash'].includes(key)) {
                      value = formatDate((data?.[key] as string) || '')
                    }
                    if (type === 'status') {
                      value = (
                        <Status
                          status={data?.status || 0}
                          update_time={data?.update_time as string}
                        />
                      )
                    }
                    return (
                      <p key={index} className=''>
                        {value}3 123
                      </p>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return <div className='flex font-medium'>No data</div>
    }
  }, [data, selectRow])

  const handleMouseEnter = () => {
    if (Cookies.get('menu') !== 'true') {
      setOuterVisibleCell({
        idHeader: Number(id) || 0,
        idTr: +data?.id || 0,
      })
      setOuterVisibleHeader(0)
    }
  }

  return (
    <div className='max-h-[45px] min-h-[45px] h-[45px] w-[100%] '>
      {Tippy ? (
        <HoverTippyCell
          outerVisibleHeader={outerVisibleHeader}
          data={data || {}}
          outerVisibleCell={outerVisibleCell}
          setOuterVisibleCell={setOuterVisibleCell}
          id={id || 0}
          classCSS='h-[100%] w-[100%]'
        >
          <div className='h-[100%] w-[100%]' onMouseEnter={handleMouseEnter}>
            {render}
          </div>
        </HoverTippyCell>
      ) : (
        <div className='h-[100%] w-[100%]'>{render}</div>
      )}
    </div>
  )
}

export default CellComponent
