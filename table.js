// table.js - Модуль управления таблицей
class TableManager {
    constructor() {
        this.currentOrders = [...demoData.orders];
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.totalPages = 1;
        
        this.initEventListeners();
        this.updateTable(this.currentOrders);
    }
    
    initEventListeners() {
        // Сортировка по заголовкам таблицы
        document.querySelectorAll('.sortable').forEach(th => {
            th.addEventListener('click', () => {
                const sortField = th.getAttribute('data-sort');
                if (window.filtersManager) {
                    window.filtersManager.setSortConfig(sortField);
                }
            });
        });
    }
    
    updateTable(orders) {
        this.currentOrders = orders;
        this.calculatePagination();
        this.renderTable();
        this.renderPagination();
    }
    
    calculatePagination() {
        this.totalPages = Math.ceil(this.currentOrders.length / this.itemsPerPage);
        if (this.currentPage > this.totalPages) {
            this.currentPage = 1;
        }
    }
    
    renderTable() {
        const tbody = document.getElementById('orders-tbody');
        if (!tbody) return;
        
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageOrders = this.currentOrders.slice(startIndex, endIndex);
        
        tbody.innerHTML = pageOrders.map(order => this.createOrderRow(order)).join('');
        
        // Добавляем обработчики событий для кнопок действий
        this.attachRowEventListeners();
    }
    
    createOrderRow(order) {
        const manager = getEmployeeById(order.manager_id);
        const statusClass = this.getStatusClass(order.status);
        const priorityClass = this.getPriorityClass(order.priority);
        
        const isOverdue = new Date(order.planned_completion_date) < new Date() && 
                         order.status !== 'Выполнен' && order.status !== 'Готов к выдаче';
        
        return `
            <tr class="order-row ${isOverdue ? 'overdue' : ''}" data-order-id="${order.order_id}">
                <td><strong>#${order.order_id}</strong></td>
                <td>${formatDate(order.order_date)}</td>
                <td>
                    <div class="client-info">
                        <div class="client-name">${order.client_name}</div>
                        <div class="order-name">${order.order_name}</div>
                    </div>
                </td>
                <td>
                    <a href="tel:${order.client_phone}" class="phone-link">
                        ${order.client_phone}
                    </a>
                </td>
                <td>
                    <div class="amount-info">
                        <div class="discounted-amount">${formatCurrency(order.discounted_amount)}</div>
                        ${order.discount > 0 ? `<div class="original-amount">${formatCurrency(order.total_amount)}</div>` : ''}
                    </div>
                </td>
                <td><span class="priority-badge ${priorityClass}">${order.priority}</span></td>
                <td><span class="status-badge ${statusClass}">${order.status}</span></td>
                <td>
                    <div class="date-info">
                        <div class="planned-date">${formatDate(order.planned_completion_date)}</div>
                        ${isOverdue ? '<div class="overdue-label">Просрочен</div>' : ''}
                    </div>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn view" title="Просмотр" data-action="view" data-order-id="${order.order_id}">👁</button>
                        <button class="action-btn edit" title="Редактировать" data-action="edit" data-order-id="${order.order_id}">✏</button>
                        <button class="action-btn delete" title="Удалить" data-action="delete" data-order-id="${order.order_id}">🗑</button>
                    </div>
                </td>
            </tr>
        `;
    }
    
    attachRowEventListeners() {
        // Клик по строке для просмотра
        document.querySelectorAll('.order-row').forEach(row => {
            row.addEventListener('click', (e) => {
                if (!e.target.closest('.action-buttons')) {
                    const orderId = row.dataset.orderId;
                    this.viewOrder(orderId);
                }
            });
        });
        
        // Кнопки действий
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = btn.dataset.action;
                const orderId = btn.dataset.orderId;
                
                switch (action) {
                    case 'view':
                        this.viewOrder(orderId);
                        break;
                    case 'edit':
                        this.editOrder(orderId);
                        break;
                    case 'delete':
                        this.deleteOrder(orderId);
                        break;
                }
            });
        });
    }
    
    renderPagination() {
        const pagination = document.getElementById('pagination');
        if (!pagination) return;
        
        let paginationHTML = '';
        
        // Кнопка "Предыдущая"
        paginationHTML += `
            <button ${this.currentPage === 1 ? 'disabled' : ''} onclick="window.tableManager.goToPage(${this.currentPage - 1})">
                ← Предыдущая
            </button>
        `;
        
        // Номера страниц
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(this.totalPages, this.currentPage + 2);
        
        if (startPage > 1) {
            paginationHTML += `<button onclick="window.tableManager.goToPage(1)">1</button>`;
            if (startPage > 2) {
                paginationHTML += `<span>...</span>`;
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <button class="${i === this.currentPage ? 'active' : ''}" onclick="window.tableManager.goToPage(${i})">
                    ${i}
                </button>
            `;
        }
        
        if (endPage < this.totalPages) {
            if (endPage < this.totalPages - 1) {
                paginationHTML += `<span>...</span>`;
            }
            paginationHTML += `<button onclick="window.tableManager.goToPage(${this.totalPages})">${this.totalPages}</button>`;
        }
        
        // Кнопка "Следующая"
        paginationHTML += `
            <button ${this.currentPage === this.totalPages ? 'disabled' : ''} onclick="window.tableManager.goToPage(${this.currentPage + 1})">
                Следующая →
            </button>
        `;
        
        pagination.innerHTML = paginationHTML;
        
        // Информация о страницах
        const totalItems = this.currentOrders.length;
        const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
        const endItem = Math.min(this.currentPage * this.itemsPerPage, totalItems);
        
        pagination.innerHTML += `
            <div class="pagination-info">
                Показано ${startItem}-${endItem} из ${totalItems} записей
            </div>
        `;
    }
    
    goToPage(page) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.renderTable();
            this.renderPagination();
        }
    }
    
    getStatusClass(status) {
        const statusMap = {
            'Принят': 'status-accepted',
            'В производстве': 'status-production',
            'Готов к выдаче': 'status-ready',
            'Выполнен': 'status-completed'
        };
        return statusMap[status] || '';
    }
    
    getPriorityClass(priority) {
        const priorityMap = {
            'Высокий': 'priority-high',
            'Средний': 'priority-medium',
            'Низкий': 'priority-low'
        };
        return priorityMap[priority] || '';
    }
    
    viewOrder(orderId) {
        const order = demoData.orders.find(o => o.order_id == orderId);
        if (order) {
            window.showMessage(`Просмотр заказа #${orderId}: ${order.order_name}`, 'success');
            // Здесь можно открыть модальное окно с деталями заказа
        }
    }
    
    editOrder(orderId) {
        const order = demoData.orders.find(o => o.order_id == orderId);
        if (order && window.orderFormManager) {
            window.orderFormManager.editOrder(order);
            window.showPage('new-order');
        }
    }
    
    deleteOrder(orderId) {
        if (confirm('Вы уверены, что хотите удалить этот заказ?')) {
            const index = demoData.orders.findIndex(o => o.order_id == orderId);
            if (index !== -1) {
                demoData.orders.splice(index, 1);
                window.showMessage(`Заказ #${orderId} удален`, 'success');
                if (window.filtersManager) {
                    window.filtersManager.applyFilters();
                }
            }
        }
    }
    
    getCurrentOrders() {
        return this.currentOrders;
    }
}

// Экспорт для использования в других модулях
window.TableManager = TableManager;