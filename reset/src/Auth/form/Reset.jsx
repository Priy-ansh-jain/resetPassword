import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCheck, FaExclamationCircle } from "react-icons/fa";
import "./reset.css";

const Reset = () => {
  const { token } = useParams(); // Get the token from the URL

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(null);
  const [passwordMatchError, setPasswordMatchError] = useState("");

  // useEffect(() => {
  //   console.log("Token from URL:", token);

  // }, [token]);

  const handleReset = (e) => {
    e.preventDefault();


    // Reset error messages
    setPasswordMatchError("");

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setPasswordMatchError("Passwords do not match");
      setResetSuccess(null); // Reset state to null
      return;
    }

    // Use the token from the URL in the request
    fetch(`http://3.105.157.31/api/resetPassword?token=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: newPassword,
        confirmPassword: confirmPassword,
      }),
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          setResetSuccess(true); // Reset successful
        } else if (response.status === 400) {
          setResetSuccess(false); // Reset not successful
        }
         else {
          console.log(response)
          throw new Error(`Network response was not ok - ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Handle successful reset, e.g., redirect or display a success message
      })
      .catch((error) => {
        console.error("Error:", error.message);
        setResetSuccess(false); // Reset not successful
        // Handle error, e.g., display an error message to the user
      });
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <section className="Signin">
      <div className="Sign_in_page" id="Sign-in">
        <div className="create">
          <h1>Reset Password</h1>
        </div>

        <form className="signin_form" onSubmit={handleReset}>
          <div className="first_form_part">
            <label htmlFor="Email">New Password</label>
            <div className="password_input">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {showNewPassword ? (
                <FaEyeSlash
                  className="eye"
                  onClick={toggleNewPasswordVisibility}
                />
              ) : (
                <FaEye
                  className="eye"
                  onClick={toggleNewPasswordVisibility}
                />
              )}
            </div>
            <br />
            <label htmlFor="pwd">Confirm Password</label>
            <div className="password_input">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="pwd"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {showConfirmPassword ? (
                <FaEyeSlash
                  className="eye"
                  onClick={toggleConfirmPasswordVisibility}
                />
              ) : (
                <FaEye
                  className="eye"
                  onClick={toggleConfirmPasswordVisibility}
                />
              )}
            </div>
            {passwordMatchError && (
              <div className="error-message">
                <FaExclamationCircle /> {passwordMatchError}
              </div>
            )}
            {resetSuccess === true ? (
              <div className="success-message">
                <FaCheck /> Reset successful
              </div>
            ) : resetSuccess === false ? (
              <div className="error-message">
                <FaExclamationCircle /> Reset not successful
              </div>
            ) : null}

            <div className="create_butt2">
              <button type="submit">Reset</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Reset;
