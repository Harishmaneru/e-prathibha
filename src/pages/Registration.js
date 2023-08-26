import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!password.match(passwordRegex)) {
      alert('Password must contain at least one capital letter, one special character, and be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      setTimeout(() => {
        setErrorMessage(''); 
      }, 1500)
      return;
    }
    const userData = {
      name,
      phone,
      email,
      password,
      confirmPassword,
    };
    const response = await fetch('https://test.e-prathibha.com/apis/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
        console.log(data);
    if (data.status===200) {
      const registrationCode = data.data.split('data');
      setSuccessMessage('Registration successful!');
      setTimeout(() => {
        navigate('/verifyemail', { state: { rcode: registrationCode } });
      }, 1500);
    } else {
     setErrorMessage('Error registering user');
    }
    
    setName('');
    setPhone('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

 


  return (
    <div className="center">
      <h2>Register for E-PRATHIBHA Exam Preparation!</h2>
      {successMessage && <p className="successmsg">{successMessage}</p>}
      {errorMessage && <p className="successmsg">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          className="reg"
          type="text"
          name="name"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Phone:</label>
        <input
          className="reg"
          type="tel"
          name="phone"
          value={phone}
          placeholder="Enter your Mobile Number"
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <label>Email:</label>
        <input
          className="reg"
          type="email"
          name="email"
          value={email}
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          className="reg"
          type="password"
          name="password"
          value={password}
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Confirm Password:</label>
        <input
          className="reg"
          type="password"
          name="password"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div className="button-container-reg">
          <button type="submit" className="register-button">
            Register
          </button>
          <p>
            Already have an account?{' '}
            <strong>
            <Link to="/login" className="login-link">
              Log in
            </Link>
            </strong>
          </p>
        
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
