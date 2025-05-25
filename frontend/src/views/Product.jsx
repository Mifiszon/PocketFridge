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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const units = [
    ['g', 'grams'],
    ['kg', 'kilograms'],
    ['mg', 'milligrams'],
    ['ml', 'milliliters'],
    ['l', 'liters'],
    ['pcs', 'pieces'],
    ['oz', 'ounces'],
    ['lb', 'pounds'],
    ['tbsp', 'tablespoons'],
  ];

  const [product, setProduct] = useState([]);
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
    fetchData();
  }, []);

  const [createProduct, setCreateProduct] = useState({
    name: "",
    quantity: "",
    expirationDate: "",
    unit: "",
    category: "",
  });
  const addNewProduct = (event) => {
    setCreateProduct({
      ...createProduct,
      [event.target.name]: event.target.value,
    });
  };

  const [categories, setCategories] = useState([]);
    useEffect(() => {
      api.get(baseURL + "/categories/").then((res) => {
        setCategories(res.data);
      });
    }, []);

  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchData();
  }, []);

  const fetchCategories = async () => {
    const response = await api.get(baseURL + "/categories/");
    setCategories(response.data);
  };

  const statusColor = (expirationDate) => {
    const atm = new Date();
    const exp = new Date(expirationDate);
    const differenceTime = exp.getTime() - atm.getTime();
    const differenceDay = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));

    if (differenceDay < 0) {
      return "bg-red-200";
    } else if (differenceDay <= 3) {
      return "bg-orange-300";
    } else {
      return "bg-white";
    }
  };

  const notifyExpiration = (items) => {
    const today = new Date();
    const soon = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
  
    const soonExpiring = items.filter((item) => {
      const expDate = new Date(item.expirationDate);
      return expDate >= today && expDate <= soon;
    });
  
    const todayExpiring = items.filter((item) => {
      const expDate = new Date(item.expirationDate);
      return expDate.toDateString() === today.toDateString();
    });
  
    const expiringProducts = [...soonExpiring, ...todayExpiring];
  
    if (expiringProducts.length > 0 && Notification.permission === "granted") {
      const productNames = expiringProducts.map(p => p.name).join(", ");
      new Notification("❄️Products close to expiring!❄️", {
        body: `${productNames}`,
        icon: "assets/pocketlogo.png"
      });
    }
  };

  const fetchData = async () => {
    await api.get(baseURL + "/product/" + user_id + "/").then((res) => {
      const sortedData = res.data.sort((a, b) => {
        return new Date(a.expirationDate) - new Date(b.expirationDate);
      });
  
      setProduct(sortedData);
      notifyExpiration(sortedData);
    });
  };

  const formSubmit = () => {
    console.log("added");
    const data = new FormData();
    data.append("user", user_id);
    data.append("name", createProduct.name);
    data.append("unit", createProduct.unit);
    data.append("quantity", createProduct.quantity);
    data.append("expirationDate", createProduct.expirationDate);
    data.append("category", createProduct.category);

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
        setCreateProduct({
          name: "",
          quantity: "",
          expirationDate: "",
          unit: "",
          category: "",
        });
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

  const markAsOpened = async (product_id) => {
    const today = new Date();
    const newExpirationDate = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
    const formattedDate = newExpirationDate.toISOString().split("T")[0];
  
    try {
      await api.patch(baseURL + "/product-opened/" + user_id + "/" + product_id + "/", {
        opened: true,
        expirationDate: formattedDate,
      });
  
      Swal.fire({
        title: "Product marked as opened",
        text: "Expiration set to 3 days",
        icon: "success",
        toast: true,
        timer: 2000,
        position: "top",
        timerProgressBar: true,
        showConfirmButton: false,
      });
  
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const canMarkAsOpened = (expirationDate) => {
    const now = new Date();
    const exp = new Date(expirationDate);
    const diffInDays = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));
    return diffInDays >= 3;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pl-PL");
  };

  const handleCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleCreateCategory = async (event) => {
    event.preventDefault();
    const existingCategory = categories.find(
      (category) => category.name.toLowerCase() === newCategory.toLowerCase()
    );

    if (existingCategory) {
      Swal.fire("Category already exists!", "", "error");
    } else {
      const data = { name: newCategory };
      try {
        await api.post(baseURL + "/categories/", data);
        Swal.fire("Category Created", "", "success");
        setNewCategory("");
        fetchCategories();
      } catch (error) {
        console.error(error);
        Swal.fire("Error creating category", "", "error");
      }
    }
  };

  return (
    <>
      <div className="pt-12 px-4 max-w-3xl mx-auto rounded">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Your Fridge</h2>
          <h4 className="text-lg text-gray-500 font-medium mb-4 text-center">
            Add your product below. <br/>
            Can't find matching category? Create new one!
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input name="name" onChange={addNewProduct} value={createProduct.name} type="text" className="border p-2 rounded" placeholder="Name of the product"/>
            <input name="quantity" onChange={addNewProduct} value={createProduct.quantity} type="number" className="border p-2 rounded"placeholder="Quantity"/>
            <select name="unit" value={createProduct.unit} onChange={addNewProduct} className="border p-2 rounded">
              <option value="">Select unit</option>
              {units.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <select name="category" value={createProduct.category} onChange={addNewProduct} className="border p-2 rounded">
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input name="expirationDate" type="date"onChange={addNewProduct} value={createProduct.expirationDate} className="h-7/8 border p-2 rounded"/>
            <div className="bg-white shadow-md rounded-lg p-3 mb-3">
            <form onSubmit={handleCreateCategory}>
              <input type="text" value={newCategory} onChange={handleCategoryChange} className="border p-2 rounded mb-2 w-full" placeholder="Enter new category name" required/>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full" >
                Create Category
              </button>
            </form>
          </div>
          </div>
          <div className="text-center">
            <button onClick={formSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full md:w-auto">
              Add Product
            </button>
          </div>

          {selectedCategory && (
            <div className="mb-4">
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-blue-600 underline"
              >
                Show all products
              </button>
            </div>
          )}

          <div className="mt-8">
            <div className="grid grid-cols-4 font-semibold border-b pb-2 mb-2 text-gray-700">
              <span>Name | Quantity</span>
              <span className="text-right">Expiration Date </span>
              <span className="text-right">Category</span>
              <span className="text-right">Actions</span>
            </div>

            {product.length === 0 ? (
              <p className="text-gray-500 mt-2">No products found</p>
            ) : (
              product
              .filter((p) => !selectedCategory || p.category === selectedCategory)
              .map((product) => {
                const categoryName = categories.find((category) => category.id === product.category)?.name;
                return (
                  <div key={product.id} className={`mb-2 grid grid-cols-4 items-center rounded py-2 shadow text-gray-800 transition duration-200 ${statusColor(product.expirationDate)}`}>
                    <div className={product.opened ? "" : ""}>
                      {product.name}
                      {product.opened && <span className="ml-1 text-xs text-blue-600">(opened)</span>}
                      {product.quantity && (
                        <span className="text-sm text-gray-600 ml-2">({product.quantity} {product.unit})</span>
                      )}
                    </div>
                    <div className={`text-right ${product.opened ? "" : ""}`}>
                      {formatDate(product.expirationDate)}
                    </div>
                    <div className="text-right cursor-pointer text-blue-600 hover:underline" onClick={() => setSelectedCategory(product.category)}>
                      {categoryName || 'No category'}
                    </div>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => markAsOpened(product.id)} disabled={product.opened || !canMarkAsOpened(product.expirationDate)} className={`${product.opened ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"} text-white px-3 py-1 rounded`}>
                        🍾
                      </button>

                      <button onClick={() => deleteData(product.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                        🗑
                      </button>
                    </div>
                  </div>
                );
              })
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
