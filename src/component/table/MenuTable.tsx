import {ColumnState} from 'ag-grid-community'
import {AgGridReact} from 'ag-grid-react'
import Cookies from 'js-cookie'
import {Menu} from 'primereact/menu'
import {Dispatch, useEffect, useRef, useState} from 'react'
import {GrPowerReset} from 'react-icons/gr'
import {HiDotsVertical} from 'react-icons/hi'
import {TfiMenuAlt} from 'react-icons/tfi'
import Input from '../input/Input'
import useClickOutside from '../../hooks/useClickOutside'
import {CgMenuGridO} from 'react-icons/cg'
import Button from '../button/Button'

type Props = {
  gridRef?: React.RefObject<AgGridReact<any>>
  saveColumnCookies: string
  handleClickResetColumn: () => void
  selectedColumns: {colId: string; hide: boolean}[]
  setSelectedColumns: Dispatch<React.SetStateAction<{colId: string; hide: boolean}[]>>
  setNumberLoadData: Dispatch<React.SetStateAction<number>>
  setSelectRow: Dispatch<React.SetStateAction<string[]>>
}

const MenuTable = ({
  gridRef,
  handleClickResetColumn,
  selectedColumns,
  setSelectedColumns,
  setNumberLoadData,
  saveColumnCookies,
  setSelectRow,
}: Props) => {
  const menuLeft = useRef<any>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const menuPropertiesRef = useRef<HTMLInputElement>(null)
  const [valueSearch, setValueSearch] = useState<string>('')
  const [openProperties, setOpenProperties] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const columns = gridRef?.current!?.api?.getColumns() || []
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }

    setValueSearch('')
  }, [Cookies.get(saveColumnCookies)])

  useEffect(() => {
    if (gridRef?.current) {
      const columnDefs = gridRef?.current?.api?.getColumnDefs()
      const initialSelectedColumns =
        (columnDefs || [])
          .map((c) => {
            if ('colId' in c) {
              return {
                colId: c.colId as string,
                hide: !!c.hide,
              }
            }
            return undefined
          })
          .filter((col): col is {colId: string; hide: boolean} => col !== undefined) || []

      setSelectedColumns(initialSelectedColumns)
    }
  }, [openProperties])

  const items = [
    {
      items: [
        {
          icon: <TfiMenuAlt />,
          label: 'Properties',
          command: () => {
            // gridRef?.current!.api.showColumnChooser()

            setOpenProperties(true)
          },
        },
        {
          icon: <GrPowerReset />,
          label: 'Reset all columns',
          command: () => {
            setNumberLoadData(0)
            setSelectRow([])
            Cookies?.remove(saveColumnCookies)
            setTimeout(() => {
              gridRef?.current!.api.resetColumnState()
              handleClickResetColumn()
            }, 0)
          },
        },
      ],
    },
  ]

  const handleClick = (event: React.MouseEvent) => {
    menuLeft?.current.toggle(event)
    setMenuOpen((prev) => !prev)
  }

  const handleMenuHide = () => {
    setMenuOpen(false)
  }
  const handleColumnToggle = (colId: string) => {
    setSelectedColumns((prev) =>
      prev.map((col) => (col.colId === colId ? {...col, hide: !col.hide} : col))
    )
  }

  const handleSearch = () => {
    const value = inputRef.current?.value || ''
    setValueSearch(value)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const filteredColumns = columns.filter((column) => {
    const colDef = column?.getColDef()
    const colTitle = colDef?.headerComponentParams?.title || column?.getColId()
    return (
      colTitle.toLowerCase().includes(valueSearch.toLowerCase()) &&
      !['1', '2', '21'].includes(column?.getColId())
    )
  })

  useClickOutside(menuPropertiesRef, () => {
    setOpenProperties(false)
  })

  return (
    <div className='flex justify-end items-center m-5 relative'>
      <div
        ref={menuPropertiesRef}
        className={`column-chooser z-[99999] absolute flex flex-col justify-between gap-[10px] top-[30px] bg-white min-h-[100px] shadow-lg rounded-sm ${
          openProperties ? 'open' : ''
        }`}
      >
        <div className='flex flex-col gap-[10px]'>
          <h1 className='font-semibold text-gray-500'>DIMENSION</h1>
          <Input
            ref={inputRef}
            typeInput='search'
            placeholder='Search'
            handleInsertLeft={handleSearch}
            onKeyDown={handleKeyDown}
          />
          <div className='h-[100%]'>
            {columns?.length > 0 && (
              <div>
                <label className='cursor-pointer flex gap-[10px] text-[16px] items-center font-normal text-gray-700'>
                  <input
                    type='checkbox'
                    checked={selectedColumns.every((col) => !col.hide)}
                    onChange={(e) => {
                      const allVisible = e.target.checked
                      const updatedColumns = columns.map((column) => ({
                        colId: column.getColId(),
                        hide: !allVisible,
                      }))

                      setSelectedColumns(updatedColumns)
                    }}
                  />
                  All
                </label>
              </div>
            )}
            {filteredColumns
              ?.sort((a, b) => a.getColId().localeCompare(b.getColId()))
              ?.map((column) => {
                const colDef = column?.getColDef()
                const colId = column?.getColId()

                const isHidden = selectedColumns.find((c) => c?.colId === colId)?.hide || false

                return (
                  <div key={column.getColId()} className='flex gap-[10px] items-center'>
                    <CgMenuGridO />
                    <label className='cursor-pointer flex gap-[10px] text-[16px] items-center font-normal text-gray-700'>
                      <input
                        type='checkbox'
                        checked={!isHidden}
                        onChange={() => handleColumnToggle(colId)}
                      />
                      {colDef?.headerComponentParams?.title || column?.getColId()}
                    </label>
                  </div>
                )
              })}
          </div>
        </div>
        <div className='flex gap-[10px] justify-end'>
          <Button
            onClick={() => {
              setOpenProperties(false)
            }}
            colorButton='gray'
          >
            cancel
          </Button>
          <Button
            onClick={() => {
              if (selectedColumns?.length > 0) {
                const d = (selectedColumns || [])?.filter((selectedColumn) => {
                  return selectedColumn?.hide !== true
                })

                gridRef?.current!.api.applyColumnState({
                  state: selectedColumns,
                  applyOrder: true,
                })
                gridRef?.current?.api.refreshServerSide({purge: true})
              }
              setOpenProperties(false)
            }}
          >
            Apply
          </Button>
        </div>
      </div>
      <div>
        <Menu
          model={items}
          className='bg-white p-[10px] min-w-[250px] gap-[10px] shadow-md flex flex-col'
          popup
          ref={menuLeft}
          id='popup_menu_left'
          aria-hidden='false'
          onHide={handleMenuHide}
        />
        <button
          onClick={handleClick}
          aria-controls='popup_menu_left'
          aria-haspopup='true'
          className={`p-[7px] hover:bg-sky-500 hover:cursor-help  top-[1px] right-[10px] hover:text-white rounded ${
            menuOpen ? 'bg-sky-500 text-white' : 'text-gray-900 bg-white'
          }`}
        >
          <HiDotsVertical />
        </button>
      </div>
    </div>
  )
}

export default MenuTable
