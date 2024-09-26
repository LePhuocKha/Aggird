import {useCallback, useEffect, useRef, useState} from 'react'
import {data_type, generateData} from '../data-fake/Api'
import Loading from '../loading/Loading'
import InputCheckBox from '../checkbox/InputCheckBox'
import CellComponent from './CellComponent'
import MenuTable from './MenuTable'
import Table from './Table'
import {formatDate, getMonthsIsTheTime} from '../../utils/common'
import {ColDef, IGetRowsParams} from 'ag-grid-community'

import {AgGridReact} from 'ag-grid-react'
import {SlExclamation} from 'react-icons/sl'
import Cookies from 'js-cookie'
import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model'
import {ModuleRegistry} from '@ag-grid-community/core'
import {ColumnsToolPanelModule} from '@ag-grid-enterprise/column-tool-panel'
import {MenuModule} from '@ag-grid-enterprise/menu'
import {FaRectangleAd} from 'react-icons/fa6'
import {MdAdd, MdFolderCopy} from 'react-icons/md'
import {BsThreeDotsVertical} from 'react-icons/bs'
import {FaLongArrowAltDown} from 'react-icons/fa'
import countries from 'i18n-iso-countries'

import './style.scss'

import 'ag-grid-community/styles/ag-grid.css' // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css' // Optional Theme applied to the Data Grid
import 'tippy.js/dist/tippy.css'
import 'ag-grid-enterprise'

ModuleRegistry.registerModules([ClientSideRowModelModule, ColumnsToolPanelModule, MenuModule])
countries.registerLocale(require('i18n-iso-countries/langs/en.json'))

