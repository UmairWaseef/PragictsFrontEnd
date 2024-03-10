import React from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';

const Employee = ({ employee }) => {

    const location = window.location; // Use window.location instead of useLocation
    const employeeLink = `${location.origin}/employees/${employee.id}`;
  return (
    <>
    <Link to={`/employees/${employee.id}`} className="contact__item">
      <div className="contact__header">
        <div className="contact__image">
          <img src={employee.photoUrl} alt={employee.lastName} />
        </div>
        <div className="contact__details">
          <p className="contact_name">{`${employee.firstName} ${employee.lastName}`.substring(0, 15)} </p>
          <p className="contact_title">{employee.designation}</p>
        </div>
      </div>
      <div className="contact__body">
        <p><i className="bi bi-briefcase-fill"></i> {employee.department} </p>
        <p><i className="bi bi-telephone"></i> {employee.phone}</p>
      </div>
    </Link>

    <div className="qr-code">
        <QRCode value={employeeLink} />
      </div>
    </>
    
  );
}

export default Employee;
