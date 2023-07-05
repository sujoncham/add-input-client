import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import DetailData from "./DetailData";
import EditBlog from "./EditBlog";
import SideCategory from "./SideCategory";

const Categories = () => {
  const { id } = useParams();
  const [catId, setCatId] = useState("");
  const [open, setOpen] = useState(null);
  const [open1, setOpen1] = useState(null);
  const url = `http://localhost:5000/`;
  console.log(catId);
  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`http://localhost:5000/api/category/${id}`)
        .then((data) => {
          //   console.log(data.data.data);
          setCatId(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, [id]);

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

  return (
    <div className="container mx-auto px-10 py-10 flex gap-5">
      <SideCategory />
      <div className="w-[80%]">
        <h1 className="text-xl font-bold mb-10">
          Category - {catId?.data?.category}
        </h1>
        <div className="grid grid-cols-3 gap-5">
          {catId?.data?.topic.length >= 0
            ? catId?.data?.topic?.map((topic) => (
                <div
                  key={topic._id}
                  className="border-2 border-purple-400 px-5 py-5"
                >
                  <div>
                    <img src={url + topic.image} alt="" className="h-[250px]" />
                    <h1 className="mt-5 font-bold">{topic.title}</h1>
                    <div className="">
                      <p>
                        <span className="font-bold mr-2">Sumon Mullah :</span>{" "}
                        {topic.description.slice(0, 100)} ....{" "}
                      </p>

                      <button
                        onClick={() => setOpen(topic)}
                        className="border-none text-purple-600"
                      >
                        see detail
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>5 comments</span>
                    <div>
                      <button
                        onClick={() => handleDelete(topic._id)}
                        className="border-none px-2 py-1 bg-orange-500 rounded-md"
                      >
                        del
                      </button>
                      <button
                        onClick={() => setOpen1(topic)}
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
              ))
            : "No content yet"}
        </div>
      </div>
      {open && <DetailData setOpen={setOpen} open={open} />}
      {open1 && <EditBlog setOpen1={setOpen1} open1={open1} />}
    </div>
  );
};

export default Categories;
