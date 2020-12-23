import './TodoItemFull.scss';
import { useContext } from 'react';
import { AppContextTodo } from '../../AppContext';

export function TodoItemFull (props) {

    const contextTodo = useContext (AppContextTodo);

    return <div className="itemFullInLine" style={{border: `${contextTodo.debugOptions['showComponentUsage']?"4px red dotted":""}`}}>
            <label>ID:</label>{props.item.id}.
            <label>Title:</label>{props.item.title}
            <label>Status:</label>{props.item.status} 
            <label>Complexity:</label>{props.item.complexity} 
            <br></br>
            <label>Details:</label>{props.item.details} 
            <label>Priority: </label>{props.item.priority}
            <label>_id:</label> {props.item._id}
    </div>
 }