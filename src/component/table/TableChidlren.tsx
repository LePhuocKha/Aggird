import {Dialog} from 'primereact/dialog'
import {AgGridReact} from 'ag-grid-react'
import {useEffect, useRef, useState} from 'react'
import {ColDef} from 'ag-grid-community'

import CellComponent from './CellComponent'
import InputCheckBox from '../checkbox/InputCheckBox'
import Button from '../button/Button'
import HeaderComponent from './HeaderComponent'
import Table from './Table'
import Select from '../select/Select'
import {data_type, generateData} from '../data-fake/Api'

import {FaRegCalendarMinus} from 'react-icons/fa6'
import {IoCloseCircle} from 'react-icons/io5'

import './style.scss'
import {formatDate} from '../../utils/common'
import moment from 'moment'
import Cookies from 'js-cookie'
import MenuTable from './MenuTable'
import {IGetRowsParams} from '@ag-grid-community/core'
import {Server} from './Aggird'

type Props = {
  open: boolean
  tablePlacet: {
    top: number
    left: number
    right: number
    bottom: number
  }
  handleClose: () => void
}

const TableChidlren = ({open, handleClose, tablePlacet}: Props) => {
  const gridRef = useRef<AgGridReact<any>>(null)
  const [pagination, setPagination] = useState(10)
  const [numberLoadData, setNumberLoadData] = useState<number>(0)
  const [selectRow, setSelectRow] = useState<string[]>([])
  const [Data, setData] = useState<data_type[]>([])
  const [selectedColumns, setSelectedColumns] = useState<{colId: string; hide: boolean}[]>([])

  useEffect(() => {
    Cookies.remove('columnDefs_Table_Children')
  }, [])

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
              if (selectRow.length >= pagination) {
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
      minWidth: 30,
      flex: 1,
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
      flex: 3,
      minWidth: 30,
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
      flex: 5,
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
      flex: 5,
    },
  ]

  const createServerSideDatasource = (server: Server) => {
    return {
      getRows: (params: any) => {
        // Simulate server call
        const response = server.getData(params.request)

        setTimeout(() => {
          if (response.success) {
            params.success({
              rowData: response.rows,
              rowCount: response.totalRows,
            })
          } else {
            params.fail()
          }
        }, 500)
      },
    }
  }

  const createFakeServer = (allData: data_type[]) => {
    return {
      getData: (request: IGetRowsParams) => {
        const {startRow, endRow} = request
        const rowsThisPage = allData.slice(startRow, endRow)
        const lastRow = allData.length
        return {
          success: true,
          rows: rowsThisPage,
          totalRows: lastRow, // Total number of rows available on the server
        }
      },
    }
  }
  const loadData = async (params: any) => {
    const fakeData = (await generateData(100, params)) || []
    setNumberLoadData((prev) => prev + 1)
    // Setup the fake server with the updated dataset
    const fakeServer = createFakeServer([...fakeData])
    setData((prevData) => [...fakeData])
    // create datasource with a reference to the fake server
    const datasource = await createServerSideDatasource(fakeServer)
    // register the datasource with the grid

    params?.api?.setGridOption('serverSideDatasource', datasource)
  }
  return (
    <Dialog
      visible={open}
      style={{
        width: 'auto',
        position: 'absolute',
      }}
      onHide={() => {}}
    >
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
          <MenuTable
            filterHideColumn={['21']}
            setNumberLoadData={setNumberLoadData}
            saveColumnCookies='columnDefs'
            selectedColumns={selectedColumns}
            setSelectRow={setSelectRow}
            setSelectedColumns={setSelectedColumns}
            gridRef={gridRef}
            handleClickResetColumn={() => {
              loadData(gridRef?.current)
            }}
          />
        </div>
      </div>
      <div className='max-h-[calc(100vh-220px)] overflow-y-auto'>
        <Table
          idHideColf={['21']}
          saveColumnCookies={'columnDefs_Table_Children'}
          selectRow={selectRow}
          setSelectRow={setSelectRow}
          setPagination={setPagination}
          setData={setData}
          defaultColf={true}
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
