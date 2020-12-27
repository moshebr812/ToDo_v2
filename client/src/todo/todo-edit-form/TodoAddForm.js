// read the following per how to apply Validations 
//  https://react-hook-form.com/api
//  https://react-hook-form.com/api#errors
//  https://reedbarger.com/how-to-use-react-hook-form-for-dead-simple-forms/

// try this link:
//  https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
// <input type="submit" />

import { useContext } from 'react';
import './TodoForm.scss';   
import { AppContextTodo } from '../../AppContext';
// import React from 'react';
import { useForm } from 'react-hook-form';
// Components
import { InputSelect } from '../../general/input-elements/InputSelect';
import { statusOptions, priorityOptions, complexityOptions } from '../../general/input-elements/SelectListValues';
import { convertDateFormat } from '../../general/helpers/Dates';
// This is my Error Message Object
import { CustomizedErrorMsg } from '../../general/helpers/CustomizedErrorMsg';
import { dateFormatForDatePicker } from '../../general/helpers/Dates';
//
const dateFormat = require ('dateformat');

function isFieldNotEmpty  (fieldValue) {
    if (fieldValue==="" || fieldValue===null || fieldValue===undefined) {
        // I can define my own message by returning it as string rather then returning false
        return `###FieldLablePlaceHolder### mandatory field`;
    } else {
        return true;
    }
}

function compareDates (D1, D2, D1Label, D2Label, errObject) {
    console.log ('errObject', errObject);

    let isD2Empty = isFieldNotEmpty(D2);
    if ( isD2Empty !== true ) {
        return isD2Empty;       // field is mandatory, so don't compare if empty
    }
    if (  (Date.parse(D2) - Date.parse(D1)) >= 0 ) {
        return true;
    } else {
        return `${D2Label} must be equal or bigger than ${D1Label}`;
    }
}

function defaultEndDate () {
    return  ( Date.now() + 1000 * 60 *60 * 24 * 5 );     // get todays time in MS, add 5 Days in MS
}

function closeForm(contextObject) {
    // close the form and loose changes
    contextObject.setTodoFormMode('READ');
    // alert ('closeForm "Add"');
    return 0;
}

async function dbUpdateOneTodo (data, action, ObjectID) { 
    //  data:       the data from the form submission
    //  action:     support Add = POST & Edit = PUT
    console.log (`${"X".repeat(30)}  dbUpdateOneTodo()`);
    try {
            console.log(`Client -->> dbUpdateOneTodo().  action: ${action}  ObjectID: ${ObjectID}`);
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
                // console.log ('Client -->> ACTION = EDIT'); 
                // console.log (data);

                // console.log ('before await fetch (`/api/todoitems/${ObjectID.toString()} ');
                result = await fetch (`/api/todoitems/${ObjectID.toString()}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            },
                        body: JSON.stringify(data)
                    })
            }   else {
                console.log ('Client -->> invalid action type');
            }        
            
            const replyContent = await result.json();
            console.log('Client -->> replyContent', replyContent);
            return replyContent;        
    } catch (error)     {
            console.log ('Client -->> dbUpdateOneTodo(). FAILED fetch (`/api/todoitems/:_id) .PUT \n', error);
            alert ('Client -->> Failed to save at     dbUpdateOneTodo() .');
            throw new Error(error);
    }
}   // end deleteOntTodo

async function getNextFreeDebugId (setValue) {
    try {
        const result = await fetch (`/api/todoitems/getNextFreeDebugId`);
        const data = await result.json();
        let NextId=1;

        console.log ( `from Client --> getNextFreeDebugId(). data = `, data);
        
        if (data && data[0]) {
            console.log ('using setValue("id")')
            NextId = data[0].id+1;
        } else {
            // 1st doccumet, default to 1
        }
        // Why? fetch is async,   newItemDefaults was already set to screen 
        setValue("id", NextId, {shouldValidate: false, shouldDirty: false} );
    } catch (e) {
        console.log (`Client --> failed getNextFreeDebugId`)
        return -99; // failed, user will allocate
    }    
}

