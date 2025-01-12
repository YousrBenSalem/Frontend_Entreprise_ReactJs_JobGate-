import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Messages = () => {
  const navigate = useNavigate();
  
  const messages = [
    {
      id: 1,
      name: "Emma Watson",
      time: "12:47 PM",
      message: "Lorem ipsum dolor sit amet",
      avatar: "../assets/images/user/01.jpg",
      online: true, // Statut de connexion
    },
    {
      id: 2,
      name: "Ashlynn Franci",
      time: "11:30 PM",
      message: "Sed ut perspiciatis unde",
      avatar: "../assets/images/user/02.jpg",
      online: false,
    },
    {
      id: 3,
      name: "Kianna Carder",
      time: "11:21 PM",
      message: "At vero eos et accusamus",
      avatar: "../assets/images/user/03.jpg",
      online: true,
    },
    // Ajoutez plus de messages ici...
  ];

  const handleMessageClick = (id) => {
    // Naviguer vers la page de discussion avec l'utilisateur sélectionné
    navigate(`/chat/${id}`);
  };

  return (
    <div className='wrapper'>
      <div className="content-page">
        <div className="container-fluid">
          <div className="messages-container p-4">
            {/* Titre */}
            <div className="messages-header d-flex align-items-center justify-content-between">
              <h2 className="mb-0">Messages</h2>
              <span className="badge badge-primary">Total: {messages.length}</span>
            </div>

            {/* Liste des messages */}
            <div className="row">
              <div className="col-lg-12">
                <div className="messages-list mt-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="message-card d-flex align-items-center p-3 mb-3 border rounded shadow-sm"
                      onClick={() => handleMessageClick(msg.id)} // Sur le clic, naviguer vers la discussion
                    >
                      <img
                        src={msg.avatar}
                        alt={msg.name}
                        className="avatar rounded-circle me-3"
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      />
                      <div className="message-content w-100 " style={{ marginLeft: "20px" }}>
                        <div className="d-flex align-items-center justify-content-between">
                          <h6 className="mb-0">{msg.name}</h6>
                          <small className="text-muted">{msg.time}</small>
                        </div>
                        <p className="mb-0 text-muted">{msg.message}</p>
                      </div>
                      {/* Affichage du statut de connexion */}
                      <div
                        className={`status-indicator ${msg.online ? 'online' : 'offline'}`}
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: msg.online ? 'green' : 'red',
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
