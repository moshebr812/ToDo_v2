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
import './TodoEditForm.scss';
import { AppContextTodo } from '../../AppContext';
// import React from 'react';
import { useForm } from 'react-hook-form';
// Components
import { InputSelect } from '../../general/input-elements/InputSelect';
import { statusOptions, priorityOptions, complexityOptions } from '../../general/input-elements/SelectListValues';

function closeForm(contextObject, funcSetViewOnly) {
    // close the form and loose changes
    contextObject.setTodo_IdInEditMode ('');
    contextObject.setTodo_TitleInEditMode ('');
    contextObject.setItemToEdit({});
    //// AT_WORK
    funcSetViewOnly(true)
    alert ('closeForm');
}
async function dbUpdateOneTodo (data, ObjectID) {   // Server Call
    try {
            console.log ('dbUpdateOneTodo().  New Title:' + data.title + ' / _id:' + ObjectID);
            console.log(data);
            const result = await fetch (`/api/todoitems/${ObjectID.toString()}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        },
                    body: JSON.stringify(data)
                })
            const replyContent = await result.json();
            return replyContent;        
    } catch (error)     {
            console.log ('dbUpdateOneTodo(). FAILED fetch (`/api/todoitems/:_id) .PUT \n', error);
            console.log ('checking access to field SyntaxError', error.SyntaxError)
            return error;
    }
}   // end deleteOntTodo

