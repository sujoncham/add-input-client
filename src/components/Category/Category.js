import axios from 'axios';
import React, { useState } from 'react';

const Category = () => {
 
    const [category, setCategory] = useState("");
 
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
    return (
        <div className='w-96 mx-auto py-10'>
            <div>
                <h1 className='text-2xl font-bold'>Create Category</h1>
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
        </div>
    );
};

export default Category;