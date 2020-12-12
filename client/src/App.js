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
  const versionNumber = '0.1.8';

  let [todoList, setTodoList] = useState ([]);
  // todoIdInEditMode === '' -> it means none in edit mode. Am working with MongoDB ID
  // if ()  -> true ->  it means user must 1st save / cancel before he can edit the next
  let [todo_IdInEditMode, setTodo_IdInEditMode] = useState ('');
  let [todo_TitleInEditMode, setTodo_TitleInEditMode] = useState ('');
  let [itemToEdit, setItemToEdit] = useState({});
  let [isAddItemOpened, setIsAddItemOpened] = useState(false);
  let [itemInView, setItemInView] = useState({});
  
  
  const FieldLablePlaceHolder = '###FieldLablePlaceHolder###'; 
  
  
  const contextTodo = {
      versionNumber,
      FieldLablePlaceHolder,  // Not yet in use
      //
      todoList,
      setTodoList,
      // while many items can be opened for view via "Info"
      // only 1 Item at a time can be opened for view mode
      // Eventually I can remove these 4 and use only "itemToEdit"
      todo_IdInEditMode,
      setTodo_IdInEditMode,
      todo_TitleInEditMode,
      setTodo_TitleInEditMode,
      //
      itemToEdit,
      setItemToEdit,
      //
      itemInView,
      setItemInView,
      // 
      isAddItemOpened,
      setIsAddItemOpened

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
