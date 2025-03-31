import {useContext} from 'react'
import { jwtDecode } from "jwt-decode"
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

function Navbar() {

  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img style={{width:"120px", padding:"6px"}} src="https://i.imgur.com/yTpdSsc.png" alt="logo" />

          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
                <li class="nav-item">
                  <a class="nav-link" to="/login">Login</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" to="/register">Register</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/dashboard">Dashboard</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" style={{cursor:"pointer"}}>Logout</a>
                </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar