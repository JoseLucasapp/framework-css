const modal = document.getElementById('servicoModal');
const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
const cart = JSON.parse(localStorage.getItem('cart')) || [];
modal.addEventListener('show.bs.modal', function (event) {
  const button = event.relatedTarget;


  const id = button.getAttribute('data-id');
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

  btnCart.removeEventListener('click', function() {
    let quantity = parseInt(inputQuantidade.value) <= 0 || inputQuantidade.value === "" ? 1 : parseInt(inputQuantidade.value);
  
    handleCart(parseInt(id), quantity);
  });
  btnCart.addEventListener('click', function() {
    let quantity = parseInt(inputQuantidade.value) <= 0 || inputQuantidade.value === "" ? 1 : parseInt(inputQuantidade.value);
  
    handleCart(parseInt(id), quantity);
  });
});

const handleRenderCart = () => {
  cartModal.show();

  var cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  if (cart.length > 0) {
    cart.forEach(function(product) {
      var item = document.createElement("div");
      item.classList.add("cart-item");
      item.innerHTML = `
        <div class="cart-item-details">
          <div class="cart-item-quantity">${product.quantity} x</div>
          <div class="cart-item-title">${product.title}</div>
        </div>
        <div class="cart-item-total">R$ ${product.total}</div>
        <div class="cart-item-remove">
          <button class="btn btn-danger" onclick="removeFromCart(${product.id})">X</button>
        </div>
      `;
      cartItems.appendChild(item);
    });
  }
}

document.getElementById("btn-cart-home").addEventListener("click", handleRenderCart);

const handleCart = (id, quantity) => {
  addCart(parseInt(id), quantity)

  Swal.fire({
    icon: 'success',
    title: 'Produto adicionado ao carrinho',
    confirmButtonText: 'Fechar',
    confirmButtonColor: '#3085d6',
  });

  inputQuantidade.value = ""
}

const addCart = (id, quantity) => {
  const product = products.find(product => product.id === id);
  const productOnCart = cart.find(product => product.id === id);

  let newQuantity = quantity;

  if (productOnCart) {
    newQuantity = productOnCart.quantity + quantity;
    removeFromCart(id);
  }

  cart.push({
    id: product.id,
    title: product.title,
    quantity: newQuantity,
    price: product.price,
    total: (parseFloat(product.price) * newQuantity).toFixed(2)
  })

  localStorage.setItem('cart', JSON.stringify(cart));
  
}

const removeFromCart = (id) => {
  const index = cart.findIndex(product => product.id === id);

  if (index !== -1) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  handleRenderCart();
}

const sendToWhatsapp = () => {
  const telefone = '+558391945349';
  const mensagem = 'Olá, gostaria de fazer um pedido:\n';
  const url = `https://api.whatsapp.com/send?phone=${telefone}&text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
}