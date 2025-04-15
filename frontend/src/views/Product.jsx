import React from "react";
import { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import "tailwindcss";

function Product() {
  const baseURL = "http://127.0.0.1:8000/api";
  const api = useAxios();
  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;

  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const [createProduct, setCreateProduct] = useState({
    name: "",
    status: "",
    quantity: "",
    expirationDate: "",
    unit: "",
  });
  const addNewProduct = (event) => {
    setCreateProduct({
      ...createProduct,
      [event.target.name]: event.target.value,
    });
  };

  const statusColor = (expirationDate) => {
    const atm = new Date();
    const exp = new Date(expirationDate);
    const differenceTime = exp.getTime() - atm.getTime();
    const differenceDay = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));

    if (differenceDay < 0) {
      return "bg-red-200";
    } else if (differenceDay <= 3) {
      return "bg-orange-200";
    } else {
      return "bg-white";
    }
  };

  const fetchData = async () => {
    await api.get(baseURL + "/product/" + user_id + "/").then((res) => {
      console.log(res.data);
      setProduct(res.data);
    });
  };
  console.log(createProduct.name);

  const formSubmit = () => {
    console.log("added");
    const data = new FormData();
    data.append("user", user_id);
    data.append("name", createProduct.name);
    data.append("unit", createProduct.unit);
    data.append("status", createProduct.status);
    data.append("quantity", createProduct.quantity);
    data.append("expirationDate", createProduct.expirationDate);

    try {
      api.post(baseURL + "/product/" + user_id + "/", data).then((res) => {
        Swal.fire({
          title: "Product Added",
          icon: "success",
          toast: true,
          timer: 2000,
          position: "top",
          timerProgressBar: true,
          showConfirmButton: false,
        });
        fetchData();
        createProduct.name = "";
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (product_id) => {
    await api.delete(
      baseURL + "/product-detail/" + user_id + "/" + product_id + "/"
    );
    Swal.fire({
      title: "Product Deleted",
      icon: "success",
      toast: true,
      timer: 2000,
      position: "top",
      timerProgressBar: true,
      showConfirmButton: false,
    });
    fetchData();
  };

  const changeStatus = async (product_id) => {
    await api.patch(
      baseURL + "/product-status/" + user_id + "/" + product_id + "/"
    );
    Swal.fire({
      title: "Product Expired",
      icon: "success",
      toast: true,
      timer: 2000,
      position: "top",
      timerProgressBar: true,
      showConfirmButton: false,
    });
    fetchData();
  };
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pl-PL");
  };

  return (
    <>
      <div className="pt-12 px-4 max-w-3xl mx-auto rounded">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Your Fridge</h2>
          <h4 className="text-lg text-gray-500 font-medium mb-4 text-center">
            Add your products
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input name="name" onChange={addNewProduct} value={createProduct.name} type="text" className="border p-2 rounded" placeholder="Name of the product"/>
            <input name="status" onChange={addNewProduct} value={createProduct.status} type="text" className="border p-2 rounded" placeholder="fresh / opened / used / expired"/>
            <input name="quantity" onChange={addNewProduct} value={createProduct.quantity} type="number" className="border p-2 rounded"placeholder="Quantity"/>
            <input name='unit' onChange={addNewProduct} value={createProduct.unit || ''} type="text" className="border p-2 rounded" placeholder='Unit'/>
            <input name="expirationDate" type="date"onChange={addNewProduct} value={createProduct.expirationDate} className="text-center border p-2 rounded w-168"/>
          </div>
          <div className="text-center">
            <button onClick={formSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full md:w-auto">
              Add Product
            </button>
          </div>

          <div className="mt-8">
            <div className="grid grid-cols-3 font-semibold border-b pb-2 mb-2 text-gray-700">
              <span>Name | Qunatity</span>
              <span className="text-right">Expiration Date </span>
              <span className="text-right">Actions</span>
            </div>

            {product.length === 0 ? (
              <p className="text-gray-500 mt-2">No products found</p>
            ) : (
              product.map((product) => (
                <div key={product.id} className={`mb-2 grid grid-cols-3 items-center rounded py-2 shadow text-gray-800 transition duration-200 ${statusColor(product.expirationDate)}`}>
                  <div className={product.status === "expired" || product.status === "used" ? "line-through text-gray-500" : ""}>
                    {product.name}
                    {product.quantity && (
                        <span className="text-sm text-gray-600 ml-2">({product.quantity} {product.unit})</span>
                    )}
                  </div>
                  <div className={`text-right ${product.status === "expired" ? "text-red-500" : ""}`}>
                    {formatDate(product.expirationDate)}
                  </div>
                  <div className="flex justify-end gap-2">
                    <button onClick={() => changeStatus(product.id)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">
                      ✔
                    </button>
                    <button onClick={() => deleteData(product.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                      🗑
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <footer className="bg-gray-100 w-full text-center py-4 text-sm text-gray-600 mt-10">
        © Pocket Fridge 2025 :{" "}
        <a href="/" className="hover:underline">PocketFridge.com</a>
      </footer>
    </>
  );
}

export default Product;
