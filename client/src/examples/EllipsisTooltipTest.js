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

export function EllipsisTooltipTest (props) {

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
        <h3> Testing options for ellipses</h3>

        <strong>text with ... dots no tooltip, using only css on tag "label"</strong> <br></br>
        <label>BEFORE|||</label>
        <label className="useCssOnly">this is a long text on purpose. overflow doesnot on type label</label>
        <label>|||AFTER</label> <br></br> <br></br>


        <strong>text with ... dots no tooltip, using only css on tag "input"</strong> <br></br>
        <label>BEFORE|||</label>
        <input className="useCssOnly" value="this is the long text on tah input purpose"></input>
        <label>|||AFTER</label> <br></br> <br></br>


        <strong>long text inline, needing a tooptip using react-texty tagName=label</strong> <br></br>
        <label>BEFORE|||</label>
        
        <Text   className="longText3Dots" 
                        // style={{display: "inline", width: "50px"}}
                        // display="inline"
                        tagName="label"
                        tooltipClassName="ellipseTooltip"
                        showDelay="180"    // in Milliseconds
                        hideDelay="180"    // in Milliseconds
                        placement="bottom-end"       // top|top-start|top-end|bottom|bottom-start|bottom-end
                        hideArrow="false"             //
                        // arrowClassName="BBB"
                        tooltipStyle={{ 'color': 'red', 'border': '2px white solid', opacity: '0.75'   }}
         >Test one two three</Text>
        <label>|||AFTER</label> <br></br> <br></br>


        <strong>long text inline, needing a tooptip using react-texty tagName=div</strong> <br></br>
        <div className="divType2">BEFORE|||</div>
        
        <Text   className="" 
                        // style={{display: "inline", width: "50px"}}
                        // display="inline"
                        tagName="div"
                        tooltipClassName="ellipseTooltip"
                        showDelay="180"    // in Milliseconds
                        hideDelay="180"    // in Milliseconds
                        placement="bottom-end"       // top|top-start|top-end|bottom|bottom-start|bottom-end
                        hideArrow="false"             //
                        // arrowClassName="BBB"
                        tooltipStyle={{ 'color': 'red', 'border': '2px white solid', opacity: '0.75'   }}
         >Test one two three</Text>
        <div ckassName="divType2"> |||AFTER</div> 

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

        {/* <h4> example with short text in which case do not set text into title</h4> 
        <label>|||BEFORE|||</label>
        <LinesEllipsis className="divType2"
            text={shortTextExample}
            component ='div'
            maxLine='1'
            ellipsis='...'
            trimRight="true"
            basedOn='words'
            onReflow={handleReflowShortText}
            // using setState will verify title will be repopulted after the evalution of the full text & isClamped in function handleReflow
            title={titleToShow}></LinesEllipsis>
        <label>|||AFTER|||</label> */}


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

        <br></br>
        <hr></hr>  <hr></hr>
  
        {/* <button className="btnForTooltip" 
                onClick={(() => {alert(`text additional options for react-tooltip`)})}
                data-tip ="what is data tip of the tooltip"
                data-for="exampleTooltip2"   // the id of the element for which we trigger a tooltip
        > Toolip exmple 2</button>
         */}
        {/* u can put the tooltip specification anywhere in the render section */}
        <ReactTooltip id="checkTooltipType" 
                    // when I used data-type / data-place: it did NOT change at run time. use global type / place
                    // data-type='info'
                    // data-place={tooltipPlace}
                    effect="solid" 
                    type={tooltipType}
                    data-place={tooltipPlace}
                    // overridePosition={{left: '10px'}}
                    offset='{"left": "-120px"}'
        >
                Tooltip example for the button. Type: {tooltipType} Place: {tooltipPlace}
        </ReactTooltip>

        {/* offset="{'right': 100}" */}
        {/* <ReactTooltip id="exampleTooltip2" place="bottom" effect="solid" type="info" 
                        textColor="red" backgroundColor="lime"
                        borderColor="black" border="true"
                        arrowColor="yellow">

                Tooltip example #2 for the button. Now I will write a long text to see the effects 
        </ReactTooltip> */}


        <h3> Testnig my componenet LongtextEllipsisTooltip: combine react-lines-ellipsis & react-tooltip </h3> 
        <div style={{backgroundColor: "lime", color: "red", display: 'inline', border: "2px line dotted"}}>
            TExt Before any component
        <LongtextEllipsisTooltip
            fullText="|||line short"
        >

        </LongtextEllipsisTooltip>

        <LongtextEllipsisTooltip
            fullText="|||line long text with most css properties not sent to see the defautls"
        >
        </LongtextEllipsisTooltip>

        <LongtextEllipsisTooltip
            fullText="|||line long. Sending css to debug override of defaults in the component"
            textColor="magenta"
            backgroundColor="aqua"
            useEllipsis="^^^"
        >
        </LongtextEllipsisTooltip>

        <LongtextEllipsisTooltip
            fullText="|||div short block"
            displaySettings="block"
        ></LongtextEllipsisTooltip>
        <br></br>

        {/* <div className="divType2"> |||BEFORE|||</div> */}
        Before 2|||
        <LongtextEllipsisTooltip
            fullText="|||div long inline One Two Three Four Five Six Seven "
            displaySettings="inline"
            useEllipsis="..."
            visibleTextWidth="100px"
        ></LongtextEllipsisTooltip>
        |||After without a specific tag
        <br></br>


        <LongtextEllipsisTooltip
            fullText="||| setting tooltip optiosn 2nd div long INLINE One Two Three Four Five Six Seven "
            // fullText="AAA"
            displaySettings="inline"
            // tooltipEffect="float"
            tooltipType="info"
            tooltipPlace="right"
        ></LongtextEllipsisTooltip>
        |||Close After|||
        <br></br>
        <br></br>
        <hr></hr>
        </div>
    </div>
}