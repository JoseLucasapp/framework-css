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
    category: 'Flores'
  },
  {
    id: 4,
    img: 'assets/buque.webp',
    title: 'Buquê de Rosas',
    price: '39.90',
    description: 'Buquês de rosas vermelhas e coloridas para momentos inesquecíveis.',
    category: 'Flores'
  },
  {
    id: 6,
    img: 'assets/orquidea.webp',
    title: 'Orquídea Branca',
    price: '89.90',
    description: 'Linda orquídea branca para decoração ou presente.',
    category: 'Orquideas'
  },
  {
    id: 7,
    img: 'assets/vaso_pequeno.webp',
    title: 'Vaso Pequeno',
    price: '15.90',
    description: 'Vaso pequeno ideal para suculentas e pequenos arranjos.',
    category: 'Vasos'
  },
  {
    id: 8,
    img: 'assets/suculentas.webp',
    title: 'Kit Suculentas',
    price: '35.90',
    description: 'Kit com três suculentas em vasos decorativos.',
    category: 'Planta'
  },
  {
    id: 9,
    img: 'assets/arranjo_colorido.jpg',
    title: 'Arranjo Colorido',
    price: '59.90',
    description: 'Arranjo com diversas flores coloridas para alegrar o ambiente.',
    category: 'Arranjos'
  },
  {
    id: 11,
    img: 'assets/orquidea_roxa.jpg',
    title: 'Orquídea Roxa',
    price: '95.90',
    description: 'Elegante orquídea roxa para presentear alguém especial.',
    category: 'Orquideas'
  },
  {
    id: 13,
    img: 'assets/bonsai.webp',
    title: 'Bonsai Japonês',
    price: '120.00',
    description: 'Bonsai de alta qualidade para decoração sofisticada.',
    category: 'Planta'
  },
  {
    id: 14,
    img: 'assets/vaso_medio.webp',
    title: 'Vaso Médio de Cerâmica',
    price: '32.90',
    description: 'Vaso de cerâmica médio, ideal para plantas médias.',
    category: 'Vasos'
  },
  {
    id: 16,
    img: 'assets/arranjo_elegante.webp',
    title: 'Arranjo Elegante',
    price: '79.90',
    description: 'Arranjo sofisticado com flores selecionadas.',
    category: 'Arranjos'
  },
  {
    id: 17,
    img: 'assets/orquidea_amarela.jpg',
    title: 'Orquídea Amarela',
    price: '85.90',
    description: 'Orquídea amarela vibrante para iluminar seu espaço.',
    category: 'Orquideas'
  },
  {
    id: 18,
    img: 'assets/samambaia.jpg',
    title: 'Samambaia',
    price: '45.90',
    description: 'Samambaia verde exuberante para decorar ambientes internos.',
    category: 'Planta'
  }
];


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
  }else if (sort.value === 'za') {
    filteredProducts.sort((a, b) => b.title.localeCompare(a.title))
  }else if (sort.value === 'az') {
    filteredProducts.sort((a, b) => a.title.localeCompare(b.title))
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
          <h4 class="text-danger">R$ ${product.price}</h4>
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