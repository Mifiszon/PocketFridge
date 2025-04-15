import React from 'react'
import { useState, useEffect } from 'react'
import useAxios from '../utils/useAxios'
import { jwtDecode } from 'jwt-decode'
import Swal from 'sweetalert2'
import "tailwindcss";

function Product() {
    const baseURL = "http://127.0.0.1:8000/api"
    const api = useAxios()
    const token = localStorage.getItem("authTokens")
    const decoded = jwtDecode(token)
    const user_id = decoded.user_id

    const [product, setProduct] = useState([])
    useEffect(() => {
        fetchData()
    }, [])

    const [createProduct, setCreateProduct] = useState({name:"", status:"", quantity:"", expirationDate:""})
    const addNewProduct = (event) => {
        setCreateProduct({
            ...createProduct,
            [event.target.name]: event.target.value
        })
    }
    
    const fetchData = async () => {
        await api.get(baseURL+ '/product/'+ user_id + '/').then((res) => {
            console.log(res.data);
            setProduct(res.data)
        })
    }
    console.log(createProduct.name);

    const formSubmit = () => {
        console.log("added");
        const data = new FormData()
        data.append("user", user_id)
        data.append("name", createProduct.name)
        data.append("status", createProduct.status)
        data.append("quantity", createProduct.quantity)
        data.append("expirationDate", createProduct.expirationDate)

        try {
            api.post(baseURL+ '/product/'+ user_id + '/', data).then((res) => {
                Swal.fire({
                    title: "Product Added",
                    icon: "success",
                    toast: true,
                    timer: 2000,
                    position: "top",
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
                fetchData()
                createProduct.name = ''
            })
        } catch (error) {
            console.log(error)
            }
    }

    const deleteData = async (product_id) => {
        await api.delete(baseURL + '/product-detail/' + user_id + '/' + product_id + '/')
        Swal.fire({
            title: "Product Deleted",
            icon: "success",
            toast: true,
            timer: 2000,
            position: "top",
            timerProgressBar: true,
            showConfirmButton: false,
        })
        fetchData()
    }

    const changeStatus = async (product_id) => {
        await api.patch(baseURL + '/product-status/' + user_id + '/' + product_id + '/')
        Swal.fire({
            title: "Product Expired",
            icon: "success",
            toast: true,
            timer: 2000,
            position: "top",
            timerProgressBar: true,
            showConfirmButton: false,
        })
        fetchData()
    }

  return (
    <div>
        <div>
            <div className="container" style={{marginTop:"150px", padding:"10px"}}>
                <div className="row justify-content-center align-items-center main-row">
                    <div className="col shadow main-col bg-white">
                        <div className="row bg-primary text-white">
                            <div className="col p-2">
                                <h4>Your Pocket Fridge</h4>
                            </div>
                        </div>
                        <div className="row justify-content-between text-white p-2">
                            <div className="form-group flex-fill mb-2">
                                <input id="todo-input" name='name' onChange={addNewProduct} value={createProduct.name} type="text" className="form-control mb-2" placeholder='a poduct...'  />
                                <input name='status' onChange={addNewProduct} value={createProduct.status} type="text" className="form-control mb-2" placeholder='fresh/used/opened/expired' />
                                <input name='quantity' onChange={addNewProduct} value={createProduct.quantity} type="number" className="form-control mb-2" placeholder='quantity' />
                                <input name='expirationDate' type='date' onChange={addNewProduct} className='form-control mb-2' />
                            </div>
                            <button type="button" onClick={formSubmit} className="btn btn-primary mb-2 ml-2"> Add Product</button>
                        </div>
                        <div className="row" id="todo-container">

                            {product.map((product) => 
                    
                            <div key={product.id} className="col col-12 p-2 todo-item">
                                <div className="input-group">
                                    {(product.status.toString() === "fresh" || product.status.toString() === "opened") &&
                                        <p className="form-control">{product.name}</p>
                                    }
                                    {(product.status.toString() === "expired" || product.status.toString() === "used") &&
                                        <p className="form-control"><strike>{product.name}</strike></p>
                                    }
                                    <div className="input-group-append">
                                        <button className="btn bg-success text-white ml-2" onClick={() => changeStatus(product.id)} type="button"><i className='fas fa-check'></i></button>
                                        <button className="btn bg-danger text-white me-2 ms-2 ml-2" onClick={() => deleteData(product.id)} type="button"><i className='fas fa-trash'></i></button>
                                    </div>
                                </div>
                            </div>

                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Product