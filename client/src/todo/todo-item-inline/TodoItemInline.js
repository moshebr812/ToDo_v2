//  PROJECT:    TODO_V1
//  FILE:       TodoItemInline.js

// services
import {useState, useContext} from 'react';
// my code
import './TodoItemInline.scss';
import { TodoItemFull } from '../todo-item-full/TodoItemFull';
import { AppContextTodo } from '../../AppContext';
import { statusOptions, priorityOptions } from '../../general/input-elements/SelectListValues';

async function dbDeleteOneTodo (ObjectID) {   // Server Call
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
}   // end deleteOntTodo

async function deleteTodo(contextObject, ObjectID, title) {     // Client Hanlde
    const reply = window.confirm(`\nPlease confirm deleting task "${title}"\n\nmongodb _id:   ${ObjectID}`);
    
    if (reply) {
        console.log(`deleteTodo(). confirmed to del item ${title}  _id:  ${ObjectID}`);
        const deleteStatus = await dbDeleteOneTodo(ObjectID);
        
        console.log('deleteTodo(). returned result from server after fetch(delete): ', deleteStatus);
        
        // ?????? Is there a shorter way to check if error occured 
        if ( (deleteStatus) && (deleteStatus.data) && (deleteStatus.data.deletedCount>0)) {
            // db Delete succeeded. We can now refresh the todoList Array
            console.log ('deleteTodo(). REFERS Client ARRAY after db.delete');
            // must use [... so I can work on a side Array and then send the updated array tp the context Object]
            let tempArray = [...contextObject.todoList];
            const index = tempArray.findIndex (element => element._id === ObjectID)
            console.log (`deleteTodo(). findIndex = ${index}`);
            
            if (index>=0) { 
                // If its in Edit Mode, clean the "Edit" before else we crash
                tempArray.splice (index, 1) ;
                // console.log (`deleteTodo(). tempArray after splice`, tempArray);
                contextObject.setTodoList ( tempArray);
            }

            // If the item in Edit Mode is the Item we delete
            if (contextObject.todo_IdInEditMode == ObjectID) {
                console.log ('deleteTodo(). Item in "Edit Mode" = Item we delete. Clearing variables');
                contextObject.setTodo_IdInEditMode('');
                contextObject.setTodo_TitleInEditMode('');
                contextObject.setItemToEdit({});
            }
        } 

    } else {
        console.log(`deleteTodo(). DELETE FOR ${title}  _id:  ${ObjectID}  cancelled by user`);
    }
} // END deleteTodo

export function TodoItemInline (props) {

    let [isOpen, setIsOpen] = useState ( false );

    const contextTodo = useContext (AppContextTodo);

    return <div className="todoItemInline">
        <label> {props.idx}) </label>
        {props.item.title}

        {/* <label className="statusLabel">{props.item.status}</label>  */}
        <select className="statusLabel" name="status" id="status" disabled value={props.item.status}>

            {statusOptions.map ( (element, idx) => {
                return <option key={idx} value={element.value}>{element.text}</option>
            })}
            
        </select>

        {/* <InputSelect fieldLabel="" optionsArray={statusOptionsArr} selectedValue={props.item.status} 
                                 id="status" fieldName="status" readonly ></InputSelect> */}

        {/* <label className="priorityLabel">{props.item.priority}</label> 
        const priorityOptionsArr = [ {value: 5, text: "Highest"}, {value: 4, text: "High"}, {value: 3, text: "Medium"},
                             {value: 2, text: "Low"}, {value: 1, text: "Lowest"}] ; */}
        
        <select className="priorityLabel" name="priority" id="priority" disabled value={props.item.priority}>

            {priorityOptions.map ( (element, idx) => {
                return <option key={idx} value={element.value}>{element.text}</option>
            })}

        </select>
        
        {/* Edit Button */}
        <button className="btnInline btnEdit" 
            onClick={()=> { 
                        // openEditForm(contextTodo, props.item)}
                        if (contextTodo.isAddItemOpened) {
                            alert ('Submit or Cancel the form used for "Add Task", \n then proceed');
                            return 0;
                        }
                        console.log (`TodoItemInline.js / onClick() props.item._id=${props.item._id}`);
                        contextTodo.setTodo_IdInEditMode(props.item._id);
                        contextTodo.setTodo_TitleInEditMode(props.item.title);

                        contextTodo.setItemToEdit (props.item);
                        console.log (`TodoItemInline.js / onClick() after setItemToEdit (props.item)`,contextTodo.itemToEdit );

                    }} title="TBD how to edit inline">
        Edit</button>
        
        {/* Info Button: opens inline */}
         <button className="btnInline btnInfo"  onClick={() => { 
                  if (isOpen) {
                    setIsOpen(false);
                } else {
                    setIsOpen(true);
                    // contextTodo.setTodoIdInFocus(element.id)
                    console.log ('from open ' + props.item.id);
                }
            }} title="Expand, Collapse, TBD">  
            {/*  Change the caption */}
        {isOpen? 'Close' : 'Info'} </button> 

        {/* Delete Button */}
        <button className="btnInline btnDelete" title="deleting all !!! information related to this todo item" 
            onClick={()=> deleteTodo(contextTodo, props.item._id,  props.item.title)}>
        Delete</button>
        
        {/* this info will be added under the line of the main item */}
        <div className={isOpen? "itemFullInLineSectionOpened" : "itemFullInLineSectionClosed"}>
            <TodoItemFull closeText='Close' openText='Details' item={props.item}></TodoItemFull>
        </div>
    </div>
}
