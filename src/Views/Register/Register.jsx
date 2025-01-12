import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import entreprise from '../../services/entreprise'

const Register = () => {
    const [Data , setData]= useState()
      const OnchangeHandler = (e)=>{
    setData({...Data,[e.target.name]:e.target.value})
  }
    const navigate=useNavigate()

    const OnchangeFileHandler = (e)=>{
    setData({...Data,[e.target.name]:e.target.files[0]})
  }

  const SignUp = async (event) => {
  event.preventDefault(); 
  
  try {
    
  const formData = new FormData();
  formData.append('name', Data.name);
  formData.append('email', Data.email);
    formData.append('file', Data.file);
  formData.append('password', Data.password);
formData.append('adresse', Data.adresse);
  formData.append('webSite', Data.webSite);
    formData.append('description', Data.description);
    formData.append('secteur', Data.secteur);
  
  
    const response = await entreprise.createEntreprise(formData);
    console.log("Entreprise créée avec succès :", response.data);
    alert("Entreprise créée avec succès !");
      navigate('/verifyEmail');
  } catch (error) {
    console.error("Erreur lors de la création de l'entreprise :", error);
    alert("Erreur lors de la création de l'entreprise.");
  }
};
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
                      <h2 className="mb-2 text-white">Sign Up</h2>
                      <p>Create your JobGate account.</p>
                      <form onSubmit={SignUp} >
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="floating-label form-group">
                              <input className="floating-input form-control" type="text" 
                              name="name"
                              placeholder=" " 
                              onChange={OnchangeHandler}/>
                              <label>Name</label>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="floating-label form-group">
                              <input className="floating-input form-control" type="email" 
                              name="email"
                              placeholder=" "
                              onChange={OnchangeHandler} />
                              <label>Email</label>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="floating-label form-group">
                              <input className="floating-input form-control" type="password" 
                              name="password" placeholder=" " 
                              onChange={OnchangeHandler}/>
                              <label>Password</label>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="floating-label form-group">
                              <input className="floating-input form-control" type="text" 
                              name="adresse"
                              placeholder=" " 
                              onChange={OnchangeHandler}/>
                              <label>Adress</label>
                            </div>
                          </div>
                          
                          <div className="col-lg-6">
                            <div className="floating-label form-group">
                              <input className="floating-input form-control" type="text" 
                              name="webSite"
                              placeholder=" "
                              onChange={OnchangeHandler} />
                              <label>Web Site</label>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="floating-label form-group">
                              <input className="floating-input form-control" type="text" 
                              name="secteur"
                              placeholder=" "
                              onChange={OnchangeHandler} />
                              <label>Secteur</label>
                            </div>
                          </div>
                            
                        
                        
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="floating-label form-group">
                              <input className="floating-input form-control" type="file" 
                              name="file"
                              placeholder=" " 
                              onChange={OnchangeFileHandler}/>
                              <label>Logo</label>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="floating-label form-group">
                              <textarea
                              className="floating-input form-control"
                              name="description"
                              placeholder=" "
                              rows="2"
                              onChange={OnchangeHandler}
                            ></textarea>
                              <label>Description</label>
                            </div>
                          </div>
                        </div>
                        <button type="submit" className="btn btn-white">Sign Up</button>
                        <p className="mt-3">
                          Already have an Account <Link to="/login" className="text-white text-underline">Sign In</Link>
                        </p>
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

export default Register
