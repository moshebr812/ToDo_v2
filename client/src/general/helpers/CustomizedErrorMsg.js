import {useState} from 'react';
import './CustomizedErrorMsg.scss';

export function CustomizedErrorMsg (props) {
    // should later move it to context Object
    const FieldLablePlaceHolder = '###FieldLablePlaceHolder###'; 
    
    let [showFullDetails, setShowFullDetails] = useState (false);

    if (!props.fieldName || !props.errObject || (!props.errObject[props.fieldName]) ){
        return <div className="displayNone">
            No Error
        </div>
    }

    let validationType = props.errObject[props.fieldName].type
    let validationMsg = props.errObject[props.fieldName].message

    
    // not in all cases we have errors.fieldName.message is defined
    if (validationMsg) {
        // in some messages we need to set the field "UI" label text    
        validationMsg = validationMsg.replace(FieldLablePlaceHolder, props.fieldLabel)
    }

    console.log ('from CustomizedErrorMsg', props.errObject);

    switch (validationType) {
        case "required":
        case "value":
            validationMsg = `${props.fieldLabel} is a required field.`;
            break;
        case "validate":
            // don't override the validateMsg. each validation function returns the relevant message
            // validationMsg = `${props.fieldLabel} is a required field (and can't be empty).`;
            break;
        case "min":
            validationMsg = `${props.fieldLabel} minimum allowed value is ${props.errObject[props.fieldName]['value']}`;
            break;
        case "max":
            validationMsg = `${props.fieldLabel} maximum allowed value is ${props.errObject.max}`;
            break;
        case "minLength":
            validationMsg = `${props.fieldLabel} minimum allowed length is ${props.minVal}`;
            break;
        case "maxLength":
            validationMsg = `${props.fieldLabel} maximum allowed length is ${props.maxVal}`;
            break;
        default: 
            validationMsg = `${props.fieldLabel} validation type ${validationType} not yet supported`;

    }
    
    return <div className="validationErrObject"> 
        {validationMsg} 
        <button className="btnErrAdditionalInfo"
            title={(showFullDetails?"Close" : "Show") + " Additional Error Info"}
            onClick={ ( () => {setShowFullDetails(!showFullDetails)})}>
            {showFullDetails?"-":"+"}</button>
        <br></br>
        <span className={showFullDetails?"":"displayNone"}>
            Id: {props.fieldName} | 
            Label: {props.fieldLabel} | 
            Type: {validationType}
         </span>
        {/* Type: Is Object Valid = { props.errObject[props.fieldName]? "VALID":"NOT VALID"}  */}
        {/* Error on Type = { props.errObject[props.fieldName]? props.errObject[props.fieldName]['type']: "unknon type"} */}
        {/*props.errObject? JSON.stringify(props.errObject['message']) : "not aaadefined"*/}
    </div>
}