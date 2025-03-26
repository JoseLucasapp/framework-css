const products = [
  {
    id: 1,
    img: 'assets/arranjo.jpg',
    title: 'Arranjo de Flores',
    price: '49.90',
    description: 'Criamos arranjos personalizados para todas as ocasiões. Faça sua encomenda e surpreenda alguém especial!'
  },
  {
    id: 2,
    img: 'assets/vasos.jpeg',
    title: 'Vasos e Plantas',
    price: '25.90',
    description: 'Oferecemos uma vasta gama de plantas e vasos para sua casa ou escritório. Encontre a opção perfeita para o seu ambiente.'
  },
  {
    id: 3,
    img: 'assets/cestas.webp',
    title: 'Cestas e Presentes',
    price: '99.90',
    description: 'As melhores cestas de presente com flores frescas, chocolates e outros itens especiais para qualquer data comemorativa.'
  },
  {
    id: 4,
    img: 'assets/buque.webp',
    title: 'Buquê de Rosas',
    price: '39.90',
    description: 'Buquês de rosas vermelhas e coloridas para momentos inesquecíveis.'
  },
  {
    id: 5,
    img: 'assets/medicinais.jpg',
    title: 'Plantas Medicinais e Aromáticas',
    price: '19.90',
    description: 'Hortelã, alecrim, lavanda e outras ervas frescas para sua casa.'
  },
  {
    id: 6,
    img: 'assets/arranjo.jpg',
    title: 'Arranjo de Flores',
    price: '49.90',
    description: 'Criamos arranjos personalizados para todas as ocasiões. Faça sua encomenda e surpreenda alguém especial!'
  },
  {
    id: 7,
    img: 'assets/vasos.jpeg',
    title: 'Vasos e Plantas',
    price: '25.90',
    description: 'Oferecemos uma vasta gama de plantas e vasos para sua casa ou escritório. Encontre a opção perfeita para o seu ambiente.'
  },
  {
    id: 8,
    img: 'assets/cestas.webp',
    title: 'Cestas e Presentes',
    price: '99.90',
    description: 'As melhores cestas de presente com flores frescas, chocolates e outros itens especiais para qualquer data comemorativa.'
  }
]

const productContainer = document.getElementById('product-container')

window.addEventListener('DOMContentLoaded', () => {
  products.forEach(product => {
    const productCard = document.createElement('div')
    productCard.classList.add('col-lg-4', 'col-md-6', 'col-sm-12', 'mb-4')
    productCard.innerHTML = `
      <div class="card service-card shadow-lg" id="open-card">
        <img src="${product.img}" class="card-img-top" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <h4 class="text-danger"> ${product.price}</h4>
          <div>
            <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#servicoModal"
            data-img="${product.img}" data-titulo="${product.title}"
            data-descricao="${product.description}" data-preco="${product.price}">Saiba mais</a>
          </div>
          
        </div>
      </div>
    `
    productContainer.appendChild(productCard)
  })
})