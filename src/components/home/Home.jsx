import './home.css'
import Header from '../../components/header/Header.jsx';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

let address = process.env.REACT_APP_BASE_URL;

export default function Home() {

const [posts, setPosts] = useState([]);
const {search}= useLocation();
console.log(search);

useEffect(()=>{
    const fetchPosts = async ()=>{
        const res = await axios.get(`${address}/posts/${search}`);
        setPosts(res.data);
     }
    
fetchPosts();

}, [search]);

    return (
        <>
            <Header />
            <div className='home'>
                <Posts posts={posts} />
                <Sidebar /> 
            </div>
        </>
    )
}
