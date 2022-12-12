import React, { useState,useRef } from 'react'
import JoditEditor from 'jodit-react'

const RitchTextEditor = ({setValue}) => {
    const editor = useRef(null);


  



 


    
    
    

  return (
    <JoditEditor ref={editor} onChange={(content)=>setValue(content)} />
  )
}

export default RitchTextEditor
