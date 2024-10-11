import {NodeViewContent, NodeViewWrapper} from '@tiptap/react'
import {Menu} from 'primereact/menu'
import {classNames} from 'primereact/utils'
import React, {useRef, useState} from 'react'
import {GrPowerReset} from 'react-icons/gr'
import {HiDotsVertical} from 'react-icons/hi'
import {TfiMenuAlt} from 'react-icons/tfi'

const MyComponent = (props: any) => {
  const menuLeft = useRef<any>(null)
  const [hovered, setHovered] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const items = [
    {
      items: [
        {
          icon: <TfiMenuAlt />,
          label: 'Toggle code block',
          className: classNames({'is-active': props?.editor?.isActive('codeBlock')}),
          command: () => {
            props?.editor.chain().focus().toggleCodeBlock().run()
          },
        },
        {
          icon: <GrPowerReset />,
          label: 'Reset all columns',
          command: () => {
            // logic cho reset
          },
        },
      ],
    },
  ]

  const handleClick = (event: React.MouseEvent) => {
    setMenuOpen(true)
    menuLeft?.current.toggle(event)
  }

  const handleMenuHide = () => {
    setMenuOpen(false)
  }

  return (
    <NodeViewWrapper
      className='react-component'
      onMouseEnter={() => {
        setHovered(true)
      }}
      onMouseLeave={() => setHovered(false)}
      style={{position: 'relative'}}
    >
      <div>
        <NodeViewContent className='content is-editable' />
      </div>

      {/* Menu */}
      {hovered && (
        <div className='absolute z-10' style={{top: '-2px', left: '-25px'}}>
          <Menu
            model={items}
            className='bg-white p-[10px] min-w-[250px] gap-[10px] shadow-md flex flex-col'
            popup
            ref={menuLeft}
            id='popup_menu_left'
            aria-hidden='false'
            onHide={handleMenuHide}
          />
          {/* Button */}
          <button
            onClick={handleClick}
            aria-controls='popup_menu_left'
            aria-haspopup='true'
            className={`p-[5px] hover:bg-sky-500 hover:cursor-help hover:text-white rounded ${
              menuOpen ? 'bg-sky-500 text-white' : 'text-gray-900 bg-white'
            }`}
          >
            <HiDotsVertical />
          </button>
        </div>
      )}
    </NodeViewWrapper>
  )
}

export default MyComponent
