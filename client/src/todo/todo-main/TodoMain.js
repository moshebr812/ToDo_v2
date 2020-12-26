import {useContext} from 'react';
// Applciation 
import './TodoMain.scss';
import { AppContextTodo } from '../../AppContext';
import { TodoList } from '../todo-list/TodoList';
import { TodoReadForm } from '../todo-edit-form/TodoReadForm';
import { TodoAddForm } from '../todo-edit-form/TodoAddForm';
import { StatusHistoryList } from '../status-history/StatusHistoryList';
import { statusOptions, priorityOptions, complexityOptions } from '../../general/input-elements/SelectListValues';

// the following was replaced with CountAndGroupByFieldName
//import { CountByGroupContainer } from '../../general/count-by-group-container/CountByGroupContainer';

import { ExpandCollapseWithArrow } from '../../general/expand-collapse-with-arrow/ExpandCollapseWithArrow';

export function TodoMain() {
  
  const contextTodo = useContext (AppContextTodo)

  console.log ('test',priorityOptions);
 
return ( 
   <div className="appToDo">
   
     <div className="appHeader">
        <h4> Todo Project.   version {contextTodo.versionInfo.versionNumber} </h4> <br></br>
        <p className="debugInfo"> (TodoMain.js) </p>
    </div>

    <div className="appMain">
      <div className="mainLeft">
          <TodoList></TodoList>      
      </div>

      <div className="mainCenter">
        <ExpandCollapseWithArrow topicText="Status Statistics" fieldNameToGroupBy="status" arrayValueTextConvertor={statusOptions}
            width="160px" title="Show/Hide number of Tasks by Task Status" fontSize="22px"></ExpandCollapseWithArrow>

        <ExpandCollapseWithArrow topicText="Priority Distribution" fieldNameToGroupBy="priority" arrayValueTextConvertor={priorityOptions}
            width="160px" title="Show/Hide number of Tasks by Task Priority" fontSize="22px"></ExpandCollapseWithArrow>

        <ExpandCollapseWithArrow topicText="Complexity Distribution" fieldNameToGroupBy="complexity" arrayValueTextConvertor={complexityOptions}
            width="160px" title="Show/Hide number of Tasks by Task Complexity" fontSize="22px"></ExpandCollapseWithArrow>

          {/* <CountByGroupContainer groupName="Status"></CountByGroupContainer> */}
          <TodoAddForm action="Add"></TodoAddForm>
          <TodoReadForm action="View"></TodoReadForm>
          <StatusHistoryList></StatusHistoryList>
      </div>
    </div>

    <div className="appFooter">
      Placeholder for additional options
    </div>
    
  </div>
 )
}
