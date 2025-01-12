import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import offre from '../../services/offre'
import io from 'socket.io-client';
import commentaire from '../../services/commentaire';
import { useSelector } from 'react-redux';

const socket = io('http://localhost:3000'); 


const OfferDetails = () => {
  const {user} = useSelector((state) => state.auth)
  const userId= user._id ;
  const {id} = useParams()
  console.log("offer's id",id)
  const [Data , setData] = useState();
  const [replyTo, setReplyTo] = useState(null); 
  const [comments, setComments] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [showComments, setShowComments] = useState(false);
  
  const getOfferById =async ()=>{
        try {
          const response = await offre.getOfferById(id);
          setData(response.data.offre);
          console.log("offer recupérée avec succès :", response.data.offre);
      } catch (error) {
        console.error("Erreur lors de la récupération d'offer :", error);
      }
    }

  const addCommentaire =async (content)=>{
        try {
             const commentaireData = {
      content,
      offreId: id,
      userId: userId, 
    };
          const response = await commentaire.createCommentaire(commentaireData );
          console.log("commentaire ajouté avec succès :", response.data.newCommentaire);
          const newComment = response.data.newCommentaire
          socket.emit('newComment', newComment);

      } catch (error) {
        console.error("Erreur lors de la création de commentaire :", error);
      }
    }

  const handleReply = (commentId, content) => {
    addCommentaire(content); 
  };

  useEffect(() => {
    getOfferById();
    socket.on('newComment', (comment) => {
      setNotifications((prev) => [...prev, comment]);
      setComments((prev) => [...prev, comment]);
    });

    return () => {
      socket.off('newComment');
    };
  }, [id]);

  const handleDeleteComment = (commentId) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
  };


return (
  <div>
    <div className="content-page">
      <div className="container-fluid timeline-page">
        <div className="row">
          
          <div className="col-lg-12">
            <div className="card card-block card-stretch card-height">
              <div className="card-header d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title"> {Data?.titre} 's offer  details</h4>
                </div>
              </div>
              <div className="card-body">
                <div className="iq-timeline0 m-0 d-flex align-items-center justify-content-between position-relative">
                  <ul className="list-inline p-0 m-0">
                    <li>
                      <div className="timeline-dots timeline-dot1 border-primary text-primary" />
                      <h6 className="float-left mb-1">Description</h6>
                    
                      <div className="d-inline-block w-100">
                        <p>{Data?.description}</p>
                      </div>
                    </li>
                    <li>
                      <div className="timeline-dots timeline-dot1 border-success text-success" />
                      <h6 className="float-left mb-1">Type contrat</h6>
                      
                      <div className="d-inline-block w-100">
                        <p>{Data?.typeContrat}</p>
                      </div>
                    </li>
                    <li>
                      <div className="timeline-dots timeline-dot1 border-danger text-danger" />
                      <h6 className="float-left mb-1">Localisation</h6> 
                      
                      <div className="d-inline-block w-100">
                        <p>{Data?.localisation}</p>
                      
                      </div>
                    </li>
                    <li>
                      <div className="timeline-dots timeline-dot1 border-primary text-primary" />
                      <h6 className="float-left mb-1">Date's publication</h6>
                    
                      <div className="d-inline-block w-100">
                        <p>{Data?.datePublication}</p>
                      </div>
                    </li>
                    <li>
                      <div className="timeline-dots timeline-dot1 border-warning text-warning" />
                      <h6 className="float-left mb-1">Type</h6>
                    
                      <div className="d-inline-block w-100">
                        <p>{Data?.type}</p>
                      </div>
                    </li>

                    <li>
                      <div className="timeline-dots timeline-dot1 border-primary text-primary" />
                      <h6 className="float-left mb-1">Responsibilities</h6>
                    
                      <div className="d-inline-block w-100">
                        <p>{Data?.responsibilities}</p>
                      </div>
                    </li>
                    <li>
                      <div className="timeline-dots timeline-dot1 border-success text-success" />
                      <h6 className="float-left mb-1">Education</h6>
                      
                      <div className="d-inline-block w-100">
                        <p>{Data?.education}</p>
                      </div>
                    </li>
                    <li>
                      <div className="timeline-dots timeline-dot1 border-danger text-danger" />
                      <h6 className="float-left mb-1">Experience</h6>
                      
                      <div className="d-inline-block w-100">
                        <p>{Data?.experience}</p>
                      
                      </div>
                    </li>
                    <li>
                      <div className="timeline-dots timeline-dot1 border-primary text-primary" />
                      <h6 className="float-left mb-1">Other benifits</h6>
                    
                      <div className="d-inline-block w-100">
                        <p>{Data?.otherBenifits}</p>
                      </div>
                    </li>
                    <li>
                      <div className="timeline-dots timeline-dot1 border-warning text-warning" />
                      <h6 className="float-left mb-1">Salary</h6>
                    
                      <div className="d-inline-block w-100">
                        <p>{Data?.salary}</p>
                      </div>
                    </li>

                      <li>
                      <div className="timeline-dots timeline-dot1 border-primary text-primary" />
                      <h6 className="float-left mb-1">Gender</h6>
                    
                      <div className="d-inline-block w-100">
                        <p>{Data?.gender}</p>
                      </div>
                    </li>
                    <li>
                      <div className="timeline-dots timeline-dot1 border-success text-success" />
                      <h6 className="float-left mb-1">Category</h6>
                      
                      <div className="d-inline-block w-100">
                        <p>{Data?.category}</p>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* Section des actions */}
        <div className="post-actions d-flex justify-content-between align-items-center mt-3">
        

          {/* Bouton Commentaire */}
          <button
            className="btn btn-light"
            onClick={() => setShowComments(!showComments)}
          >
            <i className="fa fa-comment text-success"></i> Commenter
          </button>

          
        </div>
            {showComments && (
                      <div className="comments-section mt-3">
                        {comments.map((comment) => (
                          <div key={comment.id} className="media mb-3">
                            <img
                              src="../assets/images/page-img/15.jpg"
                              className="mr-3 avatar-70 img-fluid rounded"
                              alt="#"
                            />
                            <div className="media-body">
                              <h5 className="mt-0">Comment {comment.id}</h5>
                              <p>{comment.text}</p>
                              <div className="actions">
                                <button
                                className="btn btn-link text-danger"
                                onClick={() => handleDeleteComment(comment.id)}
                              >
                                Delete
                              </button>
                              <button
                                className="btn btn-link"
                                onClick={() => handleReply(comment._id, "Your reply")}
                              >
                                Reply
                              </button>
                              </div>
                              

                              {comment.replies.map((reply) => (
                                <div key={reply.id} className="media mt-3">
                                  <img
                                    src="../assets/images/page-img/16.jpg"
                                    className="mr-3 avatar-70 img-fluid rounded"
                                    alt="#"
                                  />
                                <div className="media-body">
                                  <h5 className="mt-0">Reply {reply.id}</h5>
                                  <p>{reply.text}</p>
                                </div>
                              </div>
                            ))}

                              {replyTo === comment.id && (
                                <input
                                  type="text"
                                  className="form-control mt-2"
                                  placeholder="Votre réponse..."
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" && e.target.value.trim()) {
                                      handleReply(comment.id, e.target.value.trim());
                                      setReplyTo(null);
                                    
                                    }
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        ))}

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Écrire un commentaire..."
                            onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    addCommentaire(e.target.value.trim());
                  
                  }
                }}
                        />
                      </div>
                    )}

              </div>
            </div>
          </div>


          
        </div>
        
      </div>
    </div>
  </div>


  )
}

export default OfferDetails
