import React, { Component } from "react";
import './ClassComponentParent.scss';
import { ClassComponentSon } from './ClassComponentSon';
import Popup from 'reactjs-popup'; 

export class ClassComponentParent extends Component {

  constructor (props) {
    super(props);

    this.state = {
      childValue: "init from parent",  // define this as a state so we can immediatley see the changes on the parent
      childId: 90805,
      selectedPat: "?"
    };

    this.childFieldLabel = "Favorite Pat";
    this.patOptions = [ {value:"?", text:"???"}, 
                        {value: "cat", text: "Cat"},
                        {value: "dog", text:"Dog"},
                        {value: "bird", text:"Bird"}];
  }

  
  // this is triggered from son & enables to change data and state on parent
  // each field will need its own function
  onChangeChildValueHandler = val => {   
    this.setState({ childValue: val.target.value });
  };

  onChangeChildIdHandler = val => {
    this.setState({ childId: val.target.value });
  };

  onChangeChildPatHanlder = val => {
    this.setState({ selectedPat: val.target.value});
  };

  render() {
    return (<div className="ClassComponentParent">
              <br></br>
              <strong> Parent Start file: classComponent_Parent.js </strong>
              <h4> ______(1) full name typed in the Child is : {this.state.childValue}</h4>  
              <h4> ______(2) id typed in Child is: {this.state.childId}</h4>
              <h4> ______(3) selected pat code (value): {this.state.selectedPat}</h4>
              <strong> Parent End</strong>

              <button>Test Popup </button>
              <Popup>Test 123</Popup>

              <ClassComponentSon 
                  id={this.state.childId} value={this.state.childValue}
                 onChangeValue={this.onChangeChildValueHandler} 
                 onChangeId={this.onChangeChildIdHandler} 
                //  these are the 5 paranters I will need for my InputSelect:
                //  label text for the "select field"
                fieldLabel={this.childFieldLabel}  // here no need for a state
                // selected option
                 selectedPat={this.state.selectedPat} 
                 // Array with options
                 patOptions={this.patOptions}
                 // Function on Parent that changes state + populate "data" object on Parent
                 onChangePat={this.onChangeChildPatHanlder}
                 />
          </div>
    );
  }
}

