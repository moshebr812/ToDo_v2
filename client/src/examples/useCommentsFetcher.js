import { useState, useEffect } from 'react';

async function getComments (PostId) {
    const result = await fetch (`https://jsonplaceholder.typicode.com/posts/${PostId}/comments`);
    const data = await result.json();
    return data;
}

function useCommentsFetcher (PostId) {
    console.log ('useCommentsFetcher = ' + PostId)
    const [commentsByPostId, setCommentsByPostId] = useState([]);

    // run the only once upon screen load
    useEffect ( () => {
        async function dummyFunction () {
            const commentsArray = await getComments (PostId);
            setCommentsByPostId (commentsArray);
        }
        dummyFunction();
        // register to window, upon any change in window screen size ... call function checkScreenSize
        // window.addEventListener("resize", checkScreenSize);
    });

    return commentsByPostId;
}

export default useCommentsFetcher;