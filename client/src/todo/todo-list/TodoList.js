//
import { useEffect, useContext } from 'react';
// import from my code
import './TodoList.scss';
import { AppContextTodo } from '../../AppContext';
import { TodoItemInline } from '../todo-item-inline/TodoItemInline';
// Smart Context to pass parameters
import { IconContext } from 'react-icons';
import { FaTasks } from 'react-icons/fa';
import { ColumnHeaderForSort } from '../../general/column-header-for-sort/ColumnHeaderForSort';

async function refreshList(contextObject) { 
    const data = await getTodoList();
    contextObject.setTodoList (data);
    return true;
}

function openAddForm(contextObject) {
    // alert ('Switch to Add Form ');
    contextObject.setTodoFormMode('ADD');
    contextObject.setTodoInFocus({}); // Opening a new item
}

async function getTodoList() {
    const result = await fetch ('/api/todoitems');
    const data = await result.json();
    return data;
}

function onClick(idClicked) {
    // console.log(`TodoList.js onClick(idClicked) = ${idClicked} `);
}
export function TodoList (props) {
        const now = JSON.stringify ( new Date() ).substring(1,11);
        
        const contextTodo = useContext (AppContextTodo);

        useEffect ( () => {
            // fetch ('/api/todoitems')
            // .then ( result => result.json())
            // .then ( data => todoList_2(data));
            
            const dummyFunction = async () => {
                const data = await getTodoList();
                contextTodo.setTodoList (data);
            }    
            dummyFunction();

            if (contextTodo.sortedByColumn ==="") {
                //console.log (`TodoList.js / useEffect() - 1st page load. Setting column 1st time for sort `);
                // Note: this needs to correlate with the sort applied on the Server 
                contextTodo.setSortedByColumn('title');
            }
        },[]);

        function clickedColumnHeaderSort (sortByColumnName, columnNewSortState) {
            // Apply the sort without a DB Retrieve
            let tempArray = [...contextTodo.todoList];
            tempArray.sort ( (eleA, eleB) => {
                if ( eleA[sortByColumnName].toLowerCase()  < eleB[sortByColumnName].toLowerCase() ) {
                    return ( (columnNewSortState==="ASC") ? -1 : 1) ;
                } else {
                    return ( (columnNewSortState==="ASC") ? 1 : -1); 
                }
            })  // end sort
                    
            contextTodo.setTodoList (tempArray);
            contextTodo.setSortedByColumn (sortByColumnName);
            return true;
        }

        if (!contextTodo.todoList) {
           // to check this, set todoMockData=""
           return  <div>
                <h3> To Do List: Loading Data ....... </h3>
           </div>    
        } else if (contextTodo.todoList.length<=0) {
            // to check this, set todoMockData=[]
            return  <div>
                <h3> To Do List: No Items Found </h3>
           </div>    
        }

        // we have data
        return <div className="todoList">
            <div className="todoListSummaryHeader">
                <h4>
                     <IconContext.Provider value={{ style: {fontSize: '20px', color: "red", paddingRight: "10px", paddingTop: "5px"}}}>
                        <FaTasks></FaTasks>
                    </IconContext.Provider>
                    My Todo List | {now} (ToDoList.js). </h4> 
                
                <strong className="todoListHeader">Total Items: {contextTodo.todoList.length}</strong>
                <button className="btnListHeader" onClick={()=>{openAddForm(contextTodo)}}>Add</button>
                <button className="btnListHeader" onClick={() =>{refreshList(contextTodo)}}>Refersh</button>
                
                <strong className={(contextTodo.debugOptions.showFlagsState)?"":"hideMe"}> Mode: {contextTodo.todoFormMode}</strong> 
                <hr></hr>
            </div>
            
            <div className="divListHeader">
                <label className="labelInHeader">Focus on: </label>    
                {(contextTodo.todoInFocus.title===undefined) ? "" : (contextTodo.todoInFocus.title)}
                {(contextTodo.todoInFocus.title===undefined || contextTodo.debugOptions.showFlagsState===false) ? "" : (" - "+contextTodo.todoInFocus._id)}
                <br></br>        
            </div> 

            <div className="todoListScrollerContainer">
                <div className="todoToggleList">
                    <button className="headerNumber headerBtn" value={{height: "30px;"}}>#</button> 

                    {/* component is used to display the correct icon representing the Applied Sort. */}
                    <ColumnHeaderForSort buttonText="Title" gridColumnName="title" width="228px" height= "25px"
                        parentOnClick={clickedColumnHeaderSort}
                    ></ColumnHeaderForSort>

                    <ColumnHeaderForSort buttonText="Status" gridColumnName="status" width="80px" height= "25px"
                        parentOnClick={clickedColumnHeaderSort}
                    ></ColumnHeaderForSort>

                    <ColumnHeaderForSort buttonText="Priority" gridColumnName="priority" width="80px" height= "25px"
                        parentOnClick={clickedColumnHeaderSort}
                    ></ColumnHeaderForSort>
                    <button className="headerBtn">.............................................</button>
                 </div>

                {
                    contextTodo.todoList.map ( (element, idx) => { 
                        return <div key={element._id} className="todoToggleList"> 
                            <TodoItemInline item={element} idx={idx+1} onClick={onClick}></TodoItemInline>
                        </div>
                    })
                }
            </div>   
        </div>
}
