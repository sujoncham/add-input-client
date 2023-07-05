import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Categories from "./components/Categories";
import Category from "./components/Category/Category";
import EditBlog from "./components/EditBlog";
import Header from "./components/Header/Header";
import InputBlogEdit from "./components/InputBlogEdit";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import InputData from "./pages/InputData";
// https://www.youtube.com/watch?v=Jd7s7egjt30

const App = () => {
  return (
    <div className="">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/inputData/:id" element={<InputData />} />
        <Route path="/inputBlogEdit/:id" element={<InputBlogEdit />} />
        <Route path="/editBlog/:id" element={<EditBlog />} />
        <Route path="/category/:id" element={<Categories />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category" element={<Category />} />
      </Routes>
    </div>
  );
};

export default App;
