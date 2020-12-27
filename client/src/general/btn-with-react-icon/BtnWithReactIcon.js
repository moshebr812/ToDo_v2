import './BtnWithReactIcon.scss';
// IconContext is a wrapper to enable setting additional properties of the icons
// it works on "/fa", but not on "/gr" (for example)
import { IconContext } from 'react-icons';
import { RiDeleteBin6Line, RiEdit2Line, RiInformationLine, RiCloseCircleLine } from 'react-icons/ri';

// in this link to can find all icons 
// https://react-icons.github.io/react-icons/search?q=help

// import { RiInformationFill } from 'react-icons/ri';
// import { RiDeleteBin6Line } from 'react-icons/ri';
// import { FaTasks } from 'react-icons/fa';

// AiFillDelete
// AiOutlineFileAdd

// RiFileAddLine
// RiDeleteBin6Line
// RiEdit2Line
// RiEdit2Fill
// RiRefreshLine - not good, use HiRefresh or HiOutlineRefresh
// TiEyeOutline
// RiInformationLine / RiInformationFill



export function BtnWithReactIcon (props) {

    const getIconTag = (iconFor) => {
      switch (iconFor) {
        case 'CLOSE-SMALL':
            return <RiCloseCircleLine></RiCloseCircleLine>
        case 'DELETE':
            return <RiDeleteBin6Line></RiDeleteBin6Line>;
            
        case 'EDIT':
            return <RiEdit2Line></RiEdit2Line>
            
        case 'INFO':    
            return <RiInformationLine></RiInformationLine>
            
        default:
            alert(`invalid icon in ReactIconsLib.getIconTag(${iconFor})`);
            console.log ();
      }      
  }

  return <div className="btnWithReactIcon">
         

            {/* <IconContext.Provider value={ {title: "I can set a title as well"}, {style: {fontSize: props.fontSize, color: "red", paddingTop: "25px", paddingLeft: "50px"}} }>
                <FaTwitter onClick={()=> alert ('on click can work. Consider though to wrap with "Button Tag"')}></FaTwitter>
            </IconContext.Provider> */}
            
            <button className="btnForInline btnDelete" title={props.tooltip} 
                onClick={props.onClick}>
                {/* onClick={()=> alert (`Test onClick for ${props.actionType}`)}> */}
                    
                    <IconContext.Provider value={{style: {color: props.textColor, fontSize: props.fontSize, padding: "0", margin: "0"}}}>
                    {/* <IconContext.Provider value={{style: {color: (props.actionType==="DELETE"?"red":"blud"), fontSize: props.fontSize, padding: "0", margin: "0"}}}> */}

                       {getIconTag(props.actionType)}
                        
                    </IconContext.Provider>
            </button>
    </div>
}
