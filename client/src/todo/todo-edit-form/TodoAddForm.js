// read the following per how to apply Validations 
//  https://react-hook-form.com/api


// try this link:
//  https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
// <input type="submit" />

//  PROJECT:    TODO_V1
//  FILE:       TodoEditForm.js
import { useContext, useEffect, useState } from 'react';
// I am using a common scss with the Edit / View form
import './TodoEditForm.scss';   
import { AppContextTodo } from '../../AppContext';
// import React from 'react';
import { useForm } from 'react-hook-form';
// Components
import { InputSelect } from '../../general/input-elements/InputSelect';
import { statusOptions, priorityOptions, complexityOptions } from '../../general/input-elements/SelectListValues';

import {Moment} from 'react-moment';
// import moment from 'moment';

// date_create: moment().format("DD-MM-YYYY hh:mm:ss")


async function getTodoItem( ObjectId) {
    const result = await fetch (`/api/todoitems/${ObjectId}`);
    const data = await result.json();
    console.log('from getTodoItem(ObjectId) return data.... = ' + ObjectId, data);
    // Note it returns an Array of 1 element
    return data;
}

function closeForm(contextObject) {
    // close the form and loose changes
    contextObject.setIsAddItemOpened (false);
    alert ('closeForm "Add"');
    return 0;
}

async function dbUpdateOneTodo (data, action, ObjectID) { 
    //  data:       the data from the form submission
    //  action:     support Add = POST & Edit = PUT
    
    try {
            console.log(`Client -->> dbUpdateOneTodo().  action: ${action}  ObjectID: ${ObjectID}`);
            console.log (`-------->> Title:  ${data.title}`);
            // console.log(data);
            let result = {};
            if (action==='ADD') {
                console.log ('Client -->> ACTION = ADD');
                result = await fetch (`/api/todoitems/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        },
                    body: JSON.stringify(data)
                })
            } else if (action==='EDIT') {
                console.log ('Client -->> ACTION = EDIT');    
                result = await fetch (`/api/todoitems/${ObjectID.toString()}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            },
                        body: JSON.stringify(data)
                    })
            }   else {
                console.log ('Client -->> invalid action type');
                // throw 'invald action type';
            }        
            
            const replyContent = await result.json();
            console.log('Client -->> replyContent', replyContent);
            return replyContent;        
             
    } catch (error)     {
            console.log ('Client -->> dbUpdateOneTodo(). FAILED fetch (`/api/todoitems/:_id) .PUT \n', error);
            alert ('Client -->> Failed to save.');
            throw new Error(error);
    }

}   // end deleteOntTodo

