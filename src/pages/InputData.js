import axios from 'axios';
import React, { useState } from 'react';

const InputData = () => {
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(null)

	const handleImageChange = (event) => {
		setImage(event.target.files[0]);
        setOpen(true);
	};

    const handlerTitle = (event) =>{
		setTitle(event.target.value);
    }
    const handleDescription = (event) =>{
		setDescription(event.target.value);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const formData = new FormData();
		formData.append('title', title);
		formData.append('description', description);
		formData.append('image', image);
        console.log(formData)
        const options = {
            headers: {
                'content-type': 'multipart/form-data'
                }
        }
        await axios.post('http://localhost:5000/api/topic/addTopic', formData, options)
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
                    <label htmlFor="">Topic Title</label>
                    <input 
                        type="text" 
                        name='title'
                        value={title}
                        onChange={handlerTitle}
                        className='border-2 border-purple-400 p-2 rounded-md w-full'
                    />
                </div>
                <div>
                    <label htmlFor="">Topic Description</label>
                    <textarea 
                        name='description'
                        value={description}
                        onChange={handleDescription}
                        className='border-2 border-purple-400 p-2 rounded-md w-full'
                        placeholder='write here'></textarea>
                </div>
                <div>
                    {open && <img className={"w-56 h-56" + (image === "" ? "hidden" : "block" )} src={image === "" ? "" : URL.createObjectURL(image)} alt="" />}
                </div>
                <div className='py-3'>
                    <label htmlFor="">Topic Image</label>
                    <input 
                        type="file" 
                        name='image'
                        onChange={handleImageChange}
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

export default InputData;