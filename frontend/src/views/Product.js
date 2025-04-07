import React from 'react'

function Product() {
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
                                <input id="todo-input" name='title'  type="text" className="form-control" placeholder='a poduct...'  />
                            </div>
                            <button type="button" className="btn btn-primary mb-2 ml-2"> Add Product</button>
                        </div>
                        <div className="row" id="todo-container">
                        <div className="col col-12 p-2 todo-item">
                            <div className="mb-2">
                                <p className="form-control"><strike>Milk</strike></p>
                                <p className="form-control">Milk</p>
                            </div>
                                <div className="input-group">
                                    <div className="input-group-append">
                                    <button className="btn bg-success text-white ml-2" type="button"><i className='fas fa-check'></i></button>
                                    <button className="btn bg-danger text-white me-2 ms-2 ml-2" type="button"><i className='fas fa-trash'></i></button>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Product