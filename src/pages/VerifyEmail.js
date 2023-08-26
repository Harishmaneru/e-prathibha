import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [regCode, setRegCode] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const location = useLocation();
  const code = location.state ? location.state.rcode : "";
  const navigate = useNavigate();

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        alert('Email verified successfully!')
        navigate("/login");
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [successMessage, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await check();
  };

  const check = async () => {
    try {
      const response = await fetch(
        "https://test.e-prathibha.com/apis/verifyEmail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reg_code: regCode }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (data.status === 200) {
        setSuccessMessage("Email verified successfully!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Email Validation:</h2>
  
      <div id="codeid" className="codeid">
        {code && code[code.length - 1]}
      </div>
      <br />
      <input
        className="reg"
        type="text"
        placeholder="Enter the code"
        value={regCode}
        onChange={(e) => setRegCode(e.target.value)}
      />
      <div className="button-container-verify">
        <button type="submit">Verify Email</button>
        <button type="button" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
      
    </form>
  );
};

export default VerifyEmail;
