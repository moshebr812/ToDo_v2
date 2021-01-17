import './ExamplesMenu.scss';
import { useContext } from 'react';
import { AppContextTodo } from '../AppContext';
import { ClassComponentParent } from './ClassComponentParent';
import { FunctionComponentParent } from './FunctionComponentParent';
import { HostHook } from './HostHook';
import { ReactIconsLib } from './ReactIconsLib';
import { EllipsisTooltipTest } from './EllipsisTooltipTest';
import { EllipsisTooltipTestFinal } from './EllipsisTooltipTestFinal';
import { ReactSearchFieldTest } from './ReactSearchFieldTest';
import { ReactPopupTest1 } from './ReactPopupTest1';
// routing to examples
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';



function isPali(e) {
    // alert ('value is: ' + e.target.value);
    // console.log ('value is: ' + e.target.value);
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
                <Link to="/examples/ellipsisToolipTests" className="exampleLink"> Ellipsis ... Tooltip</Link> <br></br> <hr></hr>
                <Link to="/examples/ellipsisToolipTestsFinal" className="exampleLink"> Ellipsis + Tooltip Final</Link> <br></br> <hr></hr>
                <Link to="/examples/reactSearchFieldTest" className="exampleLink"> React Search Field Test</Link> <br></br> <hr></hr>
                <Link to="/examples/reactPopupTest1" className="exampleLink"> ReactJS-Popup Test</Link> <br></br> <hr></hr>

                
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
             

    


            </div>

            <Switch>
                <Route path="/examples/ellipsisToolipTestsFinal">
                    <EllipsisTooltipTestFinal></EllipsisTooltipTestFinal>
                </Route>
                <Route path="/examples/ellipsisToolipTests">
                    <EllipsisTooltipTest></EllipsisTooltipTest>
                </Route>
                <Route path="/examples/classComponentParent">
                    <ClassComponentParent></ClassComponentParent>
                </Route>
                <Route path="/examples/functionComponentParent">
                    <FunctionComponentParent></FunctionComponentParent>
                </Route>
                <Route path="/examples/reactPopupTest1">
                    <ReactPopupTest1></ReactPopupTest1>
                </Route>
                <Route path="/examples/reactSearchFieldTest">
                    <ReactSearchFieldTest></ReactSearchFieldTest>
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
