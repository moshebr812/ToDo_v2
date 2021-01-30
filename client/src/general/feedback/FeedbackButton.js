import React, {useState} from 'react';
import {Popup} from 'reactjs-popup';
import './FeedbackButton.scss';
import {FeedbackModal} from './FeedbackModal.js';

// Terminology
// modal:       modal - per UI properties like: position, title, modalOpenTime
// module:      module - per the logical module of the Application we receive feedback for, like topic

export function FeedbackButton (props) {
        const fullTitle = `Submit feedback for module "${props.modalTitle}"`

        //     let [isPopupOpen, setIsPopupOpen] = useState(false);  --> note the usage of "open" replacing this
    return <Popup 
                    // do not let a "random click" outside the popup modal close the feedback window
                    closeOnDocumentClick={false}
                    trigger={open=> (<button 
                                            className="feedbackButton"
                                            title={fullTitle}
                                            style={{width: props.width?props.width:"120px",  height: props.height?props.height:"25px"}}
                                     >Feedback {open?'WIP':''}</button>)}
                    position={props.modalPosition?props.modalPosition:"center center"}
            >
            {close => <FeedbackModal close={close}  moduleTopic={props.moduleTopic} modalTitle={props.modalTitle}/>}
    </Popup>
}

// Applying a where statement
// Kitten.where("age").gte(1).lte(4).exec((err, kittens) => {
    // Do stuff

