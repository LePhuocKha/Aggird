import React, {Dispatch, useMemo} from 'react'

import {data_type} from '../data-fake/Api'
import HoverTippyCell from './HoverTippyCell'
import InputCheckBox from '../checkbox/InputCheckBox'
import Status from './Status'
import {formatDate} from '../../utils/common'

import {FaRectangleAd} from 'react-icons/fa6'
import {GoDotFill} from 'react-icons/go'
import {MdAdd, MdFolderCopy} from 'react-icons/md'
import countries from 'i18n-iso-countries'
import Flag from 'react-world-flags'
import Cookies from 'js-cookie'

export type PropsCell = {
  data?: data_type | any
  children?: React.ReactElement
  classCSS?: string
  id?: number
  title?: string
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
  outerVisibleCell: {
    idTr: number
    idHeader: number
  }
  outerVisibleHeader: number
  value: string
}
countries.registerLocale(require('i18n-iso-countries/langs/en.json'))
const CellComponent = ({
  data,
  id,
  title,
  Tippy = true,
  selectRow,
  setSelectRow,
  outerVisibleCell,
  setOuterVisibleHeader,
  setOuterVisibleCell,
  outerVisibleHeader,
  value,
  ...res
}: PropsCell) => {
  const render = useMemo(() => {
    if (title === 'checkbox') {
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
      return (
        <div className='flex justify-center h-[100%] items-center '>
          <InputCheckBox onChange={handleCheckboxClick} checked={selectRow.includes(data?.id)} />
        </div>
      )
    }
    if (title === 'Exclamation mark') {
      return (
        <div className='flex justify-center h-[100%] w-[100%] items-center'>
          <div className='bg-red-500 w-[13px] h-[13px] rounded-full shrink-0'></div>
        </div>
      )
    }
    if (title === 'Marketplace') {
      return (
        <div className='flex h-[100%] items-center'>
          <p className='font-medium flex-grow whitespace-break-spaces leading-[17px] break-words'>
            {data?.marketplace}
          </p>
        </div>
      )
    }
    if (title === 'Ad Tool') {
      return (
        <div className='flex justify-start items-center gap-[3px] h-[100%]'>
          <FaRectangleAd />
          <p className='font-medium whitespace-break-spaces leading-[15px] break-words'>
            {data?.marketplace}
          </p>
          <GoDotFill className='w-[10px]' />
          <p className='font-medium whitespace-break-spaces leading-[15px] break-words'>
            {data?.adTool}
          </p>
        </div>
      )
    }
    if (['Campaign', 'Storefront'].includes(title || '')) {
      return (
        <div className='flex justify-start items-center gap-[3px] '>
          <MdFolderCopy />
          <div className='flex flex-col gap-[3px]'>
            <a className='leading-[11px] text-[10px] text-sky-500'>{data?.shop} Shop</a>
            <p className='leading-[15px] font-semibold text-[14px] text-sky-800'>{data?.title} </p>
            <div className='flex justify-start items-center gap-[3px]'>
              <p className='leading-[12px] text-[12px] text-gray-400'>{data?.marketplace}</p>
              <GoDotFill className='text-gray-400' />
              <p className='leading-[12px] text-[12px] text-gray-400'>{data?.adTool}</p>
              <GoDotFill className='text-gray-400' />
              <p className='leading-[12px] text-[12px] text-gray-400'>
                {['Campaign'].includes(title || '') ? data?.code : data?.number}
              </p>
            </div>
          </div>
        </div>
      )
    }

    if (['Country'].includes(title || '')) {
      return (
        <div className='flex gap-[3px] items-center w-full h-[100%]'>
          <Flag code={data?.country} className='w-[20px] flex-shrink-0' />
          <p className='font-medium flex-grow whitespace-break-spaces leading-[15px] break-words'>
            {countries.getName(data?.country, 'en') || 'Unknown Country'}
          </p>
        </div>
      )
    }
    if (['Campaign note'].includes(title || '')) {
      return (
        <div className='flex gap-[3px] items-start w-[100%] h-[100%] justify-end'>
          <MdAdd className='text-[20px] cursor-pointer flex' />
        </div>
      )
    }
    if (['Campaign timeLine'].includes(title || '')) {
      return (
        <div className='flex font-medium'>
          {formatDate((data?.start_time as string) || '')} - {formatDate(data?.end_time as string)}
        </div>
      )
    }
    if (['Campaign status'].includes(title || '')) {
      return (
        <div className='flex font-medium'>
          <Status status={data?.status || 0} update_time={data?.update_time as string} />
        </div>
      )
    }
    return <div className='flex font-medium'>{value}</div>
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
