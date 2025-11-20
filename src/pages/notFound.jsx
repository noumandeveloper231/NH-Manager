import assets from '../assets/assets'
import { ChevronRight } from 'lucide-react'
import Navbar from '../components/Layouts/Navbar'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <main className='flex-1 px-8  flex flex-col justify-between py-20 items-center gap-8'>
                <h4 className='font-semibold text-3xl md:text-4xl lg:text-5xl text-center text-black'>
                    Hmm, that didn’t work.
                </h4>
                <p className='text-xl text-center md:text-2xl text-gray-500'>
                    The page you are looking for cannot be found
                </p>
                <img src={assets.notFound} alt="Not Found" />
                <Link to={'/'} className='py-3 px-4 rounded-2xl bg-red-500 cursor-pointer text-white flex items-center gap-2 md:gap-3 lg:gap-4'>
                    Go to Home Page <ChevronRight />
                </Link>
            </main>
        </div>
    )
}

export default NotFoundPage