const modal = document.getElementById('servicoModal');
const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
const btnFinish = document.getElementById("btn-finish");
const checkoutModal = new bootstrap.Modal(document.getElementById("checkoutModal"));
const btnFinishCheckout = document.getElementById("btn-finish-checkout");
const cart = [];

const handleCart = (id, quantity) => {
  addCart(parseInt(id), quantity)

  Swal.fire({
    icon: 'success',
    title: 'Produto adicionado ao carrinho',
    confirmButtonText: 'Fechar',
    confirmButtonColor: '#3085d6',
  });
}

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

    addCart(parseInt(id), 1);

    const modalProduto = bootstrap.Modal.getInstance(modal);
    modalProduto.hide();

    setTimeout(() => {
      checkoutModal.show();
    }, 500); 

  })

  btnCart.onclick = function () {
    let quantity = parseInt(inputQuantidade.value) <= 0 || inputQuantidade.value === "" ? 1 : parseInt(inputQuantidade.value);
    
    handleCart(parseInt(id), quantity);
  
    inputQuantidade.value = "";
  };
});

btnFinish.addEventListener('click', () => {
  checkoutModal.show();
})

btnFinishCheckout.addEventListener('click', () => {
  checkoutModal.hide();
  sendToWhatsapp();
})

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

const addCart = (id, quantity) => {
  const product = products.find(product => product.id === id);
  const productOnCart = cart.find(product => product.id === id);

  if (productOnCart) {
    productOnCart.quantity += quantity;
    productOnCart.total = (parseFloat(productOnCart.price) * productOnCart.quantity).toFixed(2);
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      quantity: quantity,
      price: product.price,
      total: (parseFloat(product.price) * quantity).toFixed(2)
    });
  }
};


const removeFromCart = (id) => {
  const index = cart.findIndex(product => product.id === id);

  if (index !== -1) {
    cart.splice(index, 1);
  }

  handleRenderCart();
}

document.getElementById('input-pagamento').addEventListener('change', function() {
  const trocoContainer = document.getElementById('troco-container');
  if (this.value === 'Dinheiro') {
    trocoContainer.classList.remove('d-none');
  } else {
    trocoContainer.classList.add('d-none');
    document.getElementById('input-troco').value = ''; // Limpar valor
  }
});


const sendToWhatsapp = () => {
  const endereco = document.getElementById('input-endereco').value.trim();
  const pagamento = document.getElementById('input-pagamento').value;
  const troco = document.getElementById('input-troco').value.trim();
  
  if (!endereco) {
    Swal.fire({
      icon: 'warning',
      title: 'Por favor, preencha o endereço!',
      confirmButtonColor: '#3085d6'
    });
    return;
  }

  let mensagem = `📍 *Endereço de Entrega:*\n${endereco}\n\n💳 *Forma de Pagamento:* ${pagamento}`;
  if (pagamento === 'Dinheiro' && troco) {
    mensagem += `\n💰 Troco para: R$ ${troco}`;
  }

  if (cart.length > 0) {
    mensagem += '\n\n🛒 *Itens no Carrinho:*';
    cart.forEach((product, index) => {
      mensagem += `\n${index + 1}. *${product.title}*\n   ➖ Quantidade: ${product.quantity}\n   💰 Total: R$ ${product.total}`;
    });

    const totalPedido = cart.reduce((sum, item) => sum + parseFloat(item.total), 0);
    mensagem += `\n\n🛍️ *Total do Pedido:* R$ ${totalPedido.toFixed(2)}`;
  }

  const telefone = '+5583996792355';
  const url = `https://api.whatsapp.com/send?phone=${telefone}&text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
};
