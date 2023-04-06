import axios from 'axios';
import React, { useState } from 'react';

const Category = () => {
 
    const [category, setCategory] = useState("");
 
    const handlerCategroy = (event) =>{
		setCategory(event.target.value);
    }


    const handleSubmit = async (e)=>{
        e.preventDefault();
        const formData = new FormData();
		formData.append('category', category);
	
        await axios.post('http://localhost:5000/api/topic/addCate', formData)
        .then((data)=>{
            console.log('inserted', data);
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return (
        <div className='w-96 mx-auto'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">Topic Category</label>
                    <input 
                        type="text" 
                        name='category'
                        value={category}
                        onChange={handlerCategroy}
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