import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import condidat from '../../services/condidat';

const CondidatDetails = () => {
  const {id}= useParams();
  const [Condidat, setCondidat] = useState({});
  const getCondidatById = async ()=>{
    try {
          const response = await condidat.getCondidatById(id);
    setCondidat(response.data.condidat);

console.log("condidat recupéré avec succès :", response.data.condidat);

      
    } catch (error) {
      console.error("Erreur lors de la récupération de condidat :", error);
      
    }

  }
useEffect(() => {
    getCondidatById(id)
},[])
  return (
<div classname="wrapper">
  <div className="content-page">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="card car-transparent">
            <div className="card-body p-0">
              <div className="profile-image position-relative">
                <img src="../assets/images/page-img/profile.png" className="img-fluid rounded w-100" alt="profile-image" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row m-sm-0 px-3">            
        <div className="col-lg-4 card-profile">
          <div className="card card-block card-stretch card-height">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="profile-img position-relative">
                  <img src="../assets/images/user/1.jpg" className="img-fluid rounded avatar-110" alt="profile-image" />
                </div>
                <div className="ml-3">
                  <h4 className="mb-1">{Condidat?.name} {Condidat?.prenom}</h4>
                  <p className="mb-2">{Condidat?.job}</p>
                  <a href="#" className="btn btn-primary font-size-14">Contact</a>
                </div>
              </div>
              <p>
                {Condidat?.description}
              </p>
              <ul className="list-inline p-0 m-0">
                <li className="mb-2">
                  <div className="d-flex align-items-center">
                    <svg className="svg-icon mr-3" height={16} width={16} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="mb-0">                {Condidat?.adresse}
</p>   
                  </div>
                </li>
                <li className="mb-2">
                  <div className="d-flex align-items-center">
                    <svg className="svg-icon mr-3" height={16} width={16} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p className="mb-0"> {Condidat?.currentWorkplace}</p>   
                  </div>
                </li>
                <li className="mb-2">
                  <div className="d-flex align-items-center">
                    <svg className="svg-icon mr-3" height={16} width={16} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                    </svg>
                    <p className="mb-0">{Condidat?.dateNaissance}</p>   
                  </div>
                </li>
                <li className="mb-2">
                  <div className="d-flex align-items-center">
                    <svg className="svg-icon mr-3" height={16} width={16} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <p className="mb-0">{Condidat?.telephone}</p>   
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center">
                    <svg className="svg-icon mr-3" height={16} width={16} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p className="mb-0">{Condidat?.email}</p>   
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-8 card-profile">
          <div className="card card-block card-stretch card-height">
            <div className="card-body">
              <ul className="d-flex nav nav-pills mb-3 text-center profile-tab" id="profile-pills-tab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active show" data-toggle="pill" href="#profile1" role="tab" aria-selected="false">Skills</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="pill" href="#profile2" role="tab" aria-selected="false">Personal Information</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="pill" href="#profile3" role="tab" aria-selected="false">Education</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="pill" href="#profile4" role="tab" aria-selected="false">Experience</a>
                </li>
              
              </ul>
              <div className="profile-content tab-content">
                <div id="profile1" className="tab-pane fade active show">
  <div className="row">
    <div className="col-lg-6">
      <ul className="list-inline p-0 m-0">
        {Condidat?.skills?.map((skill, index) => (
          <li className="mb-4" key={index}>
            <div className="d-flex align-items-center pt-2">
              <div className="ml-3 w-100">
                <div className="media align-items-center justify-content-between">
                  <p className="mb-0">{skill.nom}</p>
                  <h6>{skill.niveauRequis}</h6> {/* Affiche le niveau requis de la compétence */}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>

                <div id="profile2" className="tab-pane fade">
                  <div className="row">
                    <div className="col-lg-4">
  <div className="card card-block card-stretch mb-0">
    <div className="card-header px-4">
      <div className="header-title">
        <h4 className="card-title">Personal Skills</h4>
      </div>
    </div>
    <div className="card-body p-4">
      {Condidat?.personalSkills?.map((skill, index) => (
        <div
          key={index}
          className={`p-2 rounded w-100 mb-3 ${
            index % 2 === 0 ? "bg-warning" : "bg-info"
          }`} // Alterne la couleur de fond pour chaque élément
        >
          <div className="d-flex align-items-center">
            <span className="skill-number">{index + 1}.</span>
            <p className="mb-0">{skill.nom}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

                    <div className="col-lg-8">
                    
                    <div className="row">
  <div className="col-xl-6 col-lg-12">
    <div className="card card-block card-stretch mb-0">
      <div className="card-header px-3">
        <div className="header-title">
          <h4 className="card-title">Languages</h4>
        </div>
      </div>
      <div className="card-body p-3">
        <ul className="list-inline p-0 mb-0">
          {Condidat?.languages?.map((language, index) => (
            <li key={index}>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <p className="mb-0 font-size-16 mr-3">{language?.name}</p>
                <h6>{language?.proficiency}%</h6>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  <div className="col-xl-6 col-lg-12">
    <div className="card card-block card-stretch mb-0">
      <div className="card-header px-3">
        <div className="header-title">
          <h4 className="card-title">Social</h4>
        </div>
      </div>
      <div className="card-body p-3">
        <ul className="list-inline p-0 m-0">
          {Condidat?.social?.map((social, index) => (
            <li key={index} className="mb-2 d-flex">
              <span>
                <i className={`lab ${social?.icon} icon-text-${social?.color} font-size-20 mr-3`} />
              </span>
              <p className="mb-0 line-height">{social?.link}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</div>

                    </div>
                  </div>
                </div>
                <div id="profile3" className="tab-pane fade">
  <div className="profile-line m-0 d-flex align-items-center justify-content-between position-relative">
    <ul className="list-inline p-0 m-0 w-100">
      {Condidat?.formation?.map((education, index) => (
        <li key={index}>
          <div className="row align-items-top">
            <div className="col-md-3">
              <h6 className="mb-2">{education.dateDeDebut}-{education.dateDeFin}</h6> 
              
            </div>
            <div className="col-md-9">
              <div className="media profile-media align-items-top">
                <div className="profile-dots border-primary mt-1" />
                <div className="ml-4">
                  <h6 className="mb-1">{education.diplome}</h6>
                  <p className="mb-0 font-size-14">{education.ecole}</p>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>

          <div id="profile4" className="tab-pane fade">
  <div className="profile-line m-0 d-flex align-items-center justify-content-between position-relative">
    <ul className="list-inline p-0 m-0 w-100">
      {Condidat?.experience?.map((experience, index) => (
        <li key={index}>
          <div className="row align-items-top">
            <div className="col-md-3">
              <h6 className="mb-2">{experience.dateDeDebut}-{experience.dateDeFin}</h6>
            </div>
            <div className="col-md-9">
              <div className="media profile-media align-items-top">
                <div className="profile-dots border-primary mt-1" />
                <div className="ml-4">
                  <h6 className="mb-1">{experience.poste} at {experience.company}</h6>
                  <p className="mb-0 font-size-14">{experience.taches}</p>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
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

export default CondidatDetails
