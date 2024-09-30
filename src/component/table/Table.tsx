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
    setNumberLoadData(2)

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
    gridRef?.current!?.api.applyColumnState({
      state: savedColumnState.length
        ? savedColumnState
        : gridRef?.current?.api?.getColumnState().map((el: any) => {
            return {
              ...el,
              flex: null,
            }
          }),
      applyOrder: true,
    })
  }, [gridRef])

  const onGridReady = useCallback(async (params: any) => {
    await restoreState()
    await loadData(params)
  }, [])

  const handleColumnChange = useCallback(async () => {
    gridRef?.current!?.api.applyColumnState({
      state: gridRef?.current?.api?.getColumnState().map((el: any) => {
        return {
          ...el,
          flex: null,
        }
      }),
      applyOrder: true,
    })
    Cookies.set(saveColumnCookies, JSON.stringify(gridRef?.current?.api?.getColumnState()))
  }, [gridRef, saveColumnCookies])

  return (
    <div>
      <div className='ag-theme-quartz'>
        <AgGridReact
          ref={gridRef}
          domLayout='autoHeight'
          columnDefs={
            [0].includes(numberLoadData)
              ? colf
              : gridRef?.current?.api?.getColumnState()?.map((el: any) => {
                  const colfIndex: any = colf.find((col) => el?.colId === col?.colId)
                  const {flex, ...colfI} = colfIndex
                  const {flex: flexE, ...e} = el
                  // console.log(e)
                  return {
                    ...colfI,
                    ...e,
                  }
                })
          }
          defaultColDef={{
            suppressAutoSize: true,
            resizable: true,
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
