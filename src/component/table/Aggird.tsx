import {useCallback, useEffect, useRef, useState} from 'react'
import {generateData} from '../data-fake/Api'
import Loading from '../loading/Loading'
import InputCheckBox from '../checkbox/InputCheckBox'
import HeaderComponent from './HeaderComponent'
import CellComponent from './CellComponent'
import MenuTable from './MenuTable'
import {formatDate} from '../../utils/common'

import {AgGridReact} from 'ag-grid-react'
import {SlExclamation} from 'react-icons/sl'
import Cookies from 'js-cookie'
import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model'
import {ModuleRegistry} from '@ag-grid-community/core'
import {ColumnsToolPanelModule} from '@ag-grid-enterprise/column-tool-panel'
import {MenuModule} from '@ag-grid-enterprise/menu'
import {ColDef} from 'ag-grid-community'
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
const Aggird = () => {
  const [selectRow, setSelectRow] = useState<number[]>([])
  const gridRef = useRef<AgGridReact<any>>(null)

  const [outerVisibleHeader, setOuterVisibleHeader] = useState<number>(0)
  const [checkMenuOnOff, setCheckMenuOnOff] = useState(false)
  const [Data, setData] = useState<any[]>([])
  const [rowsToLoad, setRowsToLoad] = useState(10)
  const [loadingMore, setLoadingMore] = useState(false)
  const [outerVisibleCell, setOuterVisibleCell] = useState<{
    idTr: string
    idHeader: number
  }>({
    idTr: '',
    idHeader: 0,
  })

  const [selectedColumns, setSelectedColumns] = useState<{colId: string; hide: boolean}[]>([])

  useEffect(() => {
    Cookies.set('menu', 'false')
  }, [])

  const colf: ColDef[] = [
    {
      colId: '1',
      headerComponentParams: {
        id: 1,
        Tippy: false,
        classCSS: 'border-r-[1px] border-gray-300 justify-center gap-2',
        children: (
          <InputCheckBox
            checked={selectRow.length === Data?.length}
            onChange={() => {
              if (selectRow.length === Data.length) {
                setSelectRow([])
              } else {
                setSelectRow(Data?.map((el: any) => el?.id))
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
        classCSSWrapper: 'justify-end items-start p-2',
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
    },
  ]

  const createServerSideDatasource = (server: any) => {
    return {
      getRows: (params: any) => {
        // get data for request from our fake server
        const response = server.getData(params?.request)
        // simulating real server call with a 500ms delay
        setTimeout(() => {
          if (response.success) {
            // supply rows for requested block to grid
            params.success({rowData: response?.rows})
          } else {
            params.fail()
          }
        }, 500)
      },
    }
  }

  const createFakeServer = (allData: any) => {
    return {
      getData: (request: any) => {
        // in this simplified fake server all rows are contained in an array
        const requestedRows = allData.slice(request?.startRow, request?.endRow)
        return {
          success: true,
          rows: requestedRows,
        }
      },
    }
  }
  const loadData = async (params: any, numberRow = 10) => {
    const fakeData = (await generateData(numberRow, params)) || []

    // Setup the fake server with the updated dataset
    const fakeServer = createFakeServer([...fakeData])
    setData((prevData) => [...fakeData])
    // create datasource with a reference to the fake server
    const datasource = await createServerSideDatasource(fakeServer)
    // register the datasource with the grid

    params?.api?.setGridOption('serverSideDatasource', datasource)
  }

  const restoreState = useCallback(() => {
    const savedColumnState = JSON.parse(Cookies.get('columnDefs') || '[]')
    if (savedColumnState) {
      gridRef.current!.api.applyColumnState({
        state: savedColumnState,
        applyOrder: true,
      })
    }
  }, [])

  const onGridReady = useCallback(
    async (params: any) => {
      await loadData(params, rowsToLoad)
      await restoreState()
    },
    [rowsToLoad]
  )

  const handleLoadMore = async () => {
    setLoadingMore(true)

    // Generate 10 more rows of data
    const newFakeData = await generateData(10, gridRef.current)

    // Update the current data state with the new data
    setData((prevData) => {
      const updatedData = [...prevData, ...newFakeData]
      console.log(updatedData)

      // Directly update the AG Grid's row data
      gridRef.current!.api.applyServerSideTransactionAsync({route: [], add: updatedData})
      return updatedData
    })

    setLoadingMore(false)
  }

  const handleColumnChange = useCallback((params: any) => {
    setTimeout(() => {
      const colDefs = gridRef.current!.api.getColumnDefs() || []
      const simpleColDefs = colDefs.map((colDef: any) => ({
        colId: colDef.colId,
        field: colDef.field,
        width: colDef.width,
        sort: colDef.sort,
        sortIndex: colDef.sortIndex,
        hide: colDef.hide ? true : false,
      }))
      Cookies.set('columnDefs', JSON.stringify(simpleColDefs), {expires: 7})
    }, 500)
  }, [])

  return (
    <div>
      <MenuTable
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
        gridRef={gridRef}
        handleClickResetColumn={() => {
          loadData(gridRef?.current, rowsToLoad)
        }}
      />
      <div>
        <div className='ag-theme-quartz'>
          <AgGridReact
            ref={gridRef}
            rowData={Data}
            domLayout='autoHeight'
            defaultColDef={{
              // resizable: false,
              autoHeight: true,
              minWidth: 150,
              headerComponent: HeaderComponent,
              headerComponentParams: {
                checkMenuOnOff,
                setCheckMenuOnOff,
                outerVisibleCell,
                setOuterVisibleCell,
                outerVisibleHeader,
                setOuterVisibleHeader,
              },
              cellRendererParams: {
                checkMenuOnOff,
                setCheckMenuOnOff,
                outerVisibleHeader,
                setOuterVisibleHeader,
                outerVisibleCell,
                setOuterVisibleCell,
                selectRow,
                setSelectRow,
              },
            }}
            onColumnMoved={handleColumnChange}
            onColumnVisible={handleColumnChange}
            columnMenu={'legacy'}
            rowHeight={53}
            rowModelType='serverSide'
            onGridReady={onGridReady}
            columnDefs={colf}
            loadingCellRenderer={Loading}
            loadingCellRendererParams={Loading}
          />
        </div>
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
