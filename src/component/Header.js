import React from 'react'

const Header = ({toogleModal, noOfEmployee}) => {
  return (
    <header className='header'>
        <div className="container">
            <h3> Employee List({noOfEmployee}) </h3>
            <button onClick={()=>toogleModal(true)} className='btn'>
                <i className='bi bi-plus-square'></i> Add New Employee
            </button>
        </div>
    </header>
  )
}

export default Header