import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(userDetails);
    axios
      .post("http://localhost:5000/api/users/register", userDetails)
      .then((response) => {
        console.log(response);
        toast("You registered successfully, Please Login");
        setUserDetails({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        setShowSuccessMessage(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Sign Up</h2>
              <form>
                <div className="form-group mb-3">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Enter your first name"
                    name="firstName"
                    value={userDetails.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter your last name"
                    name="lastName"
                    value={userDetails.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    name="password"
                    value={userDetails.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    onClick={handleFormSubmit}
                    disabled={
                      !userDetails.firstName ||
                      !userDetails.lastName ||
                      !userDetails.email ||
                      !userDetails.password
                    }
                    className="btn btn-primary w-100 btn-block"
                  >
                    Sign Up
                  </button>
                  <ToastContainer />
                  {showSuccessMessage && <p className="alert alert-success">
                    You have registered successfully, Please{" "}
                    <Link to="/login">Login</Link>
                  </p>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
