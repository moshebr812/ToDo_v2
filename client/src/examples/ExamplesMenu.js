import './ExamplesMenu.scss';
import { useContext } from 'react';
import { AppContextTodo } from '../AppContext';
import { ClassComponentParent } from './ClassComponentParent';
import { FunctionComponentParent } from './FunctionComponentParent';
import { HostHook } from './HostHook';
import { ReactIconsLib } from './ReactIconsLib';
// routing to examples
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
// https://www.npmjs.com/package/react-texty
// worked good until the bug that it always breaks the line (uses display: block
import Text from 'react-texty';
import 'react-texty/styles.css';

// this is not good
// import EllipsisWithTooltip from 'react-ellipsis-with-tooltip'
//  https://www.npmjs.com/package/react-ellipsis-tooltip   -->> npm install react-ellipsis-tooltip


// try this
// import { Tooltip } from '@material-ui/core/Tooltip';
// import { Tooltip } from '@material-ui/core';

function isPali(e) {
    alert ('value is: ' + e.target.value);
}
export function ExamplesMenu (props)  {

    const contextTodo = useContext(AppContextTodo);

    return <div className="examplesMenu">
        
        <BrowserRouter>
            <div>
                <h3> Code Examples </h3> 
                <Link to="/" className="exampleLink">None</Link> <br></br> <hr></hr>
                <Link to="/examples/classComponentParent" className="exampleLink"> Parent Son: pass values using Class</Link> <br></br> <hr></hr>
                <Link to="/examples/functionComponentParent" className="exampleLink"> Parent Son: pass values using Function</Link>  <br></br> <hr></hr>
                <Link to="/hosthook" className="exampleLink"> example using my own hook</Link>  <br></br> <hr></hr>
                <Link to="/reactIconsLib" className="exampleLink"> Interfacing react-icons</Link> <br></br> <hr></hr>

                <label>Input  </label>
                <input type="text" value="test"></input>
                <button onClick={ ( (e) => {isPali(e)} )}>check</button>
                <br></br>
                <br></br>
                <hr></hr>
           

                <fieldset>
                    <legend> <strong>Debug Options </strong></legend>

                    <label>Show Component Usage:</label> 
                    <input type="checkbox" checked={contextTodo.debugOptions['showComponentUsage']} 
                        onChange={((e) => contextTodo.setDebugOptions({ "showComponentUsage": e.target.checked, 
                                                                        "showFlagsState": contextTodo.debugOptions['showFlagsState']}))}></input>
                    <label style={{color: "black"}}>(set dotted border around Function Components re-use )</label> <br></br>

                    <label>Show File Name:</label> 
                    <input type="checkbox"></input><label style={{color: "black"}}>(not yet implemented)</label> <br></br>
                    

                    <label>Show Flags State:</label> 
                    <input type="checkbox" checked={contextTodo.debugOptions['showFlagsState']} 
                        onChange={((e) => contextTodo.setDebugOptions({ "showComponentUsage": contextTodo.debugOptions['showComponentUsage'],
                                                                        "showFlagsState": e.target.checked}))}></input> 
                    <label style={{color: "black"}}>(show additional flags that present a status/action )</label> <br></br>

                </fieldset>


                <hr></hr>
                <br></br>
                <h4>ellipisis and Tooltip - still not wokring</h4>
                
                The Main problem wit react-texty is the line break it applies
               
                <label className="longText3Dots"> handle long text with named ellipsie. by detault works input</label> <br></br>
               
                <input className="longText3Dots" value="just test a long text with three dots which is name ellipse" disabled></input> 
                
                {/* <br></br>  <br></br> */}
                <Text   className="longText3Dots" 
                        style={{display: "inline", width: "50px"}}
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
                <label>bord</label>

                <br></br>
                <hr></hr><hr></hr>
                
                <Text   className="longText3Dots" 
                        // style={{display: "inline", maxWidth: "50px"}}
                        // display="inline"
                        tagName="p"
                        tooltipClassName="ellipseTooltip"
                        showDelay="180"    // in Milliseconds
                        hideDelay="180"    // in Milliseconds
                        placement="bottom-end"       // top|top-start|top-end|bottom|bottom-start|bottom-end
                        hideArrow="false"             //
                        // arrowClassName="BBB"
                        tooltipStyle={{ 'color': 'red', 'border': '2px white solid', opacity: '0.75'   }}

                >Test one two three</Text>
                


                <hr></hr>  <hr></hr>
                <label style={{width: '80px'}}> text BEFORE the tooltip </label>
                <label style={{color: 'blue'}} className="debugEllipsisOnly"> this text should be trimmed by three dots using ellipsis</label>
                <div style={{color: 'yellow'}} className="debugEllipsisOnly"> this text should be trimmed by three dots using ellipsis</div>
                <label> text AFTER the tooltip </label>
                <Text   tagName="div" className="longText3Dots">Test one two three</Text>
                <input className="debugEllipsisOnly" value="Once upon a time many many years ago"></input><label>Text after me</label>
                <Text   className="longText3Dots" 
                        style={{display: "inline", maxWidth: "50px"}}
                        // display="inline"
                        tagName="p"
                        tooltipClassName="ellipseTooltip"
                        showDelay="180"    // in Milliseconds
                        hideDelay="180"    // in Milliseconds
                        placement="bottom-end"       // top|top-start|top-end|bottom|bottom-start|bottom-end
                        hideArrow="false"             //
                        // arrowClassName="BBB"
                        tooltipStyle={{ 'color': 'red', 'border': '2px white solid', opacity: '0.75'   }}
                >"Once upon a time many many years ago"</Text><label>Close after type Text on tagName="p" changes</label>

            </div>

            <Switch>
                <Route path="/examples/classComponentParent">
                    <ClassComponentParent></ClassComponentParent>
                </Route>
                <Route path="/examples/functionComponentParent">
                    <FunctionComponentParent></FunctionComponentParent>
                </Route>
                <Route path="/hosthook">
                    <HostHook></HostHook>
                </Route>
                <Route path="/reactIconsLib">
                    <ReactIconsLib></ReactIconsLib>
                </Route>
            </Switch>

        </BrowserRouter>
    </div>
}
