// filters.js - Модуль фильтрации
class FiltersManager {
    constructor() {
        this.filters = {
            dateFrom: '',
            dateTo: '',
            client: '',
            status: '',
            priority: '',
            manager: ''
        };
        
        this.sortConfig = {
            field: '',
            direction: 'asc'
        };
        
        this.initEventListeners();
    }
    
    initEventListeners() {
        // Фильтры даты
        document.getElementById('date-from')?.addEventListener('change', (e) => {
            this.filters.dateFrom = e.target.value;
            this.applyFilters();
        });
        
        document.getElementById('date-to')?.addEventListener('change', (e) => {
            this.filters.dateTo = e.target.value;
            this.applyFilters();
        });
        
        // Фильтр по клиенту
        document.getElementById('client-filter')?.addEventListener('input', (e) => {
            this.filters.client = e.target.value.toLowerCase();
            this.applyFilters();
        });
        
        // Фильтр по статусу
        document.getElementById('status-filter')?.addEventListener('change', (e) => {
            this.filters.status = e.target.value;
            this.applyFilters();
        });
        
        // Фильтр по приоритету
        document.getElementById('priority-filter')?.addEventListener('change', (e) => {
            this.filters.priority = e.target.value;
            this.applyFilters();
        });
        
        // Кнопка сброса фильтров
        document.getElementById('reset-filters')?.addEventListener('click', () => {
            this.resetFilters();
        });
    }
    
    applyFilters() {
        let filteredOrders = [...demoData.orders];
        
        // Фильтрация по дате от
        if (this.filters.dateFrom) {
            filteredOrders = filteredOrders.filter(order => 
                order.order_date >= this.filters.dateFrom
            );
        }
        
        // Фильтрация по дате до
        if (this.filters.dateTo) {
            filteredOrders = filteredOrders.filter(order => 
                order.order_date <= this.filters.dateTo
            );
        }
        
        // Фильтрация по клиенту
        if (this.filters.client) {
            filteredOrders = filteredOrders.filter(order => 
                order.client_name.toLowerCase().includes(this.filters.client) ||
                order.order_name.toLowerCase().includes(this.filters.client)
            );
        }
        
        // Фильтрация по статусу
        if (this.filters.status) {
            filteredOrders = filteredOrders.filter(order => 
                order.status === this.filters.status
            );
        }
        
        // Фильтрация по приоритету
        if (this.filters.priority) {
            filteredOrders = filteredOrders.filter(order => 
                order.priority === this.filters.priority
            );
        }
        
        // Применение сортировки
        if (this.sortConfig.field) {
            filteredOrders = this.sortOrders(filteredOrders);
        }
        
        // Обновление таблицы и статистики
        if (window.tableManager) {
            window.tableManager.updateTable(filteredOrders);
            this.updateStatistics(filteredOrders);
        }
    }
    
    sortOrders(orders) {
        return orders.sort((a, b) => {
            let aVal = a[this.sortConfig.field];
            let bVal = b[this.sortConfig.field];
            
            // Обработка дат
            if (this.sortConfig.field.includes('date')) {
                aVal = new Date(aVal || '1900-01-01');
                bVal = new Date(bVal || '1900-01-01');
            }
            
            // Обработка чисел
            if (typeof aVal === 'number') {
                return this.sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
            }
            
            // Обработка строк
            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }
            
            if (this.sortConfig.direction === 'asc') {
                return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
            } else {
                return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
            }
        });
    }
    
    setSortConfig(field) {
        if (this.sortConfig.field === field) {
            this.sortConfig.direction = this.sortConfig.direction === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortConfig.field = field;
            this.sortConfig.direction = 'asc';
        }
        
        this.updateSortIndicators();
        this.applyFilters();
    }
    
    updateSortIndicators() {
        // Сбрасываем все индикаторы сортировки
        document.querySelectorAll('.sortable').forEach(th => {
            th.classList.remove('sorted-asc', 'sorted-desc');
        });
        
        // Устанавливаем индикатор для текущего поля
        if (this.sortConfig.field) {
            const currentTh = document.querySelector(`[data-sort="${this.sortConfig.field}"]`);
            if (currentTh) {
                currentTh.classList.add(`sorted-${this.sortConfig.direction}`);
            }
        }
    }
    
    resetFilters() {
        this.filters = {
            dateFrom: '',
            dateTo: '',
            client: '',
            status: '',
            priority: '',
            manager: ''
        };
        
        // Сброс значений в форме
        document.getElementById('date-from').value = '';
        document.getElementById('date-to').value = '';
        document.getElementById('client-filter').value = '';
        document.getElementById('status-filter').value = '';
        document.getElementById('priority-filter').value = '';
        
        this.applyFilters();
    }
    
    updateStatistics(orders) {
        const totalOrders = orders.length;
        const activeOrders = orders.filter(order => 
            order.status === 'Принят' || order.status === 'В производстве'
        ).length;
        const readyOrders = orders.filter(order => 
            order.status === 'Готов к выдаче'
        ).length;
        const totalAmount = orders.reduce((sum, order) => sum + order.discounted_amount, 0);
        
        document.getElementById('total-orders').textContent = totalOrders;
        document.getElementById('active-orders').textContent = activeOrders;
        document.getElementById('ready-orders').textContent = readyOrders;
        document.getElementById('total-amount').textContent = formatCurrency(totalAmount);
    }
    
    getFilteredOrders() {
        this.applyFilters();
        return window.tableManager?.getCurrentOrders() || demoData.orders;
    }
}

// Экспорт для использования в других модулях
window.FiltersManager = FiltersManager;