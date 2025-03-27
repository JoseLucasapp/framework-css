const products = [
  {
    id: 1,
    img: 'assets/arranjo.jpg',
    title: 'Arranjo de Flores',
    price: '49.90',
    description: 'Criamos arranjos personalizados para todas as ocasiões. Faça sua encomenda e surpreenda alguém especial!',
    category: 'Arranjos'
  },
  {
    id: 2,
    img: 'assets/vasos.jpeg',
    title: 'Vasos e Plantas',
    price: '25.90',
    description: 'Oferecemos uma vasta gama de plantas e vasos para sua casa ou escritório. Encontre a opção perfeita para o seu ambiente.',
    category: 'Vasos'
  },
  {
    id: 3,
    img: 'assets/cestas.webp',
    title: 'Cestas e Presentes',
    price: '99.90',
    description: 'As melhores cestas de presente com flores frescas, chocolates e outros itens especiais para qualquer data comemorativa.',
    category: 'Cestas'
  },
  {
    id: 4,
    img: 'assets/buque.webp',
    title: 'Buquê de Rosas',
    price: '39.90',
    description: 'Buquês de rosas vermelhas e coloridas para momentos inesquecíveis.',
    category: 'Buques'
  },
  {
    id: 5,
    img: 'assets/medicinais.jpg',
    title: 'Plantas Medicinais e Aromáticas',
    price: '19.90',
    description: 'Hortelã, alecrim, lavanda e outras ervas frescas para sua casa.',
    category: 'Plantas Medicinais'
  },
  {
    id: 6,
    img: 'assets/arranjo.jpg',
    title: 'Arranjo de Flores',
    price: '49.90',
    description: 'Criamos arranjos personalizados para todas as ocasiões. Faça sua encomenda e surpreenda alguém especial!',
    category: 'Arranjos'
  },
  {
    id: 7,
    img: 'assets/vasos.jpeg',
    title: 'Vasos e Plantas',
    price: '25.90',
    description: 'Oferecemos uma vasta gama de plantas e vasos para sua casa ou escritório. Encontre a opção perfeita para o seu ambiente.',
    category: 'Vasos'
  },
  {
    id: 8,
    img: 'assets/cestas.webp',
    title: 'Cestas e Presentes',
    price: '99.90',
    description: 'As melhores cestas de presente com flores frescas, chocolates e outros itens especiais para qualquer data comemorativa.',
    category: 'Cestas'
  },
  {
    id: 9,
    img: 'assets/buque.webp',
    title: 'Buquê de Rosas',
    price: '39.90',
    description: 'Buquês de rosas vermelhas e coloridas para momentos inesquecíveis.',
    category: 'Buques'
  },
  {
    id: 10,
    img: 'assets/medicinais.jpg',
    title: 'Plantas Medicinais e Aromáticas',
    price: '19.90',
    description: 'Hortelã, alecrim, lavanda e outras ervas frescas para sua casa.',
    category: 'Plantas Medicinais'
  }
]

const productContainer = document.getElementById('product-container')

const category = document.getElementById('category')
const search = document.getElementById('search')
const sort = document.getElementById('sort')

const filterProducts = () => {
  const filteredProducts = products.filter(product => {
    return (category.value === '' || product.category === category.value) &&
      (search.value === '' || product.title.toLowerCase().includes(search.value.toLowerCase()))
  })

  if (sort.value === 'asc') {
    filteredProducts.sort((a, b) => a.price - b.price)
  } else if (sort.value === 'desc') {
    filteredProducts.sort((a, b) => b.price - a.price)
  }

  return filteredProducts
}

const renderProducts = () => {
  productContainer.innerHTML = "" 
  const filteredProducts = filterProducts()
  filteredProducts.forEach(product => {
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
            data-descricao="${product.description}" data-preco="${product.price}" data-id="${product.id}">Saiba mais</a>
          </div>
          
        </div>
      </div>
    `
    productContainer.appendChild(productCard)
  })
}


category.addEventListener('change', renderProducts)
search.addEventListener('input', renderProducts)
sort.addEventListener('change', renderProducts)

window.addEventListener('DOMContentLoaded', renderProducts)