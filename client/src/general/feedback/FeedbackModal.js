import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { AppContextTodo } from "../../AppContext";
import { BtnWithReactIcon } from '../btn-with-react-icon/BtnWithReactIcon';

// options not used
// import { FiStar } from 'react-icons/fi';
// import { RiStarLine } from 'react-icons/ri';
// import { FaHandPointer, FaRegHandPointer } from 'react-icons/fa';
//    AiFillStar
//    BsFillStarFill --> seems bigger

import './FeedbackModal.scss';

async function insertFeedback(data) {
  const status = await fetch (
    '/api/userfeedback',
    { method:    'POST',
      headers:   {'Content-type': 'application/json'},
      body:     JSON.stringify ( data )
    }
    )
}

async function closeModal (close, isSubmit, modalTitle, closingFlow, openTime, userScrore) {
    // for debug
    // alert (`About to close Modal for "${modalTitle}". \n isSubmit=${isSubmit.toString()} \n closingFlow=${closingFlow} \n\n openTime: ${openTime}`)

    let data = {
      // _id:               --> allocated by server 
      "module": modalTitle,
      "userID":  "600475b817912702237dfc31",  // anonymous for now till I have userID in AppContext
      "insertDate": openTime,
      "isSubmit": isSubmit,
      //"score": userScrore,  not relevant if actionFlow != 'Submit'
      "closingFlow": closingFlow,
      // engagementDuration: --> filled by server
    }
    if (isSubmit) {
      data['score'] = userScrore;
    }

    console.log(`within closemodal --> `, data);
    await insertFeedback (data);
    close();
}

function openModal (modalTitle) {
    // keep this for dbug
    //alert (`About to open Modal for modalTitle = ${modalTitle}`);
    // window.keyboard.blur();
}
// using here the export default exposes the object with the file name

// I pass the object the function to call upon closing the popup and thus I can us it anywhere I need:
//      From the "x"
//      From the cancel
//      From the "Submit"


// export default class ReactPopupModalContent extends React.Component {
export class FeedbackModal extends Component {
  
  constructor (props) {
    super(props);

    this.btnCancelPointer = React.createRef();
    console.log ('-------FeedbackModal -------modalTopic:.... ', this.props.moduleTopic);
    this.openTime = new Date();
    this.numOfStars = 3;

    this.state = { selectedScore: -1};  // set to -1 so all stars are empty
    // to update        this.setState = { selectedScrore:  newValue}
    // to read          this.state.selectedScore
    this.contextTodo = AppContextTodo;

    // Building an array on which I can map my objects
    this.numOfStars = 5;
    this.starsArray = [];
    for (let i=0;i<this.numOfStars;i++) {
      this.starsArray.push(i+1);
    }

    this.starClicked = ( (starID) => {
        // if new Score = Old Score   --> deselect  --> set new score to X-1 (deselect)
        // if new Score > Old Score   --> select    --> select new score and all those below me new X
        // if new Score < Old Score   --> deselect  --> deselect all score above X, and also deselect X
        if ( parseInt(starID) === this.state.selectedScore) {
          this.setState ( { selectedScore: starID - 1 } );
        } else  {
          this.setState ( { selectedScore: starID } );
        } 
      });

      // This is fired after DOM was loaded 
      this.componentDidMount = ( (prevProps, prevState) => {
        // alert ('from componentDidMount');
        let height = ReactDOM.findDOMNode(this).offsetHeight;
        // alert (`height = ${height}`);
        let A = ReactDOM.activeElement;
        // A.blur();
        // this.btnCancelPointer.current.focus();
      })
  }//  end constructor
  
