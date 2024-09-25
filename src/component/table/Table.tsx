import {Dispatch, useCallback, useEffect, useState} from 'react'
import {data_type, generateData} from '../data-fake/Api'
import Loading from '../loading/Loading'
import HeaderComponent from './HeaderComponent'
import {AgGridReact} from 'ag-grid-react'
import Cookies from 'js-cookie'
import {ColDef, IGetRowsParams} from 'ag-grid-community'
import {
  ColGroupDef,
  GetRowIdFunc,
  GetRowIdParams,
  GridApi,
  GridOptions,
  ModuleRegistry,
  RowSelectedEvent,
  SelectionOptions,
  ValueFormatterParams,
  createGrid,
} from '@ag-grid-community/core'
import './style.scss'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import 'ag-grid-enterprise'

type Props = {
  colf: ColDef[]
  gridRef: any
  defaultColf?: boolean
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
  const [outerVisibleCell, setOuterVisibleCell] = useState<{idTr: string; idHeader: number}>({
    idTr: '',
    idHeader: 0,
  })
  const [savedColumnState, setSavedColumnState] = useState<ColDef[]>([])

  useEffect(() => {
    const savedState = Cookies.get(saveColumnCookies)
      ? (JSON.parse(Cookies.get(saveColumnCookies) || '[]') || []).map((cookies: any) => {
          const findColf: any = colf.find((fin) => fin.colId === cookies?.colId)
          const {flex, ...find_colf} = findColf
          const {flex: flexCoookies, ...cookie} = cookies

          return {
            ...find_colf,
            ...cookie,
          }
        })
      : numberLoadData === 0
      ? colf
      : colf.map((el) => {
          const {...e} = el
          return {...e}
        })
    setSavedColumnState(savedState.length ? savedState : colf)
  }, [saveColumnCookies, colf, numberLoadData])

  useEffect(() => {
    Cookies.set('menu', 'false')
  }, [])

  const createFakeServer = (allData: data_type[]) => ({
    getData: (request: IGetRowsParams) => {
      const {startRow, endRow} = request
      const rowsThisPage = allData.slice(startRow, endRow)
      const lastRow = allData.length
      return {
        success: true,
        rows: rowsThisPage,
        totalRows: lastRow,
      }
    },
  })

  const loadData = async (params: any) => {
    const fakeData = (await generateData(100, params)) || []

    const fakeServer = createFakeServer([...fakeData])
    setData([...fakeData])

    const datasource = {
      getRows: (params: any) => {
        const response = fakeServer.getData(params.request)
        setTimeout(() => {
          if (response.success) {
            params.success({rowData: response.rows, rowCount: response.totalRows})
          } else {
            params.fail()
          }
        }, 500)
      },
    }
    params.api.setGridOption('serverSideDatasource', datasource)
  }

  const restoreState = useCallback(() => {
    const savedColumnState = JSON.parse(Cookies.get(saveColumnCookies) || '[]')
    gridRef?.current!.api.applyColumnState({
      state: savedColumnState.length ? savedColumnState : colf,
      applyOrder: true,
    })
  }, [gridRef, saveColumnCookies])

  const onGridReady = useCallback(
    async (params: any) => {
      setNumberLoadData(2)
      await restoreState()
      await loadData(params)
    },
    [restoreState]
  )

  const handleColumnChange = useCallback(() => {
    Cookies.set(saveColumnCookies, JSON.stringify(gridRef?.current?.api?.getColumnState()))
  }, [gridRef, saveColumnCookies])
  const onRowSelected = useCallback((event: any) => {
    // event.data: ICar | undefined
    if (event.data && event.node.isSelected()) {
      const price = event.data.price
      // event.context: IContext
      const discountRate = event.context.discount
      console.log('Price with 10% discount:', price * discountRate)
    }
  }, [])
  return (
    <div>
      <div className='ag-theme-quartz'>
        <AgGridReact
          ref={gridRef}
          domLayout='autoHeight'
          columnDefs={savedColumnState}
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
          onRowSelected={onRowSelected}
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