export function TodoAddForm (props) {
    
    const contextTodo = useContext(AppContextTodo);
    const { register, handleSubmit, watch, errors } = useForm();


    //  "register"          used to connect an input object to be part of the form result objects
    //  "handleSubmit"      will validate your inputs before invoking "onSubmit"
    //  "watch"             function to which we pass a registered input field and see its content
    //  Note we MUST use defaultValue and not value to set an init value to a field

    // This is the function called at the form level when we trigger the onSubmit 
    const onSubmit = ( async (data) => {
        // data DOES NOT include fields that are "disabled" --> id, _id. so I will need to user props.item.data
        let action = contextTodo.isAddItemOpened?"ADD":"EDIT";
        
        alert (`Client -->> Submitting data of TodoAddForm \n action=${action}`);
        console.log(`Client -->> Submitting data of TodoAddForm \n action=${action}`, data);

        let updateStatus = {};
        try {
            updateStatus = await dbUpdateOneTodo(data, action, contextTodo.todo_IdInEditMode); // contextTodo.todo_IdInEditMode - will be "" when action="ADD"
            console.log ('Client -->> updateStatus after calling dbUpdateOneTodo()' , updateStatus);
        } catch (e) {
            console.log (`Client -->> FAILED To ${action} record.`.e);
            alert ('Failed to Add Task');
            return -1;
        }    

        
        // update the main array
        let tempArray = [...contextTodo.todoList];
        // In structure of updateStatus I return 3 elements: 
                //debugInfo,
                //"todoItemData": data,
                //"todoStatusData": data2
        tempArray.unshift (updateStatus.todoItemData[0]);
        contextTodo.setTodoList (tempArray);
        contextTodo.setIsAddItemOpened (false);
    })

    // Example how to watch value of any of the registered input fields
    // console.log('watch("title")', watch("title")); // watch input value by passing the name of it
    
    // for the moment I am not using this as a I pass the value using ref={props,register} in the compoenent
    const onInputSelectChangeHandler = ( (val) => {
        // console.log (`from:  TodoEditForm.js / onStatusChangeHandler /`);
        // console.log (` \n........name=${val.target.name} ......val=${val.target.value}`);
    });

    
    if (!contextTodo.isAddItemOpened) { // screen should be closed as long as not in Add Mode
        return <div></div>
    }

    return <div className="additionalInfo">
        <h4>Adding a Todo Item (TodoAddForm.js)</h4>
        <hr></hr>

        {/* UPON SUBMIT -->> handleSubmit will validate the data, if all ok it will call function "onSubmit" and will pass it the data */}
        {/* in data we will see all input fields that were properly regitered */}
        <form onSubmit={handleSubmit(onSubmit)}>      
        {/* <form>    */}
        <div className="todoEditForm">
            <fieldset>
                <legend>{props.action} Task</legend>
                <div className="todoEditFormDivLine">
                    <label>Title</label> 
                    {/* <input name="startDate" id="startDate" type="text" defaultValue={props.item.startDate} ref={register}></input>  */}
                    {/* <input name="title" className="inputWide" id="title" type="text" defaultValue={props.item.title}  */}
                    <input name="title" className="inputWide" id="title" type="text" placeholder="type your task" defaultValue="" 
                        ref={register}
                    ></input> 
                    
                </div>
                <hr></hr>

                <div className="todoEditFormDivLine">
                    <label>Start Date</label>
                    <input name="startDate" id="startDate" type="date" defaultValue="2020-12-31" ref={register}></input> 

                    <InputSelect fieldLabel="Status" optionsArray={statusOptions} selectedValue="NS" register={register}
                                 id="status" fieldName="status" onChangeSelectField={onInputSelectChangeHandler}></InputSelect>
                </div>
                
                <div className="todoEditFormDivLine">
                    <label>End Date</label>
                    <input name="endDate" id="endDate" type="date" defaultValue="2030-12-31" ref={register}></input> 
                
                    <InputSelect fieldLabel="Priority" optionsArray={priorityOptions} selectedValue="3" register={register}
                                 id="priority" fieldName="priority" onChangeSelectField={onInputSelectChangeHandler}></InputSelect>
                 </div>
                 <div className="todoEditFormDivLine">
                    <InputSelect fieldLabel="complexity" optionsArray={complexityOptions} selectedValue="C" register={register}
                                 id="complexity" fieldName="complexity" onChangeSelectField={onInputSelectChangeHandler}></InputSelect>

                    {/* <Moment format="YYYY-MM-DD"></Moment> */}
                </div>
                <hr></hr>

                <div className="todoEditFormDivLine">
                    <label className="labelBlock">Details</label>
                    {/* <textarea   name="details" rows="4" className="inputWide" id="details" value={props.item.details}></textarea> */}
                    <textarea   name="details" rows="4" id="details" placeholder="type here details....." defaultValue="" ref={register}></textarea>
                </div>    
                <hr></hr>

                {/* read only section - no need to register */}
                <div className="todoEditFormDivLine">
                    {/* read only: for debug */}
                    <label className="">Debug id</label>
                    <input name="id" type="number" defaultValue="" ref={register}></input>
                    <label>Mongodb _id</label>
                    <input className="inputSemiWide" disabled name="_id" type="text" defaultValue="" ref={register}></input>
                </div>


                <div className="todoEditFormDivLine">
            
                    <button type="submit" className="btnEditForm" title="Save changes and close"
                        // this function must correlate by name to the function in the <form>
                        onClick={ ( () => {handleSubmit(onSubmit)})}
                    >Save</button>
                    <button type="button" className="btnEditForm" title="Close without saving changes"
                        onClick={(()=>{closeForm(contextTodo)})}
                    >Cancel</button>
                </div>          
          </fieldset>

        </div>
        </form>

    </div>
}


// <label>Status</label> 
// <select name="status" id="status" defaultValue={props.item.status} ref={register}>
//     <option value="not started">Not Started</option>
//     <option value="WIP">Work in Process</option>
//     <option value="in process">In Process</option>
//     <option value="done">Completed</option>
//     <option value="reopen">Re-Opened</option>
// </select>

{/* <label>Priority</label>
    <select className="selectInEditForm" name="priority" id="priority" defaultValue={props.item.priority} ref={register}>
        <option value="Highest">Highest</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
        <option value="NTH">Nice to Have</option>
    </select> */}




    // <label>Complexity</label>
    // {/* <input id="complexity" type="text" value={props.item.complexity}></input>      */}
    // <select name="complexity" id="complexity" defaultValue={props.item.complexity} ref={register}>
    //    <option value=""></option>
    //    <option value="Tough">Tough</option>
    //    <option value="Challenging">Challenging</option>
    //    <option value="Simple">Simple</option>
    // </select>