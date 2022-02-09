import styled from 'styled-components'

export const UploadImageWrap = styled.div`
  width: 40rem;
  background: #fff ;
  padding:3.6rem 3.2rem;
  border-radius: 12px;
  border-radius: 1.2rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  p{
    padding:1rem 0;
    font-size:1.2rem;
  }
.drag-here {
  position: relative;
  width: 100%;
  background: #f6f8fb;
  padding: 35px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px dashed blue;
  box-sizing: border-box;
  border-radius: 12px;
}
  
  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
}

`
