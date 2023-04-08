import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Category = () => {
 
    const [category, setCategory] = useState("");
    const [items, setItems] = useState([])
    const navigate = useNavigate()
   
    useEffect(()=>{
        const getData = async()=>{
            await axios.get('http://localhost:5000/api/category/')
            .then((data)=>{
                console.log('get', data);
                setItems(data.data.data);
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        getData()
    }, [])
    
 
    const handleSubmit = async (e)=>{
        e.preventDefault();
	
        await axios.post('http://localhost:5000/api/category/addCate', {category})
        .then((data)=>{
            console.log('inserted', data);
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    // onChange={() => window.location.href = item._id ? `inputData/${id}` : ''}


const handleCategory = (id)=>{
    navigate(`/inputData/${id}`)
}

    return (
        <div className='container mx-auto flex justify-between gap-10'>
            <div className='w-[50%] mx-auto py-10'>
                <div>
                    <h1 className='text-2xl font-bold'>Create Category </h1>
                </div>
                <form onSubmit={handleSubmit} className='mt-10'>
                    <div className='py-5'>
                        <input 
                            type="text" 
                            name='category'
                            value={category}
                            onChange={(e)=>setCategory(e.target.value)}
                            className='border-2 border-purple-400 p-2 rounded-md w-full'
                        />
                    </div>
            
                    <button
                        className='border-2 border-purple-400 p-2 rounded-md w-full hover:bg-purple-500' 
                        type='submit'
                    >create add</button>
                </form>
                <div className='mt-10'>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5'>
                    {items.map(item=><div key={item._id}>
                        <button 
                            className='border-2 border-purple-400 p-2 rounded-md w-full hover:bg-purple-500'
                            onClick={()=>handleCategory(item._id)}>{item.category}</button>
                    </div>)}
                </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Category;