import './ExamplesMenu.scss';
import { ClassComponentParent } from './ClassComponentParent';
import { FunctionComponentParent } from './FunctionComponentParent';
import { HostHook } from './HostHook';
// routing to examples
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';

function isPali(e) {
    alert ('value is: ' + e.target.value);
}
export function ExamplesMenu (props)  {

    return <div className="examplesMenu">
        <div>
            <h3> Code Examples </h3> 
        </div>

        
        <BrowserRouter>
            <div>
                <Link to="/" className="exampleLink">None</Link> <br></br> <hr></hr>
                <Link to="/examples/classComponentParent" className="exampleLink"> Parent Son: pass values using Class</Link> <br></br> <hr></hr>
                <Link to="/examples/functionComponentParent" className="exampleLink"> Parent Son: pass values using Function</Link>  <br></br> <hr></hr>
                <Link to="/hosthook" className="exampleLink"> example using my own hook</Link>  <br></br> <hr></hr>

                <label>Input</label>
                <input type="text" value="test"></input>
                <button onClick={ ( (e) => {isPali(e)} )}>check</button>
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
            </Switch>

        </BrowserRouter>
    </div>
}
