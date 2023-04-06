import React from 'react';

const DetailData = ({setOpen, open}) => {
    const url = `http://localhost:5000/`
    return (
        <div className="fixed z-10 overflow-y-auto top-0 w-full left-0" id="modal">
            <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-900 opacity-75" />
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                <div className="inline-block align-center rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className="px-4 py-1 text-right">
                        <button type="button" className="text-white text-2xl" onClick={()=>setOpen(null)}>X</button>
                    
                    </div>
                    <div className="px-5 w-[800px] h-[700px] py-5 bg-white overflow-y-auto">
                        <img src={url + open?.image} alt="code description" className='w-[100%] h-96' />
                        <h2 className='font-bold'>{open.id}</h2>
                        <h1 className='font-bold'>{open.title}</h1>
                        <h4>{open.description}</h4>
                    </div>
                    
                    </div>
                </div> 
            </div>
    );
};

export default DetailData;