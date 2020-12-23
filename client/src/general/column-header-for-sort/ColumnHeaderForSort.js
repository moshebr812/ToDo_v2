import { useState, useEffect, useContext } from 'react';
import './ColumnHeaderForSort.scss';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import { AppContextTodo } from '../../AppContext';

// // To make this generic I need to pass in props:
// // 1. The array by which we sort the Group Members
// // 2. The URL for the fetch

export function ColumnHeaderForSort (props) {

    let [mySortState, setMySortState] = useState("NONE")
    
    const contextTodo = useContext (AppContextTodo);

    useEffect ( () => {
        // When sort is done by another column --> clear "Arrow Down / Up" icons of this column (clear = hidden)
        if (contextTodo.sortedByColumn!==props.gridColumnName) {
            console.log ('ColumnHeaderForSort useEffect(). Setting to "NONE"  for: ' + props.gridColumnName);
            setMySortState ("NONE"); // We want the icon to disappear
        } 
        
        if (contextTodo.sortedByColumn===props.gridColumnName && mySortState==="NONE") {
            // this is the rare case of page 1st load, which means Container Sorts by this column
            // yet no icon set, set it now
            console.log ('ColumnHeaderForSort useEffect(). Setting to "ASC" as 1st Page Load  for: ' + props.gridColumnName);
            setMySortState("ASC");
        }

    },[contextTodo.sortedByColumn])

    function changeSort () {
        let newState="";
        // Change icons of "this" column header -->> Note the Arrow shows the Applied Sorted Direction
        if (mySortState==="NONE") {
            setMySortState ("ASC");         // from NONE we swicth to ASC by A-Z
            newState = "ASC";
        } else if (mySortState==="DESC") {
            setMySortState ("ASC") ;        // from DESC we switch to ASC
            newState = "ASC";
        } else if (mySortState==="ASC"){
            setMySortState("DESC");          // from ASC we switch to ASC
            newState = "DESC";
        } else {
            alert (`ColumnHeaderForSort.js / change(Sort) - unknown sort direction ${mySortState}`)
        }

        // Inform your container your column name and your new status
        // the container will Sort the relevant UI Array, and sync
        // any othre columnHeaderForSort (if exist)
        
        // Strange:  if I send "mySortState" it still contains the old value as if it does NOT see the change due to the call "setMySortState"
        props.parentOnClick (props.gridColumnName, newState);
    }

    return <div className="divColHeaderForSort" style={{border: `${contextTodo.debugOptions['showComponentUsage']?"3px darkred dotted":""}`}}>

            <button className="btnSortHeader"
                title={`Sort by: ${props.buttonText}`}
                style={{width: `${props.width}`, height: `${props.height}`}}
                onClick={changeSort}>
                {props.buttonText} 
                {/* {mySortState} */}
                {/* the arrow should show the current applied SORT, not the "next option" */}
                <FaSortUp className={(mySortState==="ASC")?"":"hideMe"}></FaSortUp>
                <FaSortDown className={(mySortState==="DESC")?"":"hideMe"}></FaSortDown>
            </button>
        </div>
}

