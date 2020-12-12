// import services
import { useEffect, useContext } from 'react';
// import from my code
import './TodoList.scss';
import { AppContextTodo } from '../../AppContext';
import { TodoItemInline } from '../todo-item-inline/TodoItemInline';


async function refreshList(contextObject) {
    const data = await getTodoList();
    contextObject.setTodoList (data);
    return true;
}

function openAddForm(contextObject) {
    // If form is opened in View Mode - close it
    contextObject.setTodo_IdInEditMode ('');
    contextObject.setTodo_TitleInEditMode ('');
    contextObject.setItemToEdit({});
    
    // If form is already opened in Add Mode --> do nothing 
    alert ('Switch to Add Form ');
    contextObject.setIsAddItemOpened (true);


    // 999
    contextObject.setTodoFormMode('ADD');
    contextObject.setTodo_IdInEditMode ('');
    contextObject.setItemToEdit({});
}



async function getTodoList() {
    // const result = await fetch ('https://jsonplaceholder.typicode.com/comments');
    // const result = await fetch ('http://localhost:3002/api/todoitems');
    const result = await fetch ('/api/todoitems');
    const data = await result.json();
    return data;
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
            <h4> My Todo List | {now} (ToDoList.js). </h4> 
            
            <strong className="todoListHeader">Total Items: {contextTodo.todoList.length}</strong>
            <button className="btnListHeader" onClick={()=>{openAddForm(contextTodo)}}>Add</button>
            <button className="btnListHeader" onClick={() =>{refreshList(contextTodo)}}>Refersh</button>
            {/* 999 */}
            <strong> Mode: {contextTodo.todoFormMode}</strong>
            <hr></hr>
            <div className="divListHeader">
                <label className="labelInHeader">Editing Item:</label> 
                    {contextTodo.todo_TitleInEditMode} 
                    {contextTodo.itemToEdit._id ?  "     ( "+contextTodo.itemToEdit._id+" )":""}
                <br></br>
                <label className="labelInHeader">View Item:</label> 
                    {contextTodo.todo_TitleInEditMode} 
                    {contextTodo.itemToEdit._id ?  "     ( "+contextTodo.itemToEdit._id+" )":""}

            </div> 
            <div className="todoListScrollerContainer">
                {
                    contextTodo.todoList.map ( (element, idx) => { return <div key={element._id} className="todoToggleList"> 
                        <TodoItemInline item={element} idx={idx+1}></TodoItemInline>
                        </div>
                    })
                }
            </div>   
        </div>
}

