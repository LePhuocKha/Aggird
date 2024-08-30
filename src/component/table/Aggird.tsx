import {useCallback, useEffect, useRef, useState} from 'react'
import {generateData} from '../data-fake/Api'
import Loading from '../loading/Loading'
import InputCheckBox from '../checkbox/InputCheckBox'
import HeaderComponent from './HeaderComponent'
import CellComponent from './CellComponent'

import {AgGridReact} from 'ag-grid-react'
import {SlExclamation} from 'react-icons/sl'
import Cookies from 'js-cookie'
import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model'
import {ModuleRegistry} from '@ag-grid-community/core'
import {ColumnsToolPanelModule} from '@ag-grid-enterprise/column-tool-panel'
import {MenuModule} from '@ag-grid-enterprise/menu'
import {ColDef} from 'ag-grid-community'

import './style.scss'

import 'ag-grid-community/styles/ag-grid.css' // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css' // Optional Theme applied to the Data Grid
import 'tippy.js/dist/tippy.css'
import 'ag-grid-enterprise'

ModuleRegistry.registerModules([ClientSideRowModelModule, ColumnsToolPanelModule, MenuModule])

const Aggird = () => {
  const [selectRow, setSelectRow] = useState<number[]>([])
  const gridRef = useRef<AgGridReact<any>>(null)
  const [outerVisibleHeader, setOuterVisibleHeader] = useState<number>(0)
  const [checkMenuOnOff, setCheckMenuOnOff] = useState(false)
  const [Data, setData] = useState<any[]>([])
  const [outerVisibleCell, setOuterVisibleCell] = useState<{
    idTr: number
    idHeader: number
  }>({
    idTr: 0,
    idHeader: 0,
  })

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

      cellRendererParams: {
        id: 1,
        Tippy: false,
        title: 'checkbox',
      },
      flex: 1,
    },
    {
      colId: '2',
      headerComponentParams: {
        id: 2,
        Tippy: false,
        classCSS: 'justify-center',
        children: <SlExclamation className='SlExclamation' />,
      },
      cellRendererParams: {
        id: 2,
        Tippy: false,
        title: 'Exclamation mark',
      },
      flex: 1,
    },
    {
      colId: '3',
      headerComponentParams: {
        id: 3,
        title: 'Marketplace',
      },
      cellRendererParams: {
        id: 3,
        title: 'Marketplace',
      },
      flex: 4,
    },
    {
      colId: '4',
      headerComponentParams: {
        id: 4,
        title: 'Ad Tool',
      },

      cellRendererParams: {
        id: 4,
        title: 'Ad Tool',
      },
      flex: 5,
    },
    {
      colId: '5',
      headerComponentParams: {
        id: 5,
        title: 'Campaign',
      },

      cellRendererParams: {
        id: 5,
        title: 'Campaign',
      },
      flex: 7,
    },
    {
      colId: '6',
      headerComponentParams: {
        id: 6,
        title: 'Country',
      },

      cellRendererParams: {
        id: 6,
        title: 'Country',
      },
      flex: 4,
    },
    {
      colId: '7',
      headerComponentParams: {
        id: 7,
        title: 'Storefront',
      },

      cellRendererParams: {
        id: 7,
        title: 'Storefront',
      },
      flex: 6,
    },
    {
      colId: '8',
      headerComponentParams: {
        id: 8,
        title: 'First search...',
        children: <SlExclamation className='SlExclamation' />,
      },
      flex: 4,
    },
    {
      flex: 4,
      colId: '9',
      headerComponentParams: {
        id: 9,
        title: 'Campaign note',
      },
      // hide: !false,
      cellRendererParams: {
        id: 9,
        Tippy: false,
        title: 'Campaign note',
      },
    },
    {
      colId: '10',
      headerComponentParams: {
        id: 10,
        title: 'Campaign timeLine',
        children: <SlExclamation className='SlExclamation' />,
      },

      cellRendererParams: {
        id: 10,
        title: 'Campaign timeLine',
      },
      flex: 7,
    },
    {
      colId: '11',
      headerComponentParams: {
        id: 11,
        classCSS: 'justify-start',
        title: 'Campaign status',
      },

      cellRendererParams: {
        id: 11,
        title: 'Campaign status',
      },
      flex: 5,
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
      cellRendererParams: {
        id: 12,
        title: 'test',
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

  const loadData = async (params: any) => {
    const fakeData = (await generateData(10, params)) || []
    setData(fakeData || [])
    // setup the fake server with entire dataset
    const fakeServer = createFakeServer(fakeData)
    // create datasource with a reference to the fake server
    const datasource = createServerSideDatasource(fakeServer)
    // register the datasource with the grid
    params?.api?.setGridOption('serverSideDatasource', datasource)
  }

  const saveColumnStateToCookies = (params: any) => {
    const colDefs = params.api.getColumnDefs()

    const simpleColDefs = colDefs.map((colDef: any) => ({
      colId: colDef.colId,
      field: colDef.field,
      width: colDef.width,
      sort: colDef.sort,
      sortIndex: colDef.sortIndex,
      hide: colDef.hide,
    }))

    Cookies.set('columnDefs', JSON.stringify(simpleColDefs), {expires: 7})
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

  const onGridReady = useCallback(async (params: any) => {
    loadData(params)
    restoreState()
  }, [])

  const handleColumnChange = useCallback((params: any) => {
    saveColumnStateToCookies(params)
    loadData(params)
  }, [])

  return (
    <div className='ag-theme-quartz' style={{height: '100vh'}}>
      <AgGridReact
        ref={gridRef}
        defaultColDef={{
          // resizable: false,
          autoHeight: true,
          headerComponent: HeaderComponent,
          headerComponentParams: {
            checkMenuOnOff,
            setCheckMenuOnOff,
            outerVisibleCell,
            setOuterVisibleCell,
            outerVisibleHeader,
            setOuterVisibleHeader,
          },
          cellRenderer: CellComponent,
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
        columnMenu={'legacy'}
        rowHeight={53}
        rowModelType='serverSide'
        onGridReady={onGridReady}
        onColumnMoved={handleColumnChange}
        onColumnVisible={handleColumnChange}
        columnDefs={colf}
        loadingCellRenderer={Loading}
        loadingCellRendererParams={Loading}
      />
    </div>
  )
}

export default Aggird
