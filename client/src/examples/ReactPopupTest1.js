import React, { Component } from "react";
import {Popup} from "reactjs-popup"; 
import './ReactPopupTest1.scss';
import { LoginButton } from '../general/login/LoginButton';
// since file ReactPopupModalContent exports only 1 object, I can name it here to what ever name I want
import ModalContent from "./ReactPopupModalContent.js";


export class ReactPopupTest1 extends Component {
    constructor (props) {
      super(props);

      this.state = {
        isPopupOpen: false,
      };
    }
    render() {
      return ( <div>
                <h2> Using reactjs-popup </h2>
                <hr></hr>
                <h3>Example usint Popup which is embedded in an additional Object</h3>
                <Popup 
                    modal 
                    // trigger={<button onClick={()=> {alert('eop')}}
                    // the "open" is a boolean stating if Modal is Opened / Closed !!!! it is NOT a function
                    // If I need to do something upon Modal Open, see ReactPopupModalContent.js
                    trigger={open => (<button>Popup Using additional Component - {open?'Opened':'Closed'}</button>)}
                    // position="center center"
                    position="center center"
                >
                    {/* put here the Component u want to open upon click */}
                    {close => <ModalContent close={close} modalTitle="Tutorial Session" closeOnDocumentClick={false}  shouldCloseOnOverlayClick={false}/>}
                </Popup>

                <br></br>
                <hr></hr>
                <h3>Example using the Popup directly</h3>
                <Popup  
                  // Properties
                  trigger={<button>Popup all in main code </button>} 
                  position="center center"
                  arrow="false"
                  closeOnEscape="false"
                  closeOnDocumentClick={false}
                >
              {/* Here I define locally the properties objet to render, not using a predfined componenet as in section above */}
              { close =>    ( 
                    <div className="popupWhenOpenTest1">
                      <h3>Popup content here when open!!</h3>
                      <button onClick={close}
                        >Thanks. Got It!</button>
                    </div>
              )}
            </Popup>


            <br></br>
            <hr></hr>
            <h3>Straight forward example of popup up</h3>
            <Popup
              // this defines the "parent" before open
              trigger={open => (<div style={{backgroundColor: 'blue', color: 'yellow', width: '120px', height: '40px', textAlign: 'center'}}>simple div </div>) }
              position='top left'
              arrow={false}
              closeOnEscape={true}
            >
              <div className="menu">
                      <div className="menu-item"> item 1</div>
                      <div className="menu-item"> item 2</div>
                      <div className="menu-item"> item 3</div>
              </div>
            </Popup>

    

            <br></br>
            <hr></hr>
            <h3>using simple hover & class name to get effect of dropdown option</h3>
            <LoginButton>
              
            </LoginButton>
      </div> );
    }
}
