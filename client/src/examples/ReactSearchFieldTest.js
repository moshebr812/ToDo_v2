import React from 'react';
import SearchField from "react-search-field";
import './ReactSearchFieldTest.scss';

export function ReactSearchFieldTest (props) {
    let searchArray = [
        {id: 10,    text: 'once upon a time'},
        {id: 20,    text: 'day to day'},
        {id: 30,    text: 'time of the day'},
        {id: 40,    text: 'one of a kind'},
        {id: 50,    text: 'be kind to people'},
    ];

    function triggerSearch (value, event) {
        alert (`from triggerSearch = ${value}`);
    }
    return <div> 
        {/* // className="reactSearchField"> */}

        <h4> testing react-search-field</h4>
        <h5> I can't find a way to control width & height </h5>

        <div style={{border: "2px solid lime", backgroundColor: "orange"}}>
            <SearchField
                  placeholder="type your search string......."
                //   onChange={triggerSearch}
                //   searchText="This is initial search text"
                  className="reactSearchField"
            ></SearchField>

        </div>
        {
            searchArray.map ( (element) => {
                return <div> {element.text} ({element.id})</div>
            })
        }
    </div>
}