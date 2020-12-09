import './ClassComponentSon.scss';

export function FunctionComponentSon (props) {

  return <div>
      <hr></hr>
      Demo on tag "ul" <br></br>
      <label>{props.fieldLabel}</label>
      <ul>
        {props.optionsArray.map ( (item, idx) => {
           return (<li>{idx+1} --  {item.value} / {item.text}</li> )
        })}
      </ul>
      <hr></hr>
      <hr></hr>
      Demo on tag "select" <br></br>
      <label>{props.fieldLabel}:  </label>
      <select name={props.fieldName} defaultValue={props.selectedValue} id={props.fieldId}
          onChange={props.onChangeSelectField}>

          {props.optionsArray.map ( (item, idx) => {
              return <option key={idx+1} value={item.value}>{item.text}</option>
            })}

      </select>
    </div>
}
