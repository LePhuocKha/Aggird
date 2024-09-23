import {Dialog} from 'primereact/dialog'
import {AgGridReact} from 'ag-grid-react'
import {useRef, useState} from 'react'
import {ColDef} from 'ag-grid-community'

import CellComponent from './CellComponent'
import InputCheckBox from '../checkbox/InputCheckBox'
import Button from '../button/Button'
import HeaderComponent from './HeaderComponent'
import Table from './Table'
import Select from '../select/Select'
import {data_type} from '../data-fake/Api'

import {FaRegCalendarMinus} from 'react-icons/fa6'
import {IoCloseCircle} from 'react-icons/io5'

import './style.scss'
import {HiDotsVertical} from 'react-icons/hi'
import {formatDate} from '../../utils/common'
import moment from 'moment'

type Props = {
  open: boolean
  handleClose: () => void
}

const TableChidlren = ({open, handleClose}: Props) => {
  const gridRef = useRef<AgGridReact<any>>(null)
  const [pagination, setPagination] = useState(10)
  const [numberLoadData, setNumberLoadData] = useState<number>(0)
  const [selectRow, setSelectRow] = useState<string[]>([])
  const [Data, setData] = useState<data_type[]>([])

  const colf: ColDef[] = [
    {
      colId: '21',
      headerClass: 'custom-header',
      headerComponent: HeaderComponent,
      headerComponentParams: {
        id: 21,
        Tippy: false,
        classCSS: 'border-r-[1px] border-gray-300 justify-center gap-2',
        children: (
          <InputCheckBox
            checked={selectRow.length >= pagination}
            onChange={() => {
              if (selectRow.length >= Data.length) {
                setSelectRow([])
              } else {
                setSelectRow(
                  Data?.map((el: any, index) => {
                    if (index < pagination) {
                      return el?.id
                    }
                    return '0'
                  }).filter((el) => el !== '0')
                )
              }
            }}
          />
        ),
      },
      cellRenderer: CellComponent,
      cellRendererParams: {
        Tippy: false,
        type: 'checkbox',
      },
      flex: 1,
      minWidth: 30,
    },
    {
      colId: '22',
      headerComponentParams: {
        id: 22,
        classCSS: 'justify-start',
        title: 'status',
        Tippy: false,
      },
      cellRenderer: CellComponent,
      valueGetter: (p: any) => {
        return JSON.stringify({
          label: `${p.data?.status === 1 ? 'Activated' : 'Disabled'}`,
        })
      },
      minWidth: 30,
      flex: 2,
    },
    {
      colId: '23',
      type: 'text',
      field: 'name',
      headerComponentParams: {
        id: 23,
        classCSS: 'justify-start',
        Tippy: false,
        title: 'Product name',
      },
      cellRenderer: CellComponent,
      valueGetter: (p: any) => {
        return JSON.stringify({
          label: `${p.data?.name}`,
          stubtext: `${p.data.number}`,
        })
      },
      minWidth: 30,
      flex: 3,
    },
    {
      colId: '24',
      type: 'text',
      field: 'brand',
      headerComponentParams: {
        id: 24,
        classCSS: 'justify-start',
        title: 'Brand',
        Tippy: false,
      },
      cellRenderer: CellComponent,
      valueGetter: (p: any) => {
        return JSON.stringify({
          label: `${p.data?.brand}`,
        })
      },
      minWidth: 30,
      flex: 2,
    },
  ]

  return (
    <Dialog visible={open} style={{width: '50vw'}} onHide={() => {}}>
      <div className='mb-[10px] flex justify-center items-center gap-[15px] h-[100%] mh-[50px]'>
        <Select className='w-[150px]' value={1} options={[{value: 1, label: 'container'}]} />
        <div className='flex justify-center items-center w-[100%] gap-[10px]'>
          <div className='flex gap-[10px] justify-center  w-[100%] items-center border-[1px] border-gray-300 px-[10px] py-[5px] h-[100%] min-h-[30px] rounded-sm'>
            <input className='outline-none border-none w-[100%]' placeholder='Search...' />
            <IoCloseCircle className='hover:cursor-pointer text-[20px]' />
            <p className='text-gray-400 m-[0] p-[0]'>0/100</p>
          </div>
          <Button className='h-[100%]'>Search</Button>
        </div>
        <div className='flex justify-center items-center gap-[10px]'>
          <div className='flex justify-center items-center gap-[10px] whitespace-nowrap font-semibold'>
            <FaRegCalendarMinus />
            <p className='p-0 m-0 text-[15px]'>
              This month, {formatDate(moment())} - {formatDate(moment())}{' '}
            </p>
          </div>
          <HiDotsVertical className='text-[20px]' />
        </div>
      </div>
      <div className='max-h-[calc(100vh-200px)] overflow-y-auto'>
        <Table
          defaultCol={[]}
          saveColumnCookies={'columnDefs_Table_Children'}
          selectRow={selectRow}
          setSelectRow={setSelectRow}
          setPagination={setPagination}
          setData={setData}
          pagination={pagination}
          gridRef={gridRef}
          numberLoadData={numberLoadData}
          setNumberLoadData={setNumberLoadData}
          colf={colf}
        />
      </div>
      <div className='bg-white flex gap-[10px] justify-end mt-[10px]'>
        <Button onClick={handleClose} colorButton='white'>
          Cancel
        </Button>
        <Button>Apply now</Button>
      </div>
    </Dialog>
  )
}

export default TableChidlren
