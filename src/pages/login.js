import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    try {
      const response = await fetch('https://test.e-prathibha.com/apis/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const { status, data } = await response.json();
      console.log(status)
      console.log(data)
      if (status === 200) {
        const { Id, Token } = data;
        console.log(Id);
        console.log(Token);
        navigate('/ExamList', {
          state: {
            id: Id,
            token: Token,
          },
        });
        setEmail('');
        setPassword('');
        setSuccessMessage('');
        alert('Login successful!');
      } else {
        throw new Error('Failed to login');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className="center">
      <h2>Login to E-PRATHIBHA</h2>
      {errorMessage && <p className="successmsg">{errorMessage}</p>}
      {successMessage && <p className="successmsg">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          className="log"
          type="email"
          id="email"
          name="username"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <label htmlFor="password">Password:</label>
        <input
        className="log"
        id="password"
        type="password"
        name="password"
        value={password}
        placeholder="Enter your password"
       onChange={(e) => setPassword(e.target.value)}
       required autoComplete="current-password"/>

        <div className="button-container-log-in">
          <button type="submit">Login</button>
          <p>
          Don't have an account?{' '}
            <strong>
            <Link to="/" className="login-link">
              Register
            </Link>
            </strong>
          </p>
        </div>
      </form>
    </div>
  );
};
export default Login;
