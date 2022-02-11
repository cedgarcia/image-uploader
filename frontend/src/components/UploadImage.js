import React, { useEffect, useState } from 'react';
import imageBg from '../images/image.svg'
import axios from 'axios'
import { UploadImageWrap } from '../styles/Styles';
import Spinner from './Spinner';
import copy from 'copy-to-clipboard'

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);
  const [loader, setLoader] = useState(null);
  const [ids, setIds] = useState([]);
  
  useEffect(() => {
    if (!id && !loader) {
      const input = document.querySelector("input");
      const mid = document.querySelector(".drag-here");
      input.addEventListener("dragenter", (e) => {
        mid.classList.add("active");
      });
      input.addEventListener("dragleave", (e) => {
        mid.classList.remove("active");
      });
      input.addEventListener("drop", (e) => {
        mid.classList.remove("active");
      });
    }
    console.log(`${id}`)
  }, [id]);
  useEffect(()=>{
    if(image) {
      let data = new FormData()
      data.append('image',image)
      const config ={
        headers:{'Content-Type':',multipart/form-data'}
      }
      setLoader(true)
      const uploadImage = async ()=>{
        const res = await axios.post('/image',data, config)
        setId(res.data.id);
        setIds([...ids, res.data.id]);
        setLoader(null) 
        
      }
      uploadImage()
    }else {
      // alert('Only images can be uploaded')
    }
  },[image])

  // Uploading Images
  const dragFile = (e) =>{
    setImage(e.target.files[0])}
  const selectFile = () => {
    if(!id){
      const input =document.querySelector('input')
      input.click()
    }
  }
  // Copy Link
  const copyLink = ()=>{
    let link = `localhost:5000/image/${id}`;
    copy(link)
    alert('Link copied')
  }
  return (
    <UploadImageWrap>
    {!id ?(
    <section className='upload-image'>
        <h3>Upload your image</h3>
        <p>Files should be jpeg, png...</p>
      <div className='drag-here'>
        {!loader ?(
        <>
        <input type='file' onChange={ dragFile} />
        <img src = {imageBg} style={{width:'20%'}}/>
        <p>Drag and drop your images here</p>
        </>
        ):(
        <>
          <p>Uploading...</p>
          <Spinner/>
        </>
        )}
      </div>
      <>
        <p>Or</p>
        <div>
          <button className='btn-primary' onClick={selectFile} >
            Choose file
          </button>
        </div>
      </>
    </section>
    ):(
    <section className='upload-success'>
      <i className="fas fa-check-circle fa-3x"></i>
      <h3>Uploaded Successfully</h3>
      <div className='drag-here'>
        <img src={`/image/${id}`} alt="" />
      </div>
      <div className="link">
        <p id="link">localhost:5000/image/{id}</p>
        <button className="btn-primary" onClick={copyLink}>Copy Link</button>
      </div>
    </section>)}
    </UploadImageWrap>)
};

export default UploadImage;
