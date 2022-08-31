import './settings.css';
import Sidebar from '../../components/sidebar/Sidebar.jsx';
import profilePicture from '../../images/54.jpeg';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';

let address = process.env.REACT_APP_BASE_URL;
export default function Settings() {

    const { user } = useContext(Context);
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password
        };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePicture = filename;

            try {
                await axios.post(`${address}/upload`, data);
            } catch (e) { }
        }

        try {
            await axios.put(`${address}/users/${user._id}`, updatedUser);
        } catch (err) { }
    }


    return (
        <div className='settings'>
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle"> Update your Account</span>
                    <span className="settingsDeleteTitle"> Delete Account</span>
                </div>

                <form className='settingsForm' onSubmit={handleSubmit} >
                    <label > Profile Picture</label>
                    <div className="settingsPP">
                        <img className='profilePictureImage' src={user.profilePicture} alt="ProfilePicture" />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon fa-solid fa-user"></i>
                        </label>

                        <input type="file" id='fileInput'
                            onChange={(e) => setFile(e.target.file[0])}
                            style={{ display: "none" }} />

                    </div>
                    <label >Username</label>
                    <input type="text" placeholder={user.username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label >Email</label>
                    <input type="email" placeholder={user.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label >Password</label>
                    <input type="password" placeholder='...'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="settingsSubmit" type="submit">Update</button>
                </form>
            </div>
            <Sidebar />
        </div>
    )
}
