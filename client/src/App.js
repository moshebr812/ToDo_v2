// PROJECT:   Todo_v1
// FILE:      App.js


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
  const versionNumber = '0.2.1';

  let [todoList, setTodoList] = useState ([]);
  
  let [todoFormMode, setTodoFormMode] = useState ('READ')
  let [todoInFocus, setTodoInFocus] = useState ({})
  const fieldLablePlaceHolder = '###FieldLablePlaceHolder###'; 
    
  const contextTodo = {
      versionNumber,
      fieldLablePlaceHolder,  // Not yet in use
      //
      todoList,       setTodoList,
      //
      todoFormMode,   setTodoFormMode,
      // 
      todoInFocus,    setTodoInFocus
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
