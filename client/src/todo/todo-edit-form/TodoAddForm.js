// read the following per how to apply Validations 
//  https://react-hook-form.com/api
//  https://react-hook-form.com/api#errors
//  https://reedbarger.com/how-to-use-react-hook-form-for-dead-simple-forms/

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
import { convertDateFormat } from '../../general/helpers/Dates';
// This is my Error Message Object
import { CustomizedErrorMsg } from '../../general/helpers/CustomizedErrorMsg';


// I want my external functions to have access to contextTodo

function isFieldNotEmpty  (fieldValue) {
    // if fieldValue = null / undefined / "" will return false, else will return true
    // alert (`isFieldEmpty /${fieldValue}/`);
    if (fieldValue==="" || fieldValue==null || fieldValue==undefined) {
        // I can set the message by returining it rather then returning false
        return `###FieldLablePlaceHolder### mandatory field`;
    } else {
        return true;
    }
}

function compareDates (D1, D2, D1Label, D2Label, errObject) {
    console.log ('errObject', errObject);
    // alert (`compareDates D1=${D1}  D2=${D2}`);

    let isD2Empty = isFieldNotEmpty(D2);
    if ( isD2Empty != true ) {
        return isD2Empty;
    }
    if (  (Date.parse(D2) - Date.parse(D1)) >= 0 ) {
        // alert ('OK');    
        return true;
    } else {
        // alert ('NOT OK');
        return `${D2Label} must be equal or bigger than ${D1Label}`;
    }
}

function defaultEndDate () {
    // get todays time in MS, add 7 Days in MS
    let NextWeekInMS = Date.now() + 1000 * 60 *60 * 24 * 7;
    let NextWeekDate = new Date (NextWeekInMS);
    NextWeekDate = convertDateFormat (NextWeekDate, "SHORT_1");
    return NextWeekDate;
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
    
    const { register, handleSubmit, watch, errors, getValues } = useForm({
        mode: "onSubmit",
    });
    // useForm mode:  onBlur, onChange, onSubmit --> don't use onBlur, because if I did NOT enter on of the fields, onBlur did NOT fire and the submit will occur

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

        // Add the insert time so we can stamp it in the Status History Table --> I don't hold this field on the Client
        data['insertDate']=  convertDateFormat ((new Date),"FULL_1_NO_SEC");
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
                    <input name="title" className={errors.title?"inputWide requiredFieldError":"inputWide"} id="title" type="text" placeholder="type your task" defaultValue={undefined} 
                        ref={register ({
                           require: {
                               value: true,
                               message: "title is a required field"
                               },  // the type in the "error" object is "value"
                               validate: isFieldNotEmpty,
                               minLength: 5,
                               maxLength: 30,
                            }
                        )}></input> 

                    <CustomizedErrorMsg errObject={errors} fieldName="title" fieldLabel="Title" minVal="5" maxVal="30"></CustomizedErrorMsg>
                    {/* {errors.title && errors.title.type 
                         && "Type: " + (errors.title.type) + "  Message: " + (errors.title.message)} */}
                    
                    {/* {errors.title && errors.title.type==="value" && ( <span className="validationErrMessage"> Title value is missing </span> )} */}
                    {/* {errors.title && errors.title.type==="required" && ( <span className="validationErrMessage"> Title is a required field</span> )} */}
                    {/* {errors.title && errors.title.type==="validate" && ( <span className="validationErrMessage"> Title can't be empty</span> )} */}
                    {/* {errors.title && (errors.title.type==="minLength" || errors.title.type==="maxLength") &&  */}
                        {/* ( <span className="validationErrMessage">Title has be between 5 to 30 chars long</span> )} */} 
                </div>
                <hr></hr>

                <div className="todoEditFormDivLine">
                    <label>Start Date</label>
                    <input name="startDate" id="startDate" type="date" defaultValue={convertDateFormat((new Date()),'SHORT_1')} ref={register}></input> 

                    <InputSelect fieldLabel="Status" optionsArray={statusOptions} defaultValue="NS" selectedValue="NS" register={register}
                                 id="status" fieldName="status" onChangeSelectField={onInputSelectChangeHandler}></InputSelect>
                </div>
                
                <div className="todoEditFormDivLine">
                    <label>End Date</label>
                    <input name="endDate" id="endDate" type="date" defaultValue={defaultEndDate()} className={errors.endDate?"requiredFieldError":""}
                        ref={register ({
                            require: {
                                value: true,
                                message: "is a required field"},
                            validate: () => compareDates ( getValues('startDate'), getValues('endDate'), "Start Date", "End Date", errors),
                            // validate: isFieldNotEmpty,
                        })}>
                    </input> 
                    <CustomizedErrorMsg errObject={errors} fieldName="endDate" fieldLabel="End Date"></CustomizedErrorMsg>
                    <br></br>

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
                    <input name="id" type="number" defaultValue="" className={errors.id?"requiredFieldError":""}
                        ref={register( {
                            require: true,

                            validate: () => isFieldNotEmpty ( getValues('id'), contextTodo),
                            // validate: isFieldNotEmpty,
                            min: {
                                value: 1,
                                messsage: "99"},
                            max: 909,    
                        },
                         )}></input>
                         <CustomizedErrorMsg errObject={errors} fieldName="id" fieldLabel="Debug Id" min="1"></CustomizedErrorMsg>
                         {/* {errors.id && errors.id.type && <strong>{errors.id.type}</strong>} */}
                         {/* {errors.id && errors.id.type==="required" &&  <span className="validationErrMessage">"id" is a required field</span>} */}
                         {/* {errors.id && errors.id.type==="validate" && ( <span className="validationErrMessage"> "id" can't be empty</span> )} */}
                         {/* {errors.id && errors.id.type==="min" &&  <span className="validationErrMessage">"id" must be a positive number</span>} */}

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
