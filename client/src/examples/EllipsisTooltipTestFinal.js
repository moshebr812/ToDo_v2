// https://www.npmjs.com/package/react-lines-ellipsis-with-tooltip


import './EllipsisTooltipTest.scss';
import { useState } from 'react';

// react-
import Text from 'react-texty'; // this is not good as it set the object in a new line, and if we use display: 
                                //incline it set the object not in the same height as the other objects
import LinesEllipsis from 'react-lines-ellipsis' // this is not good as the function that returns clamp
                                // true false is asycn and I can't set title={clamp?fullText:""}
// for tooltip
import React from 'react';
import ReactTooltip from 'react-tooltip';

//  these are not good -->> they always break a line for the object and don't implement "inline"
//  import EllipsisWithTooltip from 'react-ellipsis-with-tooltip'
//  https://www.npmjs.com/package/react-ellipsis-tooltip   -->> npm install react-ellipsis-tooltip


// try this
// import { Tooltip } from '@material-ui/core/Tooltip';
// import { Tooltip } from '@material-ui/core';

import { LongtextEllipsisTooltip } from '../general/longtext-ellipsis-tooltip/LongtextEllipsisTooltip';

export function EllipsisTooltipTestFinal (props) {

    let [titleToShow, setTitleToShow] = useState ('');
    let [tooltipType, setTooltipType]  = useState ('info')
    let [tooltipPlace, setTooltipPlace]  = useState ('top')

    let longTextExample = "now long text that will require a tooltip which I apply via property title. One Two Three Four Five Do Re Me Fa Sol La Si Do";
 
    async function handleReflow (rleState) {
        const {
          clamped,
          text,
        } = rleState
        // Add here relevant code per field that the text was clamped
        if (clamped) {
            // tooltip required, not all text fits the line
            setTitleToShow (longTextExample);
        } else {
            // tooltip not required
            setTitleToShow ('set to empty');
        }
        return clamped
      }


    return <div className="testEllipsisTooltip">
        
        <h3> Using react-lines-ellipsis</h3>
        <h4> example with long ... & tooltip via title </h4> 
        <div className="divType2"> BEFORE with inline|||</div>
         {/* am using here react-lines-ellipsis */}
         
        <LinesEllipsis className="divType2"
            text={longTextExample}
            component ='div'
            maxLine='1'
            ellipsis='...'
            trimRight="true"
            basedOn='words'
            onReflow={handleReflow}
            // using setState will verify title will be repopulted after the evalution of the full text & isClamped in function handleReflow
            title={titleToShow}></LinesEllipsis>
        <div className="divType2">|||AFTER|||</div>




        {/* tooltip options --->>> https://github.com/wwayne/react-tooltip#options */}
        <hr></hr>
        <label>Select tootip type:</label>

        {/* dark, success, warning, error, info, light */}
        <select onClick={(e)=>{setTooltipType(e.target.value)}}>
            <option id="dark" value="dark">Dark</option>
            <option id="error" value="error">Error</option>
            <option id="info" value="info" selected>Info.</option>
            <option id="light" value="light" selected>Light</option>
            <option id="success" value="success">Success</option>
            <option id="warning" value="warning">Warning</option>
        </select> <br></br>

        <label>Select tootip place (location):</label>
        <select onClick={(e)=>{setTooltipPlace(e.target.value)}}>
            <option id="top" value="top">Top</option>
            <option id="right" value="right" selected>Right</option>
            <option id="bottom" value="bottom" selected>Bottom</option>
            <option id="left" value="left" selected>Left</option>
        </select> <br></br>


        <button className="btnForTooltip" 
                // title="title can be shown in addition to tooltip"
                onClick={(() => {alert(`text for react-tooltip`)})}
                data-tip 
                data-for="checkTooltipType"   // the id of the element for which we trigger a tooltip
                                              // must correlate with an id in ReactTooltip
        > Tooltip on Button</button>   
        <p>Temp blocked the tooltip on button ABOVE so I can test</p>

       {/* u can put the tooltip specification anywhere in the render section */}
       {/* <ReactTooltip id="checkTooltipType" 
                    // when I used data-type / data-place: it did NOT change at run time. use global type / place
                    // data-type='info'
                    // data-place={tooltipPlace}
                    effect="solid" 
                    type={tooltipType}
                    place={tooltipPlace}
                    // overridePosition={{left: '10px'}}
                    offset='{"left": "-120px"}'
        >
                Tooltip example for the button. Type: {tooltipType} Place: {tooltipPlace}
        </ReactTooltip> */}

        <br></br>
        <hr></hr>  <hr></hr>
 
        <h3> Testnig my componenet LongtextEllipsisTooltip  EllipsisTooltipTestFinal.js</h3>
        <h4>combine react-lines-ellipsis & react-tooltip </h4> 
        <hr></hr>
        <div style={{backgroundColor: "pink", display: 'inline-block', border: "2px line dotted", height: "25px"}}>

        {/* <div style={{backgroundColor: "pink", border: "2px line dotted", height: "25px"}}> */}
            
        {/*  TExt Before any component
        <LongtextEllipsisTooltip
            fullText="|||line short"
        >
        </LongtextEllipsisTooltip> */}


        {/* <LongtextEllipsisTooltip
            fullText="|||line long text with most css properties not sent to see the defautls"
        >
        </LongtextEllipsisTooltip> */}

        {/* <LongtextEllipsisTooltip
            fullText="|||line long. Sending css to debug override of defaults in the component"
            textColor="magenta"
            backgroundColor="aqua"
            useEllipsis="^^^"
        >
        </LongtextEllipsisTooltip> */}

        {/* <LongtextEllipsisTooltip
            fullText="|||div short block"
            displaySettings="block"
        ></LongtextEllipsisTooltip> */}

        {/* <div className="divType2"> |||BEFORE|||</div> */}
      

        <label>|||JUST BEFORE||| </label>
        <LongtextEllipsisTooltip
            // Ellipsis Text Settings Options
            textColor="black"
            fullText="||| setting tooltip optiosn 2nd div long INLINE One Two Three Four Five Six Seven "
            displaySettings="inline"
            // tooltipEffect="float"

            // Tooltip Settings Options
            tooltipType="warning"
            tooltipPlace="bottom"
            // tooltipTextColor="red"
            // tooltipBackgroundColor="yellow"
            tooltipBorderColor="lime"
            tooltipAddBorder="false"
            displaySettings="inline"
        ></LongtextEllipsisTooltip>
        <label> |||Close After||| </label>
        </div>
        <hr></hr>
    </div>
}