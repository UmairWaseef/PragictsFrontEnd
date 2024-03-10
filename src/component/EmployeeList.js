import React from 'react'
import Employee from './Employee'
import { deleteEmployee } from '../api/EmployeeService'

const EmployeeList = ({data, currentPage, getAllContacts}) => {
  

  const hanndleDeleteEmployee =async (id) =>{
    try {
      await deleteEmployee(id); // Call the deleteEmployee function with the employee id
      getAllContacts(); // Refresh the employee list after deletion
    } catch (error) {
      console.log(error);
    }
  }

  
  return (
    <main className='main'>
        {data?.content?.length === 0 && <div>No Employees. Please add a new Employee</div>}

       
        <ul className='contact__list'>
        {data?.content?.length > 0 && data.content.map(contact => (
          <li key={contact.id} className="contact__item">
            <Employee employee={contact} />
            <button className='delete-btn' onClick={()=>{hanndleDeleteEmployee(contact.id)}}>Delete</button>
          </li>
        ))}
      </ul>

        {data?.content?.length > 0 && data?.totalPages > 1 &&
        <div className="pagination">
            <a onClick={() => getAllContacts(currentPage - 1)} className={0 === currentPage ? 'diasble' : ''}> &laquo;</a>



            { data && [...Array(data.totalPages).keys()].map((page, index) =>
            <a onClick={()=>getAllContacts(page)} className={currentPage === page ? 'active' : ''} key={page}> {page+1} </a>)}

            

            <a onClick={() => getAllContacts(currentPage +1 )} className={data.totalPages === currentPage +1 ? 'disable' : ''}> &raquo;</a>
        </div>
        }

    </main>
  )
}

export default EmployeeList