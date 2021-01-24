import './ReactIconsLib.scss';
// IconContext is a wrapper to enable setting additional properties of the icons
// it works on "/fa", but not on "/gr" (for example)
import { IconContext } from 'react-icons';
import { FaTwitter } from 'react-icons/fa';
import { RiDeleteBin6Line, RiEdit2Line, RiInformationLine } from 'react-icons/ri';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { BtnWithReactIcon } from '../general/btn-with-react-icon/BtnWithReactIcon';

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



export function ReactIconsLib (props) {
  

  const getIconTag = (iconFor) => {
      switch (iconFor) {
        case 'DELETE':
            return <RiDeleteBin6Line></RiDeleteBin6Line>;
        case 'EDIT':
            return <RiEdit2Line></RiEdit2Line>
        case 'INFO':    
            return <RiInformationLine></RiInformationLine>
        case 'STAR-FULL':
            return <FaStar></FaStar>
        case 'STAR-EMPTY':
            return <FaRegStar></FaRegStar>
        default:
            alert(`invalid icon in ReactIconsLib.getIconTag(${iconFor})`);
            console.log ();
      }      
  }

  const  deleteOnContainer = ( (parms) => {
        alert (`from ReactIconLis.js - deleteOnContainer() \n\n checking click from component to Container`);
  });

  return <div className="reactIconsLib">
            <hr></hr>
            <h4> Testing usage of react-icons npm</h4>
            
            <hr></hr>
            <strong>the twitter bird: icon back with no IconContext Wrapper</strong><br></br>
            <FaTwitter></FaTwitter>

            <hr></hr>
            <strong>the twitter bird: now with wrapper to change color, size etc</strong> <br></br>
            When using IconContext -- u must provide at least some properties
            <br></br>
            <IconContext.Provider value={ {title: "I can set a title as well"}, {style: {fontSize: "30px", color: "red", paddingTop: "25px", paddingLeft: "50px"}} }>
                <FaTwitter className="App-logo" onClick={()=> alert ('on click can work. Consider though to wrap with "Button Tag"')}></FaTwitter>
            </IconContext.Provider>


            <hr></hr>
            <strong>Embedding the IconContext inside a button</strong>
 
            <br></br>
            <button className="btnForInline btnDelete" title="Open screen on left, with option to enter Edit Mode" 
                onClick={()=> alert (`Open for Full View + option for Edit&Save`)}>
            <RiEdit2Line></RiEdit2Line></button>
            
            <br></br>
            <button className="btnForInline btnDelete" title="View inline main task details." 
                onClick={()=> alert (`my inputs are none`)}>
            <RiInformationLine></RiInformationLine>
            </button>
            
            <br></br>
            <button className="btnForInline btnDelete" title="For DELETE - Test tooltip on button wrapper" 
                onClick={()=> alert (`Apply Delete 1 record`)}>
                    <IconContext.Provider value={{style: {color: "red", fontSize: "18px", padding: "0", margin: "0"}}}>
                       {getIconTag("DELETE")}
                        
                    </IconContext.Provider>
            </button>


            <hr></hr>
            <hr></hr>
            <strong>Createing a generic function component BtnWithReactIcon.js</strong>

            <BtnWithReactIcon 
                actionType='EDIT' 
                tooltip="Open full details screen for task"
                textColor="blue"
                fontSize="18px"
            >
            </BtnWithReactIcon>

            <BtnWithReactIcon 
                actionType='INFO' 
                tooltip="Open additinal info of task inline"
                textColor="blue"
                fontSize="18px"
            >

            </BtnWithReactIcon>
            <BtnWithReactIcon 
                actionType='DELETE' 
                tooltip="Careful: deleting task and all its history permanently"
                textColor="red"
                fontSize="18px"
                onClick={deleteOnContainer}
            >
            </BtnWithReactIcon>

            <BtnWithReactIcon 
                actionType='STAR-FULL' 
                tooltip="Star that is full inside"
                textColor="purple"
                fontSize="18px"
            ></BtnWithReactIcon>

<BtnWithReactIcon 
                actionType='STAR-EMPTY' 
                tooltip="Star that is empty inside, border only"
                textColor="purple"
                fontSize="18px"
            ></BtnWithReactIcon>
    </div>
}
