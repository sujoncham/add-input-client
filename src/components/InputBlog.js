import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DetailData from './DetailData';
// https://www.youtube.com/watch?v=tsCoBd7xSK8

const InputBlog = () => {
    
    const [inputText, setInputText] = useState('')
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [open, setOpen] = useState(null)
    useEffect(()=>{
        const getData =async()=>{
            await axios.get('http://localhost:5000/api/topic/')
        .then((data)=>{
            console.log('inserted', data);
            setPosts(data?.data)
            setLoading(false)
            setError(false)
        })
        .catch((err)=>{
            console.log(err)
        })
        }
        getData()
    }, [])

    const url = `http://localhost:5000/`
    
    const handleDelete =async(id)=>{
        const delConfirm = window.confirm('Are you sure to delete this item?');
        if(delConfirm){
            await axios.delete(`http://localhost:5000/api/topic/${id}`)
        .then(()=>{
            console.log('deleted data');
        })
        .catch((err)=>{
            console.log(err)
        })
        }
    }



    let usersAll = posts?.data?.map(post=><div key={post._id} className="border-2 border-purple-500 px-2 py-2 rounded-md">
        <img src={url+ post?.image } alt="code description" />
    <h2 className='font-bold'>{post.id}</h2>
    <h1 className='font-bold'>{post.title}</h1>
    <h4>{post.description}</h4>
</div>)
console.log(usersAll)

    let filterTitle = posts?.data?.filter(({title})=>{
        return title.indexOf(inputText) >=0
    })
    ?.map(post=><div key={post._id} className="border-2 border-purple-500 px-2 py-2 rounded-md">
        <img src={url + post?.image} alt="code description" />
    <h2 className='font-bold'>{post.id}</h2>
    <h1 className='font-bold'>{post.title}</h1>
    <h4>{post.description.slice(0, 50)}</h4>
    <button onClick={()=>handleDelete(post._id)} className='border-2 border-purple-300 px-2 py-1 rounded-md'>del</button>
    <button onClick={()=>setOpen(post)} className='border-2 border-purple-300 px-2 py-1 rounded-md ml-3'>see detail</button>
</div>)

if (loading) return <p>Loading...</p>
if (error) return <p>Error!</p>

 
    return (
        <div className='w-[80%]'>
           
            <div className='py-10 flex justify-center'>
                
                <input 
                    type="text" 
                    value={inputText} 
                    onChange={(e)=>setInputText(e.target.value)} 
                    className='border-2 border-purple-400 p-2 rounded-md w-80 mx-auto'
                    placeholder='search you title'
                />
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5'>
                {filterTitle}
            </div>
            {open && <DetailData setOpen={setOpen} open={open} />}
        </div>
    );
};

export default InputBlog;