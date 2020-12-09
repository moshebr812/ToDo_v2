
import React, { Component } from "react";
import './ClassComponentSon.scss';

export class ClassComponentSon extends Component {

  constructor(props){
    super(props);
    this.id = props.id;
    this.fullName = props.value;
    // the "selected option" in tag <select></select>
    this.pat = props.selectedPat;
    // Pass an array tha will be converted into a select / option tag
    this.patArray = props.patOptions;
    this.onChangeValue = props.onChangeValue;
    this.onChangeId = props.onChangeId;
    this.onChangePat = props.onChangePat;
    this.fieldLabel = props.fieldLabel;
  }

  render() {

    // I can remove the constructor and use this. I prefer construtor.
    // const { id, fullName, onChangeValue } = this.props;

    return (
      <div className="classComponentSon">
        <hr></hr>
        <strong> In Child file: ClassComponentSon.js</strong>  <br></br>
        <hr></hr>
        <label>Full Name:</label>
        <input type="text" defaultValue={this.fullName} onChange={this.onChangeValue} /> <br></br>
        <label>id: </label>
        <input type="number" defaultValue={this.id} onChange={this.onChangeId}></input> <br></br>
        
        
        <label>{this.fieldLabel}</label>
        
        <select name="pats" id="999" defaultValue={this.pat} onChange={this.onChangePat}>
          {this.patArray.map ( (element, idx) => {
            return <option key={idx} value={element.value}>{element.text}</option>
            })
          }
        </select>  
      </div>
    );
  }
}

