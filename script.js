
document.addEventListener('DOMContentLoaded', () => {
  const residuos = document.querySelectorAll('.residuo');
  const lixeiras = document.querySelectorAll('.lixeiras img');

  // Associação entre o nome da imagem e a lixeira correta
  const mapaLixeiras = {
    'papel.jpg': 'Lazul.png',        // Azul - papel
    'vidro.png': 'Lverde.png',       // Verde - vidro
    'plastico.png': 'Lvermelha.png', // Vermelha - plástico
    'metal.png': 'Lamarelo.png',     // Amarela - metal
    'organico.png': 'Lmarrom.png',   // Marrom - orgânico
    'naoreciclavel.png': 'Lcinza.png'// Cinza - não reciclável
  };

  // Cria elemento de mensagem "MUITO BEM!"
  const mensagem = document.createElement('div');
  mensagem.textContent = 'MUITO BEM!';
  Object.assign(mensagem.style, {
    display: 'none',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#35a535',
    color: 'white',
    fontSize: '32px',
    fontWeight: 'bold',
    padding: '15px 25px',
    borderRadius: '8px',
    fontFamily: 'Raleway',
    boxShadow: '0 0 15px rgba(0,0,0,0.3)',
    zIndex: '9999'
  });
  document.body.appendChild(mensagem);

  residuos.forEach(residuo => {
    let arrastando = false;

    residuo.addEventListener('mousedown', (e) => {
      arrastando = true;
      residuo.style.position = 'absolute';
      residuo.style.zIndex = '1000';
      residuo.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
      if (arrastando) {
        residuo.style.left = e.pageX - residuo.offsetWidth / 2 + 'px';
        residuo.style.top = e.pageY - residuo.offsetHeight / 2 + 'px';
      }
    });

    document.addEventListener('mouseup', (e) => {
      if (arrastando) {
        arrastando = false;
        residuo.style.cursor = 'grab';

        const nomeResiduo = residuo.src.split('/').pop();
        const lixeiraCorreta = mapaLixeiras[nomeResiduo];
        let colocadoCorreto = false;

        lixeiras.forEach(lixeira => {
          const rectLixeira = lixeira.getBoundingClientRect();
          const rectResiduo = residuo.getBoundingClientRect();

          const dentro =
            rectResiduo.right > rectLixeira.left &&
            rectResiduo.left < rectLixeira.right &&
            rectResiduo.bottom > rectLixeira.top &&
            rectResiduo.top < rectLixeira.bottom;

          if (dentro && lixeira.src.includes(lixeiraCorreta)) {
            colocadoCorreto = true;
          }
        });

        if (colocadoCorreto) {
          mensagem.style.display = 'block';
          setTimeout(() => {
            mensagem.style.display = 'none';
            residuo.style.display = 'none';
          }, 2000);
        } else {
          residuo.style.position = 'static';
        }
      }
    });
  });
});

