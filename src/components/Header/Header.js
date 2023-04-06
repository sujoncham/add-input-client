import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='bg-purple-500 py-5'>
            <div className='container mx-auto px-10 flex justify-between items-center'>
                <span>Logo</span>
                <div className='flex justify-between items-center gap-5'>
                    <Link to='/'>Home</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/blog'>Blog</Link>
                    <Link to='/inputData'>Input Data</Link>
                    <Link to='/contact'>Contact</Link>
                </div>
                <div className='flex justify-start items-center gap-3'>
                    <Link to='/inputData'>Signin</Link>
                    <Link to='/contact'>Logout</Link>
                </div>
            </div>
        </div>
    );
};

export default Header;