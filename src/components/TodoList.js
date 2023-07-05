import React, { useState } from 'react';

// const lists = [
//     { id: 1, title: 'Learn React' },
//     { id: 2, title: 'Build a Todo App' },
//     { id: 3, title: 'Deploy to Heroku' },
//   ]
const TodoList = () => {
    const [users, setUsers] = useState([])
    const [inputText, setInputText] = useState("")

    // const id = Math.ceil(Math.random() * 1000)
    // // console.log(id)

    // console.log(users)
    // const handleList = ()=>{
    //     setUsers([...users, {id:id, title: inputText}])
    //     setInputText("")
    // }

    // const handleDelete = (id) =>{
    //     const itemRemove = window.confirm('are you want to delete it?')
    //     if(itemRemove){
    //       const restUser = users.filter((user)=>user.id !== id)
    //       setUsers(restUser)
    //     }
    // }
    console.log(users)
    const handleList = ()=>{
        setUsers([...users, inputText])
        setInputText("")
    }

    const handleDelete = (id) =>{
        const itemRemove = window.confirm('are you want to delete it?')
        if(itemRemove){
          const restUser = users.filter((user, index)=>index !== id)
          setUsers(restUser)
        }
    }

    return (
        <div>
            <div className='py-10'>
                <input 
                type="text" 
                value={inputText} 
                onChange={(e)=>setInputText(e.target.value)} 
                className='border-2 border-purple-400 p-2 rounded-md w-full'
                />
                <button type='submit' onClick={handleList} className="border-2 border-purple-400 p-2 mt-5 rounded-md bg-purple-500">Add todo</button>
            </div>
            <div>
                <ul>
                    {users?.map((list, index)=>{
                        return (
                    <li key={index} className="border-2 bg-purple-400 px-2 py-2 mt-3 flex justify-between items-center w-56 rounded-md">
                        <p>{list} </p>
                        <button onClick={()=>handleDelete(index)} className='border-2 border-purple-300 px-1 rounded-md'>X</button>
                    </li>
                    )
                }
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TodoList;