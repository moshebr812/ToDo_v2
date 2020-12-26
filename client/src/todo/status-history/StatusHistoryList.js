// import services
import { useState, useEffect, useContext } from 'react';
// import from my code
import './StatusHistoryList.scss';
import { AppContextTodo } from '../../AppContext';
import { formatDateTimeNoSec } from '../../general/helpers/Dates';


const dateFormat = require("dateformat");


async function getStatusHistory(item_id) {
    if (item_id) {
        const result = await fetch (`/api/todoitems/${item_id.toString()}/todostatus`);
        const data = await result.json();
        // I returned a more complex object with debug info, return to the form only the Array with Status records
        console.log (`getStatusHistory for _id = ${item_id}. Total Rows Fetched: ${data.data.length}`);
        return data.data;
    } else {
        return ([]);
    }

}

export function StatusHistoryList (props) {
        
        let [statusHist, setStatusHist] = useState([]);

        const contextTodo = useContext (AppContextTodo);

        // useEffect on changes in the list in focus
        useEffect ( () => {
            const dummyFunction = async () => {
                // const result = await fetch('http://localhost:3002/api/todoitems');
                const data = await getStatusHistory(contextTodo.todoInFocus._id);
                // console.log (`from useEffect. Data from Mongoose ===>>>`, data);
                setStatusHist (data);
            }    
            dummyFunction();
            // either a chage in _id in focus or change in mode should trigger the refresh.
            // why change in mode? when we return from Edit --> read / Add --> read : item status has changed so we need refresh the History Status
        }, [contextTodo.todoInFocus._id, contextTodo.todoFormMode]);


        if (contextTodo.todoFormMode==="ADD") { // screen should be closed when Mode = "ADD"
            return <div></div>
        }

        if ( !contextTodo.todoInFocus || contextTodo.todoInFocus._id===undefined) {
            return <div className="statusHistoryList">
                No Item Selected
            </div>
        } else if (statusHist.length<=0) {
            return <div className="statusHistoryList">
                Loading for task {contextTodo.todoInFocus.title}
            </div>
        }

        return <div className="statusHistoryList">
                    <div>
                        Status Changes  ({statusHist.length})    ( StatusHistoryList.js )
                    </div>

                    <div className="statusHistoryLine">
                        <label className="idColumn columnHeader">#</label>
                        <label className="statusColumn columnHeader">Status</label>
                        <label className="changeDateColumn columnHeader">Change Date</label>

                    </div>

                    {statusHist.map ((element, idx) => {
                        return <div key={idx} className="statusHistoryLine"> 
                            <label type="text" className="idColumn">{idx+1}</label>
                            <select key="999" className="statusColumn statusSelect" name="status" disabled id="status" value={element.status}>
                                <option key="1" value="RO">Reopened</option>
                                <option key="2" value="CMP">Completed</option>
                                <option key="3" value="IP">In Process</option>
                                <option key="4" value="NS">Not Started</option>                 
                            </select>
                            
                            <label type="text" className="changeDateColumn">
                                {dateFormat(  new Date (element.changeDate), formatDateTimeNoSec ) }</label>
                       </div> 
                    })}
            </div>  
}

