

document.addEventListener('DOMContentLoaded', () => {
    // 1. Selector de Elementos del DOM Comunes (están en todas las páginas con sidebar)
    const sideMenu = document.querySelector("aside.aside-JE");
    const menuBtn = document.querySelector("#menu-btn-JE");
    const closeBtn = document.querySelector("#close-btn-JE");
    const themeToggler = document.querySelector(".theme-toggler-JE");

    // 2. Funcionalidad para la barra lateral (Sidebar Toggle)
    if (menuBtn && sideMenu && closeBtn) {
        menuBtn.addEventListener('click', () => {
            sideMenu.style.display = 'block';
        });

        closeBtn.addEventListener('click', () => {
            sideMenu.style.display = 'none';
        });
    }

    // 3. Funcionalidad para el cambio de tema (Modo Oscuro/Claro)
    if (themeToggler) {
        themeToggler.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme-variables');

            // Cambiar el estado 'active' de los iconos de luz/oscuridad
            themeToggler.querySelector('span:nth-child(1)').classList.toggle('active-JE');
            themeToggler.querySelector('span:nth-child(2)').classList.toggle('active-JE');

            // Opcional: Guardar la preferencia del usuario en localStorage
            if (document.body.classList.contains('dark-theme-variables')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });

        // Opcional: Cargar la preferencia de tema al cargar la página
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme-variables');
            // Asegurarse de que el ícono de dark_mode esté activo y light_mode inactivo
            themeToggler.querySelector('span:nth-child(1)').classList.remove('active-JE');
            themeToggler.querySelector('span:nth-child(2)').classList.add('active-JE');
        } else {
            // Asegurarse de que el ícono de light_mode esté activo y dark_mode inactivo
            themeToggler.querySelector('span:nth-child(1)').classList.add('active-JE');
            themeToggler.querySelector('span:nth-child(2)').classList.remove('active-JE');
        }
    }

    // 4. Lógica de Pedidos (Simulación de Datos)
    // ESTA PARTE SOLO SE EJECUTARÁ SI LOS ELEMENTOS DE PEDIDOS ESTÁN EN LA PÁGINA
    const tableBody = document.querySelector('.recent-orders-JE table tbody');
    const searchInput = document.querySelector('.search-bar input[type="text"]');
    const addOrderBtn = document.querySelector('.add-order-btn');
    const dateInput = document.querySelector('.date-JE input[type="date"]');

    // Solo inicializar la lógica de pedidos si los elementos específicos están presentes
    if (tableBody && searchInput && addOrderBtn && dateInput) {
        const pizzaOrders = [
            {
                id: '#00123',
                cliente: 'Ana López',
                producto: 'Pizza Pepperoni Familiar',
                fecha: '2025-05-28',
                estadoPago: 'Pagado',
                estadoEnvio: 'Entregado',
                total: '$18.50'
            },
            {
                id: '#00124',
                cliente: 'Juan Pérez',
                producto: 'Pizza Hawaiana Mediana',
                fecha: '2025-05-28',
                estadoPago: 'Pendiente',
                estadoEnvio: 'En Preparación',
                total: '$15.00'
            },
            {
                id: '#00125',
                cliente: 'María García',
                producto: 'Pizza Vegetariana Personal',
                fecha: '2025-05-27',
                estadoPago: 'Pagado',
                estadoEnvio: 'Cancelado',
                total: '$10.75'
            },
            {
                id: '#00126',
                cliente: 'Carlos Ruiz',
                producto: 'Pizza Americana Grande',
                fecha: '2025-05-27',
                estadoPago: 'Pagado',
                estadoEnvio: 'En Reparto',
                total: '$17.20'
            },
            {
                id: '#00127',
                cliente: 'Laura Flores',
                producto: 'Pizza de Pollo y Champiñones',
                fecha: '2025-05-26',
                estadoPago: 'Pendiente',
                estadoEnvio: 'En Cola',
                total: '$16.00'
            },
            {
                id: '#00128',
                cliente: 'Pedro Sánchez',
                producto: 'Pizza Meat Lover Familiar',
                fecha: '2025-05-26',
                estadoPago: 'Pagado',
                estadoEnvio: 'Entregado',
                total: '$20.00'
            }
        ];

        // Función para renderizar los pedidos en la tabla
        function renderPizzaOrders(ordersToRender) {
            tableBody.innerHTML = ''; // Limpiar la tabla antes de renderizar

            ordersToRender.forEach(order => {
                const tr = document.createElement('tr');

                let paymentStatusClass = '';
                switch (order.estadoPago) {
                    case 'Pagado':
                        paymentStatusClass = 'exito-JE';
                        break;
                    case 'Pendiente':
                        paymentStatusClass = 'advertencia-JE';
                        break;
                    default:
                        paymentStatusClass = '';
                }

                let shippingStatusClass = '';
                switch (order.estadoEnvio) {
                    case 'Entregado':
                    case 'En Reparto':
                        shippingStatusClass = 'exito-JE';
                        break;
                    case 'Cancelado':
                        shippingStatusClass = 'peligro-JE';
                        break;
                    case 'En Preparación':
                    case 'En Cola':
                        shippingStatusClass = 'advertencia-JE';
                        break;
                    default:
                        shippingStatusClass = '';
                }

                tr.innerHTML = `
                    <td>${order.id}</td>
                    <td>${order.cliente}</td>
                    <td>${order.producto}</td>
                    <td>${order.fecha}</td>
                    <td class="${paymentStatusClass}">${order.estadoPago}</td>
                    <td class="${shippingStatusClass}">${order.estadoEnvio}</td>
                    <td>${order.total}</td>
                    <td class="primario-JE">Ver</td>
                `;
                tableBody.appendChild(tr);
            });
        }

        // Renderizar los pedidos iniciales al cargar la página de pedidos
        renderPizzaOrders(pizzaOrders);

        // Funcionalidad de Búsqueda
        searchInput.addEventListener('input', (event) => {
            const searchTerm = event.target.value.toLowerCase();
            const filteredOrders = pizzaOrders.filter(order =>
                order.cliente.toLowerCase().includes(searchTerm) ||
                order.producto.toLowerCase().includes(searchTerm) ||
                order.id.toLowerCase().includes(searchTerm)
            );
            renderPizzaOrders(filteredOrders);
        });

        // Funcionalidad del botón "Nuevo Pedido"
        addOrderBtn.addEventListener('click', () => {
            alert('¡Botón "Nuevo Pedido" clicado! Aquí se abriría un formulario o modal para añadir un nuevo pedido.');
        });

        // Funcionalidad del filtro de fecha
        dateInput.addEventListener('change', (event) => {
            const selectedDate = event.target.value;
            if (selectedDate) {
                const filteredByDate = pizzaOrders.filter(order => order.fecha === selectedDate);
                renderPizzaOrders(filteredByDate);
            } else {
                renderPizzaOrders(pizzaOrders); // Si la fecha se borra, mostrar todos
            }
        });
    }
});