  render () {  

    //   If I want to do something when the object is render --> call a local function. If needed, declare this.status in constructor 
    {openModal(this.props.modalTitle)}
    return (  <div className="modal" style={{border: "0px solid white", backgroundColor: "black"}}>
      

      {/* divforXCLose required rapper for <a> for the scss to apply on all properties */}
        <div className="divforXClose"> 
          <a className="close" id="xToClose" onClick={()=>{  closeModal ( this.props.close, false, this.props.modalTitle, "xClose", this.openTime, 'N/A' ) }}>
          {/* &times; */}
          x
          </a>
        </div>
        <br></br>
        <div className="modalHeader" style={{width: '100%'}}> 
          How would you rate your experience <br></br>for module "{this.props.modalTitle}" ? 
        </div>
        <div className="modalMainText">
          <br/>
          {/* {".".repeat(80)}  */}
          {/* <br/> {this.state.selectedScore} */}
        </div>

        <br/> 
        
        <div className="divForButtons">
        {this.starsArray.map ( (element, idx) => {
            // return <button>{idx} {element} AZS</button>
            return  <BtnWithReactIcon 
                        tooltip={`rate your experienece by selecting/deselecting the Star at the corresponding value (score ${element} of ${element}-${this.starsArray.length})`}
                        onClick={() => this.starClicked (element)}
                        textColor={this.state.selectedScore>=element?"yellow":"white"}
                        fontSize="26px"
                        margin="0 5px 0 5px"
                        // The Icon will change based on the user selection
                        actionType={this.state.selectedScore>=element?"STAR-FULL":"STAR-EMPTY"}
                        className="btnFeedbackStar"
                        blur="blur"
                      >
                      </BtnWithReactIcon>
            })
          }
          
        </div>
        <br/>
        <div className="divForButtons">
          {/* <BtnWithReactIcon 
            tooltip="rate your user experienece by selecting/deselecting the Star at the corresponding value (score 1 of 1-7)"
            onClick={() => this.starClicked (1)}
            textColor={this.state.selectedScore>=1?"yellow":"white"}
            fontSize="30px"
            margin="0 5px 0 5px"
            // The Icon will change based on the user selection
            actionType={this.state.selectedScore>=1?"STAR-FULL":"STAR-EMPTY"}
            className="btnFeedbackStar"
          >
          </BtnWithReactIcon> */}

          {/* <BtnWithReactIcon 
            tooltip="rate your user experienece by selecting/deselecting the Star at the corresponding value (score 2 of 1-7)"
            onClick={() => this.starClicked (2)}
            textColor={this.state.selectedScore>=2?"yellow":"white"}
            fontSize="30px"
            margin="0 5px 0 5px"
            actionType={this.state.selectedScore>=2?"STAR-FULL":"STAR-EMPTY"}
            className="btnFeedbackStar"
          >
          </BtnWithReactIcon> */}

          
          {/* <BtnWithReactIcon 
            tooltip="rate your user experienece by selecting/deselecting the Star at the corresponding value (score 3 of 1-7)"
            onClick={() => this.starClicked (3)}
            textColor={this.state.selectedScore>=3?"yellow":"white"}
            fontSize="30px"
            margin="0 5px 0 5px"
            actionType={this.state.selectedScore>=3?"STAR-FULL":"STAR-EMPTY"}
            className="btnFeedbackStar"
          >
          </BtnWithReactIcon> */}

        </div>

        {/* <br />
        <div className="divForButtons">
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>

        </div> */}

        <br />
        <div className="divForButtons">
            <button className="btnAction" 
              onClick={()=>{  closeModal ( this.props.close, true, this.props.modalTitle, "Submit", this.openTime, this.state.selectedScore ) }}
              disabled={this.state.selectedScore<0?true:false}
              // style={{  color: this.state.selectedScore<0?"grey":""}}
            >Submit</button>
            {/* added ref pointer to btnCancel so I can remove the focus */}
            <button className="btnAction" onClick={()=>{  closeModal ( this.props.close, false, this.props.modalTitle, "Dismiss", this.openTime, 'N/A' ) }}>Dismiss</button>
            {/* <input type="string" ref={this.btnCancelPointer} style={{backgroundColor: 'yellow'}}></input> */}
        </div>
    </div>
    )       // end return
  }     // end render
}; // end React.Component
