import {Dispatch, useCallback, useEffect, useState} from 'react'
import {data_type, generateData} from '../data-fake/Api'
import Loading from '../loading/Loading'
import HeaderComponent from './HeaderComponent'
import {AgGridReact} from 'ag-grid-react'
import Cookies from 'js-cookie'
import {ColDef, IGetRowsParams} from 'ag-grid-community'

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
  idHideColf: string[]
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
  idHideColf,
}: Props) => {
  const [outerVisibleHeader, setOuterVisibleHeader] = useState<number>(0)
  const [checkMenuOnOff, setCheckMenuOnOff] = useState(false)
  const [outerVisibleCell, setOuterVisibleCell] = useState<{idTr: string; idHeader: number}>({
    idTr: '',
    idHeader: 0,
  })

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

  const onGridReady = useCallback(async (params: any) => {
    await loadData(params)
  }, [])

  const handleColumnChange = useCallback(async () => {
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
              ? colf.map((col) => {
                  const savedColumnState = JSON.parse(Cookies.get(saveColumnCookies) || '[]')
                  const savedCol =
                    savedColumnState?.find((state: any) => state.colId === col?.colId) || {}

                  return {...col, ...savedCol}
                })
              : gridRef?.current?.api?.getColumnState()?.map((el: any) => {
                  const colfIndex: any = colf.find((col) => el?.colId === col?.colId)
                  const {flex, ...colfI} = colfIndex
                  const {flex: flexE, ...e} = el

                  return {
                    ...colfI,
                    ...e,
                  }
                }) || colf
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
          onColumnMoved={() => {
            gridRef?.current!?.api.applyColumnState({
              state: gridRef?.current?.api?.getColumnState().map((el: any) => {
                return {
                  ...el,
                  flex: null,
                }
              }),
              applyOrder: true,
            })
            handleColumnChange()
          }}
          onColumnVisible={() => {
            if (
              gridRef?.current?.api
                ?.getColumnState()
                .filter((col: any) => !col.hide && !idHideColf.includes(col.colId))?.length === 0
            ) {
              idHideColf.forEach((el) => {
                gridRef?.current!.api.setColumnVisible(el, false)
              })
            } else {
              idHideColf.forEach((el) => {
                gridRef?.current!.api.setColumnVisible(el, true)
              })
            }
            handleColumnChange()
          }}
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
