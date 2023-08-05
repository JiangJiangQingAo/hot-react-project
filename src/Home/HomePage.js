import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'
const HomePage = () => {
    return (
        <div className='HomeDiv'>
            <ul className='HomeUl'>
                <li className='HomeLi'>
                    <Link to={"/auth-from"}>登录/注册</Link>
                </li>
            </ul>
        </div>
    );
}

export default HomePage;
