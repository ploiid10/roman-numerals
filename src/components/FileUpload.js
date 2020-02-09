import React, {useState} from 'react'
import styled from 'styled-components'

import FileInput from './FileInput'

import convertCurrency from '../utils/numerals'

const FileUploadWrapper = styled.div.attrs({
  className: 'FileUploadWrapper'
})`
  display: flex;
  margin: 100px auto;
  justify-content: center;

  .input-output {
    width: 600px;
    padding: 0 20px;
    .input, .output {
      margin: 0;
      white-space: normal;
      white-space: pre-wrap;
    }
  }
`

FileUploadWrapper.displayName = 'FileUploadWrapper'

function FileUpload() {
  const [input, setInput] = useState({paragraph: null})
  const [output, setOutput] = useState(null)
  const [fileName, setFileName] = useState()
  const [isValidFile, setValidFile] = useState(true)

  const handleFiles = (files) => {
    var reader = new FileReader()
    reader.onload = function(e) {
      const {result} = reader
      setInput({
        paragraph: result,
        textLines: result.split('\n')
      })
      setOutput(null)
    }
    reader.readAsText(files[0])
  }
 
  const handleChange = async (e) => {
    const {files} = e.target
    await setFileName(files[0].name)
    if (files[0].type !== 'text/plain') {
      return setValidFile(false)
    } 
    setValidFile(true)
    handleFiles(files)
  }

  // Set value to null so that if we reupload same file
  // new value will be set
  const handleClick = (e) => e.target.value = null
  
  
  const processNumerals = () => {
    if (input.textLines && input.textLines && input.textLines.length > 0) {
      const {textLines} = input
      const output = []
      const getOutput = (text) => output.push(convertCurrency(text))
      textLines.forEach(getOutput)
      setOutput(output)
    } 
  }

  return (
    <FileUploadWrapper>
      <FileInput 
        handleChange={handleChange}
        handleSubmit={processNumerals}
        handleClick={handleClick}
        fileName={fileName}
        setValidFile={isValidFile}
      />
      <div className="input-output">
        {input.paragraph ? 'Input: ' : ''}
        <p className="input">
          {input.paragraph}
        </p>
        <br/>
        {output ? 'Output' : ''}
        {output && 
         output.map((line, index) => {
            return (
              <p 
                className="output"
                key={`output-${index}`}
              >
                {line}
              </p>
            )
          })
        }
      </div>
    </FileUploadWrapper>
  )
}

export default FileUpload