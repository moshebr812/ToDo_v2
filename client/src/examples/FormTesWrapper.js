// PROJECT:   Todo_v1
// FILE:      App.js

// External
import {useContext} from 'react';
// Applciation 
import './TodoMain.scss';
import { AppContextTodo } from '../../AppContext';
import { TodoList } from '../todo-list/TodoList';
import { TodoReadForm } from '../todo-edit-form/TodoReadForm';
import { TodoAddForm } from '../todo-edit-form/TodoAddForm';
import { StatusHistoryList } from '../status-history/StatusHistoryList';
import { CountByGroupContainer } from '../../general/count-by-group-container/CountByGroupContainer';

export function TodoMain() {
  
  const contextTodo = useContext (AppContextTodo)

 
return ( 
   <div className="appToDo">
   
     <div className="appHeader">
        <h4> Todo Project.   version {contextTodo.versionNumber} </h4>
        <p className="debugInfo"> <strong>Debug Info:</strong>   (TodoMain.js) </p>
    </div>

    <div className="appMain">
      <div className="mainLeft">
          <TodoList></TodoList>      
      </div>

      <div className="mainCenter">
          <CountByGroupContainer groupName="Status"></CountByGroupContainer>
          <TodoAddForm action="Add"></TodoAddForm>
          <TodoReadForm action="View"></TodoReadForm>
          <StatusHistoryList></StatusHistoryList>
      </div>

      {/* <div className="mainRight"> 
          <h3>place holder : Main - right</h3>
          <h5>may add debug prints here</h5>
      </div> */}
    </div>

    <div className="appFooter">
      maybe set here page routing?
    </div>
    
  </div>
 )
}
