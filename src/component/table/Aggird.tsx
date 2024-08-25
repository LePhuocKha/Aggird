import {useRef, useState} from 'react'
import {Api} from '../data-fake/Api'
import {formatDate} from '../../utils/common'
import InputCheckBox from '../checkbox/InputCheckBox'
import HoverTippyCell from './HoverTippyCell'
import HeaderComponent from './HeaderComponent'
import Status from './Status'

import {AgGridReact} from 'ag-grid-react'
import {GoDotFill} from 'react-icons/go'
import {FaRectangleAd} from 'react-icons/fa6'
import {MdFolderCopy} from 'react-icons/md'
import {SiHomeassistantcommunitystore} from 'react-icons/si'
import {MdAdd} from 'react-icons/md'
import {SlExclamation} from 'react-icons/sl'
import Flag from 'react-world-flags'

import './style.scss'

import 'ag-grid-community/styles/ag-grid.css' // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css' // Optional Theme applied to the Data Grid
import 'tippy.js/dist/tippy.css'


const Aggird = () => {
  const [selectRow, setSelectRow] = useState<number[]>([])
  const gridRef = useRef<AgGridReact<any>>(null)
  const [outerVisibleHeader, setOuterVisibleHeader] = useState<number>(0)
  const [columnDefs, setColumnDefs] = useState<number[]>([])

  const CustomAdTool = (props: any) => {
    return (
      <HoverTippyCell classCSS='h-[100%] w-[100%]  h-[43px]'>
        <div className='flex justify-start items-center gap-[3px]  h-[43px]'>
          <FaRectangleAd />
          <p className='font-medium'>{props?.data?.marketplace}</p>
          <GoDotFill className='w-[10px]' />
          <p className='font-medium'>{props?.data?.adTool}</p>
        </div>
      </HoverTippyCell>
    )
  }

  const CustomCampaign = (props: any) => {
    return (
      <HoverTippyCell classCSS='h-[100%] w-[100%] '>
        <div className='flex justify-start items-center gap-[3px]  h-[43px]'>
          <MdFolderCopy />
          <div className='flex flex-col gap-[3px]'>
            <a className='leading-[12px] text-[10px] text-sky-500'>{props?.data?.shop} Shop</a>
            <p className='leading-[16px] font-semibold text-[14px] text-sky-800'>
              {props?.data?.title}{' '}
            </p>
            <div className='flex justify-start items-center gap-[3px]'>
              <p className='leading-[13px] text-[12px] text-gray-400'>{props?.data?.marketplace}</p>
              <GoDotFill className='text-gray-400' />
              <p className='leading-[13px] text-[12px] text-gray-400'>{props?.data?.adTool}</p>
              <GoDotFill className='text-gray-400' />
              <p className='leading-[13px] text-[12px] text-gray-400'>{props?.data?.code}</p>
            </div>
          </div>
        </div>
      </HoverTippyCell>
    )
  }

  const CustomCountry = (props: any) => {
    return (
      <HoverTippyCell classCSS='h-[100%] w-[100%]'>
        <div className='flex gap-[3px] items-center   h-[43px]'>
          <Flag code={'VN'} className='w-[20px]' />
          <p className='font-medium'>{props?.data?.country}</p>
        </div>
      </HoverTippyCell>
    )
  }

  const CustomStore = (props: any) => {
    return (
      <HoverTippyCell classCSS='h-[100%] w-[100%] '>
        <div className='flex items-center gap-[5px]  h-[43px]'>
          <SiHomeassistantcommunitystore />
          <div className='flex flex-col'>
            <a href='/' className='leading-[12px] text-[10px] text-sky-500'>
              {props?.data?.company}
            </a>
            <p className='leading-[16px] font-semibold text-[14px] text-sky-800'>
              {props?.data?.shop} Shop
            </p>
            <div className='flex justify-start items-center gap-[3px] '>
              <p className='leading-[13px] text-[12px] text-gray-400'>{props?.data?.marketplace}</p>
              <GoDotFill className='text-gray-400' />
              <p className='leading-[13px] text-[12px] text-gray-400'>{props?.data?.adTool}</p>
              <GoDotFill className='text-gray-400' />
              <p className='leading-[13px] text-[12px] text-gray-400'>{props?.data?.number}</p>
            </div>
          </div>
        </div>
      </HoverTippyCell>
    )
  }

  const CustomCampaignTimeLine = (props: any) => {
    return (
      <HoverTippyCell classCSS='h-[100%] w-[100%] '>
        <div className='flex font-medium items-center h-[43px]'>
          {formatDate(props?.data?.start_time)} - {formatDate(props?.data?.end_time)}
        </div>
      </HoverTippyCell>
    )
  }

  const CustomNote = (props: any) => {
    return (
      <HoverTippyCell classCSS='h-[100%] w-[100%]  '>
        <div className='flex justify-end  w-[100%] h-[43px]'>
          <MdAdd className='text-[20px] cursor-pointer flex' />
        </div>
      </HoverTippyCell>
    )
  }

  const CustomStatus = (props: any) => {
    return (
      <HoverTippyCell classCSS='h-[100%] w-[100%] h-[43px]  '>
        <Status status={props?.data?.status} update_time={props?.data?.update_time} />
      </HoverTippyCell>
    )
  }

  const colf = [
    {
      id: 1,
      headerComponent: () => {
        return (
          <HeaderComponent
         
          outerVisibleHeader={outerVisibleHeader} setOuterVisibleHeader={setOuterVisibleHeader} 
            classCSS='border-r-[1px] border-gray-300 justify-center'
            Tippy={false}
            id={1}
            setColumnDefs={setColumnDefs}
          >
            <InputCheckBox
              checked={selectRow.length === Api.length}
              onChange={() => {
                if (selectRow.length === Api.length) {
                  setSelectRow([])
                } else {
                  setSelectRow(Api?.map((el: any) => el?.id))
                }
              }}
            />
          </HeaderComponent>
        )
      },

      cellRenderer: (props: any) => {
        const handleCheckboxClick = () => {
          setSelectRow((prev: number[]) => {
            if (!Array.isArray(prev)) {
              return [props?.data?.id]
            }

            if (prev.includes(props?.data?.id)) {
              return prev.filter((id) => id !== props?.data?.id)
            } else {
              return [...prev, props?.data?.id]
            }
          })
        }
        return (
          <div className='flex justify-center w-[100%] items-center h-[100%]'>
            <InputCheckBox
              onChange={handleCheckboxClick}
              checked={selectRow.includes(props?.data?.id)}
            />
          </div>
        )
      },
      flex: 1,
    },
    {
      id: 2,
      headerComponent: () => {
        return (
          <HeaderComponent
         
          outerVisibleHeader={outerVisibleHeader} setOuterVisibleHeader={setOuterVisibleHeader} 
            classCSS='justify-center'
            Tippy={false}
            id={2}
            setColumnDefs={setColumnDefs}
          >
            <SlExclamation className='SlExclamation' />
          </HeaderComponent>
        )
      },
      cellRenderer: (props: any) => {
        return (
          <div className='flex justify-center h-[100%] w-[100%] items-center'>
            <div className='bg-red-500 w-[10px] h-[10px] rounded-full shrink-0'></div>
          </div>
        )
      },
      flex: 2,
    },
    {
      id: 3,
      headerComponent: () => {
        return <HeaderComponent  outerVisibleHeader={outerVisibleHeader} setOuterVisibleHeader={setOuterVisibleHeader}  id={3} setColumnDefs={setColumnDefs} title='Marketplace' />
      },
      cellRenderer: (props: any) => {
        return (
          <HoverTippyCell classCSS='h-[100%] w-[100%]'>
            <div className='flex h-[100%] items-center'>
              <p className='font-medium'>{props?.data?.marketplace}</p>
            </div>
          </HoverTippyCell>
        )
      },
      flex: 4,
    },
    {
      id: 4,
      headerComponent: () => {
        return <HeaderComponent   outerVisibleHeader={outerVisibleHeader} setOuterVisibleHeader={setOuterVisibleHeader} id={4} setColumnDefs={setColumnDefs} title='Ad Tool' />
      },
      cellRenderer: CustomAdTool,
      flex: 5,
    },
    {
      id: 5,
      headerComponent: () => {
        return (
          <HeaderComponent   outerVisibleHeader={outerVisibleHeader} setOuterVisibleHeader={setOuterVisibleHeader}  id={5} setColumnDefs={setColumnDefs} title='Campaign'>
            <SlExclamation className='SlExclamation' />
          </HeaderComponent>
        )
      },
      cellRenderer: CustomCampaign,
      flex: 7,
    },
    {
      id: 6,
      headerComponent: () => {
        return <HeaderComponent  outerVisibleHeader={outerVisibleHeader} setOuterVisibleHeader={setOuterVisibleHeader} id={6} setColumnDefs={setColumnDefs} title='Country' />
      },
      cellRenderer: CustomCountry,
      flex: 4,
      sortable: false,
    },
    {
      id: 7,
      headerComponent: () => {
        return <HeaderComponent   outerVisibleHeader={outerVisibleHeader} setOuterVisibleHeader={setOuterVisibleHeader}  id={7} setColumnDefs={setColumnDefs} title='Storefront' />
      },
      cellRenderer: CustomStore,
      autoHeight: true,
      flex: 6,
    },
    {
      id: 8,
      headerComponent: () => {
        return (
          <HeaderComponent   outerVisibleHeader={outerVisibleHeader} setOuterVisibleHeader={setOuterVisibleHeader}  id={8} setColumnDefs={setColumnDefs} title='First search...'>
            <SlExclamation className='SlExclamation' />
          </HeaderComponent>
        )
      },
      flex: 3,
    },
    {
      id: 9,
      headerComponent: () => {
        return <HeaderComponent   outerVisibleHeader={outerVisibleHeader} setOuterVisibleHeader={setOuterVisibleHeader}  id={9} setColumnDefs={setColumnDefs} title='Campaign note' />
      },
      flex: 4,
      cellRenderer: CustomNote,
    },
    {
      id: 10,
      
      headerComponent: () => {
        return (
          <HeaderComponent   outerVisibleHeader={outerVisibleHeader} setOuterVisibleHeader={setOuterVisibleHeader}  id={10} setColumnDefs={setColumnDefs} title='Campaign timeLine'>
            <SlExclamation className='SlExclamation' />
          </HeaderComponent>
        )
      },

      cellRenderer: CustomCampaignTimeLine,
      flex: 7,
    },
    {
      id: 11,
      headerComponent: () => {
        return <HeaderComponent   outerVisibleHeader={outerVisibleHeader} setOuterVisibleHeader={setOuterVisibleHeader}  id={11} setColumnDefs={setColumnDefs} title='Campaign status' />
      },
      cellRenderer: CustomStatus,
      flex: 5,
    },
  ]
  return (

      <div  className='ag-theme-quartz' style={{height: '200px'}}>
        <AgGridReact

          // ref={gridRef}
          defaultColDef={{
            resizable: false,
          }}
          rowData={Api}
          columnDefs={colf.filter((el) => !columnDefs.includes(el?.id))}
        />
      </div>
  )
}

export default Aggird