export interface Server {
  getData: (request: IGetRowsParams) => {
    success: boolean
    rows: any[]
    totalRows: number
  }
}
const Aggird = () => {
  const [selectRow, setSelectRow] = useState<string[]>([])
  const [Data, setData] = useState<any[]>([])
  const gridRef = useRef<AgGridReact<any>>(null)
  const [pagination, setPagination] = useState(10)
  const [numberLoadData, setNumberLoadData] = useState<number>(0)
  const [loadingMore, setLoadingMore] = useState(false)
  const [selectedColumns, setSelectedColumns] = useState<{colId: string; hide: boolean}[]>([])

  const colf: ColDef[] = [
    {
      colId: '1',
      headerClass: 'custom-header',
      headerComponentParams: {
        id: 1,
        Tippy: false,
        classCSS: 'border-r-[1px] border-gray-300 justify-center gap-2',
        children: (
          <InputCheckBox
            checked={selectRow.length === pagination}
            onChange={() => {
              if (selectRow.length === pagination) {
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
      colId: '2',
      headerComponentParams: {
        id: 2,
        Tippy: false,
        classCSS: 'justify-center',
        children: <SlExclamation className='SlExclamation' />,
      },
      cellRenderer: CellComponent,
      cellRendererParams: {
        Tippy: false,
        type: 'red_dot',
      },
      flex: 1,
      minWidth: 30,
    },
    {
      colId: '3',
      headerComponentParams: {
        id: 3,
        title: 'Marketplace',
      },
      cellRenderer: CellComponent,
      valueGetter: (p) => {
        return JSON.stringify({
          label: p.data.marketplace,
        })
      },
      flex: 4,
      minWidth: 120,
    },
    {
      colId: '4',
      headerComponentParams: {
        id: 4,
        title: 'Ad Tool',
      },
      cellRenderer: CellComponent,
      valueGetter: (p) => {
        return JSON.stringify({
          label: `${p.data.marketplace} . ${p.data.adTool}`,
        })
      },
      cellRendererParams: {
        icon: <FaRectangleAd />,
      },
      flex: 5,
      minWidth: 180,
    },

    {
      colId: '5',
      headerComponentParams: {
        id: 5,
        title: 'Campaign',
      },
      cellRenderer: CellComponent,
      valueGetter: (p) => {
        return JSON.stringify({
          hashtag: `${p.data.shop} shop`,
          label: `${p.data.title}`,
          stubtext: `${p.data.marketplace} ${p.data.adTool} ${p.data.code}`,
        })
      },
      cellRendererParams: {
        icon: <MdFolderCopy />,
      },
      flex: 7,
      minWidth: 210,
    },
    {
      colId: '6',
      headerComponentParams: {
        id: 6,
        title: 'Country',
      },
      cellRenderer: CellComponent,
      valueGetter: (p) => {
        return JSON.stringify({
          label: `${countries.getName(p.data.country, 'en') || 'Unknown Country'}`,
        })
      },
      cellRendererParams: {
        type: 'country',
      },
      flex: 4,
      minWidth: 120,
    },
    {
      colId: '7',
      headerComponentParams: {
        id: 7,
        title: 'Storefront',
      },
      cellRenderer: CellComponent,
      valueGetter: (p) => {
        return JSON.stringify({
          hashtag: `${p.data.shop} shop`,
          label: `${p.data.title}`,
          stubtext: `${p.data.marketplace} ${p.data.adTool} ${p.data.number}`,
        })
      },
      cellRendererParams: {
        icon: <MdFolderCopy />,
      },
      flex: 6,
      minWidth: 210,
    },
    {
      colId: '8',
      headerComponentParams: {
        id: 8,
        title: 'First search...',
        children: <SlExclamation className='SlExclamation' />,
      },
      minWidth: 120,
      flex: 4,
    },
    {
      flex: 4,
      colId: '9',
      headerComponentParams: {
        id: 9,
        title: 'Campaign note',
      },
      cellRenderer: CellComponent,
      cellRendererParams: {
        Tippy: false,
        classCSSWrapper: 'justify-end items-center p-2',
        icon: <MdAdd className='text-[20px] cursor-pointer flex' />,
      },
      minWidth: 120,
    },
    {
      colId: '10',
      headerComponentParams: {
        id: 10,
        title: 'Campaign timeLine',
        children: <SlExclamation className='SlExclamation' />,
      },
      cellRenderer: CellComponent,
      valueGetter: (p) => {
        return JSON.stringify({
          label: `${formatDate(p.data.start_time as string)} - ${formatDate(
            p.data.end_time as string
          )}`,
        })
      },

      flex: 7,
      minWidth: 200,
    },
    {
      colId: '11',
      headerComponentParams: {
        id: 11,
        title: 'Campaign status',
        classCSS: 'justify-start',
      },
      cellRenderer: CellComponent,
      valueGetter: (p) => {
        return JSON.stringify({
          label: `${p.data?.status === 1 ? 'Ongoing' : 'Ended'}`,
          stubtext: `${getMonthsIsTheTime(p.data.update_time)}`,
        })
      },
      cellRendererParams: {
        type: 'status',
      },
      flex: 5,
      minWidth: 190,
    },
    {
      colId: '12',
      type: 'date',
      field: 'test',
      headerComponentParams: {
        id: 12,
        classCSS: 'justify-start',
        title: 'Test',
      },
      flex: 3,
      minWidth: 90,
    },
  ]
  useEffect(() => {
    Cookies.set('menu', 'false')
  }, [])

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

  const handleLoadMore = async () => {
    setLoadingMore(true)
    setTimeout(() => {
      setPagination((prev) => prev + 10)
      setLoadingMore(false)
    }, 1000)
  }

  return (
    <div className='px-[50px]'>
      <MenuTable
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
      <div>
        <Table
          saveColumnCookies='columnDefs'
          selectRow={selectRow}
          setSelectRow={setSelectRow}
          numberLoadData={numberLoadData}
          setNumberLoadData={setNumberLoadData}
          pagination={pagination}
          setPagination={setPagination}
          gridRef={gridRef}
          setData={setData}
          colf={colf}
        />
      </div>

      <div className='py-[10px] flex'>
        {loadingMore ? (
          <Loading />
        ) : (
          <div
            onClick={handleLoadMore}
            className='flex items-center cursor-pointer px-[30px] text-gray-400'
          >
            <FaLongArrowAltDown /> Load <span className='text-gray-900 ml-[3px]'> 10 more</span>{' '}
            <BsThreeDotsVertical className='ml-[7px] text-gray-900' />
          </div>
        )}
      </div>
    </div>
  )
}

export default Aggird
