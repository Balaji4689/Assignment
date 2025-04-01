import React from 'react'
import { Link } from 'react-router-dom'

const Overlay = ({ type , togglepanel}) => {
  return (
    <div className="overlay-container" id="overlayCon">
        <div className='overlay'>
            {type === "login"?(
                <div className='overlay-panel overlay-left'>
                    <h1>Welcome Back!</h1>
                    <p>To keep connected with us please login with your personal info</p>
                    <Link to="/"><button>Sign Up</button></Link>
                </div>
            ):(
                <div className='overlay-panel overlay-right'>
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <Link to="/login"><button>Sign In</button></Link>
                </div>
            )}
        </div>
    </div>
  )
}

export default Overlay

