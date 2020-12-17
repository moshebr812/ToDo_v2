import { useState, useEffect, useContext } from 'react';
import './CountByGroupContainer.scss';
import { AppContextTodo } from '../../../src/AppContext';
import { statusOptions } from '../input-elements/SelectListValues';


async function aggregateCountByStatus() {
    try {
        // console.log ('Client --> Calling  aggregateCountByStatus() .....');
        const result = await fetch ('/api/todoitems/aggregateCountByStatus');
        const data = await result.json();
        return data;
    } catch (err) {
        console.log ('Client --> aggregateCountByStatus. FAILED.',err)
        throw new Error();
    }
}

export function CountByGroupContainer (props) {

    let [statusCounters, setStatusCounters] = useState([]);
    const contextToDo = useContext (AppContextTodo);

    useEffect ( () => {
        const dummyFunction = async () => {
            let data = await aggregateCountByStatus();

            // to keep the SORT of the result always in the same order, and in a logical order, we 
            // add to the Array the "UI TEXT" from status options & the sort it by uiCounterSort
            // console.log ('data BEFORE sort',data);

            for (let i=0; i<data.length; i++) {
                data[i]['text'] = statusOptions.find ( e => e.value===data[i]._id ).text ;
                // I defined on the array teh sort order by te flow, not by the text
                data[i]['sortBy'] = statusOptions.find ( e => e.value===data[i]._id ).uiCounterSort;
            }

            // now sort it by the UI so we always get eacg "status" in a fixed location
            data.sort ( (a, b) => {return a.sortBy - b.sortBy});
            // console.log ('data AFTER sort',data);
            setStatusCounters (data);
        }
        dummyFunction();
    },[contextToDo.todoList]) // Reload this Array When ever the main todoList Array is changing

    if ( statusCounters.length === 0 ) {
        return <div className="countByGroupContainer">
            <h4> {props.groupName} - No Data  (CounterPerGroupContainer.js)</h4>
            <hr></hr>
        </div>
    }

    return <div className="countByGroupContainer">
        {statusCounters.map ( (element, idx) => {
            return (<div className="counterInGroup" key={idx+1}>
                {/* the array that holds the value/text of status select options --> take the "text" for the UI  */}
                { (statusOptions.find ( e => e.value===element._id )).text }
                <br></br>
               {/* {element._id} */}
               {element.count}
           </div>)
        })} 
    </div>
}
