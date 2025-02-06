import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom';
import logo from '../../assets/Logo/Logo-Full-Light.png'
import {NavbarLinks} from '../../data/navbar-links'; 
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import { IoIosArrowDown } from 'react-icons/io';

const subLinks = [
    {
        title: "python", 
        link: "/catalog/python",
    },
    {
        title: "web dev",
        link: "/catalog/web-development",
    },
];



const Navbar = () => {

    const {token} = useSelector((state)=> state.auth);
    const {user} = useSelector((state) => state.profile); 
    const {totalItems} = useSelector ((state)=> state.cart); 


    // Fetching data from the backend 

    // const [subLinks, setSubLinks] = useState([]);

    // const fetchSubLinks = async() => {
    //     try{
    //         const result = await apiConnector("GET", categories.CATEGORIES_API);  
    //         console.log("printing subLinks result : ", result);
    //         setSubLinks(result.data.data);
    //     }
    //     catch(err){
    //         console.log("could not fetch the category list ")
    //     }
    // }
    // useEffect(() => {
    //     fetchSubLinks();
    // }, [])
 
    const location = useLocation();
    const matchRoute = (route) =>{
        return matchPath({path: route}, location.pathname);
    }

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 '>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

            {/* Navbar Logo */}
            <Link to="/">
                <img src={logo} width={160} height={32} loading='lazy' alt="navbarLogo" />
            </Link>

            {/* Navbar Links */}
            <nav>
                <ul className='flex gap-x-6 text-richblack-25 '>
                    {
                        NavbarLinks.map((link, index) => (
                            <li key={index}>
                                {
                                    link.title === "Catalog" ? 
                                    (<div className='relative flex items-center gap-2 group'>
                                        <p>
                                        {link.title} 
                                        </p>
                                        <IoIosArrowDown/>

                                        <div className='invisible absolute z-10 left-1/2 translate-x-[-50%] translate-y-[80%] top-1/2 flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] ' >

                                            <div className='absolute left-1/2 top-0 h-6 w-6 rotate-45 rounded bg-richblack-5 translate-x-[80%] translate-y-[-45%]'/>
                                            
                                            {
                                                subLinks.length ? 
                                                (
                                                    subLinks?.map((subLink, index) => (
                                                        <Link to={`${subLink.link}`} key={index}>
                                                        <p>{subLink.title}</p>
                                                        </Link>
                                                    ))
                                                ) : 
                                                (<div></div>) 
                                            }

                                        </div>
                                    </div>) : 
                                    (
                                        <Link to={link?.path}>
                                            <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                            {link.title}
                                            </p>
                                        </Link>
                                    )  
                                }
                            </li>
                        ))
                    }
                </ul>
            </nav>

            {/* Login/Signup Dashboard */}
            <div className="flex gap-x-4 items-center ">

                {/* Cart me added total items show karo */}
                {
                    user && user?.accountType !== "Instructor" && (
                        <Link to="/dashboard/cart" className='relative'>
                            <AiOutlineShoppingCart/>
                            {
                                totalItems > 0 && (
                                    <span>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }
                
                {/* Agar user login nhi hai toh login and signup button dikhao */}
                {
                    token === null && (
                        <Link to="/login">
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-2 text-richblack-100 rounded-md '>
                                Login
                            </button>
                        </Link>
                    )
                }

                {
                    token === null && (
                        <Link to="/signup">
                        <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-2 text-richblack-100 rounded-md '>
                                Sign Up
                            </button>
                        </Link>
                    )
                }
                
                {/* Agar user login hai toh uski profile icon and dashboard ka option dikhao */}
                {
                    token !== null && <ProfileDropDown/>
                }
            </div>


        </div>
    </div>
  )
}

export default Navbar
