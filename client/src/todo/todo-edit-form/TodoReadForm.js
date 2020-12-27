// read the following per how to apply Validations 
//  https://react-hook-form.com/api

// try this link:
//  https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
// <input type="submit" />

//  try using setValue instead of defaultValue
//  https://stackoverflow.com/questions/62242657/how-to-change-react-hook-form-defaultvalue-with-useeffect

// https://stackoverflow.com/questions/42807901/react-input-element-value-vs-default-value

//  PROJECT:    TODO_V1
//  FILE:       TodoEditForm.js
import { useContext, useState } from 'react';
import './TodoForm.scss';
import { AppContextTodo } from '../../AppContext';
// import React from 'react';
import { useForm } from 'react-hook-form';
// Components
import { InputSelect } from '../../general/input-elements/InputSelect';
import { statusOptions, priorityOptions, complexityOptions } from '../../general/input-elements/SelectListValues';
import { formatDateOnly } from '../../general/helpers/Dates';
const dateFormat = require ('dateformat');

function closeForm(contextObject) {
    contextObject.setTodoInFocus({});
    // alert ('closeForm');
}

export function TodoReadForm (props) {
    
    const [viewOnly, setViewOnly] = useState(true);

    const contextTodo = useContext(AppContextTodo);
    
    const { register, handleSubmit, watch, errors } = useForm();
 
    if (contextTodo.todoFormMode!=='READ') { // open secren only when in READ mode
        return <div></div>
    }
    
    // Case we delete an Item that is now opened in "Edit From", the item becomes invalid and we crash
    if ( !contextTodo.todoInFocus || contextTodo.todoInFocus._id===undefined) {
        return <div className="additionalInfo">
            <h4>Additional Info (TodoEditForm.js)</h4>
            <hr></hr>
        </div>
    }

    return <div className="additionalInfo">
        <h4>Additional Info (TodoReadForm.js)</h4>
        <hr></hr>

        <form>      
        <div className="todoEditForm">
            <fieldset>
                <legend>{props.action} Task:   {contextTodo.todoInFocus.title}</legend>
                <div className="todoEditFormDivLine">
                    <label>Title</label> 
                    <input name="title" className="inputWide" id="title" type="text" disabled={viewOnly}  
                    value={contextTodo.todoInFocus.title}
                    ref={register}></input> 
                </div>
                <hr></hr>
                <div className="todoEditFormDivLine">
                    <label>Start Date</label>
                    <input name="startDate" id="startDate"  type="datetime" disabled={viewOnly} 
                        value={ dateFormat( contextTodo.todoInFocus.startDate , formatDateOnly)}
                        ref={register}></input> 

                    <InputSelect fieldLabel="Status" optionsArray={statusOptions} selectedValue={contextTodo.todoInFocus.status} 
                                 id="status" fieldName="status" disabled={viewOnly}></InputSelect>
                </div>

                <div className="todoEditFormDivLine">
                    <label>End Date</label>
                    <input name="endDate" id="endDate" type="datetime" disabled={viewOnly} 
                       value={dateFormat ( new Date(contextTodo.todoInFocus.endDate) , formatDateOnly )} >
                       </input>
 
                    <InputSelect fieldLabel="Priority" optionsArray={priorityOptions} selectedValue={contextTodo.todoInFocus.priority} 
                                 id="priority" fieldName="priority" disabled={viewOnly}></InputSelect>
                </div>

                <div className="todoEditFormDivLine">
                    <InputSelect fieldLabel="Complexity" optionsArray={complexityOptions} selectedValue={contextTodo.todoInFocus.complexity} 
                                 id="complexity" fieldName="complexity" disabled={viewOnly}></InputSelect>
                </div>
                <hr></hr>

                <div className="todoEditFormDivLine">
                    <label className="labelBlock">Details</label>
                    {/* <textarea   name="details" rows="4" className="inputWide" id="details" value={props.item.details}></textarea> */}
                    <textarea   name="details" rows="4" id="details" disabled={viewOnly} value={contextTodo.todoInFocus.details} ></textarea>
                </div>    
                <hr></hr>

                <div className="todoEditFormDivLine">
                    <label className="">Debug id</label>
                    <input name="id" type="text" disabled={viewOnly} value={contextTodo.todoInFocus.id}></input>
                    <label>Mongo _id</label>
                    <input className="inputSemiWide" disabled name="_id" type="text" value={contextTodo.todoInFocus._id}></input>
                </div>

                <div className="todoEditFormDivLine">

                    <button type="button" className="btnEditForm" title="Close without saving changes"
                        onClick={(()=>{
                            contextTodo.setTodoFormMode ('EDIT')
                        })}
                    >Edit</button>
                    <button type="button" className="btnEditForm" title="Close without saving changes"
                        onClick={(()=>{closeForm(contextTodo)})}
                    >Close</button>
                </div>          
          </fieldset>

        </div>
        </form>
    </div>
}
