import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const Wrapper = styled.div`
 border: solid 1px lightgrey;
  position: relative;
  width: ${props => props.width};
  margin: 1rem 0;
  border-radius:5px;
 
  label {
    font-size: 0.8rem;
    font-weight: 400;
    opacity: 0.5;
    position: absolute;
    top: 4px;
    left: 4px;
  }
  input {
    width: 100%;
    height: 100%;
    padding: 1.5rem 0 0.4rem 0.4rem;
    background-color:#f9f9f9;
    border:none;
  }
  button{
    position:absolute;
    margin: 0 0 0 95%;
    padding:0;
  }
`


export default ({ labelText,  width = '100%', ...props }) => (
  <Wrapper width={width} >
    <label>{labelText} </label>
    <input {...props}></input>
    {/* <button><FontAwesomeIcon icon={faEyeSlash} /></button> */}

  </Wrapper>
)
