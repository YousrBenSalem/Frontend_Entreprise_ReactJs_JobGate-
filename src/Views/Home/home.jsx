import React from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Outlet } from 'react-router-dom'

const home = () => {
  return (
<div>
  {/* loader Start */}
{/*   <div id="loading">
    <div id="loading-center">
    </div>
  </div> */}
  {/* loader END */}
  {/* Wrapper Start */}
    
  <div className="wrapper">
     <Sidebar/>
    <Navbar/>

    <Outlet/>
  </div>
  {/* Wrapper End*/}
  {/* Modal list start */}
 
 

  <Footer/>
</div>

  )
}

export default home
