import React from 'react';
import { Link } from 'react-router-dom'
const Home = () => {
    return (
        <div>
            Regigjtudent: <Link to="/register">
                <button className='p-3 bg-green-200 border-2 border-green-500'>Register</button></Link>
        </div>
    )
}
export default Home;