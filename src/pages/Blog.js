import React, { useEffect, useReducer } from 'react';
const initialState = {
    loading: true,
    error: '',
    posts: [],
};

const reducer = (state, action)=>{
    switch (action.type) {
        case "SUCCESS": 
        return {
            loading: false,
            posts: action.result,
            error: ""
        };
        case "FAILED": 
        return {
            loading: false,
            posts: [],
            error: "there was a something wrong"
        };
        default : 
        return state;
    }
}

const Blog = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    console.log(state)
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res=>res.json())
        .then(data=>{
            dispatch({type: 'SUCCESS', result: data})
        })
        .catch(()=>{
            dispatch({type: 'FAILED'})
        })
    }, [])
    return (
        <div className='container mx-auto px-10'>
            <div>
                <p>{state.error}</p>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5'>
                {
                state.loading ? "Loading..." : state.posts.map(post=><div key={post.id} className="border-2 border-purple-500 px-2 py-2 rounded-md">
                        <h2 className='font-bold'>{post.id}</h2>
                        <h1 className='font-bold'>{post.title}</h1>
                        <h4>{post.body}</h4>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Blog;