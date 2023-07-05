import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SideCategory = () => {
  const [cates, setCates] = useState([]);
  useEffect(() => {
    const getData = async () => {
      await axios
        .get("http://localhost:5000/api/category/")
        .then((data) => {
          console.log(data.data.data);
          setCates(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);
  return (
    <div className="w-[20%] bg-gray-200 px-5 py-5">
      <div>
        <h1 className="text-[18px] font-bold mb-5">All Categories Picture</h1>
      </div>
      <div className="flex flex-col">
        {cates?.data?.map((cat) => (
          <Link
            key={cat._id}
            to={`/category/${cat._id}`}
            className="border-2 border-purple-300 px-2 py-2 bg-purple-500 hover:bg-purple-600"
          >
            {cat.category}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideCategory;
