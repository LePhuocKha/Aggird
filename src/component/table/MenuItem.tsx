import {CustomMenuItemProps, useGridMenuItem} from '@ag-grid-community/react'
import React from 'react'

export interface ButtonCustomMenuItemProps extends CustomMenuItemProps {
  buttonValue: string
  icon: any
}

export default ({name, subMenu, icon, buttonValue}: ButtonCustomMenuItemProps) => {
  useGridMenuItem({
    configureDefaults: () => true,
  })

  const onClick = () => alert(`${name} clicked`)

  return (
    <div>
      <span className='ag-menu-option-part ag-menu-option-icon'>{icon}</span>
      <span className='ag-menu-option-part ag-menu-option-text'>{name}</span>
      <span className='ag-menu-option-part ag-menu-option-shortcut'>
        <button onClick={onClick}>{buttonValue}</button>
      </span>
      <span className='ag-menu-option-part ag-menu-option-popup-pointer'>
        {subMenu && (
          <span
            className='ag-icon ag-icon-small-right'
            unselectable='on'
            role='presentation'
          ></span>
        )}
      </span>
    </div>
  )
}
