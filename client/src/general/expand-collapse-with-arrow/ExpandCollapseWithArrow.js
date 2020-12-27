import {useState, useContext} from 'react';
import './ExpandCollapseWithArrow.scss';
// import {BiCollapse, BiExpand} from 'react-icons/bi';
import { IconContext } from 'react-icons';
import {BiShow, BiHide} from 'react-icons/bi';
// import {RiEyeLine, RiEyeOffLine, RiDeleteBin6Line} from 'react-icons/ri';
import {AppContextTodo} from '../../AppContext'
import {CountByGroupContainer} from '../count-by-group-container/CountByGroupContainer';
import {CountAndGroupByFieldName} from '../count-by-group-container/CountAndGroupByFieldName';



// props required parameters to call this object
//      topicText="Status Statistics"                   the text we show on the left side
//      fieldNameToGroupBy="status"                     the database field name sent to the fetch command based on which we Count & Group
//      arrayValueTextConvertor={statusOptions}         an array that should contain 3 fields: value, text, uiCounterSort --> read in SelectListValues.js

export function ExpandCollapseWithArrow (props) {
    let [isExpanded, setIsExpanded ] = useState (false);

    const contextTodo = useContext (AppContextTodo);

    function collapseExpand () {
        // console.log (`isExpanded = ${isExpanded?"true":"false"}`);
        setIsExpanded (!isExpanded);
    }

    return <div className="expandCollapseWithArrow" title={props.title}
        style={{border: `${contextTodo.debugOptions['showComponentUsage']?"2px red dotted":""}`}}>
        {/* allow container to set the width of this div as it depends on the text length of all Objects */}
        <div className="expandCollapseText" style={{width: `${props.width}`}}> 
            {props.topicText}
        </div>
        
        <div className="expandCollapseIcon" onClick={collapseExpand}>
            <IconContext.Provider value={{style: {color: 'blue', fontSize: `${props.fontSize}`, padding: "0px 0px 0px 3px"}}}>
                <BiShow title={`Expand & show section "${props.topicText}"`} className={isExpanded?"hideSection":""}></BiShow>
                <BiHide title={`Collaps & hide section "${props.topicText}"`} className={isExpanded?"":"hideSection"}></BiHide>
            </IconContext.Provider>
        </div>
        
        <div className={isExpanded?"expandCollapseObject":"hideSection"}>
            {/* <CountByGroupContainer groupName="Status"></CountByGroupContainer> */}
            <CountAndGroupByFieldName 
                topicText={props.topicText} 
                fieldNameToGroupBy={props.fieldNameToGroupBy} 
                arrayValueTextConvertor={props.arrayValueTextConvertor}>
            </CountAndGroupByFieldName>
            {/* Testing my object ... {isExpanded?"true":"false"} */}
        </div>
    </div>
} 


