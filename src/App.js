import './App.css';
import Home from './Views/Home/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Views/Home/layout';
import Offres from './Views/Offre/offres';
import Login from './Views/Login/login';
import Register from './Views/Register/Register';
import VerifyEmail from './Views/Register/verifyEmail';
import ForgotPassword from './Views/forgetPassword/Forgot';
import ResetPasswordEmail from './Views/forgetPassword/ResetPasswordEmail';
import ResetPassword from './Views/ResetPassword/resetPassword';
import Profile from './Views/Profile/Profile';
import EditProfile from './Views/Profile/EditProfile';
import OfferDetails from './Views/Offre/offerDetails';
import AddTest from './Views/Test/addTest';
import Tests from './Views/Test/tests';
import CondidatPerOffre from './Views/condidat/CondidatPerOffre';
import CondidatDetails from './Views/condidat/CondidatDetails';
import Messages from './Views/Messages/Messages';
import Chat from './Views/Messages/Chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} >
          <Route path="/" element={<Layout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/offers" element={<Offres />}/>
          <Route path="/offerDetails/:id" element={<OfferDetails />}/>
          <Route path="/offer/test/:id" element={<AddTest />}/>
          <Route path="/tests" element={<Tests />}/>
          <Route path="/condidatPerOffre/:id" element={<CondidatPerOffre />}/>
          <Route path="/condidatDetail/:id" element={<CondidatDetails />}/>
          <Route path="/messages" element={<Messages />}/>
          <Route path="/chat/:id" element={<Chat/>} />



            

        </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
            <Route path="/verifyEmail" element={<VerifyEmail />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/forgotPasswordEmail" element={< ResetPasswordEmail/>} />
            <Route path="/reset/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  
  );
}

export default App;
