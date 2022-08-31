import './sidebar.css'
import image33 from '../../images/33.jpeg'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
let address = process.env.REACT_APP_BASE_URL;

export default function Sidebar() {

    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get(`${address}/categories`);
            setCats(res.data);
        }
        getCats();
    }, []);

    return (
        <div className='sidebar'>
            <div className="sidebarItem">
                <span className='sidebarTitle'>ABOUT ME</span>
                <img className='myImportedImage' src={image33} alt="just me" />
                <p>
                    Since its founding in 2014, Andela has opened up career paths for more than 175,000
                    budding software engineers from emerging economies. Most have technological or
                    managerial roles, either in one of hundreds of established companies around the world,
                    or in their own startups.
                </p>
            </div>
            <div className="sidebarItem">
                <span className='sidebarTitle'>CATEGORIES</span>
                <ul className="sidebarList">

                    {cats.map((c) =>
                        <Link to={`/?cat=${c.name}`} className='link'>
                            <li className="sidebarListItem">{c.name}</li>
                        </Link>
                    )}



                </ul>
            </div>
            <div className="sidebarItem">
                <span className='sidebarTitle'>FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fa-brands fa-facebook-square"></i>
                    <i className="sidebarIcon fa-brands fa-twitter"></i>
                    <i className="sidebarIcon fa-brands fa-pinterest-square"></i>
                    <i className="sidebarIcon fa-brands fa-instagram-square"></i>
                </div>
            </div>
        </div>
    )
}
