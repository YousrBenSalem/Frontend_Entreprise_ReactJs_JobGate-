import React, { useEffect, useState } from 'react'
import entreprise from '../../services/entreprise';
import auth from '../../services/auth';
import { Link } from 'react-router-dom';

const EditProfile = () => {
    const [Data , setData] = useState();
      const [Pass , setPass]= useState({})
          const [Id , setId] = useState();

      useEffect(()=>{
  const localstorageData=JSON.parse(localStorage.getItem('persist:token')) 
    const entrerpise=JSON.parse(localstorageData?.user)
        const entrerpiseId = entrerpise?.id

console.log(entrerpiseId)
setId(entrerpiseId)
  },[])

        const getEntrepriseById =async ()=>{
      try {
            const localstorageData=JSON.parse(localStorage.getItem('persist:token'));
            const entrerpise=JSON.parse(localstorageData?.user)
      const id=entrerpise?.id
      console.log("id entreprise" , id)
;
        const response = await entreprise.getEntrepriseById(id);
        setData(response.data.entreprise);
        console.log("Entreprise recupérée avec succès :", response.data.entreprise);
    } catch (error) {
      console.error("Erreur lors de la récupération d'entreprise :", error);
    }
  }
    useEffect(() => {
    getEntrepriseById(Id)
  },[])

      const OnchangeHandler =(e)=>{
    setData({...Data,[e.target.name]:e.target.value})
  }

      const OnchangeHandler1 =(e)=>{
    setPass({...Pass,[e.target.name]:e.target.value}) 
  }
      const OnchangeFileHandler = (e)=>{
    setData({...Data,[e.target.name]:e.target.files[0]})
  }
    const updateEntreprise = async (event) =>{
  event.preventDefault();
  try {
    const formData = new FormData();
formData.append('name', Data.name);

  formData.append('email', Data.email);
  formData.append('description', Data.description);
formData.append('webSite', Data.webSite);
  formData.append('secteur', Data.secteur);
  
    formData.append('adresse', Data.adresse);
    if(Data?.file){
      formData.append('file', Data?.file);
    }else{
      formData.append('logo', Data.logo);
    }
const id = Data._id;
    const response = await entreprise.updateEntreprise(id , formData);
      console.log("Entreprise modifée avec succès :", response.data);
    alert("Entreprise modifée avec succès !");
    //mettre a jour local storage
    const updateEntreprise  = response.data.updatedEntreprise;
    const localStorageData= JSON.parse(localStorage.getItem('persist:token'));
      if (localStorageData) {
    let userData = JSON.parse(localStorageData.user);

  
    userData = { ...userData, ...updateEntreprise };

    localStorageData.user = JSON.stringify(userData);
    localStorage.setItem('persist:token', JSON.stringify(localStorageData));
}
    getEntrepriseById(id)
  } catch (error) {
      console.error("Erreur lors de la modification de l'Entreprise :", error);
    alert("Erreur lors de la modification de l'Entreprise.");
  }
}

        const  UpdatePass = async (event)=>{
    event.preventDefault();
      try {
        
      
  
    const response = await auth.UpdatePass(Id , Pass);
    console.log("mot de passe changé avec succés :", response.data);
    alert("mot de passe changé avec succés");
  } catch (error) {
    console.error("Erreur lors de changement de mot de passe :", error);
    alert("Erreur lors de changement de mot de passe .");
  }
  }
  return (
  <div>
  <div className="content-page">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body p-0">
              <div className="iq-edit-list usr-edit">
                <ul className="iq-edit-profile d-flex nav nav-pills">
                  <li className="col-md-6 p-0">
                    <a className="nav-link active" data-toggle="pill" href="#personal-information">
                      Personal Information
                    </a>
                  </li>
                  <li className="col-md-6 p-0">
                    <a className="nav-link" data-toggle="pill" href="#chang-pwd">
                      Change Password
                    </a>
                  </li>
              
                
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="iq-edit-list-data">
            <div className="tab-content">
              <div className="tab-pane fade active show" id="personal-information" role="tabpanel">
                <div className="card">
                  <div className="card-header d-flex justify-content-between">
                    <div className="iq-header-title">
                      <h4 className="card-title">Personal Information</h4>
                    </div>
                  </div>
                  <div className="card-body">
                    <form onSubmit={updateEntreprise} encType="multipart/form-data">
                      <div className="form-group row align-items-center">
                        <div className="col-md-12">
                          <div className="profile-img-edit">
                            <div className="crm-profile-img-edit">
                              <img className="crm-profile-pic rounded-circle avatar-100" src={Data?.logo ? `http://localhost:3000/file/${Data?.logo}` :"../assets/images/user/11.png" }alt="profile-pic" />
                              <div className="crm-p-image bg-primary">
                                <i className="las la-pen upload-button" />
                                <input className="file-upload" type="file" 
                                name="file"
                                accept="image/*"
                                onChange={OnchangeFileHandler} />
                              </div>
                            </div>                                          
                          </div>
                        </div>
                      </div>
                      <div className=" row align-items-center">
                        <div className="form-group col-sm-6">
                          <label htmlFor="fname"> Name:</label>
                          <input type="text" className="form-control" id="fname" 
                          name="name"
                          value={Data?.name}
                          onChange={OnchangeHandler} />
                        </div>
                        <div className="form-group col-sm-6">
                          <label htmlFor="lname"> Email:</label>
                          <input type="text" className="form-control" id="lname" name="email"
                          value={Data?.email}
                          onChange={OnchangeHandler} />
                        </div>
                        <div className="form-group col-sm-6">
                          <label htmlFor="uname"> Web Site:</label>
                          <input type="text" className="form-control" id="uname" value={Data?.webSite} 
                          
                          onChange={OnchangeHandler}
                          name="webSite"
                          />
                        </div>
                        <div className="form-group col-sm-6">
                          <label htmlFor="cname">Secteur:</label>
                          <input type="text" 
                          name="secteur"
                          className="form-control" id="cname" value={Data?.secteur}
                          onChange={OnchangeHandler} />
                        </div>
                          <div className="form-group col-sm-6">
                          <label htmlFor="cname">Address:</label>
                          <input type="text" className="form-control" 
                          name="adresse"id="cname" value={Data?.adresse}
                          onChange={OnchangeHandler} />
                        </div>
                      

                        <div className="form-group col-sm-12">
                          <label>Description:</label>
                          <textarea className="form-control" name="description" rows={3} style={{lineHeight: 5}} value= {Data?.description}
                          onChange={OnchangeHandler}/>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary mr-2">Submit</button>
                      <button type="reset" className="btn iq-bg-danger">Cancel</button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="chang-pwd" role="tabpanel">
                <div className="card">
                  <div className="card-header d-flex justify-content-between">
                    <div className="iq-header-title">
                      <h4 className="card-title">Change Password</h4>
                    </div>
                  </div>
                  <div className="card-body">
                    <form onSubmit={UpdatePass}>
                      <div className="form-group">
                        <label htmlFor="cpass">Current Password:</label>
                        <Link to="/forgotPassword" className="float-right">Forgot Password</Link>
                        <input type="Password" className="form-control" id="cpass" 
                        name="oldPassword" defaultValue
                        onChange={OnchangeHandler1} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="npass">New Password:</label>
                        <input type="Password" className="form-control" id="npass"
                        name="newPassword"  onChange={OnchangeHandler1}  defaultValue />
                      </div>
                      <div className="form-group">
                        <label htmlFor="vpass">Verify Password:</label>
                        <input type="Password" className="form-control" id="vpass"
                        name="verifyNewPassword"  defaultValue />
                      </div>
                      <button type="submit" className="btn btn-primary mr-2">Submit</button>
                      <button type="reset" className="btn iq-bg-danger">Cancel</button>
                    </form>
                  </div>
                </div>
              </div>
          
            
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default EditProfile
