// PROJECT:   Todo_v1
// FILE:      App.js

// npm run dev

// External
import { useState } from 'react';
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

export function App() {
  const versionInfo = {"versionNumber": "1.2.0", "releasedDate": "24-Dec-2020 15:00"}

  let debug = { "showComponentUsage": false,
                "showFileName": false };

  let [todoList, setTodoList] = useState ([]);                // Array
  let [sortedByColumn, setSortedByColumn] = useState ('');
  
  let [todoFormMode, setTodoFormMode] = useState ('READ')     //READ, ADD, EDIT
  let [todoInFocus, setTodoInFocus] = useState ({})           // Object of 1 todo
  let [debugOptions, setDebugOptions] = useState (debug);

  const contextTodo = {
      versionInfo,
      //
      todoList,       setTodoList,
      //
      todoFormMode,   setTodoFormMode,
      // 
      todoInFocus,    setTodoInFocus,
      //
      sortedByColumn, setSortedByColumn,
      //
      debugOptions, setDebugOptions
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
