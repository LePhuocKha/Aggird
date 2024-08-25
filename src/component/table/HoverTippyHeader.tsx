import React, { Dispatch, useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaLongArrowAltUp } from 'react-icons/fa';
import { FaArrowDown } from 'react-icons/fa6';
import { RiMenuAddLine, RiMenuFoldFill } from 'react-icons/ri';
import { TiPin } from 'react-icons/ti';
import Tooltip from './Tooltip';
import 'tippy.js/dist/tippy.css';
import useClickOutside from '../../hooks/useClickOutside';
import Menu from './Menu';

export type MenuItem = {
  label: string;
  onclick: () => void;
  icons: React.ReactNode;
};

type Props = {
  children: React.ReactElement;
  onClickHide: () => void;
  classCSS: string;
  id: number;
  outerVisibleHeader: number;
  setOuterVisibleHeader: Dispatch<React.SetStateAction<number>>;
};

const HoverTippyHeader = ({
  children,
  onClickHide,
  classCSS,
  setOuterVisibleHeader,
  outerVisibleHeader,
  id,
}: Props) => {
  const [innerVisible, setInnerVisible] = useState(false);
  const configColumnRef = useRef<any | null>(null); // Typed as HTMLDivElement

  const menuHeader: MenuItem[] = [
    { icons: <FaLongArrowAltUp />, label: 'Sort Ascending', onclick: () => {} },
    { icons: <FaArrowDown />, label: 'Sort Descending', onclick: () => {} },
    { icons: <RiMenuAddLine />, label: 'Add Filter', onclick: () => {} },
    { icons: <TiPin />, label: 'Pin this', onclick: () => {} },
    { icons: <TiPin />, label: 'Pin left', onclick: () => {} },
    { icons: <TiPin />, label: 'Pin right', onclick: () => {} },
    { icons: <RiMenuFoldFill />, label: 'Hide this', onclick: () => onClickHide() },
  ];

  const handleMouseEnter = () => {
    setOuterVisibleHeader(id);
  };
  useClickOutside(configColumnRef, () => {
    
       setOuterVisibleHeader(0);
              setInnerVisible(false);
  })  
  
  return (
    <div      
    id='menu-header'  

    className={`${classCSS} flex relative`}>
      <div

          className='cursor-pointer w-[100%] h-[100%]'
          onMouseEnter={handleMouseEnter}
        >
          {children}
        </div>
      {outerVisibleHeader === id && <div
        
        onClick={() => {
            setInnerVisible(true);
      }}
        className='absolute right-[5px] top-[3px]'>
        
           <div
      
            ref={configColumnRef}  
              className={`p-[5px] hover:bg-sky-500 hover:cursor-help hover:text-white rounded shadow-lg ${
                innerVisible ? 'bg-sky-500 text-white' : 'text-gray-900 bg-white'
              }`}
            >
              <BsThreeDotsVertical />
            </div>
        <Menu menuHeader={menuHeader} onclick={() => {
             setInnerVisible(false)
        }}></Menu>
        {/* <Tooltip
          tippyRef={configColumnRef}
            visible={innerVisible}
            onClickOutsideTooltip={() => {
              setOuterVisibleHeader(0);
              // setInnerVisible(false);
            }}
            onclick={() => {
              setInnerVisible(false);
            }}
            menuHeader={menuHeader}
          >
            <div
      
            // ref={configColumnRef}  
              className={`p-[5px] hover:bg-sky-500 hover:cursor-help hover:text-white rounded shadow-lg ${
                innerVisible ? 'bg-sky-500 text-white' : 'text-gray-900 bg-white'
              }`}
            >
              <BsThreeDotsVertical />
            </div>
        </Tooltip> */}
      
      
      </div>}

    </div>
  );
};

export default HoverTippyHeader;