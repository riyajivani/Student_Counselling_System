import './note.css';
import Sidebar from '../../components/Sidebar/sidebar'
import Footer from '../../components/Footer/footer'
import JoditEditor from 'jodit-react'
import { useState, useRef } from 'react';
import HTMLReactParser from 'html-react-parser'


const Note = () => {

     const editor = useRef(null);
     const [content, setContent] = useState('');
     
     return (
          <>
               <div className='note-container'>
               <Sidebar />

               <div className='note-body'>
               <h1>note something important</h1>

               <JoditEditor 
                    ref={editor}
                    value={content}
                    onChange={newContent => {setContent(newContent)}}
               />

               <div>{HTMLReactParser(content)}</div>
               </div>

               <Footer />
               </div>
               
          </>
     )
}

export default Note