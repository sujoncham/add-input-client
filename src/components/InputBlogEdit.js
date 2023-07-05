import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const InputBlogEdit = () => {
    const [detail, setDetail] = useState();
    const navigate = useNavigate();
    const {id} = useParams();
    console.log(detail)
    const [open, setOpen] = useState(true)
    const url =`http://localhost:5000/`;

    const [inputs, setInputs] = useState({
        title: "", description: "", image: ""
    });

    const handleChange = (e)=>{
        setInputs((prevState)=>({
           ...prevState,
           [e.target.name] : e.target.value,
        }))
    }

    const handleImageChange = (event) => {
        setInputs(event.target.files[0]);
        setOpen(true);
    };

    useEffect(()=>{
        const getData = async () =>{
            await axios.get(`http://localhost:5000/api/topic/${id}`)
            .catch((err)=>console.log(err))
            .then((data)=>{
                setDetail(data.data);
                setInputs({
                    title:data?.data?.blog?.title,
                    description:data?.data?.blog?.description,
                    image:data?.data?.blog?.image,
                })
            })
           
            
        }
        getData();
    }, [id]);
    console.log(detail);

    const handleSubmit =async(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', inputs.title);
        formData.append('description', inputs.description);
        formData.append('image', inputs.image);


        await axios.patch(`http://localhost:5000/api/topic/${id}`, {
            title:inputs.title,
            description:inputs.description,
            image:inputs.image,
        }).catch((err)=>console.log(err))
        .then(data=>{
            console.log(data)
            navigate(`/blog/${id}`)
        });
     }
    return (
        <div className="bg-purple-300">
            <h1>{id}</h1>
            <div className="container mx-auto py-10 flex justify-center gap-10">
               <img className='w-[50%]' src="/images/banner.png" alt="" />
               <form className="w-[50%] bg-white shadow-lg px-10 py-5 rounded-md" onSubmit={handleSubmit} action="">
                  <div className="flex flex-col mt-5">
                     <label htmlFor="title">Title</label>
                     <input type="text" name='title' value={inputs.title} onChange={handleChange} placeholder="title" className='border-2 px-2 py-2 w-full rounded-md' />
                  </div>
                  <div className="flex flex-col mt-5">
                     <label htmlFor="description">Description</label>
                     <textarea type="text" value={inputs.description} name="description" onChange={handleChange} cols="30" rows="10" className='border-2 px-2 py-2 w-full rounded-md'></textarea>
                  </div>
                  {open && <img src={url+inputs.image} alt="" />}
                  
                  <div className="flex flex-col mt-5">
                     <label htmlFor="fname">Blog Image</label>
                     <input type="file" onChange={handleImageChange} name='image' />
                  </div>
                  <button type='submit' className='bg-red-500 px-2 py-2 rounded-md mt-5'>create blog</button>
               </form>
            </div>
         </div>
    );
};

export default InputBlogEdit;