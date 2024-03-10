
import { useEffect, useState, useRef } from 'react';
import './App.css';
import { getEmployees, saveEmployee, updateEmployee, updatePhoto } from './api/EmployeeService';
import Header from './component/Header'
import { Navigate, Route, Routes } from 'react-router-dom';
import EmployeeList from './component/EmployeeList'
import EmployeeDetails from './component/EmployeeDetails';

function App() {

  const modalRef = useRef();
  const fileRef = useRef();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [file, setFile] = useState(undefined);

  const [values, setValues] = useState({
    firstName : "",
    lastName : "",
    designation : "",
    department : "",
    phone : "",
    
  });
  
  const getAllEmployees = async (page = 0, size =10) => {
    try{
      setCurrentPage(page);
      const {data} = await getEmployees(page, size);
      setData(data);
      console.log(data);
    }catch(error){
      console.log(error);
    }
  }

  const onChange = (event) => {
    setValues({...values,[event.target.name]: event.target.value});
    console.log(values);
  }

  const onFileChange = (event) => {
    setFile(event.target.files[0]); // Update the file state when a file is selected
     
  }

  const handleNewEmployee = async (event) =>{
    event.preventDefault();
    try{
      const{data} = await saveEmployee(values);
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('id', data.id);
      const {data : photoUrl} =await updatePhoto(formData);
      toogleModal(false)
      console.log(photoUrl);
      setFile(undefined);
      fileRef.current.value = null;
      setValues(
        {
          firstName : "",
          lastName : "",
          designation : "",
          department : "",
          phone : "",
        }
      )
      getAllEmployees();
    }catch(error){
      console.log(error);
    }
  };

  const updateEmployee = async (employee) => { 
    try{
     const {data} = await saveEmployee(employee);
     console.log(data);
    }catch(error){
      console.log(error);
    }
   };

   const updateImage = async (formData) => {
    try {
      const { data: photoUrl } = await updatePhoto(formData);
    } catch (error) {
      console.log(error);
      
    }
  };
  
  const toogleModal = show => show ? modalRef.current.showModal() : modalRef.current.close();
  useEffect(()=>{
    getAllEmployees();
  }, [])

  return (
    <>
    <Header toogleModal={toogleModal} noOfEmployee={data.totalElements}/>
    <main className='main'>
      <div className='container'>  
    <Routes>
      <Route path='/' element={<Navigate to={'/employees'}/>}/>
      <Route path='/employees' element={<EmployeeList data= {data} currentPage={currentPage}  getAllContacts={getAllEmployees} />} />
      <Route path='/employees/:id' element = {<EmployeeDetails updateEmployee={updateEmployee} updatePhoto={updatePhoto}/>}/>
    </Routes>
    </div>
    </main>

     {/* Modal */}
     <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>New Contact</h3>
          <i onClick={() => toogleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={handleNewEmployee} >
            <div className="user-details">
              <div className="input-box">
                <span className="details">First Name</span>
                <input type="text" value={values.firstName} onChange={onChange}  name='firstName' required />
              </div>
              <div className="input-box">
                <span className="details">Last Name</span>
                <input type="text" value={values.lastName} onChange={onChange}  name='lastName' required />
              </div>
              
              <div className="input-box">
                <span className="details">Designation</span>
                <input type="text" value={values.designation} onChange={onChange}  name='designation' required />
              </div>
              <div className="input-box">
                <span className="details">Department</span>
                <input type="text" value={values.department} onChange={onChange} name='department' required />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input type="text" value={values.phone} onChange={onChange}  name='phone' required />
              </div>
              
             
              <div className="file-input">
                <span className="details" >Profile Photo</span>
                <input type="file" onChange = {onFileChange} ref = {fileRef}name='photo' required />
              </div>
            </div>
            <div className="form_footer">
              <button onClick={() => toogleModal(false)} type='button' className="btn btn-danger">Cancel</button>
              <button type='submit'  className="btn">Save</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
    
  );
}

export default App;  

