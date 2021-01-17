// PROJECT:   Todo_v1
// FILE:      About.js

import React, {createRef, useContext} from 'react';
import './About.scss';
import styled from 'styled-components';
import { AppContextTodo} from '../AppContext';
import Popup from 'reactjs-popup';


const DivAbout = styled.div`
  background-color:  rgb(238, 255, 0);
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
  font-size:  20px;
  color:      blue;
`;
const MyP = styled.p`
  color: darkred;
  font-size: 20px;
`;
const MyP2 = styled.p`
  color: blue;
  font-size: 20px;
  font-style: italic;
`
const AboutButtons =styled.button `
  margin: 20px;
  height: 30px;
  width: 120px;
  color: darkred;
`

export function About (props) {
    const contextTodo = useContext ( AppContextTodo );
 
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
 
    return <DivAbout>
        <br></br>
        
        <HeaderH2>my   "Todo"   project</HeaderH2>
        
        <HeaderH3>Version: {contextTodo.versionInfo.versionNumber} </HeaderH3>
        <HeaderH3>Released Date: {contextTodo.versionInfo.releasedDate}  </HeaderH3>
        <MyP>
            Created by: Moshe Braude<br></br> <br></br>
        </MyP>

        

        <hr></hr>
        <MyP2>Hosting Server: ______   URL: {contextTodo.envInfo.hostingServer} /  Port: {contextTodo.envInfo.hostingPort}</MyP2>
        <MyP2>Language: {contextTodo.envInfo.envLanguage}</MyP2>


        <MyP2>This about screen was cretaed using "styled-components" </MyP2>
         <hr></hr>
         {/* <AboutButtons>
            <button className="aboutButtons" onClick={ () => {checkFamily(Roy)}}>Check Names</button>
          </AboutButtons> */}

          {/* I write the properties of the button inside my styled object */}
          <AboutButtons onClick={()=>{alert('This page is using styled-componenets rather than CSS ')}}>styled option</AboutButtons>

    </DivAbout>
}