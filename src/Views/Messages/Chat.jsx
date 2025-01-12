import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Chat = () => {
    const { id } = useParams(); // Récupérer l'ID de l'utilisateur avec lequel on discute
  const [message, setMessage] = useState('');

  const messages = [
    { id: 1, sender: 'Emma Watson', text: 'Salut, comment ça va ?', time: '12:47 PM' },
    { id: 2, sender: 'Vous', text: 'Ça va bien merci ! Et toi ?', time: '12:49 PM' },
    // Ajouter plus de messages pour la démonstration.
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Message envoyé:', message);
      setMessage('');
    }
  };


  const styles = {
    chatWrapper: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#f5f5f5',
      position: 'relative',
    },
    chatHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#0078d4',
      color: 'white',
    },
    userInfo: {
      margin: 0,
      fontSize: '8px',
    },
    statusIndicator: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
    },
    statusDot: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      marginRight: '5px',
    },
    onlineStatus: {
      backgroundColor: 'green',
    },
    chatMessages: {
      flexGrow: 1,
      overflowY: 'auto',
      padding: '15px',
      backgroundColor: 'white',
      borderBottom: '1px solid #e0e0e0',
    },
    message: {
      display: 'flex',
      alignItems: 'flex-end',
      marginBottom: '15px',
    },
    sent: {
      justifyContent: 'flex-end',
    },
    received: {
      justifyContent: 'flex-start',
    },
    messageContent: {
      maxWidth: '60%',
      padding: '10px',
      backgroundColor: '#f1f1f1',
      borderRadius: '10px',
      fontSize: '14px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    sentMessage: {
      backgroundColor: '#0078d4',
      color: 'white',
    },
    messageTime: {
      fontSize: '10px',
      color: '#999',
      marginTop: '5px',
    },
    messageInputContainer: {
      display: 'flex',
      padding: '10px 20px',
      backgroundColor: 'white',
      borderTop: '1px solid #e0e0e0',
    },
    messageInput: {
      flexGrow: 1,
      padding: '10px',
      borderRadius: '25px',
      border: '1px solid #ddd',
      fontSize: '14px',
      marginRight: '10px',
    },
    sendBtn: {
      backgroundColor: '#0078d4',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '14px',
    },
    sendBtnHover: {
      backgroundColor: '#005a8a',
    },
    callButtons: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      display: 'flex',
      flexDirection: 'row',
      gap: '10px',
    },
    callBtn: {
      backgroundColor: '#0078d4',
      color: 'white',
      border: 'none',
      padding: '10px',
      borderRadius: '50%',
      fontSize: '20px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    callBtnHover: {
      backgroundColor: '#005a8a',
    },
  };
  return (

      <div className='wrapper'>
              <div className="content-page">

                        <div className="container-fluid">

                                    <div className="messages-container p-4">
                                       <div style={styles.chatWrapper}>
      <div style={styles.chatHeader}>
        <div style={styles.userInfo}>
          <h2>Discussion avec {id}</h2>
<div style={styles.statusIndicator}>
          <span style={{ ...styles.statusDot, ...styles.onlineStatus }}></span> En ligne
        </div>        </div>
        
      </div>

      {/* Boutons d'appel en haut à droite */}
      <div style={styles.callButtons}>
        <button
          style={styles.callBtn}
          onClick={() => console.log('Appel Audio')}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.callBtnHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.callBtn.backgroundColor}
        >
          📞
        </button>
        <button
          style={styles.callBtn}
          onClick={() => console.log('Appel Vidéo')}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.callBtnHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.callBtn.backgroundColor}
        >
          📹
        </button>
      </div>

      <div style={styles.chatMessages}>
        {messages.map(msg => (
          <div
            key={msg.id}
            style={{
              ...styles.message,
              ...(msg.sender === 'Vous' ? styles.sent : styles.received),
            }}
          >
            <div style={styles.messageContent}>
              <p>{msg.text}</p>
              <small style={styles.messageTime}>{msg.time}</small>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.messageInputContainer}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tapez votre message..."
          style={styles.messageInput}
        />
        <button
          onClick={handleSendMessage}
          style={styles.sendBtn}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.sendBtnHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.sendBtn.backgroundColor}
        >
          Envoyer
        </button>
      </div>
    </div>
                                    </div>





    

                        </div>



              </div>



      </div>
  
  );
};

export default Chat;
