const modal = document.getElementById('servicoModal');
const cart = []
modal.addEventListener('show.bs.modal', function (event) {
  const button = event.relatedTarget;

  const imgSrc = button.getAttribute('data-img');
  const titulo = button.getAttribute('data-titulo');
  const descricao = button.getAttribute('data-descricao');
  const preco = button.getAttribute('data-preco');

  const modalImg = modal.querySelector('#modal-img');
  const modalTitulo = modal.querySelector('#modal-titulo');
  const modalDescricao = modal.querySelector('#modal-descricao');
  const modalPreco = modal.querySelector('#modal-preco');

  const btnComprar = modal.querySelector('#btn-buy')
  const btnCart = modal.querySelector('#btn-cart')
  const inputQuantidade = modal.querySelector('#input-quantidade')

  modalImg.src = imgSrc;
  modalTitulo.textContent = titulo;
  modalDescricao.textContent = descricao;
  modalPreco.textContent = `R$ ${preco.replace('.', ',')}`;



  btnComprar.addEventListener('click', () => {
    Swal.fire({
      icon: 'success',
      title: 'Obrigado por confiar nos nossos serviços!',
      text: 'Seu pedido foi encaminhado e será processado.',
      confirmButtonText: 'Fechar',
      confirmButtonColor: '#3085d6',
    });

    sendToWhatsapp()
  })

  btnCart.addEventListener('click', () => {

    console.log(preco.replace('R$ ', ''), parseFloat(preco),  inputQuantidade.value, parseInt(inputQuantidade.value), parseInt(inputQuantidade.value) * parseFloat(preco))

    if(inputQuantidade.value > 1) {
      const data = {
        title: titulo,
        price: preco,
        quantity: inputQuantidade.value,
        total: parseInt(inputQuantidade.value) * parseFloat(preco)
      }
  
      addCart(data)

      Swal.fire({
        icon: 'success',
        title: 'Produto adicionado ao carrinho',
        confirmButtonText: 'Fechar',
        confirmButtonColor: '#3085d6',
      });

      console.log(data, cart, button.getAttribute('data-id'))
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Quantidade inválida',
        text: 'Por favor, escolha uma quantidade maior que 1',
        confirmButtonText: 'Fechar',
        confirmButtonColor: '#3085d6',
      });
    }
  })
});

const sendToWhatsapp = () => {
  const telefone = '+558391945349';
  const mensagem = 'Olá, gostaria de fazer um pedido:\n';
  const url = `https://api.whatsapp.com/send?phone=${telefone}&text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
}

const addCart = (product) => {
  cart.push(product)
  localStorage.setItem('cart', JSON.stringify(cart))
}


