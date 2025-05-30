// Datos de ejemplo para productos
let products = [
  {
    id: 1,
    name: "Smartphone Galaxy Pro",
    sku: "SGP-001",
    category: "electronicos",
    brand: "Samsung",
    price: 899.99,
    cost: 650.00,
    stock: 45,
    minStock: 10,
    active: true,
    featured: true,
    image: "/placeholder.svg?height=60&width=60"
  },
  {
    id: 2,
    name: "Laptop Gaming X1",
    sku: "LGX-002",
    category: "electronicos",
    brand: "ASUS",
    price: 1299.99,
    cost: 950.00,
    stock: 23,
    minStock: 5,
    active: true,
    featured: false,
    image: "/placeholder.svg?height=60&width=60"
  },
  {
    id: 3,
    name: "Auriculares Wireless Pro",
    sku: "AWP-003",
    category: "electronicos",
    brand: "Sony",
    price: 199.99,
    cost: 120.00,
    stock: 78,
    minStock: 15,
    active: true,
    featured: true,
    image: "/placeholder.svg?height=60&width=60"
  },
  {
    id: 4,
    name: "Camiseta Deportiva",
    sku: "CD-004",
    category: "ropa",
    brand: "Nike",
    price: 29.99,
    cost: 15.00,
    stock: 156,
    minStock: 20,
    active: true,
    featured: false,
    image: "/placeholder.svg?height=60&width=60"
  },
  {
    id: 5,
    name: "Smartwatch Series 5",
    sku: "SW5-005",
    category: "electronicos",
    brand: "Apple",
    price: 399.99,
    cost: 280.00,
    stock: 0,
    minStock: 10,
    active: false,
    featured: false,
    image: "/placeholder.svg?height=60&width=60"
  }
];

let currentPage = 1;
const itemsPerPage = 10;
let filteredProducts = [...products];
let editingProductId = null;

document.addEventListener('DOMContentLoaded', function () {
  // Inicializar pestañas
  initTabs();

  // Inicializar tabla de productos
  renderProductsTable();

  // Inicializar eventos
  initEvents();
});

function initTabs() {
  const tabItems = document.querySelectorAll('.tab-item-JE');
  const tabPanes = document.querySelectorAll('.tab-pane-JE');

  tabItems.forEach(item => {
    item.addEventListener('click', function () {
      tabItems.forEach(tab => tab.classList.remove('active-tab-JE'));
      tabPanes.forEach(pane => pane.classList.remove('active-pane-JE'));

      this.classList.add('active-tab-JE');

      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active-pane-JE');
    });
  });
}

function initEvents() {
  // Botones agregar producto (tanto del main como del sidebar)
  document.getElementById('addProductBtn').addEventListener('click', function () {
    showTab('form');
    resetForm();
    editingProductId = null;
    document.getElementById('formTitle').textContent = 'Agregar Nuevo Producto';
    document.getElementById('submitText').textContent = 'Guardar Producto';
  });

  // Búsqueda
  document.getElementById('searchInput').addEventListener('input', function () {
    filterProducts();
  });

  // Filtros
  document.getElementById('categoryFilter').addEventListener('change', filterProducts);
  document.getElementById('statusFilter').addEventListener('change', filterProducts);

  // Limpiar filtros
  document.getElementById('clearFilters').addEventListener('click', function () {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('statusFilter').value = '';
    filterProducts();
  });

  // Formulario
  document.getElementById('productForm').addEventListener('submit', handleFormSubmit);
  document.getElementById('resetForm').addEventListener('click', resetForm);
  document.getElementById('cancelForm').addEventListener('click', function () {
    showTab('products');
  });

  // Upload de imagen
  document.getElementById('imagePreview').addEventListener('click', function () {
    document.getElementById('productImage').click();
  });

  document.getElementById('productImage').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const preview = document.getElementById('imagePreview');
        preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
      };
      reader.readAsDataURL(file);
    }
  });

  // Select all checkbox
  document.getElementById('selectAll').addEventListener('change', function () {
    const checkboxes = document.querySelectorAll('.product-checkbox');
    checkboxes.forEach(checkbox => {
      checkbox.checked = this.checked;
    });
    updateBulkActions();
  });

  // Modal
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalCancel').addEventListener('click', closeModal);

  // Acciones rápidas del sidebar
  document.getElementById('importProductsBtn').addEventListener('click', function () {
    alert('Funcionalidad de importación en desarrollo...');
  });

  document.getElementById('exportProductsBtn').addEventListener('click', function () {
    alert('Funcionalidad de exportación en desarrollo...');
  });
}

function showTab(tabName) {
  const tabItems = document.querySelectorAll('.tab-item-JE');
  const tabPanes = document.querySelectorAll('.tab-pane-JE');

  tabItems.forEach(tab => tab.classList.remove('active-tab-JE'));
  tabPanes.forEach(pane => pane.classList.remove('active-pane-JE'));

  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active-tab-JE');
  document.getElementById(tabName).classList.add('active-pane-JE');
}

function filterProducts() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const categoryFilter = document.getElementById('categoryFilter').value;
  const statusFilter = document.getElementById('statusFilter').value;

  filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
      product.sku.toLowerCase().includes(searchTerm);
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    const matchesStatus = !statusFilter ||
      (statusFilter === 'activo' && product.active) ||
      (statusFilter === 'inactivo' && !product.active) ||
      (statusFilter === 'agotado' && product.stock === 0);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  currentPage = 1;
  renderProductsTable();
}

