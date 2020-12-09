// PROJECT:   Todo_v1
// FILE:      About.js

import React, {createRef} from 'react';
import './About.scss';
import styled from 'styled-components';

const DivAbout = styled.div`
  background-color: yellow;
  height: 100vh;
  width: 100vvw;
  border: 5px solid black;
  border-radius: 15px;
  text-align: center;
`;
const HeaderH2 = styled.h2`
  font-size:  30px;
  color:      red;
`;
const HeaderH3 = styled.h3`
  font-size:  25px;
  color:      purple;
`;
const MyP = styled.p`
  color: darkred;
  font-size: 20px;
`;

export function About (props) {
    // const currentDate = new Date();

    let Roy = { name: 'Roy', children: [] };
    let Kate = { name: 'Kate', children: []};
    let Edna = { name: 'Edna', children: []};
    let Lakeesha = { name: 'Lakeesha', children: []};
    let Letha = { name: 'Letha', children: []};
    let Dean = { name: 'Dean', children: []};
    let Huey = { name: 'Huey', children: []};
    let Regenia = { name: 'Regenia', children: []};
    let Leonida = { name: 'Leonida', children: []};
    let Veronica = { name: 'Veronica', children: []};
    let Trevor = { name: 'Trevor', children: []};
    
    Roy.children = [Kate];
    Kate.children = [Edna, Lakeesha, Letha];
    Edna.children = [Dean, Huey];
    Lakeesha.children = [Regenia];
    Huey.children = [Leonida, Veronica];
    Veronica.children = [Trevor];
    

    let textInput = createRef();

    function isPali () {
        alert ('Test ==>>  ' + textInput.current.value);
        let value = textInput.current.value;
      }


    function kidsArray (parentName, kids) {

        console.log ('kidsArray() = ' +parentName + ' / ' + kids.length);

        for (let i=0; i<kids.length; i++ ) {
            console.log ('in for loop');
            kids[i].name = kids[i].name.toUpperCase();
            kidsArray (kids[i].name, kids[i].children)
        }

    }

    function checkFamily(tree) {
        console.log ('start check Names');

        tree.name = tree.name.toUpperCase();
        if ( (tree.children) && (tree.children.length>0) ) {
            kidsArray(tree.name, tree.children);
        }
    }

    //      While will this cause an endless loop" as the sone contains the parent and vica versa
    ////    Trevor.children = [Roy];
    return <DivAbout>
        <HeaderH2>Using styped-components </HeaderH2>
        <HeaderH2>About my project "Todo" </HeaderH2>
        
        <HeaderH3>Bla Bla</HeaderH3>
        <MyP>
            Version: V1.0.2 <br></br>
            Date: currentDate <br></br>
            Name: Moshe <br></br>
        </MyP>


        <label>Is Pali?</label>
        <input placeholder=",,," ref={textInput}></input>
        <button onClick={ () => {isPali()}}
        >Is Pali?</button>
        <hr></hr>
        <button onClick={ () => {checkFamily(Roy)}}>Check Names</button>
    </DivAbout>
}