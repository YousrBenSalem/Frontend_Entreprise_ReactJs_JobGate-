import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import offre from '../../services/offre';
import condidat from '../../services/condidat';


const CondidatPerOffre = () => {
  const {id}=useParams()
      const [Data , setData] = useState();

      const getOffreById = async ()=>{
        try {
          
          const response = await offre.getOfferById(id);
          setData(response.data.offre);
          console.log("offre recupéré avec succès :", response.data.offre);

        } catch (error) {
          console.error("Erreur lors de la récupération d'offre :", error);
          
        }
      }

          useEffect(() => {
          getOffreById(id)
        },[])
  
const Accept = async (id) => {
  try {
    console.log("Tentative de mise à jour du statut : accept pour le candidat ID:", id);
    const res = await condidat.updateStatus(id);

    console.log("Statut modifié avec succès :", res.data.updateStatusAccept);

  } catch (error) {
    console.error("Erreur lors de la modification du statut:", error.response ? error.response.data : error);
  }
};

const Reject = async (id) => {
  try {
    console.log("Tentative de mise à jour du statut : reject pour le candidat ID:", id);
    const res = await condidat.updateStatusReject(id);

    console.log("Statut modifié avec succès :", res.data.updateStatus);

  } catch (error) {
    console.error("Erreur lors de la modification du statut:", error.response ? error.response.data : error);
  }
};

  return (
    <div className="wrapper">
      <div className="content-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-wrap align-items-center justify-content-between breadcrumb-content">
                    <h5>Your Condidats</h5>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        
          <div id="list" className="item-content animate__animated animate__fadeIn active" data-toggle-extra="tab-content">
            <div className="table-responsive rounded bg-white mb-4">
                <table className="table mb-0 table-borderless tbl-server-info">
                    {Data?.condidatId?.length > 0 ? (
                      <tbody>
                        {Data?.condidatId.map((candidat) => (
                          <tr key={candidat?._id}>
                            <td>
                              <div className="media align-items-center">
                                <img
                                  src={candidat?.image
                                    ? `http://localhost:3000/file/${candidat?.image}`
                                    : "../assets/images/user/01.jpg"}
                                  className="img-fluid rounded-circle avatar-40"
                                  alt="image"
                                />
                                <h5 className="ml-3">
                                  {candidat?.name} {candidat?.prenom}
                                </h5>
                              </div>
                            </td>
                            <td>{candidat?.email}</td>
                            <td>
                              <div className="media align-items-center">
                                <Link to={`/condidatDetail/${candidat?._id}`} className="bg-secondary-light rounded-circle iq-card-icon-small mr-3">
                                  <i className="ri-profile-line m-0" />
                                </Link>
                                <Link to={`/chat/${candidat?._id}`} className="bg-primary-light rounded-circle iq-card-icon-small mr-3">
                                  <i className="ri-chat-3-line m-0" />
                                </Link>
                                <div className="bg-success-light rounded-circle iq-card-icon-small">
                                  <i className="ri-phone-line m-0" />
                                </div>
                              </div>
                            </td>
                            <td>
                              score
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <button onClick={() => Accept(candidat?._id)} className="text-body" style={{ background: 'none', border: 'none', padding: 0 }}>
                                <i className="las la-check mr-3" />
                              </button>

                                <button onClick={() => Reject(candidat?._id)} className="text-body" style={{ background: 'none', border: 'none', padding: 0 }}>
                                  <i className="las la-trash-alt mr-0" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <tbody>
                        <tr>
                          <td colSpan="5" className="text-center">
                            Aucun candidat trouvé pour cette offre.
                          </td>
                        </tr>
                      </tbody>
                    )}
                </table>
</div>

            
          </div>
          {/* Page end  */}
        </div>
      </div>
    </div>

  )
}

export default CondidatPerOffre
