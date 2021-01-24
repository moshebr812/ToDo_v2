// PROJECT:   Todo_v1
// FILE:      App.js

// npm run dev

// External
import { useState, useEffect } from 'react';
// for Routing within client
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
// Applciation 
import './App.scss';
import { AppContextTodo } from './AppContext';
// Components referred to from Main Screen
import { TodoMain } from './todo/todo-main/TodoMain';
import { About } from '../src/general/About';
import { Welcome } from '../src/general/Welcome';
import { ExamplesMenu } from '../src/examples/ExamplesMenu';

async function getServerInfo() {
  const result = await fetch ('/api/todoServerParameters');
  const serverParamsObj = await result.json();
  return serverParamsObj;
}

export function App() {
  const versionInfo = { "versionNumber": "1.3.55",     // update this before every Deploy
                        "releasedDate": "24-Jan-2021 23:00"};

  let debugInit = { "showComponentUsage": false,
                    "showFileName": false,
                    "showFlagsState": false,
                    };

  let [todoList, setTodoList] = useState ([]);                // Array
  let [sortedByColumn, setSortedByColumn] = useState ('');
  
  let [todoFormMode, setTodoFormMode] = useState ('READ')     //READ, ADD, EDIT
  let [todoInFocus, setTodoInFocus] = useState ({})           // Object of 1 todo
  let [debugOptions, setDebugOptions] = useState (debugInit);
  let [envInfo, setEnvInfo]  = useState ({ "hostingServer": "srv-PendingCheck",
                                           "hostingPort": "port-PendingCheck",
                                           "envLanguage": "???"});
  let [userInfo, setUserInfo] = useState ({"userId": "unknown", "loginName": "unknown"});

   useEffect ( () => {
     const dummyFunction = async () => {
        const data = await getServerInfo();
        setEnvInfo (data);
    }    
    dummyFunction();
},[]);
  const contextTodo = {
      versionInfo,   envInfo, // no need to expose setEnvInfo Globally. keep it read only
      //
      todoList,       setTodoList,
      //
      todoFormMode,   setTodoFormMode,
      // 
      todoInFocus,    setTodoInFocus,
      //
      sortedByColumn, setSortedByColumn,
      //
      debugOptions, setDebugOptions,
      //
      userInfo, setUserInfo,
   }

    return ( <AppContextTodo.Provider value={contextTodo}>
      <BrowserRouter>
        <div className="mainMenu">
          <Link to="/"                className="linkItemMenu">  Welcome</Link> 
          <Link to="/todoMain"        className="linkItemMenu">  Todo Main</Link>
          <Link to="/examplesMenu"    className="linkItemMenu">  Code Examples</Link>
          <Link to="/about"           className="linkItemMenu">  About</Link>
        </div>

        <Switch>
          <Route path="/todoMain">
            <TodoMain></TodoMain>
          </Route>
          <Route path="/examplesMenu">
              <ExamplesMenu></ExamplesMenu>
          </Route>
          <Route path="/about">
            <About></About>
          </Route>
          <Route path="/">
            <Welcome></Welcome>
          </Route>

        </Switch>
      </BrowserRouter>
      </AppContextTodo.Provider>
    )   // end return 
 }
