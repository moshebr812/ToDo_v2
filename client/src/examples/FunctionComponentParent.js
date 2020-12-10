import React from "react";
// use the same scss as on ClassComponenetParent
import './ClassComponentParent.scss';
import { FunctionComponentSon } from './FunctionComponentSon';
import { useForm } from 'react-hook-form';

function onDebug(fieldValue) {
  alert (`I can access any specific field to read its value using "watch".\n `+
  ` e.g. watch("firstName") = ${fieldValue}`);
}

export function FunctionComponentParent (props) {

  //optionsArray: I want to pass FunctionCompoent_Son the values to be shown in the "select" field
  const priorityOptions=[ {value: "A", text: "One"}, {value: "B", text: "Two"}, 
                          {value: "C", text: "Three"}, {value: "D", text: "Four"},
                          {value: "E", text: "Five"}, ];

  // fields 
  const { register, handleSubmit, watch } = useForm();

  const onChangePriorityHandler = ( (val) => {
    console.log (`from FunctionComponentParent.js \n  onChangePriorityHandler(val). `);
    console.log(`val=${JSON.stringify(val.target.value)}`);
  })

  const onSubmit = ( (data) => {
    alert ('user pressed submit button .... \n' + JSON.stringify(data));
  })

 
  return <div>
          <h3>FunctionComponenetParent.js</h3>
          <h4>input vals: </h4>
          <ul>
            <li>Some text on Function Component</li>
            <li>Bla Bla</li>
            <li>Hex, Hex</li>
          </ul>

          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
                <legend>Testing sending values from Son to Parent using Function Componenet</legend>
                <label>first name:</label>
                <input type="text" name="firstName" defaultValue="Meni" ref={register}></input>
                <label>last name:</label>
                <input type="text" name="lastName" defaultValue="Cohen" ref={register}></input>
                <hr></hr>
                <strong>here I will embed a function componenet (SON)</strong>
                <FunctionComponentSon 
                  // the id in <select>
                  fieldId="908"
                  // the name in <select>
                  fieldName="numbers"
                  // label of field in <label>
                  fieldLabel="Priority"
                  // Array will be translated to <option value> text </option>
                  optionsArray={priorityOptions}
                  // In real form, pass the DB value as the default value for the "select" field
                  // value in <select> which sets the "selected" option
                  selectedValue={priorityOptions[3].value}
                  // what function in "Parent" should "Son" function component upon user selection change in "select" tag
                  onChangeSelectField={onChangePriorityHandler}
                 > 
                  
                  </FunctionComponentSon>
            </fieldset>

            <button type="submit" onClick={ ( () => {handleSubmit(onSubmit)})}>Submit</button>
                
            <button type="button" onClick={ ( () => {onDebug(watch('firstName')) })}>Debug</button>
      
          </form>
    </div>
}

