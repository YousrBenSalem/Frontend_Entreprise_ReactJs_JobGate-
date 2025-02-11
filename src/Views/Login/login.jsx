import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginError, loginRequest, loginSuccess } from '../../redux/userSlice';
import auth from '../../services/auth';

const Login = () => {
    const dispatch = useDispatch();
    const [Data , setData]= useState({email:'',password:''})
    const navigate=useNavigate()
    const OnchangeHandler = (e)=>{
    setData({...Data,[e.target.name]:e.target.value})
  } 

  const SignIn = async (event) => {
  event.preventDefault();
  try {
    dispatch(loginRequest());

    const response = await auth.SignIn(Data);
    console.log("Authentifiée avec succès :", response.data);

    const { user, tokens } = response.data;

    const itemType = user.item?.trim().toLowerCase();
    const UserStatus = user.status?.trim();
    const UserVerify = user.verify;

    console.log("Valeur normalisée de user.item :", itemType);
    console.log("Valeur normalisée de user.status :", UserStatus);
    console.log("Valeur de user.verify :", UserVerify);

    if (itemType === "entreprise" && UserVerify === true && UserVerify === "Acceptable" ) {
      alert("Authentifiée avec succès !");
      const userData = {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          verify: user.verify,
          item: user.item,
          logo: user.logo,
          description: user.description,
          webSite: user.webSite,
          secteur: user.secteur,
        
          adresse: user.adresse,
          status: user.status,
        },
        tokens: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
      };

      dispatch(loginSuccess(userData));
      navigate('/');
    }  else {
      alert("Accès refusé : Vérifiez vos informations !");
    }
  } catch (error) {
    console.error("Erreur lors de l'authentification :", error);
    dispatch(loginError(error));
    alert("Erreur lors de l'authentification.");
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
                      <h2 className="mb-2 text-white">Sign In</h2>
                      <p>Login to stay connected.</p>
                      <form onSubmit={SignIn}>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="floating-label form-group">
                              <input className="floating-input form-control" type="email" 
                              name="email"
                              placeholder=" " onChange={OnchangeHandler} />
                              <label>Email</label>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="floating-label form-group">
                              <input className="floating-input form-control" type="password" placeholder=" "
                              name="password" onChange={OnchangeHandler} />
                              <label>Password</label>
                            </div>
                          </div>
                        
                          <div className="col-lg-6 mb-3">
                            <Link to="/forgotPassword" className="text-white float-right">Forgot Password?</Link>
                          </div>
                        </div>
                        <button type="submit" className="btn btn-white">Sign In</button>
                        <p className="mt-3">
                          Create an Account <Link to="/register" className="text-white text-underline">Sign Up</Link>
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

export default Login
