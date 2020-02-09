import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const FileInputWrapper = styled.div.attrs({
  className: 'FileInputWrapper'
})`
  display: flex;
  flex-direction: column;
  width: 400px;
  .fileReader {
    display: none;
  }
  
  .uploadLabel {
    justify-content: center;
    line-height: 1.5rem;
    padding: 50px 50px;
    height: auto;
    line-height: 1.2rem;
    font-size: 1.2rem;
    text-align: center;
    width: 100%;
    min-width: auto;
    cursor: pointer;
    border-radius: 10px;
    border-style: solid;
    border-width: 1px;
    margin-bottom: 2rem;
    box-sizing: border-box;
    border-color: ${(props) => !props.isValid ? 'red' : 'none'};
    color: ${(props) => !props.isValid ? 'red' : 'none'};
    &:hover {
      opacity: 0.4;
    }
  }

  .btn-primary {
    background-color: #2ed86e;
    color: white;
    border-radius: 5px;
    width: 100%;
    height: 50px;
    font-size: 1.2rem;
    cursor: pointer;
    opacity:${(props) => !props.isValid ? 0.7 : 1};
    &:hover {
      opacity: 0.7;
    }
  }
`

FileInputWrapper.displayName = 'FileInputWrapper'

function FileInput({
  handleChange,
  handleSubmit,
  handleClick,
  isValidFile,
  fileName
}) {

  return (
    <FileInputWrapper  
      isValid={isValidFile}
    >
      <label
        htmlFor="fileReader"
        className="uploadLabel"
      >
       {fileName ? fileName: 'Select text file'}
      </label>
      <input 
        type="file" 
        className="fileReader"
        id="fileReader"
        onChange={handleChange}
        onClick={handleClick}
      />  
      <button 
        className="btn-primary"
        onClick={handleSubmit}
        disabled={!isValidFile}
        >
        Process
      </button>
    </FileInputWrapper>
  )
}

FileInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  isValidFile: PropTypes.bool,
  fileName: PropTypes.string
}

FileInput.defaultProps = {
  fileName: null,
  isValidFile: true
}

export default FileInput