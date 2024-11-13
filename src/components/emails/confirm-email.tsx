import React from 'react';

interface ConfirmEmailProps {
  userName: string;
  confirmationLink: string;
}

export function ConfirmEmail({ userName, confirmationLink }: ConfirmEmailProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
      <h1 style={{ color: '#4CAF50' }}>Confirmación de Correo Electrónico</h1>
      <p>Hola {userName},</p>
      <p>Gracias por registrarte en nuestra plataforma. Por favor, confirma tu correo electrónico haciendo clic en el siguiente enlace:</p>
      <a 
        href={confirmationLink} 
        style={{ 
          display: 'inline-block', 
          padding: '10px 20px', 
          margin: '20px 0', 
          color: '#fff', 
          backgroundColor: '#4CAF50', 
          textDecoration: 'none', 
          borderRadius: '5px' 
        }}
      >
        Confirmar Correo Electrónico
      </a>
      <p>Si no te has registrado en nuestra plataforma, por favor ignora este correo.</p>
      <p>Saludos,<br />El equipo de Regalám</p>
    </div>
  );
}
