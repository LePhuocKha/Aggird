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

type children_config_data = {
  css?: string
  render_key: string[]
  after_text: string
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
      idTr: number
      idHeader: number
    }>
  >
  icons: React.ReactNode
  configData?: children_config_data[]
  outerVisibleCell: {
    idTr: number
    idHeader: number
  }
  classCSSWrapper?: string
  type?: string
  outerVisibleHeader: number
}

function handleFormatValue(value: any, key: string, type: string, data: data_type) {
  if (key === 'black_dot') {
    return <GoDotFill className='w-[10px]' />
  }
  if (key === 'dash') {
    return '-'
  }
  if (key === 'flag_country') {
    return <Flag code={data?.country} className='w-[20px] min-w-[20px] flex-shrink-0' />
  }
  if (key === 'country') {
    return `${countries.getName(value, 'en') || 'Unknown Country'}`
  }
  if (type === 'date' && !['black_dot', 'dash'].includes(key)) {
    return formatDate((value as string) || '')
  }
  if (key === 'status') {
    return <Status status={value || 0} update_time={data?.update_time as string} />
  }
  return value
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
  classCSSWrapper,
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
      case configData.length > 0 || !!icons:
        return (
          <div
            className={`flex gap-[3px] h-[100%] 
              ${classCSSWrapper ? classCSSWrapper : ' justify-start items-center'}
            `}
          >
            {icons && icons}
            <div
              className={`${
                configData.length > 1
                  ? 'flex flex-col'
                  : 'flex justify-start items-center gap-[3px]'
              }`}
            >
              {configData.map((config: children_config_data, i: number) => (
                <div key={i} className='flex justify-start items-center gap-[3px]'>
                  {config?.render_key?.map((key: string, index: number) => {
                    let value = data?.[key]
                    value = handleFormatValue(data?.[key], key, type || '', data)
                    return (
                      <div
                        key={index}
                        className={`font-medium whitespace-break-spaces flex justify-start items-center leading-[15px] break-words ${config?.css}`}
                      >
                        {value} {config?.after_text}
                      </div>
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
      if (outerVisibleCell.idTr !== +data?.id) {
        setOuterVisibleCell({
          idHeader: Number(id) || 0,
          idTr: +data?.id || 0,
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
                idTr: 0,
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
