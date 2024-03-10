import Reac, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { getEmployee } from "../api/EmployeeService";
import QRCode from 'qrcode.react';

const EmployeeDetails = ({ updateEmployee, updatePhoto }) => {

  
  const inputRef = useRef();
  const [employee, setEmployee] = useState({
    id : "",
    firstName: "",
    lastName: "",
    designation: "",
    department: "",
    phone: "",
    photoUrl: "",
  });

  const { id } = useParams();

  const fetchEmployee = async (id) => {
    try {
      const { data } = await getEmployee(id);
      setEmployee(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const selectImage = () => {
    inputRef.current.click();
  };

  const updateImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("id", id);
      await updatePhoto(formData);
      setEmployee((prev) => ({
        ...prev,
        photoUrl: `${prev.photoUrl}?updated_at=${new Date().getTime()}`,
      }));
      console.log("data");
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event) =>{
    setEmployee({...employee,[event.target.name] : event.target.value})
  };

  const onUpdateEmployee = async (event) => {
      event.preventDefault();
      await updateEmployee(employee);
      fetchEmployee(id);
  }

  useEffect(() => {
    fetchEmployee(id);
  }, []);

  return (
    <>
      <Link to={"/"} className="link">
        <i className="bi bi-arrow-left">Back to list</i>
      </Link>

      <div className="profile">
        <div className="profile__details">
          <img
            src={employee.photoUrl}
            alt={`profile photo of ${employee.firstName}`}
          />
          <div className="profile__metadata">
            <p className="profile__name">{`${employee.firstName}  ${employee.lastName}`}</p>
            <p className="profile__muted">JPG, GIF or PNG Max size of 10MB</p>
            <button onClick={selectImage} className="btn">
              <i className="bi bi-cloud-upload"></i>Change Photo
            </button>
          </div>
        </div>

        <div className="profile__settings">
          <div>
            <form onSubmit = {onUpdateEmployee} className="form">
              <div className="user-details">
                <input type="hidden" name="id" defaultValue={employee.id}  required />
                <div className="input-box">
                  <span className="details">First Name</span>
                  <input type="text" name="firstName" value={employee.firstName} onChange={onChange} required />
                </div>

                <div className="input-box">
                  <span className="details">Last Name</span>
                  <input type="text" name="lastName" value={employee.lastName} onChange={onChange} required />
                </div>

                <div className="input-box">
                  <span className="details">Designation</span>
                  <input type="text" name="designation" value={employee.designation} onChange={onChange} required />
                </div>

                <div className="input-box">
                  <span className="details">Department</span>
                  <input type="text" name="department" value={employee.department} onChange={onChange} required />
                </div>

                <div className="input-box">
                  <span className="details">Phone Number</span>
                  <input type="text" name="phone" value={employee.phone} onChange={onChange} required />
                </div>
              </div>

              <div className="form_footer">
                <button type="submit" className="btn">Save</button>
              </div>
            </form>

            <div className="qr-code">
        
      </div>
          </div>
        </div>
      </div>

      <form style={{ display: "none" }} action="">
        <input
          type="file"
          ref={inputRef}
          onChange={(event) => updateImage(event.target.files[0])}
          name="file"
          accept="image/*"
        />
      </form>
    </>
  );
};

export default EmployeeDetails;
