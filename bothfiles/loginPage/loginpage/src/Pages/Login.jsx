import React , {useState} from 'react'
import { Link  , useNavigate} from 'react-router-dom'
import '../App.css'
import Overlay from '../components/Overlay'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { API_Path } from '../Helper/ApiPath';


const Login = () => {
    const [email , setEmail] =useState("");
    const [password , setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`${API_Path}/customer/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
              });
              const data = await response.json();
              console.log('API Response Data:', data);
        
        
              if (response.ok) {
                localStorage.setItem('token', data.token); 
                localStorage.setItem('isLoggedIn', true); 
                localStorage.setItem('customerName', data.customer.username);
        
                console.log('Customer logged in successfully!');
                alert("Customer logged in successfully!")
                navigate('/'); 
              } else {
                setError(data.error || 'Login failed. Please try again.');
              }
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        }
    }

  return (
<div className='container'>
        <div className='form-container sign-in-container'>
            <form action="#" onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                {error && <p className="error-message">{error}</p>}
                <div className='social-container'>
                    <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                    <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                </div>
                <span>or use your account </span>
                <div className='infield'>
                    <input type='email'  placeholder="email" name='email'  value={email} onChange={(e) => setEmail(e.target.value)}  />
                    <label></label>
                </div>
                <div className='infield'>
                    <input type={showPassword ? "text" : "password"}   placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <span className="eye-icon"  onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</span>
                    <label></label>
                </div>
                <a href="#" className="forgot">Forgot your password?</a>
                <button type="submit" >Sign In</button>
                <p>Don't have an account? <Link to="/">Sign Up</Link></p>
            </form>
        </div>
        <Overlay type="login" />
    </div>
  )
}

export default Login
