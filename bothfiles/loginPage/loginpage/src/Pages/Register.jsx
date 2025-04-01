import React ,{useState} from 'react'
import { Link  , useNavigate} from 'react-router-dom';
import { API_Path } from '../Helper/ApiPath';
import '../App.css'
import Overlay from '../components/Overlay'
import '@fortawesome/fontawesome-free/css/all.min.css';

const Register = () => {
    const [Name , setName] =useState("");
    const [email , setEmail] =useState("");
    const [password , setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validateForm = ()=>{
        if (Name.length<4) {
            setError("Name must be least 4 characters");
            return false;
        }
        if (!email.includes("@")) {
            setError("Please enter valid mail address");
            return false;
        }
        if(!/^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password)){
            setError("Password must be at least 6 characters, include one uppercase letter & one special character.");
            return false;
        }
        return true;

    };
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch(`${API_Path}/customer/register`,{
                method:'POST',
                headers:{ "Content-Type": "application/json"},
                body:JSON.stringify({Name, email, password})
            });

            console.log("Full API Response:", response);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message||"Registration failed.");
            }

            setName("");
            setEmail("");
            setPassword("");
            alert("Customer registered successfully!")
            navigate("/login");

        } catch (error) {
            setLoading(false);
            console.error("error" , error);
            setError(error.message)
        }
    }

  return (
    <div className='container'>
        <div className='form-container sign-up-container'>
            <form action="#" onSubmit={handleSubmit}>
                <h1>Create Account </h1>
                {error && <p className="error-message">{error}</p>}
                <div className='social-container'>
                    <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                    <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                </div>
                <span>or use your email for registration</span>
                <div className='infield'>
                    <input type='text'  placeholder="Name"  value={Name} onChange={(e)=>setName(e.target.value)} />
                    <label></label>
                </div>
                <div className='infield'>
                    <input type='email'  placeholder="email" name='email' value={email} onChange={(e)=>setEmail(e.target.value)}   />
                    <label></label>
                </div>
                <div className='infield'>
                    <input type={showPassword ? "text" : "password"}   placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <span className="eye-icon"  onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</span>
                    <label></label>
                </div>
                <button type='submit'>Sign Up</button>
            
                <p>Already have an account? <Link to="/login">Sign In</Link></p>
            </form>
        </div>
        <Overlay type="register" />
    </div>
  )
}

export default Register
