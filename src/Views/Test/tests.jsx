import React, { useEffect, useState } from 'react';
import tests from '../../services/tests';

const Tests = () => {
  const localstorageData = JSON.parse(localStorage.getItem('persist:token'));
  const entrerpise = JSON.parse(localstorageData?.user);
  const id = entrerpise?.id;

  const [Data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getOffer = async () => {
    try {
      const response = await tests.getTests();
      setData(response.data.tests);
    } catch (error) {
      console.error("Erreur lors de la récupération des tests :", error);
    }
  };

  useEffect(() => {
    getOffer();
  }, []);
    const Delete= async()=>{
      try {
        
      } catch (error) {
        
      }
    } 
  const filteredData = Data?.filter(
    item => 
      item.offreId.entrepriseId === id &&
      (item.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.offreId.titre.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="wrapper">
      <div className="content-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Tests</h4>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <div className="row justify-content-between">
                      <div className="col-sm-6 col-md-6">
                        <div id="user_list_datatable_info" className="dataTables_filter">
                          <form className="mr-3 position-relative">
                            <div className="form-group mb-0">
                              <input 
                                type="search" 
                                className="form-control" 
                                placeholder="Search" 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)} 
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <table className="table table-striped dataTable mt-4">
                      <thead>
                        <tr>
                          <th>Titre</th>
                          <th>Description</th>
                          <th>Score Minimum</th>
                          <th>Offre</th>
                          <th style={{ minWidth: 100 }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentData?.length > 0 ? (
                          currentData.map((item, index) => (
                            <tr key={index}>
                              <td>{item.titre}</td>
                              <td>{item.description}</td>
                              <td>{item.scoreMinimum}</td>
                              <td>{item.offreId.titre}</td>
                              <td>
                                <div className="d-flex align-items-center justify-content-around list-user-action">
                                  <a className="btn btn-sm bg-primary" href="#">
                                    <i className="ri-pencil-line" />
                                  </a>
                                  <button className="btn btn-sm bg-primary" onClick={Delete}>
                                    <i className="ri-delete-bin-line" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center">Aucune donnée disponible</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <div className="row justify-content-between mt-3">
                      <div className="col-md-6">
                        <span>
                          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData?.length)} of {filteredData?.length} entries
                        </span>
                      </div>
                      <div className="col-md-6">
                        <nav>
                          <ul className="pagination justify-content-end">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                              <a className="page-link" onClick={() => paginate(currentPage - 1)} href="#">Previous</a>
                            </li>
                            {Array.from({ length: Math.ceil(filteredData?.length / itemsPerPage) }, (_, i) => (
                              <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                <a className="page-link" onClick={() => paginate(i + 1)} href="#">{i + 1}</a>
                              </li>
                            ))}
                            <li className={`page-item ${currentPage === Math.ceil(filteredData?.length / itemsPerPage) ? 'disabled' : ''}`}>
                              <a className="page-link" onClick={() => paginate(currentPage + 1)} href="#">Next</a>
                            </li>
                          </ul>
                        </nav>
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
  );
};

export default Tests;
