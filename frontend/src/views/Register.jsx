import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

function Register() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const { register } = useContext(AuthContext)

  const handleSubmit = async e => {
    e.preventDefault()
    register(email, username, password, password2)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white">
      <main className="flex flex-1 items-center justify-center px-4 py-12 mt-2">
        <div className="flex w-full max-w-5xl shadow-lg rounded-lg overflow-hidden h-4/5">
          <div className="hidden md:block md:w-1/2 bg-gray-100 border-r-1">
            <img src="/assets/zerowaste.png" alt="register form" className="object-cover w-full h-full"/>
          </div>
          <div className="w-full md:w-1/2 p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Sign up to Pocket Fridge</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email" placeholder="Enter your email ..." onChange={e => setEmail(e.target.value)} id="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
              </div>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text" placeholder="Enter your username ..." id="username" onChange={e => setUsername(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" placeholder="Enter your password ..." onChange={e => setPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
              </div>
              <div className="mb-6">
                <label htmlFor="password2" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password" id="password2" placeholder="Confirm your password" onChange={e => setPassword2(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
              </div>
              <div className="text-center">
                <button type="submit" className="mt-2 w-1/2 rounded-lg bg-black text-white py-2 px-4 hover:bg-gray-700 transition duration-200">
                  Register
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <a href="#!" className="hover:underline">Forgot password?</a>
            </div>
            <p className="mt-4 text-sm text-center">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">Login Now</Link>
            </p>
            <div className="mt-6 text-xs text-gray-500 text-center">
              <a href="#!" className="hover:underline">Terms of use</a> |{' '}
              <a href="#!" className="hover:underline">Privacy policy</a>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-100 w-full h-full text-center py-4 text-sm text-gray-600">
        © Pocket Fridge 2025 : <a href="/" className="hover:underline">PocketFridge.com</a>
      </footer>
    </div>
  )
}

export default Register
