import React from "react";
import InputBlog from "../components/InputBlog";
import SideCategory from "../components/SideCategory";

const Home = () => {
  return (
    <div className="container mx-auto px-10 py-10 flex gap-5">
      <SideCategory />
      <InputBlog />
    </div>
  );
};

export default Home;
