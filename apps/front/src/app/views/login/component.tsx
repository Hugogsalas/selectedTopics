import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectToken } from '../../redux/auth/slice';
import { login } from '../../services/login';
import './styles.scss';

const Login = () => {
  const token = useSelector(selectToken);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    navigate('/dashboard/usuarios');
  }, [token, navigate]);

  const handleSubmit = async () => {
    await login({
      email,
      clave: password,
    });

    navigate('/dashboard/usuarios');
  };

  return (
    <div className="login-container">
      <div>
        <div className="input-container">
          <label className="login-label" htmlFor="Email">
            Email:
          </label>
          <br />
          <input
            className="login-input"
            type="email"
            id="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="input-container">
          <label className="login-label" htmlFor="password">
            Password:
          </label>
          <br />
          <input
            className="login-input"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className="button-container">
          <button className="login-button" onClick={handleSubmit}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
