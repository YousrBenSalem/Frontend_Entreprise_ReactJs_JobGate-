import React, { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'

import entreprise from '../../services/entreprise';
import { Link, useNavigate } from 'react-router-dom';
import offre from '../../services/offre';

const Offres = () => {
    const localstorageData=JSON.parse(localStorage.getItem('persist:token'));
            const entrerpise=JSON.parse(localstorageData?.user)
      const id=entrerpise?.id
          console.log("iddddd " ,id)

    const [Data , setData] = useState();
    const [Form , setForm]= useState({entrepriseId:id});
   const [currentOffer, setCurrentOffer] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
   const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredData, setFilteredData] = useState([]);
   const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 6;
  const navigate = useNavigate()
    const OnchangeHandler = (e)=>{
        setForm({...Form,[e.target.name]:e.target.value})
      }

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
    getEntrepriseById(id)
  },[])

  const Delete = async (id) =>{
    try {
      const res = await offre.deleteOffer(id);
      console.log("offre supprimé avec succés:", res.data.deletedOffer)
      getEntrepriseById(id)

    } catch (error) {
        console.error("Erreur lors de la suppression d'offre:", error);
    }
  }



  const handleOpenModal = (offer) => {
    setCurrentOffer(offer);
    setUpdatedData(offer); // Pré-remplir les données
    const modal = document.getElementById("update-offer-modal");
    modal.classList.add("show");
    modal.style.display = "block";
  };

  const handleCloseModal = () => {
    const modal = document.getElementById("update-offer-modal");
    modal.classList.remove("show");
    modal.style.display = "none";
  };

    const handleOpenModalAdd = (offer) => {

    const modal = document.getElementById("new-project-modal");
    modal.classList.add("show");
    modal.style.display = "block";
  };
    const handleCloseModalAdd = () => {
    const modal = document.getElementById("new-project-modal");
    modal.classList.remove("show");
    modal.style.display = "none";
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (Data?.offreId) {
      const filtered = Data.offreId.filter((item) =>
        item.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase()) 
      );
      setFilteredData(filtered);
    }
  }, [Data, searchTerm]);

   const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

      const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  const handleUpdateSubmit =  async (event) => {
      event.preventDefault();
    try {
        const response = await offre.updateOffer(updatedData._id , updatedData);
          console.log("offre modifée avec succès :", response.data.updatedOffer);
    alert("Entreprise modifée avec succès !");
      
    } catch (error) {
        console.error("Erreur lors de la modification de l'offre :", error);
    alert("Erreur lors de la modification de l'offre.");
      
    }
    // Appeler votre API ici pour mettre à jour les données
    handleCloseModal();
  };

  const handleAddOffer = async ( event)=>{
    event.preventDefault();
    try {
      const response = await offre.createOffer(Form);
          console.log("offre ajoutée avec succès :", response.data.newOffre);
          handleCloseModalAdd()
    alert("Entreprise ajoutée avec succès !");
      window.location.reload();
    
    const idOffer = response.data.newOffre._id
    
    navigate(`/offer/test/${idOffer}`)
          window.location.reload();

      

    } catch (error) {
      console.error("Erreur lors de l'ajout de l'offre :", error);
    alert("Erreur lors de l'ajout de l'offre.");
      
    }
        handleCloseModalAdd();

  }

  return (
  <div>
  <div className="wrapper">
    <div className="content-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-wrap align-items-center justify-content-between breadcrumb-content">
                  <h5>Offer's list</h5>
                  <div className="d-flex flex-wrap align-items-center justify-content-between">
                    
                    <div className="iq-search-bar device-search">
                      <form action="#" className="searchbox">
                        <a className="search-link" href="#"><i className="ri-search-line" /></a>
                        <input type="text" className="text search-input" placeholder="Search here..."   onChange={(e) => setSearchTerm(e.target.value)}/>
                      </form>
                    </div>

                    <div className="pl-3 border-left btn-new">
                      <button onClick={() => handleOpenModalAdd()}className="btn btn-primary" data-target="#new-project-modal" data-toggle="modal">New offer</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="grid" className="item-content animate__animated animate__fadeIn active" data-toggle-extra="tab-content">
          <div className="row">
                    {currentItems.length > 0 ? (
                       currentItems?.filter(item => item.status === "acceptable"||item.status === "Acceptable").map((item, index)=> (

                        <div key={index} className="col-lg-4 col-md-6">
              <div className="card card-block card-stretch card-height">
                <div className="card-body">
                
                  <h5 className="mb-2"> Title : {item.titre}</h5>
                  <p className="mb-2">Description : {item.description}</p>
                  <p className="mb-2">Type : {item.type}</p>
                  <p className="mb-2">Type Contrat : {item.typeContrat}</p>
                  <p className="mb-2">Application Deadline : {item.applicationDeadline}</p>
                  <p className="mb-2">Date Publication : {item.datePublication}</p>
                  
      {/*             <p className="mb-2">Category : {item.category}</p>
                  <p className="mb-2">Education : {item.education}</p>
                  <p className="mb-2">Experience : {item.experience}</p>
                  <p className="mb-2">Gener : {item.gender}</p>
                  <p className="mb-2">Localisation : {item.localisation}</p>
                  <p className="mb-2">Other benifts : {item.otherBenifits}</p>
                  <p className="mb-2">Responsibilities : {item.responsibilities}</p>
                  <p className="mb-2">Salary : {item.salary}</p>
                  <p className="mb-2">Type : {item.type}</p>
                  <p className="mb-2">Type Contrat : {item.typeContrat}</p>
                  <p className="mb-2">Application Deadline : {item.applicationDeadline}</p>
                  <p className="mb-2">Date Publication : {item.datePublication}</p> */}
                  <div className='d-flex align-items-center justify-content-between mb-3 '>
                      <Link to={`/offerDetails/${item?._id}`}  className="btn btn-white text-primary link-shadow">Details</Link>
                      <button onClick={()=>Delete(item?._id)} className="btn btn-white text-secondary link-shadow">Delete</button>
                      <button onClick={() => handleOpenModal(item)} data-target="#update-offer-modal" data-toggle="modal" className="btn btn-white text-primary 
                      link-shadow">Update </button>               
                         </div>
                  
              
                  <div className="d-flex align-items-center justify-content-between pt-3 border-top">
                    <div className="iq-media-group">
                      <a href="#" className="iq-media">
                        <img className="img-fluid avatar-40 rounded-circle" src={item?.condidatId && item?.condidatId[0] && item?.condidatId[0]?.image 
                      ? `http://localhost:3000/file/${item?.condidatId[0]?.image}`: "../assets/images/user/05.jpg"} alt ="condidat Image" />
                      </a>
                      <a href="#" className="iq-media">
                        <img className="img-fluid avatar-40 rounded-circle" src={item?.condidatId && item?.condidatId[1] && item?.condidatId[1]?.image 
                      ? `http://localhost:3000/file/${item?.condidatId[1]?.image}`:"../assets/images/user/06.jpg"} alt ="condidat Image"  />
                      </a>
                    </div>
                    <Link to={`/condidatPerOffre/${item?._id}`} className="btn btn-white text-primary link-shadow">Show</Link>
                  </div>
                </div>
              </div>
            </div>
                    )) ) : (
            <div>No results found</div>
          )}

          </div>
        </div>

        <div className="d-flex justify-content-center mt-3">
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    
        {/* Page end  */}
      </div>
    </div>
  </div>
  <div className="modal fade" role="dialog" aria-modal="true" id="new-project-modal">
    <div className="modal-dialog modal-xl  modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header d-block text-center pb-3 border-bottom">
          <h3 className="modal-title" id="exampleModalCenterTitle01">New offer</h3>
        </div>
          <form onSubmit={handleAddOffer} >
                <div className="modal-body">
              <div className="row">
                <div className="col-lg-3">
                  <div className="form-group mb-3">
                    <label htmlFor="offerTitle" className="h5">
                      Offer Title*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="offerTitle"
                      name="titre"
                    
                      onChange={OnchangeHandler}
                      placeholder="Offer Title"
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group mb-3">
                    <label htmlFor="typeContrat" className="h5">
                      Contrat's Type*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={OnchangeHandler}
                      id="typeContrat"
                      name="typeContrat"
                      
                      placeholder="Contrat's Type"
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group mb-3">
                    <label htmlFor="localisation" className="h5">
                      Localisation*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={OnchangeHandler}
                      id="localisation"
                      name="localisation"
                    
                      placeholder="localisation"
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group mb-3">
                    <label htmlFor="datePublication" className="h5">
                    Publication's date*
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      onChange={OnchangeHandler}
                      id="datePublication"
                      name="datePublication"
                    
                      placeholder="date Publication"
                    />
                  </div>
                </div>
                  <div className="col-lg-3">
                  <div className="form-group mb-3">
                    <label htmlFor="type" className="h5">
                      Type*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={OnchangeHandler}
                      id="type"
                      name="type"
                      
                      placeholder="Type"
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group mb-3">
                    <label htmlFor="responsibilities" className="h5">
                      Responsibilities*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={OnchangeHandler}
                      id="responsibilities"
                      name="responsibilities"
                      
                      placeholder="responsibilities"
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group mb-3">
                    <label htmlFor="education" className="h5">
                      Education*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={OnchangeHandler}
                      id="education"
                      name="education"
                    
                      placeholder="education"
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group mb-3">
                    <label htmlFor="experience" className="h5">
                      Experience*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={OnchangeHandler}
                      id="experience"
                      name="experience"
                    
                      placeholder="experience"
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group mb-3">
                    <label htmlFor="otherBenifits" className="h5">
                      Other benifits*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={OnchangeHandler}
                      id="otherBenifits"
                      name="otherBenifits"
                    
                      placeholder="other Benifits"
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group mb-3">
                    <label htmlFor="salary" className="h5">
                      Salary*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={OnchangeHandler}
                      id="salary"
                      name="salary"
                    
                      placeholder="salary"
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group mb-3">
                    <label htmlFor="gender" className="h5">
                      Gender*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={OnchangeHandler}
                      id="gender"
                      name="gender"
                    
                      placeholder="gender"
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group mb-3">
                    <label htmlFor="category" className="h5">
                      category*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={OnchangeHandler}
                      id="category"
                      name="category"
                  
                      placeholder="category"
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group mb-3">
                    <label htmlFor="applicationDeadline" className="h5">
                      Deadline's application*
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      onChange={OnchangeHandler}
                      id="applicationDeadline"
                      name="applicationDeadline"
                    
                      placeholder="applicationDeadline"
                    />
                  </div>
                </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="offerDescription" className="h5">
                      Description*
                    </label>
                    <textarea
                      className="form-control"
                      id="offerDescription"
                      name="description"
                      onChange={OnchangeHandler}
                      rows="3"
                      placeholder="Description"
                    ></textarea>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="d-flex flex-wrap align-items-center justify-content-center mt-2">
                    <button
                      className="btn btn-primary mr-3"
                      type='submit'
                    >
                      Save
                    </button>
                    <button className="btn btn-primary" type="reset">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
      
      </div>
    </div>
  </div>  

  <div
        id="update-offer-modal"
        className="modal fade"
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header d-block text-center pb-3 border-bottom">
              <h3 className="modal-title">Update Offer</h3>
            </div>
            <form >
                <div className="modal-body">
              <div className="row">
                <div className="col-lg-3">
                  <div className="form-group mb-3">
                    <label htmlFor="offerTitle" className="h5">
                      Offer Title*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="offerTitle"
                      name="titre"
                      value={updatedData?.titre || ""}
                      onChange={handleUpdateChange}
                      placeholder="Offer Title"
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group mb-3">
                    <label htmlFor="typeContrat" className="h5">
                      Contrat's Type*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="typeContrat"
                      name="typeContrat"
                      value={updatedData?.typeContrat || ""}
                      onChange={handleUpdateChange}
                      placeholder="Contrat's Type"
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group mb-3">
                    <label htmlFor="localisation" className="h5">
                      Localisation*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="localisation"
                      name="localisation"
                      value={updatedData?.localisation || ""}
                      onChange={handleUpdateChange}
                      placeholder="localisation"
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group mb-3">
                    <label htmlFor="datePublication" className="h5">
                    Publication's date*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="datePublication"
                      name="datePublication"
                      value={updatedData?.datePublication || ""}
                      onChange={handleUpdateChange}
                      placeholder="date Publication"
                    />
                  </div>
                </div>
                  <div className="col-lg-3">
                  <div className="form-group mb-3">
                    <label htmlFor="type" className="h5">
                      Type*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="type"
                      name="type"
                      value={updatedData?.type || ""}
                      onChange={handleUpdateChange}
                      placeholder="Type"
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group mb-3">
                    <label htmlFor="responsibilities" className="h5">
                      Responsibilities*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="responsibilities"
                      name="responsibilities"
                      value={updatedData?.responsibilities || ""}
                      onChange={handleUpdateChange}
                      placeholder="responsibilities"
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group mb-3">
                    <label htmlFor="education" className="h5">
                      Education*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="education"
                      name="education"
                      value={updatedData?.education || ""}
                      onChange={handleUpdateChange}
                      placeholder="education"
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group mb-3">
                    <label htmlFor="experience" className="h5">
                      Experience*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="experience"
                      name="experience"
                      value={updatedData?.experience || ""}
                      onChange={handleUpdateChange}
                      placeholder="experience"
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group mb-3">
                    <label htmlFor="otherBenifits" className="h5">
                      Other benifits*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="otherBenifits"
                      name="otherBenifits"
                      value={updatedData?.otherBenifits || ""}
                      onChange={handleUpdateChange}
                      placeholder="other Benifits"
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group mb-3">
                    <label htmlFor="salary" className="h5">
                      Salary*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="salary"
                      name="salary"
                      value={updatedData?.salary || ""}
                      onChange={handleUpdateChange}
                      placeholder="salary"
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group mb-3">
                    <label htmlFor="gender" className="h5">
                      Gender*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="gender"
                      name="gender"
                      value={updatedData?.gender || ""}
                      onChange={handleUpdateChange}
                      placeholder="gender"
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group mb-3">
                    <label htmlFor="category" className="h5">
                      category*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      name="category"
                      value={updatedData?.category || ""}
                      onChange={handleUpdateChange}
                      placeholder="category"
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="form-group mb-3">
                    <label htmlFor="applicationDeadline" className="h5">
                      Deadline's application*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="applicationDeadline"
                      name="applicationDeadline"
                      value={updatedData?.applicationDeadline || ""}
                      onChange={handleUpdateChange}
                      placeholder="applicationDeadline"
                    />
                  </div>
                </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="offerDescription" className="h5">
                      Description*
                    </label>
                    <textarea
                      className="form-control"
                      id="offerDescription"
                      name="description"
                      value={updatedData.description || ""}
                      onChange={handleUpdateChange}
                      rows="3"
                      placeholder="Description"
                    ></textarea>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="d-flex flex-wrap align-items-center justify-content-center mt-2">
                    <button
                      className="btn btn-primary mr-3"
                      type='submit'
                      onClick={handleUpdateSubmit}
                    >
                      Save
                    </button>
                    <button className="btn btn-primary" type="reset" onClick={handleCloseModal}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          
            </div>
          </div>
  </div>
      </div>
    

  )
}

export default Offres
