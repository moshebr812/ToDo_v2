// ============== element usage ========================================//
// pass the element an array of the values from which to build the 
// drop down of the <select> & <option>
// upon onChange, call function on parent form to pass the container the selected value
// Expected Properties in props:
//      props.fieldLabel            ==>> field caption
//      props.optionsArray          ==>> array of valid values: value, text
//      props.selectedValue         ==>> the selected option upon screen open. Can be empty
//      props.id                    ==>> to assure all elements in container hold a unique key
//      props.fieldName             ==>> for the <select> tag
//      props.onChangeSelectField   ==>> for the callback onChange will trigger in Parent
//      props.register              ==>> when parent is a form, 
//                                       Pointer to Parent useForm() register object to included in onSubmit(data)
// ============== element usage ========================================//

import {useState, useContext} from 'react';
import './InputSelect.scss';
import { AppContextTodo } from '../../AppContext';

export function InputSelect (props) {
    
    const contextTodo = useContext(AppContextTodo);

    if ( contextTodo.todoFormMode !="READ" ) {
        return  <div  style={{border: `${contextTodo.debugOptions['showComponentUsage']?"3px brown dotted":""}`}}>
            <label>{props.fieldLabel}</label>
            <select name={props.fieldName} 
                    id={props.fieldId}
                    key={props.fieldId}
                    defaultValue={props.selectedValue}
                    ref={props.register}
                    disabled={props.disabled}
                    >
                    {/* the actual render of the select/option drop down */}
                    {props.optionsArray.map ( (item, idx) => {
                        return <option key={idx+1} value={item.value}>{item.text}</option>
                    })}
            </select>
        </div>
    }
    
    return  <div  style={{border: `${contextTodo.debugOptions['showComponentUsage']?"3px brown dotted":""}`}}>
            <label>{props.fieldLabel}</label>
            <select name={props.fieldName} 
                    id={props.fieldId}
                    // key is not passed, can use same unique value as 
                    key={props.fieldId}
                    // defaultValue={props.selectedValue} 
                    value={props.selectedValue}
                    ref={props.register}
                    disabled={props.disabled}
                    >
                    
                    {/* the actual render of the select/option drop down */}
                    {props.optionsArray.map ( (item, idx) => {
                        return <option key={idx+1} value={item.value}>{item.text}</option>
                    })}
            </select>
        </div>
}