const modal = document.getElementById('servicoModal');
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

  const btnComprar = modal.querySelector('#btn-comprar')

  modalImg.src = imgSrc;
  modalTitulo.textContent = titulo;
  modalDescricao.textContent = descricao;
  modalPreco.textContent = preco;

  btnComprar.addEventListener('click', ()=>{
    Swal.fire({
      icon: 'success',
      title: 'Obrigado por confiar nos nossos serviços!',
      text: 'Seu pedido foi recebido com sucesso.',
      confirmButtonText: 'Fechar',
      confirmButtonColor: '#3085d6',
  });
  })
});
