// // import services
// import { useEffect, useContext } from 'react';
// // import from my code
// import './TodoList.scss';
// import { AppContextTodo } from '../../AppContext';
// import { TodoItemInline } from '../todo-item-inline/TodoItemInline';

// // This was used to read data from mock files
// // function getTodoList_Mock() {
// //         const mockToDoList = require ('../../mock-data/todo-list.json') || [];
// //         return mockToDoList;
// // }

// async function getTodoList() {
    // // const result = await fetch ('https://jsonplaceholder.typicode.com/comments');
    // // const result = await fetch ('http://localhost:3002/api/todoitems');
    // const result = await fetch ('/api/todoitems');
    // const data = await result.json();
    // return data;
// }

// function AddItem() {
    // alert ('to add');

    // // contextObject.setTodoIdInFocus(null);
    // // contextObject.setTodoTitleInFocus(null);
    // // contextObject.setTodo_IdInEditMode(null);
    // // contextObject.setTodo_TitleInEditMode(null);
// }
// export function TodoList (props) {
        // const now = JSON.stringify ( new Date() ).substring(1,11);

        // // moved from local scope to global scope via contextTodo
        // // let [todoList, setTodoList] = useState([]);

        // // const todoList = getTodoList_Mock();
        // // console.log (`TodoList.js Array of todoList from mock file:`);
        // // console.log(todoList);
        
        // const contextTodo = useContext (AppContextTodo);

        // useEffect ( () => {
            // // fetch ('/api/todoitems')
            // // .then ( result => result.json())
            // // .then ( data => todoList_2(data));
            
            // const dummyFunction = async () => {
                // // const result = await fetch('http://localhost:3002/api/todoitems');
                // const data = await getTodoList();
                // // console.log (`from useEffect. Data from Mongoose ===>>>`, data);
                // contextTodo.setTodoList (data);
            // }    
            // dummyFunction();
        // }, []);

        // if (!contextTodo.todoList) {
           // // to check this, set todoMockData=""
           // return  <div>
                // <h3> To Do List: Loading Data ....... </h3>
           // </div>    
        // } else if (contextTodo.todoList.length<=0) {
            // // to check this, set todoMockData=[]
            // return  <div>
                // <h3> To Do List: No Items Found </h3>
           // </div>    
        // }

        // // we have data
        // return <div className="todoList">
            // <h4> My Todo List | {now} (ToDoList.js). </h4> 
            // <h4 className="leftAlign"> Total Items: {contextTodo.todoList.length} </h4>
            // <hr></hr>
            // <button onClick={() => {AddItem()}}>Add</button>
            // <div className="divListHeader">
                // <label className="labelInHeader">Selected:</label> {contextTodo.todoTitleInFocus} {contextTodo.todoIdInFocus>0? '['+contextTodo.todoIdInFocus+']': ''}  <br></br>
                // <label className="labelInHeader">Editing Item:</label> {contextTodo.todo_TitleInEditMode} {contextTodo.todo_IdInEditMode!==""?[contextTodo.todo_IdInEditMode]:""}
            // </div>    
            // {
                // contextTodo.todoList.map ( (element, idx) => { return <div key={element._id} className="todoToggleList"> 
                    // <TodoItemInline item={element} idx={idx+1}></TodoItemInline>
                    // </div>
                // })
            // }
        // </div>
// }

