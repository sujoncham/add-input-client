import React from 'react';
import { Link } from 'react-router-dom';
import InputBlog from '../components/InputBlog';

const Home = () => {
    return (
        <div className='container mx-auto px-10 py-10 flex gap-5'>
            <div className='w-[20%] bg-gray-200 px-5 py-5'>
                
                <div>
                    <h1 className='text-xl font-bold'>All Categories Picture</h1>
                </div>
                <div className='flex flex-col'>
                    <Link to='/'>Home</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/blog'>Blog</Link>
                    <Link to='/inputData'>Input Data</Link>
                    <Link to='/contact'>Contact</Link>
                </div>
            </div>
            <InputBlog />
        </div>
    );
};

export default Home;