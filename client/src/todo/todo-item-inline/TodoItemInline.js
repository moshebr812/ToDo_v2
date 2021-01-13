//
import {useState, useContext} from 'react';
// 
import './TodoItemInline.scss';
import { TodoItemFull } from '../todo-item-full/TodoItemFull';
import { AppContextTodo } from '../../AppContext';
import { statusOptions, priorityOptions } from '../../general/input-elements/SelectListValues';
import { IconContext } from 'react-icons';
import { RiDeleteBin6Line, RiEdit2Line, RiInformationLine, RiCloseCircleLine } from 'react-icons/ri';
//
import { InputSelect } from '../../general/input-elements/InputSelect';
// 
import { LongtextEllipsisTooltip } from '../../general/longtext-ellipsis-tooltip/LongtextEllipsisTooltip';


async function dbDeleteOneTodo (ObjectID) {  
    try {
            const result = await fetch (`/api/todoitems/${ObjectID.toString()}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        },
                })
            const replyContent = await result.json();
            return replyContent;        
    } catch (error)     {
            console.log ('FAILED\n', error);
            return error;
    }
}   // end dbDeleteOneTodo

async function deleteTodo(contextObject, ObjectID, title) {     // Client Handle
    const reply = window.confirm(`\nPlease confirm deleting task "${title}"\n\nmongodb _id:   ${ObjectID}`);
    
    if (reply) {
        // console.log(`deleteTodo(). confirmed to del item ${title}  _id:  ${ObjectID}`);
        const deleteStatus = await dbDeleteOneTodo(ObjectID);
        
        // console.log('deleteTodo(). returned result from server after fetch(delete): ', deleteStatus);
        
        if ( (deleteStatus) && (deleteStatus.data) && (deleteStatus.data.deletedCount>0)) {
            // db Delete succeeded. We can now refresh the todoList Array
            // console.log ('deleteTodo(). REFERS Client ARRAY after db.delete');
            // must use [...] so I can work on a side Array and then send the updated array tp the context Object]
            let tempArray = [...contextObject.todoList];
            const index = tempArray.findIndex (element => element._id === ObjectID)
            // console.log (`deleteTodo(). findIndex = ${index}`);
            
            if (index>=0) { 
                tempArray.splice (index, 1) ;   // delete the item from UI Array
                contextObject.setTodoList ( tempArray);
            }

            // If deleted item is in Focus: remove the pointer
            if (contextObject.todoInFocus._id === ObjectID) {
                contextObject.setTodoInFocus ({});
            }
        } 

    } else {
        // console.log(`deleteTodo(). DELETE FOR ${title}  _id:  ${ObjectID}  cancelled by user`);
    }
} // END deleteTodo

function onClickTest (my_id) {
    // console.log (`clicked from TodoItemInline.js ${my_id}`);
}

export function TodoItemInline (props) {

    let [isOpen, setIsOpen] = useState ( false );

    const contextTodo = useContext (AppContextTodo);

    return <div className={ (contextTodo.todoInFocus._id && contextTodo.todoInFocus._id === props.item._id)? "todoItemInline highlightnedLine " : "todoItemInline "}
            onFocus={props.onClick(props.item._id)}
            onClick={onClickTest(props.item._id)}
            style={{border: `${contextTodo.debugOptions['showComponentUsage']?"2px rgb(255,0,64) dotted":""}`}}
            >

        <label className="ellipsisField"> {props.idx}) </label>
        
        {/* need to put title in a tag so I can apply the ellipse + tooltip feature */}
        {/* <label className="ellipsisField"> {props.item.title}</label> */}
        <label className="ellipsisField">{props.item.title}</label>


        {/* <div style={{border: "yellow 3px solid", display: "inline-block", width: "210px", color: "black"}}>
        <LongtextEllipsisTooltip
            fullText={props.item.title}
            textColor="black"
            // tooltipType="success"
            displaySettings="inline"
        >
        </LongtextEllipsisTooltip>
        </div> */}

        {/* <Text   className="ellipsisField" 
                        tooltip={props.item.title}     // the actual text of the tooltip
                        tagName="strong"
                        tooltipClassName="ellipseTooltipTypeA"
                        style={{display: 'inline'}}
                        showDelay="180"    // in Milliseconds
                        hideDelay="180"    // in Milliseconds
                        placement="bottom-end"       // top|top-start|top-end|bottom|bottom-start|bottom-end
                        hideArrow="false"             //
                        // arrowClassName="BBB"
                        tooltipStyle={{ 'color': 'black', 'border': '2px black solid', opacity: '0.75', backgroundColor: 'white', borderRadius: '0px'   }}
                >{props.item.title}</Text> */}
        
        

        <select className="statusLabel" name="status" id="status" disabled value={props.item.status}>
            {statusOptions.map ( (element, idx) => {
                return <option key={idx} value={element.value}>{element.text}</option>
            })}
        </select>    

        {/* <InputSelect fieldLabel="" optionsArray={statusOptions} selectedValue={props.item.status} 
                                 id="status" fieldName="status" disabled usageMode="READ" backgroundColor="transparent" width="8px"
                                 ></InputSelect> */}

        

        <select className="priorityLabel" name="priority" id="priority" disabled value={props.item.priority}>
            {priorityOptions.map ( (element, idx) => {
                return <option key={idx} value={element.value}>{element.text}</option>
            })}

        </select>
        
        {/* Edit Button */}
        <button className="btnInline btnEdit" 
            onClick={()=> { 
                        // openEditForm(contextTodo, props.item)}
                        if (contextTodo.todoFormMode !=="READ") {
                            alert (`Submit or Cancel the form currenly in ${contextTodo.todoFormMode} mode. \n then proceed`);
                            return 0;
                        }
                        // console.log (`TodoItemInline.js / Edit.onClick() props.item._id=${props.item._id}`);

                        contextTodo.setTodoFormMode('READ');
                        contextTodo.setTodoInFocus (props.item);
                        // console.log (`TodoItemInline.js -> onClick() after setTodoInFocus (props.item)`,contextTodo.todoInFocus );

                    }} title="View task full details with option to edit">
            <IconContext.Provider value={{style: {color: 'blue', fontSize: '16px', padding: "0", marginTop: "0"}}}>
                <RiEdit2Line></RiEdit2Line>
            </IconContext.Provider> 
        </button>

        {/* Info Button: opens inline */}
         <button className="btnInline btnInfo"  title={isOpen?"Close additional info":"Show inline additional info"}
          onClick={() => { 
                  if (isOpen) {
                    setIsOpen(false);
                } else {
                    setIsOpen(true);
                    console.log ('from open ' + props.item.id);
                }
            }}>  
            {/*  Change the caption */}
        {isOpen? <IconContext.Provider value={{style: {color: 'blue', fontSize: '16px', padding: "0", marginTop: "0"}}}>
                    <RiCloseCircleLine></RiCloseCircleLine>
                </IconContext.Provider> : 
                <IconContext.Provider value={{style: {color: 'blue', fontSize: '16px', padding: "0", marginTop: "0"}}}>
                    <RiInformationLine></RiInformationLine>
                </IconContext.Provider> 
        } </button> 

        {/* Delete Button */}
        <button className="btnInline btnDelete" title="Warning - this will Delete all information related to this todo item" 
            onClick={()=> deleteTodo(contextTodo, props.item._id,  props.item.title)}>
        <IconContext.Provider value={{style: {color: 'red', fontSize: '16px', padding: "0", marginTop: "0"}}}>
            <RiDeleteBin6Line></RiDeleteBin6Line>
        </IconContext.Provider>    
        </button>
        
        {/* this info will be added under the line of the main item */}
        <div className={isOpen? "itemFullInLineSectionOpened" : "itemFullInLineSectionClosed"}>
            <TodoItemFull closeText='Close' openText='Details' item={props.item}></TodoItemFull>
        </div>
    </div>
}
