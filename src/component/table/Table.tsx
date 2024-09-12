import {Dispatch, useCallback, useEffect, useRef, useState} from 'react'
import {data_type, generateData} from '../data-fake/Api'
import Loading from '../loading/Loading'
import HeaderComponent from './HeaderComponent'

import {AgGridReact} from 'ag-grid-react'
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
  const savedColumnState = JSON.parse(Cookies.get('columnDefs') || '[]')
  const restoreState = useCallback(() => {
    const savedColumnState = JSON.parse(Cookies.get('columnDefs') || '[]')
    if (savedColumnState) {
      gridRef.current!.api.applyColumnState({
        state: savedColumnState,
        applyOrder: true,
      })
    }
  }, [])

  const onGridReady = useCallback(async (params: any) => {
    await restoreState()
    await loadData(params)
  }, [])

  const handleColumnChange = useCallback(() => {
    setTimeout(() => {
      const colDefs = gridRef?.current!.api.getColumnDefs() || []
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
      <div className='ag-theme-quartz'>
        <AgGridReact
          ref={gridRef}
          domLayout='autoHeight'
          defaultColDef={{
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
          suppressModelUpdateAfterUpdateTransaction={true}
          onColumnMoved={handleColumnChange}
          onColumnVisible={handleColumnChange}
          columnMenu={'legacy'}
          rowHeight={53}
          rowModelType='serverSide'
          pagination={true}
          paginationPageSize={pagination}
          onGridReady={onGridReady}
          columnDefs={
            [0].includes(numberLoadData)
              ? colf.map((el) => {
                  const find = savedColumnState.find((e: ColDef) => e?.colId === el?.colId)
                  return {
                    ...el,
                    ...find,
                  }
                })
              : colf
          }
          loadingCellRenderer={Loading}
          loadingCellRendererParams={Loading}
        />
      </div>
    </div>
  )
}

export default Table