function renderProductsTable() {
  const tbody = document.getElementById('productsTableBody');
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageProducts = filteredProducts.slice(startIndex, endIndex);

  tbody.innerHTML = '';

  pageProducts.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
          <td>
            <input type="checkbox" class="product-checkbox" data-id="${product.id}">
          </td>
          <td>
            <img src="${product.image}" alt="${product.name}" class="product-image-small-JE">
          </td>
          <td>
            <div class="product-name-JE">
              <h4 class="h4-JE">${product.name}</h4>
              <p class="p-JE text-muted-JE">${product.sku}</p>
            </div>
          </td>
          <td>${getCategoryName(product.category)}</td>
          <td>$${product.price.toFixed(2)}</td>
          <td>
            <span class="stock-badge-JE ${getStockClass(product.stock, product.minStock)}">
              ${product.stock}
            </span>
          </td>
          <td>
            <span class="status-badge-JE ${product.active ? 'active' : 'inactive'}">
              ${product.active ? 'Activo' : 'Inactivo'}
            </span>
          </td>
          <td>
            <div class="action-buttons-JE">
              <button class="btn-icon-JE" onclick="editProduct(${product.id})" title="Editar">
                <span class="material-icons-sharp">edit</span>
              </button>
              <button class="btn-icon-JE" onclick="toggleProductStatus(${product.id})" title="${product.active ? 'Desactivar' : 'Activar'}">
                <span class="material-icons-sharp">${product.active ? 'visibility_off' : 'visibility'}</span>
              </button>
              <button class="btn-icon-JE danger" onclick="deleteProduct(${product.id})" title="Eliminar">
                <span class="material-icons-sharp">delete</span>
              </button>
            </div>
          </td>
        `;
    tbody.appendChild(row);
  });

  // Agregar event listeners a los checkboxes
  document.querySelectorAll('.product-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', updateBulkActions);
  });

  updatePagination();
}

function getCategoryName(category) {
  const categories = {
    'electronicos': 'Electrónicos',
    'ropa': 'Ropa',
    'hogar': 'Hogar',
    'deportes': 'Deportes'
  };
  return categories[category] || category;
}

function getStockClass(stock, minStock) {
  if (stock === 0) return 'out-of-stock';
  if (stock <= minStock) return 'low-stock';
  return 'in-stock';
}

function updateBulkActions() {
  const selectedCheckboxes = document.querySelectorAll('.product-checkbox:checked');
  const bulkActions = document.getElementById('bulkActions');
  const selectedCount = document.getElementById('selectedCount');

  if (selectedCheckboxes.length > 0) {
    bulkActions.style.display = 'flex';
    selectedCount.textContent = selectedCheckboxes.length;
  } else {
    bulkActions.style.display = 'none';
  }
}

function updatePagination() {
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  document.getElementById('currentPage').textContent = currentPage;
  document.getElementById('totalPages').textContent = totalPages;

  document.getElementById('prevPage').disabled = currentPage === 1;
  document.getElementById('nextPage').disabled = currentPage === totalPages;
}

function editProduct(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  editingProductId = id;
  showTab('form');

  // Llenar el formulario con los datos del producto
  document.getElementById('productName').value = product.name;
  document.getElementById('productSku').value = product.sku;
  document.getElementById('productCategory').value = product.category;
  document.getElementById('productBrand').value = product.brand || '';
  document.getElementById('productDescription').value = product.description || '';
  document.getElementById('productPrice').value = product.price;
  document.getElementById('productCost').value = product.cost || '';
  document.getElementById('productStock').value = product.stock;
  document.getElementById('productMinStock').value = product.minStock || '';
  document.getElementById('productActive').checked = product.active;
  document.getElementById('productFeatured').checked = product.featured;

  if (product.image) {
    document.getElementById('imagePreview').innerHTML = `<img src="${product.image}" alt="Preview">`;
  }

  document.getElementById('formTitle').textContent = 'Editar Producto';
  document.getElementById('submitText').textContent = 'Actualizar Producto';
}

function toggleProductStatus(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    product.active = !product.active;
    renderProductsTable();
  }
}

function deleteProduct(id) {
  showModal(
    'Eliminar Producto',
    '¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.',
    () => {
      products = products.filter(p => p.id !== id);
      filteredProducts = filteredProducts.filter(p => p.id !== id);
      renderProductsTable();
      closeModal();
    }
  );
}

function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const productData = {
    name: formData.get('name'),
    sku: formData.get('sku'),
    category: formData.get('category'),
    brand: formData.get('brand'),
    description: formData.get('description'),
    price: parseFloat(formData.get('price')),
    cost: parseFloat(formData.get('cost')) || 0,
    stock: parseInt(formData.get('stock')),
    minStock: parseInt(formData.get('minStock')) || 0,
    active: formData.get('active') === 'on',
    featured: formData.get('featured') === 'on',
    image: "/placeholder.svg?height=60&width=60"
  };

  if (editingProductId) {
    // Actualizar producto existente
    const index = products.findIndex(p => p.id === editingProductId);
    if (index !== -1) {
      products[index] = { ...products[index], ...productData };
    }
  } else {
    // Agregar nuevo producto
    const newId = Math.max(...products.map(p => p.id)) + 1;
    products.push({ id: newId, ...productData });
  }

  filterProducts();
  showTab('products');
  resetForm();

  // Mostrar mensaje de éxito
  alert(editingProductId ? 'Producto actualizado correctamente' : 'Producto agregado correctamente');
}

function resetForm() {
  document.getElementById('productForm').reset();
  document.getElementById('imagePreview').innerHTML = `
        <span class="material-icons-sharp">add_photo_alternate</span>
        <p class="p-JE">Haz clic para subir una imagen</p>
      `;
  editingProductId = null;
}

function showModal(title, message, onConfirm) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalMessage').textContent = message;
  document.getElementById('confirmModal').style.display = 'flex';

  document.getElementById('modalConfirm').onclick = onConfirm;
}

function closeModal() {
  document.getElementById('confirmModal').style.display = 'none';
}
