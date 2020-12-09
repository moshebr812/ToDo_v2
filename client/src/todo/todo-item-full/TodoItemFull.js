
import './TodoItemFull.scss';

export function TodoItemFull (props) {
    return <div className="itemFullInLine">
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