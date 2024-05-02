import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Components/Header";

function Login() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/users/login", loginDetails)
      .then((response) => {
        console.log(response);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setShowErrorMessage(true);
      });
    console.log(loginDetails);
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-4">Login</h2>
                <form>
                  <div className="form-group mb-3">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      name="email"
                      value={loginDetails.email}
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
                      value={loginDetails.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 btn-block"
                      onClick={handleFormSubmit}
                    >
                      Login
                    </button>
                    <p className="mt-3">
                      Don't have an account?{" "}
                      <Link to="/register">Register</Link>
                    </p>
                    {showErrorMessage && (
                      <p className="alert alert-danger">
                        Invalid email or password
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
