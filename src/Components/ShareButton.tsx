import React from 'react';

type ShareButtonProps = {
  pathname: string
  testId: string
};

export default function ShareButton({ pathname, testId }: ShareButtonProps) {
  const handleShareButton = () => {
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`)
      .then(() => {
        const messageElement = document.createElement('div');
        messageElement.innerHTML = 'Link copied!';
        document.body.appendChild(messageElement);
        setTimeout(() => {
          document.body.removeChild(messageElement);
        }, 2000);
      }).catch((err) => {
        console.error('Erro ao copiar o link: ', err);
      });
  };
  return (
    <button
      data-testid={ testId }
      onClick={ handleShareButton }
    >
      <img src="../src/images/shareIcon.svg" alt="Botão de compartilhar" />
    </button>
  );
}
