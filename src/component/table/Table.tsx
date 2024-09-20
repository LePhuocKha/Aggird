import {Dispatch, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {data_type, generateData} from '../data-fake/Api'
import Loading from '../loading/Loading'
import HeaderComponent from './HeaderComponent'

import {AgGridReact, AgGridReactProps} from 'ag-grid-react'
import Cookies from 'js-cookie'
import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model'
import {ModuleRegistry} from '@ag-grid-community/core'
import {ColumnsToolPanelModule} from '@ag-grid-enterprise/column-tool-panel'
import {MenuModule} from '@ag-grid-enterprise/menu'
import {ColDef, IGetRowsParams} from 'ag-grid-community'
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

type Props = {
  colf: ColDef[]
  gridRef: any
  Data: data_type[]
  setData: Dispatch<React.SetStateAction<data_type[]>>
  pagination: number
  numberLoadData: number
  selectRow: string[]
  setPagination: Dispatch<React.SetStateAction<number>>
  setSelectRow: Dispatch<React.SetStateAction<string[]>>
  setNumberLoadData: Dispatch<React.SetStateAction<number>>
  saveColumnCookies: string
}

const Table = ({
  colf,
  gridRef,
  //   Data,
  setData,
  pagination,
  setNumberLoadData,
  selectRow,
  setSelectRow,
  numberLoadData,
  saveColumnCookies,
}: Props) => {
  const [outerVisibleHeader, setOuterVisibleHeader] = useState<number>(0)
  const [checkMenuOnOff, setCheckMenuOnOff] = useState(false)
  const [outerVisibleCell, setOuterVisibleCell] = useState<{
    idTr: string
    idHeader: number
  }>({
    idTr: '',
    idHeader: 0,
  })

  useEffect(() => {
    Cookies.set('menu', 'false')
  }, [])
  useEffect(() => {
    const loadColumnStateFromCookies = () => {
      const savedColState = Cookies.get(saveColumnCookies)
      if (savedColState && gridRef.current && gridRef.current.api) {
        const colState = JSON.parse(savedColState)
        gridRef.current.api.applyColumnState({
          state: colState,
          applyOrder: true,
        })
      }
    }
    const kha = 'a'
    loadColumnStateFromCookies()
  }, [outerVisibleCell, checkMenuOnOff, outerVisibleHeader, selectRow, pagination])

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
  console.log(JSON.parse(Cookies.get(saveColumnCookies) || '[]'), 'kha')
  const restoreState = useCallback(() => {
    const savedColumnState = JSON.parse(Cookies.get(saveColumnCookies) || '[]')

    if (savedColumnState) {
      gridRef?.current!.api.applyColumnState({
        state: savedColumnState,
        applyOrder: true,
      })
    }
  }, [])

  const onGridReady = useCallback(async (params: any) => {
    await restoreState()
    await loadData(params)
  }, [])

  const handleColumnChange = useCallback((event: any) => {
    setTimeout(() => {
      Cookies.set(saveColumnCookies, JSON.stringify(gridRef.current.api.getColumnState()))
    }, 500)
  }, [])

  return (
    <div>
      <div className='ag-theme-quartz'>
        <AgGridReact
          ref={gridRef}
          domLayout='autoHeight'
          columnDefs={colf}
          defaultColDef={{
            autoHeight: true,
            resizable: true,
            sortable: true,
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
          suppressMoveWhenRowDragging={true}
          suppressDragLeaveHidesColumns={true}
          onColumnMoved={handleColumnChange}
          onColumnVisible={handleColumnChange}
          onDragStopped={handleColumnChange}
          columnMenu={'legacy'}
          rowHeight={53}
          rowModelType='serverSide'
          pagination={true}
          paginationPageSize={pagination}
          onGridReady={onGridReady}
          loadingCellRenderer={Loading}
          loadingCellRendererParams={Loading}
        />
      </div>
    </div>
  )
}

export default Table
