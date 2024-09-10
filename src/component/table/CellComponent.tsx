import React, {Dispatch, useMemo} from 'react'

import {data_type} from '../data-fake/Api'
import HoverTippyCell from './HoverTippyCell'
import InputCheckBox from '../checkbox/InputCheckBox'
import Status from './Status'

import countries from 'i18n-iso-countries'
import Flag from 'react-world-flags'
import Cookies from 'js-cookie'

type children_config_data = {
  css?: string
  render_key: string[]
  after_text: string
}

type rowData = {
  hashtag: string
  label: string
  stubtext: string
}
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
      idTr: string
      idHeader: number
    }>
  >
  icon: React.ReactNode
  configData?: children_config_data[]
  outerVisibleCell: {
    idTr: string
    idHeader: number
  }
  value: string
  classCSSWrapper?: string
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
  icon,
  type,
  classCSSWrapper,
  value,
  ...rest
}: PropsCell) => {
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

  const rowData: rowData = JSON.parse(value || '{}')
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
    return (
      <div
        className={`flex gap-[3px] h-[100%] ${
          classCSSWrapper ? classCSSWrapper : 'justify-start items-center'
        }`}
      >
        {icon && icon}
        {type === 'country' && (
          <Flag code={data?.country} className='w-[20px] min-w-[20px] flex-shrink-0' />
        )}
        {['status'].includes(type as string) && (
          <Status status={Number(data?.status) || 0} update_time={data?.update_time as string} />
        )}
        <div className='flex flex-col gap-[3px]'>
          <p className='leading-[11px] text-[10px] text-sky-500 font-medium whitespace-break-spaces flex justify-start items-center  break-words'>
            {rowData?.hashtag}
          </p>
          <p
            className={`text-[14px] ${
              rowData?.hashtag ? 'text-sky-800 ' : 'text-gray-700'
            } font-medium whitespace-break-spaces flex justify-start items-center leading-[15px] break-words`}
          >
            {rowData?.label}
          </p>
          <p className='leading-[12px] text-[12px] text-gray-400 font-medium whitespace-break-spaces flex justify-start items-center  break-words'>
            {rowData?.stubtext}
          </p>
        </div>
      </div>
    )
  }, [data, selectRow])

  const handleMouseEnter = () => {
    if (Cookies.get('menu') !== 'true') {
      if (outerVisibleCell.idTr !== data?.id) {
        setOuterVisibleCell({
          idHeader: Number(id) || 0,
          idTr: data?.id || 0,
        })
        setOuterVisibleHeader(0)
      }
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
          <div
            onClick={() => {
              setOuterVisibleCell({
                idHeader: 0,
                idTr: '',
              })
            }}
            className='h-[100%] w-[100%]'
            onMouseEnter={handleMouseEnter}
          >
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
