import { useState } from 'react';
import { AuthService } from '../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailedMessage, setLoginFailedMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { statusCode, token } = await new AuthService().getLoginToken({
        email,
        password,
      });

      if (token) {
        localStorage.setItem('JWT', token);
        window.location.href = '/';
        return;
      }

      if (statusCode === 401) {
        setLoginFailedMessage('Incorrect credentials. Please try again.');
        return;
      }

      setLoginFailedMessage('Something went wrong. Please try again later.');
    } catch (error) {
      setLoginFailedMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <article className="loginComponent">
      <form className="loginForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <p>{loginFailedMessage}</p>
        <button type="submit" className="loginButton">
          Login
        </button>
      </form>
    </article>
  );
};

export default Login;
