import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditBlog = ({ setOpen1, open1 }) => {
  const [detail, setDetail] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(detail);
  const [show, setShow] = useState(true);
  const url = `http://localhost:5000/`;

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (event) => {
    setInputs(event.target.files[0]);
    setShow(true);
  };

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`http://localhost:5000/api/topic/${open1._id}`)
        .catch((err) => console.log(err))
        .then((data) => {
          setDetail(data.data);
          setInputs({
            title: data?.data?.blog?.title,
            description: data?.data?.blog?.description,
            image: data?.data?.blog?.image,
          });
        });
    };
    getData();
  }, [open1._id]);
  console.log(detail);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", inputs.title);
    formData.append("description", inputs.description);
    formData.append("image", inputs.image);

    await axios
      .patch(`http://localhost:5000/api/topic/${open1._id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
      })
      .catch((err) => console.log(err))
      .then((data) => {
        console.log(data);
        navigate("/");
      });
  };
  return (
    <div className="fixed z-10 overflow-y-auto top-0 w-full left-0" id="modal">
      <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-900 opacity-75" />
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>
        <div
          className="inline-block align-center rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="px-4 py-1 text-right">
            <button
              type="button"
              className="text-white text-2xl"
              onClick={() => setOpen1(null)}
            >
              X
            </button>
          </div>
          <div className="px-5 w-[750px] h-[620px] py-5 bg-white overflow-y-auto">
            <div className="bg-purple-300">
              <h1>
                {open1._id}
                {id}
              </h1>
              <div className="py-2">
                <form
                  className="bg-white shadow-lg px-5 py-5 rounded-md"
                  onSubmit={handleSubmit}
                  action=""
                >
                  <div className="flex flex-col mt-5">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={inputs.title}
                      onChange={handleChange}
                      placeholder="title"
                      className="border-2 px-2 py-2 w-full rounded-md"
                    />
                  </div>
                  <div className="flex flex-col mt-5">
                    <label htmlFor="description">Description</label>
                    <textarea
                      type="text"
                      value={inputs.description}
                      name="description"
                      onChange={handleChange}
                      cols="30"
                      rows="10"
                      className="border-2 px-2 py-2 w-full rounded-md"
                    ></textarea>
                  </div>
                  {show && <img src={url + inputs.image} alt="" />}

                  <div className="flex flex-col mt-5">
                    <label htmlFor="fname">Blog Image</label>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      name="image"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-red-500 px-2 py-2 rounded-md mt-5"
                  >
                    create blog
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
