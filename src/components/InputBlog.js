import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import DetailData from "./DetailData";
import EditBlog from "./EditBlog";
// https://www.youtube.com/watch?v=tsCoBd7xSK8

const InputBlog = () => {
  const [inputText, setInputText] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(null);
  const [open1, setOpen1] = useState(null);
  // console.log(posts);
  //   const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      await axios
        .get("http://localhost:5000/api/topic/")
        .then((data) => {
          setPosts(data?.data);
          setLoading(false);
          setError(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);

  const url = `http://localhost:5000/`;

  const handleDelete = async (id) => {
    const delConfirm = window.confirm("Are you sure to delete this item?");
    if (delConfirm) {
      await axios
        .delete(`http://localhost:5000/api/topic/${id}`)
        .then(() => {
          console.log("deleted data");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //   const handleEdit = (id) => {
  //     navigate(`/inputBlogEdit/${id}`);
  //   };

  let usersAll = posts?.data?.map((post) => (
    <div
      key={post._id}
      className="border-2 border-purple-500 px-2 py-2 rounded-md"
    >
      <img src={url + post?.image} alt="code description" />
      <h2 className="font-bold">{post.id}</h2>
      <h1 className="font-bold">{post.title}</h1>
      <h4>{post.description}</h4>
    </div>
  ));

  let filterTitle = posts?.data
    ?.filter(({ title }) => {
      return title.toLowerCase().indexOf(inputText) >= 0;
    })
    ?.map((post) => (
      <div
        key={post._id}
        className="border-2 border-purple-500 px-2 py-2 rounded-md"
      >
        <img src={url + post?.image} alt="code description" />
        <div className="h-[150px]">
          <h1 className="font-bold text-orange-500 mt-5">{post.title}</h1>
          <h4>
            {post.description.slice(0, 50)} ...
            <button
              onClick={() => setOpen(post)}
              className="border-none text-purple-600"
            >
              see detail
            </button>
          </h4>
        </div>
        <div className="flex justify-between items-center">
          <span>5 comments</span>
          <div>
            <button
              onClick={() => handleDelete(post._id)}
              className="border-none px-2 py-1 bg-orange-500 rounded-md"
            >
              del
            </button>
            <button
              onClick={() => setOpen1(post)}
              className="border-none px-2 py-1 bg-orange-500 rounded-md"
            >
              Edit
            </button>
          </div>
          <span className="flex justify-between items-center">
            <FaRegHeart className="text-orange-500" size={15} /> 5
          </span>
        </div>
      </div>
    ));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div className="w-[80%]">
      <div className="py-10 flex justify-center">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="border-2 border-purple-400 p-2 rounded-md w-80 mx-auto"
          placeholder="search you title"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {filterTitle}
      </div>
      {open && <DetailData setOpen={setOpen} open={open} />}
      {open1 && <EditBlog setOpen1={setOpen1} open1={open1} />}
    </div>
  );
};

export default InputBlog;
