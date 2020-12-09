
import { useState, useEffect } from 'react';
import './ClassComponentSon.scss';
// note NOT TO USE destructurnig here 
import useCommentsFetcher from './useCommentsFetcher';


async function getComments (PostId) {
    const result = await fetch (`https://jsonplaceholder.typicode.com/posts/${PostId}/comments`);
    const data = await result.json();
    return data;
}

export function HostHook (props)  {

    // If I were to use it locally I would use this code
    let commentsArray = useCommentsFetcher(8);
    const [commentsByPostId, setCommentsByPostId] = useState([]);

    // run the only once upon screen load
    useEffect ( () => {
        async function dummyFunction () {
            const commentsArray = await getComments (1);
            setCommentsByPostId (commentsArray);
        }
        dummyFunction();
        // register to window, upon any change in window screen size ... call function checkScreenSize
        // window.addEventListener("resize", checkScreenSize);
    },[]);


    return (
      <div className="hostHook">
        <hr></hr>
        <strong> testing my local hool (010) </strong>S
        <br></br>
        <input placeholder="...set post id here"></input> 
        <button onClick={() => {alert ('did not complete')}}>Fecth</button>

        {/* // If I were to use it locally I would use this code */}
        {/* { commentsByPostId.map ( (element, idx) => { */}

        { commentsArray.map ( (element, idx) => {
            return (
            <div>   
                {element.postId} ....
                {element.id} .....
                {element.name} .....
            </div>    
            )    

        })
    }
      </div>
    )
}

