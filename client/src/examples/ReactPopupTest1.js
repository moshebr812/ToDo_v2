import React, { Component } from "react";
import {Popup} from "reactjs-popup"; 
import './ReactPopupTest1.scss';

// since file ReactPopupModalContent exports only 1 object, I can name it here to what ever name I want
import ModalContent from "./ReactPopupModalContent.js";


export class ReactPopupTest1 extends Component {
    constructor (props) {
      super(props);

      this.state = {
        isPopupOpen: false,
      };
    }
    // let [isPopupOpen, setIsPopupOpen] = useState(false);
    // let [tooltipType, setTooltipType]  = useState ('info')

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
                    position="center center"
                >
                    {/* put here the Component u want to open upon click */}
                    {close => <ModalContent close={close} modalTitle="Tutorial Session"/>}
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
                >

              {/* the text / Object to show when opened */}

              { close =>    ( 
                    <div className="popupWhenOpenTest1">
                      <h3>Popup content here when open!!</h3>
                      <button onClick={close}
                        >Thanks. Got It!</button>
                    </div>
              )}
            </Popup>

    

      </div> );
    }
}
