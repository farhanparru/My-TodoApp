// eslint-disable-next-line no-unused-vars
import React, { useState , useEffect} from 'react'
import Modal from 'react-modal';
import axios from 'axios'
import { toast } from 'react-toastify';


Modal.setAppElement('#root');

// eslint-disable-next-line react/prop-types
const EditTodo = ({ modalIsOpen, closeModal,todoData,fetchData }) => {
  const [title,setTitle] = useState("")


   useEffect(()=>{
     if(todoData){
      // eslint-disable-next-line react/prop-types
      setTitle(todoData.getTodoIdData.title)
     }
   },[todoData])
   

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      marginTop:'-100px',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '400px',
    },
  };


  const handleEditTodo = async (id)=>{
    try {
      const response = await axios.put(`http://localhost:8000/user/api/updateTodo/${id}`,
        { title }
      )
      console.log(response);
      closeModal()
      fetchData()
      toast.success('Task Update successfully !')
    } catch (error) {
      console.log(error);
      toast.error('Failed to Edit task. Please try again.')
    }
  }
  


    

  return (
    
    <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    style={customStyles}
  >

    <h2 className="text-center mb-4">Edit Todo Title</h2>
    <div className="mb-4">
      <input type="text"  value={title} onChange={(e)=> setTitle(e.target.value)}  
      className="p-2 border rounded w-full" />
    </div>
    <div className="flex justify-end">
      <button
        onClick={closeModal}
        className="p-2 bg-gray-500 text-white rounded mr-2"
      >
        Close
      </button>
      <button   
      className="p-2 bg-purple-500 text-white rounded"
      // eslint-disable-next-line react/prop-types
      onClick={() => handleEditTodo(todoData.getTodoIdData._id)}>
       Edit
      </button>
    </div>
  </Modal>
  
);
};

export default EditTodo
