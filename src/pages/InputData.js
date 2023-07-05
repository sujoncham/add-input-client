import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const InputData = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(null);

  const { id } = useParams();
  const user = localStorage.getItem("userId");

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    setOpen(true);
  };

  const handlerTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("category", id);
    formData.append("user", user);
    console.log(formData);
    const options = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    await axios
      .post("http://localhost:5000/api/topic/addTopic", formData, options)
      .then((data) => {
        console.log("inserted", data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mx-auto flex justify-center items-center gap-10">
      <div className="w-[50%] py-10">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Topic Title : {id}</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handlerTitle}
              className="border-2 border-purple-400 p-2 rounded-md w-full"
            />
          </div>
          <div>
            <label htmlFor="">Topic Description</label>
            <textarea
              name="description"
              value={description}
              onChange={handleDescription}
              className="border-2 border-purple-400 p-2 rounded-md w-full"
              placeholder="write here"
            ></textarea>
          </div>
          <div>
            {open && (
              <img
                className={"w-56 h-56" + (image === "" ? "hidden" : "block")}
                src={image === "" ? "" : URL.createObjectURL(image)}
                alt=""
              />
            )}
          </div>
          <div className="py-3">
            <label htmlFor="">Topic Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="border-2 border-purple-400 p-2 rounded-md w-full"
            />
          </div>
          <button
            className="border-2 border-purple-400 p-2 rounded-md w-full hover:bg-purple-500"
            type="submit"
          >
            create add
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputData;