function onChange(changedElement) {
    console.log (changedElement.target.name, changedElement.target.value, changedElement.target.current.value);
}
export function TodoEditForm (props) {
    
    const [viewOnly, setViewOnly] = useState(true);

    const contextTodo = useContext(AppContextTodo);
    
    const { register, handleSubmit, watch, errors } = useForm();

    //  "register"          used to connect an input object to be part of the form result objects
    //  "handleSubmit"      will validate your inputs before invoking "onSubmit"
    //  "watch"             function to which we pass a registered input field and see its content
    //  Note we MUST use defaultValue and not value to set an init value to a field

    // This is the function called at the form level when we trigger the onSubmit 
    const onSubmit = ( async (data) => {
        // data DOES NOT include fields that are "disabled" --> id, _id. so I will need to user props.item.data
        alert ('Submitting data of EditForm \n return \n\n AT_WORK ....', data);

        data['testValue'] = "I am testing";
        let updateStatus = await dbUpdateOneTodo(data, contextTodo.itemToEdit._id);
        console.log ('updateStatus after calling dbUpdateOneTodo()' , updateStatus);

        // update the main array
        let tempArray = [...contextTodo.todoList];
        
        const index = tempArray.findIndex ( element => element._id === contextTodo.itemToEdit._id);
        if (index >=0) {
            // replace the relevant item if you found it in the Main Array
            // console.log ('applying splice');
            tempArray.splice(index,1,data);

            // console.log(tempArray);
            contextTodo.setTodoList (tempArray);

            // to close the form
            contextTodo.setTodo_IdInEditMode ('');
            contextTodo.setTodo_TitleInEditMode ('');
            contextTodo.setItemToEdit({});
        }
    })

    // Example how to watch value of any of the registered input fields
    // console.log('watch("title")', watch("title")); 
    
    // for the moment I am not using this as a I pass the value using ref={props,register} in the compoenent
    const onInputSelectChangeHandler = ( (val) => {
        console.log (`from:  TodoEditForm.js / onStatusChangeHandler /`);
        console.log (` \n........name=${val.target.name} ......val=${val.target.value}`);
    });

   
    if (contextTodo.isAddItemOpened) { // screen should be closed as long as " IN Add Mode"
        return <div></div>
    }
    // Case we delete an Item that is now opened in "Edit From", the item becomes invalid and we crash
    if (contextTodo.todo_IdInEditMode==="") { // || !props || !props.item) {
        return <div className="additionalInfo">
            <h4>Additional Info (TodoEditForm.js)</h4>
            <hr></hr>
        </div>
    }

    return <div className="additionalInfo">
        <h4>Additional Info (TodoEditForm.js)</h4>
        <hr></hr>

        {/* UPON SUBMIT -->> handleSubmit will validate the data, if all ok it will call function "onSubmit" and will pass it the data */}
        {/* in data we will see all input fields that were properly regitered */}
        <form onSubmit={handleSubmit(onSubmit)}>      
        {/* <form>    */}
        <div className="todoEditForm">
            <fieldset>
                <legend>{props.action} Task....:   {contextTodo.todo_TitleInEditMode}</legend>
                <div className="todoEditFormDivLine">
                    <label>Title</label> 
                    {/* list navigation works, but readOnly */}
                    <input name="title" className="inputWide" id="title" type="text" disabled={viewOnly} 
                    // defaultValue = {contextTodo.itemToEdit.title}
                    value={contextTodo.itemToEdit.title}
                    // value = {localCopy.title}
                    ref={register}></input> 
                    {/* if I put this I can edit, but the refresh fails */}
                    {/* <input name="title" className="inputWide" id="title" type="text" defaultValue={contextTodo.itemToEdit.title} 
                        ref={register}></input>  */}
                </div>
                <hr></hr>
                <div className="todoEditFormDivLine">
                    <label>Start Date</label>
                    <input name="startDate" id="startDate"  type="string" disabled={viewOnly} 
                        value={(contextTodo.itemToEdit.startDate?contextTodo.itemToEdit.startDate:"").substring(0,10)}
                        ref={register}></input> 

                    {/* <InputSelect fieldLabel="Status" optionsArray={statusOptionsArr} selectedValue={props.item.status} register={register}
                                 id="status" fieldName="status" onChangeSelectField={onInputSelectChangeHandler}></InputSelect> */}


                    <InputSelect fieldLabel="Status" optionsArray={statusOptions} selectedValue={contextTodo.itemToEdit.status} 
                                 id="status" fieldName="status" disabled={viewOnly} onChangeSelectField={onInputSelectChangeHandler}></InputSelect>
                </div>
                {/* <hr></hr> */}

                <div className="todoEditFormDivLine">
                    <label>End Date</label>
                    <input name="endDate" id="endDate" type="text" disabled={viewOnly} 
                        value={ (contextTodo.itemToEdit.endDate?contextTodo.itemToEdit.endDate:"").substring(0,10)} ref={register}></input> 

                    <InputSelect fieldLabel="Priority" optionsArray={priorityOptions} selectedValue={contextTodo.itemToEdit.priority} 
                                 id="priority" fieldName="priority" disabled={viewOnly} onChangeSelectField={onInputSelectChangeHandler}></InputSelect>
                </div>
                {/* <hr></hr> */}

                <div className="todoEditFormDivLine">
                    <InputSelect fieldLabel="Complexity" optionsArray={complexityOptions} selectedValue={contextTodo.itemToEdit.complexity} 
                                 id="complexity" fieldName="complexity" disabled={viewOnly} onChangeSelectField={onInputSelectChangeHandler}></InputSelect>
                </div>
                <hr></hr>

                <div className="todoEditFormDivLine">
                    <label className="labelBlock">Details</label>
                    {/* <textarea   name="details" rows="4" className="inputWide" id="details" value={props.item.details}></textarea> */}
                    <textarea   name="details" rows="4" id="details" disabled={viewOnly} value={contextTodo.itemToEdit.details} ></textarea>
                </div>    
                <hr></hr>

                <div className="todoEditFormDivLine">
                    {/* read only: for debug */}
                    <label className="">Debug id</label>
                    <input disabled name="id" type="text" disabled={viewOnly} value={contextTodo.itemToEdit.id}></input>
                    <label>Mongo _id</label>
                    <input className="inputSemiWide" disabled name="_id" type="text" value={contextTodo.itemToEdit._id}></input>
                </div>

                <div className="todoEditFormDivLine">
                    {/* AT_WORK */}
                    <button type="submit" className="btnEditForm" title="Save changes and close"
                        // this function must correlate by name to the function in the <form>
                        onClick={ ( () => {handleSubmit(onSubmit)})}
                    >Save</button>
                    {/* AT_WORK */}
                    <button type="button" className="btnEditForm" title="Close without saving changes"
                        onClick={(()=>{
                            setViewOnly(false)})}
                    >Edit</button>
                    <button type="button" className="btnEditForm" title="Close without saving changes"
                        onClick={(()=>{closeForm(contextTodo,  setViewOnly)})}
                    >Close</button>
                </div>          
          </fieldset>

        </div>
        </form>
    </div>
}



