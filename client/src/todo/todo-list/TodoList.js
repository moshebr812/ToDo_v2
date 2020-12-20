// import services
import { useEffect, useContext } from 'react';
// import from my code
import './TodoList.scss';
import { AppContextTodo } from '../../AppContext';
import { TodoItemInline } from '../todo-item-inline/TodoItemInline';
// Smart Context to pass parameters
import { IconContext } from 'react-icons';
import { FaTasks } from 'react-icons/fa';

// AiFillDelete
// AiOutlineFileAdd

// RiFileAddLine
// RiDeleteBin6Line
// RiEdit2Line
// RiEdit2Fill
// RiRefreshLine - not good, use HiRefresh or HiOutlineRefresh
// TiEyeOutline
// RiInformationLine / RiInformationFill


async function refreshList(contextObject) {
    const data = await getTodoList();
    contextObject.setTodoList (data);
    return true;
}

function openAddForm(contextObject) {
    // If form is opened in View Mode - close it
    // If form is already opened in Add Mode --> do nothing 
    alert ('Switch to Add Form ');
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
        },[]);

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
                        <FaTasks>   ___</FaTasks>
                    </IconContext.Provider>
                    My Todo List | {now} (ToDoList.js). </h4> 
                
                <strong className="todoListHeader">Total Items: {contextTodo.todoList.length}</strong>
                <button className="btnListHeader" onClick={()=>{openAddForm(contextTodo)}}>Add</button>
                <button className="btnListHeader" onClick={() =>{refreshList(contextTodo)}}>Refersh</button>
                
                <strong> Mode: {contextTodo.todoFormMode}</strong> 
                <hr></hr>
            </div>
            <div className="divListHeader">
                <label className="labelInHeader">Focus on: </label>    
                    {contextTodo.todoInFocus? 
                        (contextTodo.todoInFocus.title+" - "+contextTodo.todoInFocus._id): "..."}
                <br></br>        
                <button>#</button> 
                <button>Task</button>
                <button>Status</button>
                <button>Priority</button>
                   
            </div> 
            <div className="todoListScrollerContainer">
                {
                    contextTodo.todoList.map ( (element, idx) => { return <div key={element._id} className="todoToggleList"> 
                        <TodoItemInline item={element} idx={idx+1} onClick={onClick}></TodoItemInline>
                        </div>
                    })
                }
            </div>   
        </div>
}

