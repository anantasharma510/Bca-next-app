// pages/404.js
import Link from 'next/link'
import Navbar from './components/navbar'

const NotFound = () => {
  return (
    
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-gray-800 text-center">
      <h1 className="text-9xl font-extrabold text-red-500">404</h1>
      <p className="text-2xl mt-4">Oops! The page you’re looking for doesn’t exist.</p>
      <br></br>
      <Link href="/">
        <span className="mt-6 px-6 py-3 text-xl text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition">
          Go back to Home
        </span>
      </Link>
    </div>
  )
}

export default NotFound
