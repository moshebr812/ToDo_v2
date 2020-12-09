// PROJECT:   Todo_v1
// FILE:      InputSelect.js

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

import React from 'react'
import './InputSelect.scss';

export function InputSelect (props) {
    
    // const demoArray = [{value: "A", text: "Aaa"},{value: "B", text: "Bbb"},{value: "C", text: "Ccc", value: "reopen", text: "Re-Opened"}]
    
    // return  <select name={props.name} id={props.id} value={props.defaultValue} ref={props.register_object}
    //         onChange={(e) => props.testValueChanged(e.target.value)}>
    //         {demoArray.map ( (element, idx) => {
    //             return <option key={idx} value={element.value}>{element.text}</option>
    //         })}
    // </select>

    return  <div>
            <label>{props.fieldLabel}</label>
            <select name={props.fieldName} 
                    id={props.fieldId}
                    // key is not passed, can use same unique value as 
                    key={props.fieldId}
                    // defaultValue={props.selectedValue} 
                    value={props.selectedValue} 
                    onChange={props.onChangeSelectField}  ref={props.register}
                    disabled={props.disabled}
                    >
                    
                    {/* the actual render of the select/option drop down */}
                    {props.optionsArray.map ( (item, idx) => {
                        return <option key={idx+1} value={item.value}>{item.text}</option>
                    })}
            </select>
        </div>
}