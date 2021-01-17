import React from "react";
import './ReactPopupModalContent.scss';
//
function closeModal (close, isSubmit, modalTitle, debugCalledBy) {
    alert (`About to close Modal for "${modalTitle}". \n isSubmit=${isSubmit.toString()} \n debugCalledBy=${debugCalledBy}`)

    close();
}

function openModal (modalTitle) {
    alert (`About to open Modal for modalTitle = ${modalTitle}`);
}
// using here the export default exposes the object with the file name

// I pass the object the function to call upon closing the popup and thus I can us it anywhere I need:
//      From the "x"
//      From the cancel
//      From the "Submit"

export default class ReactPopupModalContent extends React.Component {
 
// export default ({ close, modalTitle }) => (
  render () {  

    //   If I want to do something when the object is render --> call a local function. If needed, declare this.status in constructor 
    {openModal(this.props.modalTitle)}
    return (  <div className="modal">
        {/* <a className="close" onClick={close}> */}
        <a className="close" onClick={()=>{  closeModal ( this.props.close, false, this.props.modalTitle, "xOption" ) }}>
        
        {/* &times; */}
        x
        </a>
        <div className="header"> Modal Title - {this.props.modalTitle} </div>
        <div className="content">
        {" "}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
        Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
        delectus doloremque, explicabo tempore dicta adipisci fugit amet
        dignissimos?
        <br />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
        commodi beatae optio voluptatum sed eius cumque, delectus saepe
        repudiandae explicabo nemo nam libero ad, doloribus, voluptas rem alias.
        Vitae?
        </div>

        <br />
        <div className="divForButtons">
            <button className="btnModal" onClick={()=>{  closeModal ( this.props.close, true, this.props.modalTitle, "btnSubmit" ) }}>Submit</button>
            <button className="btnModal" onClick={()=>{  closeModal ( this.props.close, false, this.props.modalTitle, "btnCancel" ) }}>Cancel</button>
        </div>
    </div>
    )       // end return
  }     // end render
}; // end React.Component
