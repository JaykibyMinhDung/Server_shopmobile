import { useState } from "react";
import ProductAPI from "../API/ProductAPI";
import {useLocation} from "react-router-dom"
import queryString from "query-string";
import axios from "axios";

const NewProduct = () => {
  const location = useLocation();
  const [UpLoadForm, setUpLoadForm] = useState({
    name: location.state ? location.state?.name : "",
    category: location.state ? location.state.category : "",
    short_desc: location.state ? location.state.short_desc : "",
    long_desc: location.state ? location.state.long_desc : "",
    // image: [],
  });
  const addNewProduct = async (e) => {
    e.preventDefault();
    if (validateInput(UpLoadForm) === "SUCCESSFUL") {
      const formData = new FormData();
      for (let i = 0; i < UpLoadForm.image.length; i++) {
        formData.append(`image${i+1}`, UpLoadForm.image[i])
      }
      formData.append(`name`, UpLoadForm.name)
      formData.append(`category`, UpLoadForm.category)
      formData.append(`long_desc`, UpLoadForm.long_desc)
      formData.append(`short_desc`, UpLoadForm.short_desc)
      for (const key of formData.entries()) {
        console.log(key[0] + ', ' + key[1])
      }
      const response = await axios.post(
        "http://localhost:5000/products/new-product",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "mutipart/form-data",
          }, 
        }
      )
      return alert(response.meta.message);
    }
  };

   function validateInput (inputEmpty){
    let flag;
    for (const [key, value] of Object.entries(inputEmpty)) {
      if (value === "" || value === undefined) {
        flag = key
      }
    }
    if (flag) {
      alert(`${flag} không được để trống`);
      return flag = ""
    } else {
      flag = ""
      return "SUCCESSFUL"
    }
  }

  const updatedProduct = async (e) => {
    e.preventDefault();
    const updatedItem = {
      name: UpLoadForm.name,
      category: UpLoadForm.category,
      short_desc: UpLoadForm.short_desc,
      long_desc: UpLoadForm.long_desc,
    }
    const response = await ProductAPI.updatedProducts({...updatedItem}, location.state._id)
    return alert(response.meta.message);
  };

  const changeInput = (event) => {
    setUpLoadForm(() => {
      return {
        ...UpLoadForm,
        name: event.target?.name === 'name' ? event.target?.value : UpLoadForm.name,
        category: event.target?.name === 'category' ? event.target?.value : UpLoadForm.category,
        short_desc: event.target?.name === 'short_desc' ? event.target?.value : UpLoadForm.short_desc,
        long_desc: event.target?.name === 'long_desc' ? event.target?.value : UpLoadForm.long_desc,
        image: event.target?.name === 'image' ? [...event.target?.files] : UpLoadForm.image,
      };
    });
  };

  return (
    <div className="page-wrapper">
        <h2 style={{paddingLeft: '20px'}}>{ location.state && "Updated Products"}</h2>
      <div className="page-breadcrumb">
        <div className="row">
          <form style={{ width: "50%", marginLeft: "40px" }}>
            <div className="form-group">
              <label>Product Name</label>
              <input
                onChange={(e) => changeInput(e)}
                value={UpLoadForm.name}
                name="name"
                type="text"
                className="form-control"
                placeholder="Enter Product Name"
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input
                onChange={(e) => changeInput(e)}
                value={UpLoadForm.category}
				        name="category"
                type="text"
                className="form-control"
                placeholder="Enter Category"
              />
            </div>
            <div className="form-group">
              <label>Short Description</label>
              <textarea
                onChange={(e) => changeInput(e)}
                value={UpLoadForm.short_desc}
				        name="short_desc"
                className="form-control"
                rows="3"
                placeholder="Enter Short Description"
              ></textarea>
            </div>
            <div className="form-group">
              <label>Long Description</label>
              <textarea
                onChange={(e) => changeInput(e)}
                value={UpLoadForm.long_desc}
				        name="long_desc"
                className="form-control"
                rows="6"
                placeholder="Enter Long Description"
              ></textarea>
            </div>
            {!location.state && <div className="form-group">
              <label htmlFor="exampleFormControlFile1">
                Upload image (5 images)
              </label>
              <input
                onChange={(e) => changeInput(e)}
				        name="image"
                type="file"
                accept='image/*'
                className="form-control-file"
                id="exampleFormControlFile1"
                multiple
              />
            </div>}
            <button
              onClick={location.state ? updatedProduct : addNewProduct }
              type="submit"
              className="btn btn-primary"
            >
              {!location.state ? "Submit" : "Updated"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
