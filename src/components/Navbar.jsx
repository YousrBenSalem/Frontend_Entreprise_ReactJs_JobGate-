import React from 'react'
import {  useSelector } from 'react-redux'
import auth from "../services/auth"
import { Link  , useNavigate} from 'react-router-dom'

const Navbar = () => {
    const {user} = useSelector((state) => state.auth)
    
    const navigate = useNavigate()

    const logo=user.logo ;
    console.log("logo",logo)


  const logOut=async()=>{
 

   const token=localStorage.getItem('persist:token') ?JSON.parse(localStorage.getItem('persist:token')).tokens :null
   const Token = JSON.parse(token)
   const refreshToken = Token?.refreshToken ;
   console.log("refresh token",refreshToken)
    if(!token){
      console.log('not access token found to logout')
      return
    }

console.log('Refresh token:', refreshToken);
    try {

      await auth.logOut(refreshToken);
      console.log('Logout successful');
      alert('Logout successful')
    
      localStorage.removeItem('persist:token'); 
      
        navigate( '/login')
      
    } catch (error) {
      console.error('Logout failed:', error);
    } 


  }
  return (
    <div>
      <div className="iq-top-navbar">
      <div className="iq-navbar-custom">
        <nav className="navbar navbar-expand-lg navbar-light p-0">
          <div className="iq-navbar-logo d-flex align-items-center justify-content-between">
            <i className="ri-menu-line wrapper-menu" />
            <a href="../backend/index.html" className="header-logo">
              <h4 className="logo-title text-uppercase">JobGate</h4>
            </a>
          </div>
          <div className="navbar-breadcrumb">
            <h5>Dashboard</h5>
          </div>
          <div className="d-flex align-items-center">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-label="Toggle navigation">
              <i className="ri-menu-3-line" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto navbar-list align-items-center">
                
            
                <li className="nav-item nav-icon nav-item-icon dropdown">
                  <a href="#" className="search-toggle dropdown-toggle" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z">
                      </path>
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span className="bg-primary" />
                  </a>
                  <div className="iq-sub-dropdown dropdown-menu" aria-labelledby="dropdownMenuButton2">
                    <div className="card shadow-none m-0">
                      <div className="card-body p-0 ">
                        <div className="cust-title p-3">
                          <div className="d-flex align-items-center justify-content-between">
                            <h5 className="mb-0">All Messages</h5>
                            <a className="badge badge-primary badge-card" href="#">3</a>
                          </div>
                        </div>
                        <div className="px-3 pt-0 pb-0 sub-card">
                          <a href="#" className="iq-sub-card">
                            <div className="media align-items-center cust-card py-3 border-bottom">
                              <div className>
                                <img className="avatar-50 rounded-small" src="../assets/images/user/01.jpg" alt={0o1} />
                              </div>
                              <div className="media-body ml-3">
                                <div className="d-flex align-items-center justify-content-between">
                                  <h6 className="mb-0">Emma Watson</h6>
                                  <small className="text-dark"><b>12 : 47 pm</b></small>
                                </div>
                                <small className="mb-0">Lorem ipsum dolor sit amet</small>
                              </div>
                            </div>
                          </a>
                          <a href="#" className="iq-sub-card">
                            <div className="media align-items-center cust-card py-3 border-bottom">
                              <div className>
                                <img className="avatar-50 rounded-small" src="../assets/images/user/02.jpg" alt={0o2} />
                              </div>
                              <div className="media-body ml-3">
                                <div className="d-flex align-items-center justify-content-between">
                                  <h6 className="mb-0">Ashlynn Franci</h6>
                                  <small className="text-dark"><b>11 : 30 pm</b></small>
                                </div>
                                <small className="mb-0">Lorem ipsum dolor sit amet</small>
                              </div>
                            </div>
                          </a>
                          <a href="#" className="iq-sub-card">
                            <div className="media align-items-center cust-card py-3">
                              <div className>
                                <img className="avatar-50 rounded-small" src="../assets/images/user/03.jpg" alt={0o3} />
                              </div>
                              <div className="media-body ml-3">
                                <div className="d-flex align-items-center justify-content-between">
                                  <h6 className="mb-0">Kianna Carder</h6>
                                  <small className="text-dark"><b>11 : 21 pm</b></small>
                                </div>
                                <small className="mb-0">Lorem ipsum dolor sit amet</small>
                              </div>
                            </div>
                          </a>
                        </div>
                        <Link className="right-ic btn btn-primary btn-block position-relative p-2" to="/messages" role="button">
                          View All
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item nav-icon nav-item-icon dropdown">
                  <a href="#" className="search-toggle dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                    <span className="bg-primary " />
                  </a>
                  <div className="iq-sub-dropdown dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div className="card shadow-none m-0">
                      <div className="card-body p-0 ">
                        <div className="cust-title p-3">
                          <div className="d-flex align-items-center justify-content-between">
                            <h5 className="mb-0">Notifications</h5>
                            <a className="badge badge-primary badge-card" href="#">3</a>
                          </div>
                        </div>
                        <div className="px-3 pt-0 pb-0 sub-card">
                          <a href="#" className="iq-sub-card">
                            <div className="media align-items-center cust-card py-3 border-bottom">
                              <div className>
                                <img className="avatar-50 rounded-small" src="../assets/images/user/01.jpg" alt={0o1} />
                              </div>
                              <div className="media-body ml-3">
                                <div className="d-flex align-items-center justify-content-between">
                                  <h6 className="mb-0">Emma Watson</h6>
                                  <small className="text-dark"><b>12 : 47 pm</b></small>
                                </div>
                                <small className="mb-0">Lorem ipsum dolor sit amet</small>
                              </div>
                            </div>
                          </a>
                          <a href="#" className="iq-sub-card">
                            <div className="media align-items-center cust-card py-3 border-bottom">
                              <div className>
                                <img className="avatar-50 rounded-small" src="../assets/images/user/02.jpg" alt={0o2} />
                              </div>
                              <div className="media-body ml-3">
                                <div className="d-flex align-items-center justify-content-between">
                                  <h6 className="mb-0">Ashlynn Franci</h6>
                                  <small className="text-dark"><b>11 : 30 pm</b></small>
                                </div>
                                <small className="mb-0">Lorem ipsum dolor sit amet</small>
                              </div>
                            </div>
                          </a>
                          <a href="#" className="iq-sub-card">
                            <div className="media align-items-center cust-card py-3">
                              <div className>
                                <img className="avatar-50 rounded-small" src="../assets/images/user/03.jpg" alt={0o3} />
                              </div>
                              <div className="media-body ml-3">
                                <div className="d-flex align-items-center justify-content-between">
                                  <h6 className="mb-0">Kianna Carder</h6>
                                  <small className="text-dark"><b>11 : 21 pm</b></small>
                                </div>
                                <small className="mb-0">Lorem ipsum dolor sit amet</small>
                              </div>
                            </div>
                          </a>
                        </div>
                        <a className="right-ic btn btn-primary btn-block position-relative p-2" href="#" role="button">
                          View All
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item nav-icon dropdown caption-content">
                  <a href="#" className="search-toggle dropdown-toggle  d-flex align-items-center" id="dropdownMenuButton4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src={logo ? `http://localhost:3000/file/${logo}` : "../assets/images/user/1.jpg"} className="img-fluid rounded-circle" alt="user" />
                    <div className="caption ml-3">
                      <h6 className="mb-0 line-height">{user.name}<i className="las la-angle-down ml-2" /></h6>
                    </div>
                  </a>                            
                  <ul className="dropdown-menu dropdown-menu-right border-none" aria-labelledby="dropdownMenuButton">
                    <li className="dropdown-item d-flex svg-icon">
                      <svg className="svg-icon mr-0 text-primary" id="h-01-p" width={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <Link to="/profile">My Profile</Link>
                    </li>
                    <li className="dropdown-item d-flex svg-icon">
                      <svg className="svg-icon mr-0 text-primary" id="h-02-p" width={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <Link to="/editProfile">Edit Profile</Link>
                    </li>
                  
                    <li className="dropdown-item  d-flex svg-icon border-top">
                      <svg className="svg-icon mr-0 text-primary" id="h-05-p" width={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                       <button
    className="btn ml-2 "
    style={{ textDecoration: 'none' }}
    onClick={() => logOut()}
  >
    Logout
  </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>  
    </div>
  )
}

export default Navbar
