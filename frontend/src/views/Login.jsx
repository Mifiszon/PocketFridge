import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

function Login() {
  const { login } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    if (email.length > 0) {
      login(email, password)
    }

    console.log(email)
    console.log(password)
  }

  return (
    <div className="min-h-screen flex flex-col items-center rounded-lg justify-center bg-white">
      <main className="flex flex-1 items-center justify-center px-4 py-12 mt-20">
        <div className="flex w-full max-w-4xl shadow-lg rounded-lg overflow-hidden h-4/5">
          <div className="hidden md:block md:w-1/2 bg-gray-100 border-r-1">
            <img src="/assets/grocery.png" alt="login form" className="object-cover w-full h-full"/>
          </div>
          <div className="w-full md:w-1/2 p-14">
          <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2">Welcome</h2>
              <p className="mt-4 mb-2 text-gray-600">Sign into your account</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                <input placeholder="Enter your email here ..." type="email" name="email" id="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input placeholder="Enter your password here ..." type="password" name="password" id="password"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
              </div>
              <div className='text-center'>
                <button type="submit" className="mt-2 mb-2 w-1/2 rounded-lg bg-black text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200">
                  Login
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <a href="#!" className="hover:underline">Forgot password?</a>
            </div>
            <p className="mt-4 text-sm text-center">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline">Register Now</Link>
            </p>
            <div className="mt-6 text-xs text-gray-500 text-center">
              <a href="#!" className="hover:underline">Terms of use</a> |{' '}
              <a href="#!" className="hover:underline">Privacy policy</a>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-100 w-full text-center py-4 text-sm text-gray-600">
        © Pocket Fridge 2025 : <a href="/" className="hover:underline">PocketFridge.com</a>
      </footer>
    </div>
  )
}

export default Login
