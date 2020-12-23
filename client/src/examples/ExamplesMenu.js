import './ExamplesMenu.scss';
import { useContext } from 'react';
import { AppContextTodo } from '../AppContext';
import { ClassComponentParent } from './ClassComponentParent';
import { FunctionComponentParent } from './FunctionComponentParent';
import { HostHook } from './HostHook';
import { ReactIconsLib } from './ReactIconsLib';
// routing to examples
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';

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
                <strong>Debug Options:</strong> <br></br>

                <label>Show Component Usage:</label> 
                <input type="checkbox" checked={contextTodo.debugOptions['showComponentUsage']} 
                    onChange={((e) => contextTodo.setDebugOptions({"showComponentUsage": e.target.checked}))}></input>

                <label>Show File Name:</label> 
                <input type="checkbox"></input><label style={{color: "black"}}>(WIP)</label>
                {/* <input type="checkbox" checked={contextTodo.debugOptions['showFileName']} onChange={((e) => contextTodo.setDebugOptions['showFileName'](e.target.checked))}></input> */}
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
