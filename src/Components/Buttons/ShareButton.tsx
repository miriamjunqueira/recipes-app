import React from 'react';
import shareIcon from '../../images/shareIcon.svg';

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
        const getElemenToAppend = document.getElementById('toAppend');
        if (getElemenToAppend) {
          getElemenToAppend.appendChild(messageElement);
          setTimeout(() => {
            getElemenToAppend.removeChild(messageElement);
          }, 2000);
        }
      }).catch((err) => {
        console.error('Erro ao copiar o link: ', err);
      });
  };
  return (
    <div id="toAppend">
      <button
        onClick={ handleShareButton }
      >
        <img
          data-testid={ testId }
          src={ shareIcon }
          alt="Botão de compartilhar"
        />
      </button>
    </div>
  );
}
