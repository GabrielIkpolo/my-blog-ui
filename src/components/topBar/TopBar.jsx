import './topBar.css';
// import myProfile from '../../images/hello.png'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../context/Context';


const address = process.env.REACT_APP_BASE_URL;

export default function TopBar() {
    const { user, dispatch } = useContext(Context);

    const PF = `${address.slice(0, address.length -3)}images/`;

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    }

    return (
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fa-brands fa-facebook-square"></i>
                <i className="topIcon fa-brands fa-twitter"></i>
                <i className="topIcon fa-brands fa-pinterest-square"></i>
                <i className="topIcon fa-brands fa-instagram-square"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem"><Link className='link' to='/' >HOME</Link></li>
                    <li className="topListItem"><Link className='link' to='/about' >ABOUT</Link></li>
                    <li className="topListItem"><Link className='link' to='/contact' >CONTACT</Link></li>
                    <li className="topListItem"><Link className='link' to='/write' >WRITE</Link></li>
                    <li className="topListItem" onClick={handleLogout}> {user ? 'LOGOUT' : ''}</li>
                </ul>
            </div>
            <div className="topRight">
                {user ?
                    <Link to="/settings">
                        <img className="topImage" src={PF + user.profilePicture} alt="Profile" />
                    </Link>
                    :
                    <ul className='topList'>
                        <li className='topListItem'>
                            <Link className='link' to='/login'>LOGIN</Link>
                        </li>
                        <li className='topListItem'>
                            <Link className='link' to='/register'>REGISTER</Link>
                        </li>
                    </ul>
                }

                <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    )
}