export function TodoAddForm (props) {
    
    const contextTodo = useContext(AppContextTodo);
    
    const { register, handleSubmit, watch, errors, getValues, setValue, formState } = useForm({
        mode: "onSubmit", // when to apply the validations & raise the errors
    });
    const {isDirty, isSubmitting} = formState;

    const newItemDefaults =  {
        title: "",
        // startDate: convertDateFormat( (new Date()) , "SHORT_1"),
        // nove the convert from internal function to require('dateformat')
        startDate: dateFormat ( (new Date()) , dateFormatForDatePicker),
        status: "NS",
        endDate: dateFormat ( defaultEndDate(), dateFormatForDatePicker ),
        priority: 1,
        complexity: "S", 
        details: "",
        id: "-99", // if not ADD, don't access server
        _id: "",
    }

    if (contextTodo.todoFormMode==="ADD") {
        // the result from fetch arrives late anyway
        // newItemDefaults.id = getNextFreeDebugId(setValue);
        // console.log (`newItemDefaults.id  = ${newItemDefaults.id }`);
        getNextFreeDebugId(setValue);
    }

    // What values should we populate in the form: When ADD = defaults.   When EDIT = Data of Object In Focus
    let itemAtWork = (contextTodo.todoFormMode ==='EDIT') ? contextTodo.todoInFocus : newItemDefaults;
    
    if (contextTodo.todoFormMode ==='EDIT' && itemAtWork.startDate ) {
        // during the save this code is rendered twice and the if we don't check the field we crash
        itemAtWork.startDate =  dateFormat( new Date(itemAtWork.startDate), dateFormatForDatePicker);
        itemAtWork.endDate = dateFormat ( new Date(itemAtWork.endDate), dateFormatForDatePicker );
    }

    // useForm mode:  onBlur, onChange, onSubmit --> don't use onBlur, because if I did NOT enter on of the fields, onBlur did NOT fire and the submit will occur

    //  "register"          used to connect an input object to be part of the form result objects
    //  "handleSubmit"      will validate your inputs before invoking "onSubmit"
    //  "watch"             function to which we pass a registered input field and see its content
    //  Note we MUST use defaultValue and not value to set an init value to a field

    // This is the function called at the form level when we trigger the onSubmit 
    const onSubmit = ( async (data) => {
        // data DOES NOT include fields that are "disabled" --> id, _id. --> I will add them
        
        let action = contextTodo.todoFormMode;

        // alert (`Client -->> Submitting data of TodoAddForm \n action=${action}`);
        console.log(`Client -->> Before fix: Submitting data of TodoAddForm \n action=${action}`, data);

        // Add the insert time so we can stamp it in the Status History Table --> I don't hold this field on the Client
        data['insertDate']=  convertDateFormat ((new Date()),"FULL_1_NO_SEC");
        if (action==="EDIT") {
            // need to add fields _id, id  to the data element - as these fields are disabled
            data['_id'] = itemAtWork._id
            data['id'] = itemAtWork.id

            // Status has changed. Send the Server the old status so it can insert a record to 
            if (itemAtWork.status !== data.status) {
                data['insertStatusChange']=true;
                data['previousStatus']=itemAtWork.status;
            }
        }

        console.log(`Client -->> After  fix: Submitting data of TodoAddForm \n action=${action}`, data);
        
        let responseObject = {};
        
        try {
            responseObject = await dbUpdateOneTodo(data, action, contextTodo.todoInFocus._id); // _id - will be "" when action="ADD"
            console.log ('Client -->> after call "await dbUpdateOneTodo()". returned updateStatus: ' , responseObject);
        } catch (e) {
            console.log (`Client -->> FAILED To ${action} record.`,e);
            alert ('Failed to Add Task');
            throw new Error (e) ; //return -1;
        }    

        // POST --> uses insertMany --> returns data[]
        // PUT -->  uses findOneAndUpdate --> returns data{}
        // update the main array
        let tempArray = [...contextTodo.todoList];
        // In structure of updateStatus I return 3 elements: 
                //debugInfo,               
                //"todoItemData": data,
                //"todoStatusData": data2
        if ( action ==="ADD" ) {

            tempArray.unshift (responseObject.todoItemData[0]);

        } else if ( action === "EDIT" ) {

            let indexOfUpdated = tempArray.findIndex (element => element._id===itemAtWork._id);
            if (indexOfUpdated<0) {
                // failed to locate the updated row in the list
                alert('failed to find the entry of the update Todo-Item in the todoArrayList (TodoAddForm.js');
            } else {
                // replace the updated row 
                tempArray.splice (indexOfUpdated, 1, responseObject.todoItemData);
            }
        }
        contextTodo.setTodoList (tempArray);
        
        // Set to read mode
        contextTodo.setTodoFormMode('READ');
        
        // Now set the item in focus to the last updated Item
        if ( action ==="ADD" ) {
            contextTodo.setTodoInFocus ( responseObject.todoItemData[0] );
        } else if  ( action ==="EDIT") {
             contextTodo.setTodoInFocus (responseObject.todoItemData);
        }
        // console.log (`TodoAddForm.js onSubmit last line. action=${action}`);
    })

    // Example how to watch value of any of the registered input fields
    // console.log('watch("title")', watch("title")); // watch input value by passing the name of it

    if (contextTodo.todoFormMode==="READ") {
        return <div></div>
    }

    return <div className="additionalInfo">
        <h4>Adding a Todo Item (TodoAddForm.js)</h4>
        <hr></hr>

        <form onSubmit={handleSubmit(onSubmit)}>      
        {/* <form>    */}
        <div className="todoEditForm">
            <fieldset>
                <legend>{contextTodo.todoFormMode} Task { (contextTodo.debugOptions.showFlagsState?`${isDirty?"(is Dirty? Yes)":"(is Dirty? No)"}`:"")}</legend>
                <div className="todoEditFormDivLine">
                    <label>Title</label> 
                    <input  name="title" className={errors.title?"inputWide requiredFieldError":"inputWide"} 
                            id="title" type="text" placeholder="type your task" defaultValue={itemAtWork.title} 
                        ref={register ({
                                require: true,
                                validate: isFieldNotEmpty,
                                minLength: 5,
                                maxLength: 30,
                        })}></input> 

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
                    <input name="startDate" id="startDate" type="date"  title="Am using here require('dataformat). input type='date', not datetime' "
                    defaultValue={itemAtWork.startDate} ref={register}></input> 

                    <InputSelect fieldLabel="Status" optionsArray={statusOptions} defaultValue={itemAtWork.status} selectedValue={itemAtWork.status} register={register}
                                 id="status" fieldName="status"></InputSelect>
                </div>
                
                <div className="todoEditFormDivLine">
                    <label>End Date</label>
                    <input name="endDate" id="endDate" type="date" defaultValue={itemAtWork.endDate} className={errors.endDate?"requiredFieldError":""}
                        ref={register ({
                            require: {
                                value: true,
                                message: "is a required field"},
                                validate: () => compareDates ( getValues('startDate'), getValues('endDate'), "Start Date", "End Date", errors),
                        })}>
                    </input> 
                    <CustomizedErrorMsg errObject={errors} fieldName="endDate" fieldLabel="End Date"></CustomizedErrorMsg>
                    <br></br>

                    <InputSelect fieldLabel="Priority" optionsArray={priorityOptions} selectedValue={itemAtWork.priority} register={register}
                                 id="priority" fieldName="priority"></InputSelect>
                 </div>
                 <div className="todoEditFormDivLine">
                    <InputSelect fieldLabel="complexity" optionsArray={complexityOptions} selectedValue={itemAtWork.complexity} register={register}
                                 id="complexity" fieldName="complexity"></InputSelect>
                </div>
                <hr></hr>

                <div className="todoEditFormDivLine">
                    <label className="labelBlock">Details</label>
                    {/* <textarea   name="details" rows="4" className="inputWide" id="details" value={props.item.details}></textarea> */}
                    <textarea   name="details" rows="4" id="details" placeholder="type here details....." defaultValue={itemAtWork.details} ref={register}></textarea>
                </div>    
                <hr></hr>

                <div className="todoEditFormDivLine">
                    <label className="">Debug id</label>
                    <input name="id" type="number" defaultValue={itemAtWork.id} 
                        className={errors.id?"requiredFieldError":""}
                        disabled={contextTodo.todoFormMode !== "ADD"}
                        ref={register( {
                            require: true,
                            validate: () => isFieldNotEmpty ( getValues('id'), contextTodo),
                            min: 1,
                        })}></input>
                         <CustomizedErrorMsg errObject={errors} fieldName="id" fieldLabel="Debug Id" min="1"></CustomizedErrorMsg>
                         {/* {errors.id && errors.id.type && <strong>{errors.id.type}</strong>} */}
                         {/* {errors.id && errors.id.type==="required" &&  <span className="validationErrMessage">"id" is a required field</span>} */}
                         {/* {errors.id && errors.id.type==="validate" && ( <span className="validationErrMessage"> "id" can't be empty</span> )} */}
                         {/* {errors.id && errors.id.type==="min" &&  <span className="validationErrMessage">"id" must be a positive number</span>} */}

                    <label>Mongodb _id</label>
                    <input className="inputSemiWide" disabled name="_id" type="text" defaultValue={itemAtWork._id}
                    ref={register}></input>
                </div>

                <div className="todoEditFormDivLine">
                    <button type="submit" className="btnEditForm" title="Save changes and close" 
                        disabled={!isDirty}
                        // this function must correlate by name to the function in the <form>
                        onClick={ ( () => {handleSubmit(onSubmit)})}
                    >Save</button>
                    <button type="button" className="btnEditForm" title="Close without saving changes"
                        disabled={isSubmitting}
                        onClick={(()=>{closeForm(contextTodo)})}
                    >Cancel</button>
                </div>          
          </fieldset>

        </div>
        </form>

    </div>
}
