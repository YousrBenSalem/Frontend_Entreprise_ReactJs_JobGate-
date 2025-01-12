  import React, { useState } from 'react'
import auth from '../../services/auth'
import { useNavigate, useParams } from 'react-router-dom';


const ResetPassword = () => {
    const {token} = useParams();
  const navigate = useNavigate()
  const [Password , setPassword]= useState({password:''})
  const [ConfirmPass , setConfirmPass]= useState()

        const  Reset = async (event)=>{
    event.preventDefault();
      try {
        if(Password !== ConfirmPass ){
          alert('Password and Confirm Password should be same')
        }
  
    const response = await auth.Reset(Password, token);
    console.log("mot de passe changé avec succés :", response.data);
    alert("mot de passe changé avec succés");
    navigate('/login')
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
                  
                      <form onSubmit={Reset} >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="floating-label form-group">
                              <input className="floating-input form-control" type="password" 
                              name="password"
                              placeholder=" "
                              onChange={(e)=>setPassword(e.target.value)}
                            
                               />
                              <label>Password</label>
                            </div>
                          </div>
                            <div className="col-lg-12">
                            <div className="floating-label form-group">
                              <input className="floating-input form-control" type="password" 
                              name="password"
                              placeholder=" "
                               onChange={(e)=>{setConfirmPass(e.target.value)}}
                            
                               />
                              <label>Confirm Password</label>
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

export default ResetPassword
