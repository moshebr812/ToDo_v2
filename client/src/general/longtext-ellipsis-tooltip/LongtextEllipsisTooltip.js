import {useState, useEffect} from 'react';
import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import ReactTooltip from 'react-tooltip';

export function LongtextEllipsisTooltip (props) {
    // These default are used to the lext line
    let defaultTextColor = 'black';  //black
    let defaultBackgroundColor = "transparent"; // lightgrey
    let defaultDisplaySettings = "inline";
    let defaultMaxLines = "1";
    let defaultEllipsis = "...";

    // 
    let defTooltipType = "success";  // dark, success, warning, error, info, light
    let defTooltipPlace = "right";
    let defTooltipBackgroundColor = "lightgrey"
    let defTooltipTextColor = "black"
    let defTooltipBorder = "darkred"
    let defToolTipAddBorder = "false"

    let [tootipRequired, setTooltipRequired] = useState (false)

    useEffect ( () => {
        ReactTooltip.rebuild();
    })

    function handleReflow (rleState) {
        const {
          clamped,
          text,
        } = rleState
        // Add here relevant code per field that the text was clamped
        if (clamped) {
            // tooltip required, not all text fits the line
            setTooltipRequired (true);
        } else {
            // tooltip not required
            setTooltipRequired (false);
        }
        return clamped
      }

    // These defaults are used for the Tooltip

    // return  <div className="divType2" style={{display: "inline", border: "2px red solid", height: "10px", width: "240px", fontSize: "10px", color: "black"}}></div>
    return  <div 
    // <div className="divType2" style={{
    //         display: "inline", 
    //         border: "2px red solid", 
    //         height: "10px", 
    //         width: "240px", 
    //         fontSize: "15px", color: "black"}}>
        
        
            
        style={{ color: `${props.textColor ? props.textColor : defaultTextColor}`,
                 backgroundColor: `${props.backgroundColor ? props.backgroundColor : defaultBackgroundColor}`,
                 display: `${props.displaySettings ? props.displaySettings : defaultDisplaySettings}`,
                 height: "15px",
                //  minWidth: "200px",
                 border: "3px red dotted"
                }}
        >

        <LinesEllipsis stype={{minWidth: "240px"}}
            className="divType2"
            // text shown in the ellipsis line
            text={props.fullText ? props.fullText : "No Text Provided"}
            // max number of lines we allow
            maxLine={props.maxLilnes? props.maxLines : defaultMaxLines}
            // componenet tag type: div, label
            component="div"
            // symbol to indicate there is more text then seen. default "..."
            ellipsis={props.useEllipsis? props.useEllipsis : defaultEllipsis}
            trimRight="true"
            // break the text by letters or by words
            basedOn='words'
            // function to trigger to check if the text has an overflow & that is my indication 
            // if a tooltip is also required
            onReflow={handleReflow}    
            // if there is no need for a tool tip, set data-tip = ""
            // tooltipRequires is using useState and updated in function handleReflow()
            data-tip={tootipRequired ? props.fullText : "" }
            // the id of the element for which we trigger as tooltip
            data-for="tooltipDefinitions"   
        >
        </LinesEllipsis>

        <ReactTooltip id="tooltipDefinitions"
            type={props.tooltipType ? props.tooltipType : defTooltipType }
            place={props.tooltipPlace ? props.tooltipPlace : defTooltipPlace }            
            textColor={props.tooltipTextColor ? props.tooltipTextColor : defTooltipTextColor}
            backgroundColor={props.tooltipBackgroundColor ? props.tooltipBackgroundColor : defTooltipBackgroundColor}
            borderColor={props.tooltipBorderColor ? props.tooltipBorderColor : defTooltipBorder}
            border={props.tooltipAddBorder ? props.tooltipAddBorder : defToolTipAddBorder}

            // data-border="false"
            // data-border-color="transparent"
            // data-arrow-color="transparent"
            // offSet={}
        ></ReactTooltip>
    </div>

    {/* </div> */}
}
