import {useCallback, useRef, useState} from 'react'
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

  const colf = [
    {
      id: 1,
      headerComponent: () => {
        return (
          <HeaderComponent
            checkMenuOnOff={checkMenuOnOff}
            setCheckMenuOnOff={setCheckMenuOnOff}
            outerVisibleCell={outerVisibleCell}
            setOuterVisibleCell={setOuterVisibleCell}
            outerVisibleHeader={outerVisibleHeader}
            setOuterVisibleHeader={setOuterVisibleHeader}
            classCSS='border-r-[1px] border-gray-300 justify-center'
            Tippy={false}
            id={1}
            setColumnDefs={setColumnDefs}
          >
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
          </HeaderComponent>
        )
      },
      cellRenderer: (props: any) => {
        return (
          <CellComponent
            checkMenuOnOff={checkMenuOnOff}
            setCheckMenuOnOff={setCheckMenuOnOff}
            outerVisibleHeader={outerVisibleHeader}
            Tippy={false}
            setOuterVisibleHeader={setOuterVisibleHeader}
            outerVisibleCell={outerVisibleCell}
            setOuterVisibleCell={setOuterVisibleCell}
            selectRow={selectRow}
            setSelectRow={setSelectRow}
            id={1}
            classCSS='justify-end items-start'
            title='checkbox'
            data={props?.data}
          />
        )
      },

      flex: 1,
    },
    {
      id: 2,
      headerComponent: () => {
        return (
          <HeaderComponent
            checkMenuOnOff={checkMenuOnOff}
            setCheckMenuOnOff={setCheckMenuOnOff}
            outerVisibleCell={outerVisibleCell}
            setOuterVisibleCell={setOuterVisibleCell}
            outerVisibleHeader={outerVisibleHeader}
            setOuterVisibleHeader={setOuterVisibleHeader}
            classCSS='justify-center'
            Tippy={false}
            id={2}
            setColumnDefs={setColumnDefs}
          >
            <SlExclamation className='SlExclamation' />
          </HeaderComponent>
        )
      },

      cellRenderer: (props: any) => {
        return (
          <CellComponent
            checkMenuOnOff={checkMenuOnOff}
            setCheckMenuOnOff={setCheckMenuOnOff}
            outerVisibleHeader={outerVisibleHeader}
            Tippy={false}
            setOuterVisibleHeader={setOuterVisibleHeader}
            outerVisibleCell={outerVisibleCell}
            setOuterVisibleCell={setOuterVisibleCell}
            selectRow={selectRow}
            setSelectRow={setSelectRow}
            id={2}
            classCSS='justify-end items-start'
            title='Exclamation mark'
            data={props?.data}
          />
        )
      },

      flex: 1,
    },
    {
      id: 3,
      headerComponent: () => {
        return (
          <HeaderComponent
            checkMenuOnOff={checkMenuOnOff}
            setCheckMenuOnOff={setCheckMenuOnOff}
            outerVisibleCell={outerVisibleCell}
            setOuterVisibleCell={setOuterVisibleCell}
            outerVisibleHeader={outerVisibleHeader}
            setOuterVisibleHeader={setOuterVisibleHeader}
            id={3}
            setColumnDefs={setColumnDefs}
            title='Marketplace'
          />
        )
      },

      cellRenderer: (props: any) => {
        return (
          <CellComponent
            checkMenuOnOff={checkMenuOnOff}
            setCheckMenuOnOff={setCheckMenuOnOff}
            outerVisibleHeader={outerVisibleHeader}
            setOuterVisibleHeader={setOuterVisibleHeader}
            outerVisibleCell={outerVisibleCell}
            setOuterVisibleCell={setOuterVisibleCell}
            selectRow={selectRow}
            setSelectRow={setSelectRow}
            id={3}
            classCSS='justify-end items-start'
            title='Marketplace'
            data={props?.data}
          />
        )
      },
      flex: 4,
    },
    {
      id: 4,
      headerComponent: () => {
        return (
          <HeaderComponent
            checkMenuOnOff={checkMenuOnOff}
            setCheckMenuOnOff={setCheckMenuOnOff}
            outerVisibleCell={outerVisibleCell}
            setOuterVisibleCell={setOuterVisibleCell}
            outerVisibleHeader={outerVisibleHeader}
            setOuterVisibleHeader={setOuterVisibleHeader}
            id={4}
            setColumnDefs={setColumnDefs}
            title='Ad Tool'
          />
        )
      },

      cellRenderer: (props: any) => {
        return (
          <CellComponent
            checkMenuOnOff={checkMenuOnOff}
            setCheckMenuOnOff={setCheckMenuOnOff}
            outerVisibleHeader={outerVisibleHeader}
            setOuterVisibleHeader={setOuterVisibleHeader}
            outerVisibleCell={outerVisibleCell}
            setOuterVisibleCell={setOuterVisibleCell}
            selectRow={selectRow}
            setSelectRow={setSelectRow}
            id={4}
            classCSS='justify-end items-start'
            title='Ad Tool'
            data={props?.data}
          />
        )
      },
      flex: 5,
    },
    {
      id: 5,
      headerComponent: () => {
        return (
          <HeaderComponent
            checkMenuOnOff={checkMenuOnOff}
            setCheckMenuOnOff={setCheckMenuOnOff}
            outerVisibleCell={outerVisibleCell}
            setOuterVisibleCell={setOuterVisibleCell}
            outerVisibleHeader={outerVisibleHeader}
            setOuterVisibleHeader={setOuterVisibleHeader}
            id={5}
            setColumnDefs={setColumnDefs}
            title='Campaign'
          >
            <SlExclamation className='SlExclamation' />
          </HeaderComponent>
        )
      },
      cellRenderer: (props: any) => {
        return (
          <CellComponent
            checkMenuOnOff={checkMenuOnOff}
            setCheckMenuOnOff={setCheckMenuOnOff}
            outerVisibleHeader={outerVisibleHeader}
            setOuterVisibleHeader={setOuterVisibleHeader}
            outerVisibleCell={outerVisibleCell}
            setOuterVisibleCell={setOuterVisibleCell}
            selectRow={selectRow}
            setSelectRow={setSelectRow}
            id={5}
            classCSS='justify-end items-start'
            title='Campaign'
            data={props?.data}
          />
        )
      },
      flex: 7,
    },
    {
      id: 6,
      headerComponent: () => {
        return (
          <HeaderComponent
            checkMenuOnOff={checkMenuOnOff}
            setCheckMenuOnOff={setCheckMenuOnOff}
            outerVisibleCell={outerVisibleCell}
            setOuterVisibleCell={setOuterVisibleCell}
            outerVisibleHeader={outerVisibleHeader}
            setOuterVisibleHeader={setOuterVisibleHeader}
            id={6}
            setColumnDefs={setColumnDefs}
            title='Country'
          />
        )
      },
      cellRenderer: (props: any) => {
        return (
          <CellComponent
            checkMenuOnOff={checkMenuOnOff}
            setCheckMenuOnOff={setCheckMenuOnOff}
            outerVisibleHeader={outerVisibleHeader}
            setOuterVisibleHeader={setOuterVisibleHeader}
            outerVisibleCell={outerVisibleCell}
            setOuterVisibleCell={setOuterVisibleCell}
            selectRow={selectRow}
            setSelectRow={setSelectRow}
            id={6}
            classCSS='justify-end items-start'
            title='Country'
            data={props?.data}
          />
        )
      },

      flex: 4,
      sortable: false,
    },
    {
      id: 7,
      headerComponent: () => {
        return (
          <HeaderComponent
            checkMenuOnOff={checkMenuOnOff}
            setCheckMenuOnOff={setCheckMenuOnOff}
            outerVisibleCell={outerVisibleCell}
            setOuterVisibleCell={setOuterVisibleCell}
            outerVisibleHeader={outerVisibleHeader}
            setOuterVisibleHeader={setOuterVisibleHeader}
            id={7}
            setColumnDefs={setColumnDefs}
            title='Storefront'
          />
        )
      },
      cellRenderer: (props: any) => {
        return (
          <CellComponent
            checkMenuOnOff={checkMenuOnOff}
            setCheckMenuOnOff={setCheckMenuOnOff}
            outerVisibleHeader={outerVisibleHeader}
            setOuterVisibleHeader={setOuterVisibleHeader}
            outerVisibleCell={outerVisibleCell}
            setOuterVisibleCell={setOuterVisibleCell}
            selectRow={selectRow}
            setSelectRow={setSelectRow}
            id={7}
            classCSS='justify-end items-start'
            title='Storefront'
            data={props?.data}
          />
        )
      },
      autoHeight: true,
      flex: 6,
    },
    {
      id: 8,
      headerComponent: () => {
        return (
          <HeaderComponent
            checkMenuOnOff={checkMenuOnOff}
            setCheckMenuOnOff={setCheckMenuOnOff}
            outerVisibleCell={outerVisibleCell}
            setOuterVisibleCell={setOuterVisibleCell}
            outerVisibleHeader={outerVisibleHeader}
            setOuterVisibleHeader={setOuterVisibleHeader}
            id={8}
            setColumnDefs={setColumnDefs}
            title='First search...'
          >
            <SlExclamation className='SlExclamation' />
          </HeaderComponent>
        )
      },
      flex: 3,
    },
    {
      id: 9,
      headerComponent: () => {
        return (
          <HeaderComponent
            checkMenuOnOff={checkMenuOnOff}
            setCheckMenuOnOff={setCheckMenuOnOff}
            outerVisibleCell={outerVisibleCell}
            setOuterVisibleCell={setOuterVisibleCell}
            outerVisibleHeader={outerVisibleHeader}
            setOuterVisibleHeader={setOuterVisibleHeader}
            id={9}
            setColumnDefs={setColumnDefs}
            title='Campaign note'
          />
        )
      },
      flex: 4,
      cellRenderer: (props: any) => {
        return (
          <CellComponent
            checkMenuOnOff={checkMenuOnOff}
            setCheckMenuOnOff={setCheckMenuOnOff}
            outerVisibleHeader={outerVisibleHeader}
            Tippy={false}
            setOuterVisibleHeader={setOuterVisibleHeader}
            outerVisibleCell={outerVisibleCell}
            setOuterVisibleCell={setOuterVisibleCell}
            selectRow={selectRow}
            setSelectRow={setSelectRow}
            id={9}
            classCSS='justify-end items-start'
            title='Campaign note'
            data={props?.data}
          />
        )
      },
    },
    {
      id: 10,

      headerComponent: () => {
        return (
          <HeaderComponent
            checkMenuOnOff={checkMenuOnOff}
            setCheckMenuOnOff={setCheckMenuOnOff}
            outerVisibleCell={outerVisibleCell}
            setOuterVisibleCell={setOuterVisibleCell}
            outerVisibleHeader={outerVisibleHeader}
            setOuterVisibleHeader={setOuterVisibleHeader}
            id={10}
            setColumnDefs={setColumnDefs}
            title='Campaign timeLine'
          >
            <SlExclamation className='SlExclamation' />
          </HeaderComponent>
        )
      },
      cellRenderer: (props: any) => {
        return (
          <CellComponent
            checkMenuOnOff={checkMenuOnOff}
            setCheckMenuOnOff={setCheckMenuOnOff}
            outerVisibleHeader={outerVisibleHeader}
            setOuterVisibleHeader={setOuterVisibleHeader}
            outerVisibleCell={outerVisibleCell}
            setOuterVisibleCell={setOuterVisibleCell}
            selectRow={selectRow}
            setSelectRow={setSelectRow}
            id={10}
            classCSS='justify-end items-start'
            title='Campaign timeLine'
            data={props?.data}
          />
        )
      },

      flex: 7,
    },
    {
      id: 11,
      headerComponent: () => {
        return (
          <HeaderComponent
            checkMenuOnOff={checkMenuOnOff}
            setCheckMenuOnOff={setCheckMenuOnOff}
            outerVisibleCell={outerVisibleCell}
            setOuterVisibleCell={setOuterVisibleCell}
            outerVisibleHeader={outerVisibleHeader}
            setOuterVisibleHeader={setOuterVisibleHeader}
            id={11}
            setColumnDefs={setColumnDefs}
            title='Campaign status'
          />
        )
      },
      cellRenderer: (props: any) => {
        return (
          <CellComponent
            checkMenuOnOff={checkMenuOnOff}
            setCheckMenuOnOff={setCheckMenuOnOff}
            outerVisibleHeader={outerVisibleHeader}
            setOuterVisibleHeader={setOuterVisibleHeader}
            outerVisibleCell={outerVisibleCell}
            setOuterVisibleCell={setOuterVisibleCell}
            selectRow={selectRow}
            setSelectRow={setSelectRow}
            id={11}
            classCSS='justify-end items-start'
            title='Campaign status'
            data={props?.data}
          />
        )
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

  return (
    <div className='ag-theme-quartz' style={{height: '100vh'}}>
      <AgGridReact
        ref={gridRef}
        defaultColDef={{
          resizable: false,
          autoHeight: true,
        }}
        rowHeight={53}
        rowModelType='serverSide'
        onGridReady={onGridReady}
        columnDefs={colf.filter((el) => !columnDefs.includes(el?.id))}
        loadingCellRenderer={Loading}
        loadingCellRendererParams={Loading}
      />
    </div>
  )
}

export default Aggird
