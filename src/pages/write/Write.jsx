import './write.css'
import theUplodedImg from '../../images/hello.png';
import axios from 'axios'
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';


let address = process.env.REACT_APP_BASE_URL;

export default function Write() {

 const [title, setTitle] = useState("");
 const [desc, setDesc] = useState("");
 const [file, setFile] = useState("");

 const {user} = useContext(Context)
const handleSubmit= async (e)=>{
    e.preventDefault();

    const newPost= {
        username: user.username,
        title, 
        desc,
    }

    if(file){
        const data = new FormData();
        const filename = Date.now() + file.name; 
        data.append("name", filename);
        data.append("file", file);
        newPost.photo = filename;

        try{
            await axios.post(`${address}/upload`, data);
        }catch(err){

        }
    }

    try{
        const res = await axios.post(`${address}/posts`, newPost);
        window.location.replace(`/post/`+ res.data._id);
    }catch(err){}
    
}

    return (
        <div className='write'>
            {file &&(
                <img src={URL.createObjectURL(file)} 
                className='writeImg' alt="uploadImg" />
            )}

            <form className="writeForm" onSubmit={handleSubmit}>
                
                <div className="writeFormGroup">
                    <label htmlFor='fileInput'>
                        <i className="writeIcon fa-solid fa-plus"></i>
                    </label>
                    <input type="file" id='fileInput'
                    onChange={(e)=>setFile(e.target.files[0])}
                    className='inputOne' />

                    
                    <input type="text" placeholder='Title' className='writeInput'
                        autoFocus={true} 
                        onChange={(e)=>setTitle(e.target.value)}
                        />
                </div>

                <div className="writeFormGroup">
                    <textarea placeholder='Tell your story ...' 
                    type="text" className='writeInput writeText'
                    onChange = {(e)=>setDesc(e.target.value)}
                    >

                    </textarea>
                </div>
                <button className="writeSubmit" type="submit" > Publish </button>
            </form>
        </div>


    )
}
