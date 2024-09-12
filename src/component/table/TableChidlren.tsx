import {Dialog} from 'primereact/dialog'
import Loading from '../loading/Loading'
import {AgGridReact} from 'ag-grid-react'
import {useCallback, useRef, useState} from 'react'
import {data_type, generateData} from '../data-fake/Api'
import {Server} from './Aggird'
import {IGetRowsParams} from 'ag-grid-community'
import CellComponent from './CellComponent'
import InputCheckBox from '../checkbox/InputCheckBox'
import {ColDef} from '@ag-grid-community/core'
import HeaderComponent from './HeaderComponent'

import './style.scss'
import Button from '../button/Button'
import Table from './Table'
type Props = {
  open: boolean
  handleClose: () => void
}

const TableChidlren = ({open, handleClose}: Props) => {
  const gridRef = useRef<AgGridReact<any>>(null)
  const [pagination, setPagination] = useState(10)
  const [numberLoadData, setNumberLoadData] = useState<number>(0)
  const [selectRow, setSelectRow] = useState<string[]>([])
  const [Data, setData] = useState<any[]>([])
  const colf: any[] = [
    {
      colId: '1',
      headerClass: 'custom-header',
      headerComponent: HeaderComponent,
      headerComponentParams: {
        id: 1,
        Tippy: false,
        classCSS: 'border-r-[1px] border-gray-300 justify-center gap-2',
        children: (
          <InputCheckBox
            checked={selectRow.length === pagination}
            onChange={() => {
              if (selectRow.length === Data.length) {
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
      colId: '12',
      type: 'date',
      field: 'test2',
      headerComponentParams: {
        id: 12,
        classCSS: 'justify-start',
        title: 'Test',
      },
      flex: 3,
    },
    {
      colId: '13',
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
  const loadData = async (params: any) => {
    const fakeData = (await generateData(20, params)) || []
    // Setup the fake server with the updated dataset
    const fakeServer = createFakeServer([...fakeData])
    // create datasource with a reference to the fake server
    const datasource = await createServerSideDatasource(fakeServer)
    // register the datasource with the grid

    params?.api?.setGridOption('serverSideDatasource', datasource)
  }
  const onGridReady = useCallback(async (params: any) => {
    await loadData(params)
  }, [])
  return (
    <Dialog
      modal={false}
      visible={open}
      style={{width: '50vw'}}
      onHide={() => {}}
      className=''
      // footer={footerContent}
    >
      <div className='max-h-[calc(100vh-200px)] overflow-y-auto'>
        {/* <div className='ag-theme-quartz'>
          <AgGridReact
            ref={gridRef}
            domLayout='autoHeight'
            defaultColDef={{
              autoHeight: true,
              minWidth: 150,
            }}
            columnDefs={colf}
            rowHeight={53}
            rowModelType='serverSide'
            onGridReady={onGridReady}
            loadingCellRenderer={Loading}
            loadingCellRendererParams={Loading}
          />
        </div> */}
        <Table
          selectRow={selectRow}
          setSelectRow={setSelectRow}
          setPagination={setPagination}
          Data={Data}
          setData={setData}
          pagination={pagination}
          gridRef={gridRef}
          numberLoadData={numberLoadData}
          setNumberLoadData={setNumberLoadData}
          colf={colf}
        />
      </div>
      <div className='bg-white flex gap-[10px] justify-end mt-[10px]'>
        <Button onClick={handleClose} colorButton='white'>
          Cencal
        </Button>
        <Button>Applly now</Button>
      </div>
    </Dialog>
  )
}

export default TableChidlren
