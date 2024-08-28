import {useCallback, useEffect, useRef, useState} from 'react'
import {Api} from '../data-fake/Api'
import Loading from './Loading'
import InputCheckBox from '../checkbox/InputCheckBox'
import HeaderComponent from './HeaderComponent'
import CellComponent from './CellComponent'

import {AgGridReact} from 'ag-grid-react'
import {SlExclamation} from 'react-icons/sl'

import './style.scss'

import 'ag-grid-community/styles/ag-grid.css' // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css' // Optional Theme applied to the Data Grid
import 'tippy.js/dist/tippy.css'
import 'ag-grid-enterprise'
import Cookies from 'js-cookie'
import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model'
import {ModuleRegistry} from '@ag-grid-community/core'
import {ColumnsToolPanelModule} from '@ag-grid-enterprise/column-tool-panel'
import {MenuModule} from '@ag-grid-enterprise/menu'
import {ColDef, GetContextMenuItemsParams, GetMainMenuItemsParams} from 'ag-grid-community'
import MenuItem from './MenuItem'

ModuleRegistry.registerModules([ClientSideRowModelModule, ColumnsToolPanelModule, MenuModule])

const Aggird = () => {
  const [selectRow, setSelectRow] = useState<number[]>([])
  const gridRef = useRef<AgGridReact<any>>(null)
  const [outerVisibleHeader, setOuterVisibleHeader] = useState<number>(0)
  const [checkMenuOnOff, setCheckMenuOnOff] = useState(false)
  const [outerVisibleCell, setOuterVisibleCell] = useState<{
    idTr: number
    idHeader: number
  }>({
    idTr: 0,
    idHeader: 0,
  })
  const [columnDefs, setColumnDefs] = useState<number[]>([])

  useEffect(() => {
    Cookies.set('menu', 'false')
  }, [])

  const colf: ColDef[] = [
    {
      headerComponentParams: {
        classCSS: 'border-r-[1px] border-gray-300 justify-center gap-2',
        children: (
          <InputCheckBox
            checked={selectRow.length === Api.length}
            onChange={() => {
              if (selectRow.length === Api.length) {
                setSelectRow([])
              } else {
                setSelectRow(Api?.map((el: any) => el?.id))
              }
            }}
          />
        ),
      },
      cellRendererParams: {
        title: 'checkbox',
      },
      flex: 1,
    },
    {
      headerComponentParams: {
        classCSS: 'justify-center',
        children: <SlExclamation className='SlExclamation' />,
      },
      cellRendererParams: {
        title: 'Exclamation mark',
      },
      flex: 1,
    },
    {
      headerComponentParams: {
        title: 'Marketplace',
      },
      cellRendererParams: {
        title: 'Marketplace',
      },
      flex: 4,
    },
    {
      headerComponentParams: {
        title: 'Ad Tool',
      },
      cellRendererParams: {
        title: 'Ad Tool',
      },
      flex: 5,
    },
    {
      headerComponentParams: {
        title: 'Campaign',
      },
      cellRendererParams: {
        title: 'Campaign',
      },
      flex: 7,
    },
    {
      headerComponentParams: {
        title: 'Country',
      },
      cellRendererParams: {
        title: 'Country',
      },
      flex: 4,
    },
    {
      headerComponentParams: {
        title: 'Storefront',
      },
      cellRendererParams: {
        title: 'Storefront',
      },
      flex: 6,
    },
    {
      headerComponentParams: {
        id: 8,
        title: 'First search...',
        children: <SlExclamation className='SlExclamation' />,
      },
      flex: 3,
    },
    {
      flex: 4,
      headerComponentParams: {
        id: 9,
        title: 'Campaign note',
      },
      cellRendererParams: {
        id: 9,
        Tippy: false,
        title: 'Campaign note',
      },
    },
    {
      headerComponentParams: {
        title: 'Campaign timeLine',
        children: <SlExclamation className='SlExclamation' />,
      },
      cellRendererParams: {
        title: 'Campaign timeLine',
      },
      flex: 7,
    },
    {
      headerComponentParams: {
        classCSS: 'justify-start',
        title: 'Campaign status',
      },
      cellRendererParams: {
        title: 'Campaign status',
      },
      flex: 5,
    },
  ]

  const createServerSideDatasource = (server: any) => {
    return {
      getRows: (params: any) => {
        // get data for request from our fake server
        const response = server.getData(params.request)
        // simulating real server call with a 500ms delay
        setTimeout(() => {
          if (response.success) {
            // supply rows for requested block to grid
            params.success({rowData: response.rows})
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
        const requestedRows = allData.slice(request.startRow, request.endRow)
        return {
          success: true,
          rows: requestedRows,
        }
      },
    }
  }
  const onGridReady = useCallback((params: any) => {
    // setup the fake server with entire dataset
    const fakeServer = createFakeServer(Api)
    // create datasource with a reference to the fake server
    const datasource = createServerSideDatasource(fakeServer)
    // register the datasource with the grid
    params.api.setGridOption('serverSideDatasource', datasource)
  }, [])
  // const getMainMenuItems = (params: any) => {
  //   return ['pinSubMenu', 'valueAggSubMenu', 'autoSizeThis', 'autoSizeAll', 'separator', 'export']
  // }

  const getMainMenuItems = useCallback((params: GetMainMenuItemsParams) => {
    return [
      ...params.defaultItems,
      'separator',
      {
        name: 'Click Alert Button and Close Menu',
        menuItem: MenuItem,
        menuItemParams: {
          buttonValue: 'Alert',
        },
      },
      {
        name: 'Click Alert Button and Keep Menu Open',
        suppressCloseOnSelect: true,
        menuItem: MenuItem,
        menuItemParams: {
          buttonValue: 'Alert',
        },
      },
    ]
  }, [])

  const getContextMenuItems = useCallback((params: GetContextMenuItemsParams) => {
    return [
      ...(params.defaultItems || []),
      'separator',
      {
        name: 'Click Alert Button and Close Menu',
        menuItem: MenuItem,
        menuItemParams: {
          buttonValue: 'Alert',
        },
      },
      {
        name: 'Click Alert Button and Keep Menu Open',
        suppressCloseOnSelect: true,
        menuItem: MenuItem,
        menuItemParams: {
          buttonValue: 'Alert',
        },
      },
    ]
  }, [])

  return (
    <div className='ag-theme-quartz' style={{height: '100vh'}}>
      <AgGridReact
        ref={gridRef}
        defaultColDef={{
          resizable: false,
          autoHeight: true,
          headerComponent: HeaderComponent,
          headerComponentParams: {
            checkMenuOnOff,
            setCheckMenuOnOff,
            outerVisibleCell,
            setOuterVisibleCell,
            outerVisibleHeader,
            setOuterVisibleHeader,
            setColumnDefs,
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
        // getMainMenuItems={getMainMenuItems}
        rowModelType='serverSide'
        onGridReady={onGridReady}
        columnDefs={colf}
        loadingCellRenderer={Loading}
        getMainMenuItems={getMainMenuItems}
        getContextMenuItems={getContextMenuItems}
        loadingCellRendererParams={Loading}
      />
    </div>
  )
}

export default Aggird
