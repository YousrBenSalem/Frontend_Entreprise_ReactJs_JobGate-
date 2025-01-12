import React, { useState } from 'react'
import auth from '../../services/auth'
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
      const navigate=useNavigate()

        const [Email , setEmail]= useState({email:''})
  const OnchangeHandler = (e)=>{
    setEmail({...Email,[e.target.name]:e.target.value})
  } 
    const  Forgot = async (event)=>{
    event.preventDefault();
      try {
  
    const response = await auth.Forgot(Email);
    console.log("Check your email :", response.data);
    alert("Check your email !");
    navigate('/forgotPasswordEmail')
  } catch (error) {
    console.error("Erreur lors de changement de mot de passe :", error);
    alert("Erreur lors de changement de mot de passe .");
  }
  }
  return (
<div>
  <div className="wrapper">
    <section className="login-content">
      <div className="container">
        <div className="row align-items-center justify-content-center height-self-center">
          <div className="col-lg-8">
            <div className="card auth-card">
              <div className="card-body p-0">
                <div className="d-flex align-items-center auth-content">
                  <div className="col-lg-6 bg-primary content-left">
                    <div className="p-3">
                      <h2 className="mb-2 text-white">Reset Password</h2>
                      <p>Enter your email address and we'll send you an email with instructions to reset your password.</p>
                      <form onSubmit={Forgot}>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="floating-label form-group">
                              <input className="floating-input form-control" type="email" 
                              name="email"
                              placeholder=" "
                              onChange={OnchangeHandler}
                               />
                              <label>Email</label>
                            </div>
                          </div>
                        </div>
                        <button type="submit" className="btn btn-white">Reset</button>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 content-right">
                    <img src="../assets/images/login/01.png" className="img-fluid image-right" alt />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>

  )
}

export default ForgotPassword
