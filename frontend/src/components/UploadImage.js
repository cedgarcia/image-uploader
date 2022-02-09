import React, { useEffect, useState } from 'react';
import axios from 'axios'
import imagebg from '../images/image.svg'
import { UploadImageWrap } from '../styles/Styles';
import Spinner from './Spinner';

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);
  const [loader, setLoader] = useState(null);
  

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
    setLoader(null)

    }
    uploadImage()
  }else {
    // alert('Only images can be uploaded')
  }

},[image])





// Uploading Images
  const dragFile = (e) =>{
    setImage(e.target.files[0])
  }
  const selectFile = () => {
    const input =document.querySelector('input')
    input.click()
  }





  return (

    <UploadImageWrap>
{!id ?(
    <section className='upload-image'>
        <h1>Upload your image</h1>
        <p>Files should be jpeg, png...</p>

      <div className='drag-here'>
        {!loader ?(

        <>
        <input type='file' onChange={ dragFile} />
        <img src={imagebg} alt="" />
    
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
      <h3>Uploaded Successfully</h3>
      <div className='drag-here'>
        <img src={`/image/${id}`} alt="" />
      </div>
      <div className="link">
        <p id="link">Link</p>
        <button className="btn-primary">Copy Link</button>
      </div>
    </section>)}

    </UploadImageWrap>)
};

export default UploadImage;
