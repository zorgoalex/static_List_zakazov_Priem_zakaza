// popups.js - Модуль управления модальными окнами и формами
class OrderFormManager {
    constructor() {
        this.isEditMode = false;
        this.currentOrderId = null;
        this.currentDetails = [];
        this.editingDetailIndex = -1;
        
        this.initEventListeners();
        this.populateSelects();
        this.initClientAutocomplete();
    }
    
    initEventListeners() {
        // Кнопки управления формой
        document.getElementById('add-order-btn')?.addEventListener('click', () => {
            this.showNewOrderForm();
        });
        
        document.getElementById('cancel-order')?.addEventListener('click', () => {
            this.cancelOrder();
        });
        
        document.getElementById('save-draft')?.addEventListener('click', () => {
            this.saveDraft();
        });
        
        document.getElementById('save-order')?.addEventListener('click', () => {
            this.saveOrder();
        });
        
        // Управление деталями
        document.getElementById('add-detail')?.addEventListener('click', () => {
            this.showDetailModal();
        });
        
        // Модальное окно деталей
        document.getElementById('close-detail-modal')?.addEventListener('click', () => {
            this.closeDetailModal();
        });
        
        document.getElementById('cancel-detail')?.addEventListener('click', () => {
            this.closeDetailModal();
        });
        
        document.getElementById('save-detail')?.addEventListener('click', () => {
            this.saveDetail();
        });
        
        // Расчет площади деталей
        document.getElementById('detail-width')?.addEventListener('input', () => {
            this.calculateDetailArea();
        });
        
        document.getElementById('detail-height')?.addEventListener('input', () => {
            this.calculateDetailArea();
        });
        
        // Расчет скидки
        document.getElementById('discount')?.addEventListener('input', () => {
            this.calculateDiscountedAmount();
        });
        
        document.getElementById('total-amount-input')?.addEventListener('input', () => {
            this.calculateDiscountedAmount();
        });
        
        // Установка даты заказа по умолчанию
        document.getElementById('order-date').value = new Date().toISOString().split('T')[0];
        
        // Установка плановой даты завершения (через 2 недели)
        const plannedDate = new Date();
        plannedDate.setDate(plannedDate.getDate() + 14);
        document.getElementById('planned-completion').value = plannedDate.toISOString().split('T')[0];
    }
    
    populateSelects() {
        // Заполнение списка материалов
        const materialSelect = document.getElementById('main-material');
        const detailMaterialSelect = document.getElementById('detail-material');
        
        demoData.materials.forEach(material => {
            const option = new Option(material.material_name, material.material_id);
            materialSelect?.appendChild(option.cloneNode(true));
            detailMaterialSelect?.appendChild(option);
        });
        
        // Заполнение типов кромок
        const edgeSelect = document.getElementById('edge-type');
        const detailEdgeSelect = document.getElementById('detail-edge');
        
        demoData.edgeTypes.forEach(edge => {
            const option = new Option(edge.edge_type_name, edge.edge_type_id);
            edgeSelect?.appendChild(option.cloneNode(true));
            detailEdgeSelect?.appendChild(option);
        });
        
        // Заполнение пленок
        const filmSelect = document.getElementById('film');
        const detailFilmSelect = document.getElementById('detail-film');
        
        demoData.films.forEach(film => {
            const option = new Option(film.film_name, film.film_id);
            filmSelect?.appendChild(option.cloneNode(true));
            detailFilmSelect?.appendChild(option);
        });
        
        // Заполнение типов фрезеровки
        const millingSelect = document.getElementById('milling-type');
        
        demoData.millingTypes.forEach(milling => {
            const option = new Option(milling.milling_type_name, milling.milling_type_id);
            millingSelect?.appendChild(option);
        });
    }
    
    initClientAutocomplete() {
        const clientInput = document.getElementById('client-name');
        const clientPhone = document.getElementById('client-phone');
        const suggestionsDiv = document.getElementById('client-suggestions');
        
        clientInput?.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            
            if (query.length < 2) {
                suggestionsDiv.style.display = 'none';
                return;
            }
            
        clientInput?.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            
            if (query.length < 2) {
                suggestionsDiv.style.display = 'none';
                return;
            }
            
            const matches = demoData.clients.filter(client => 
                client.client_name.toLowerCase().includes(query)
            );
            
            if (matches.length > 0) {
                suggestionsDiv.innerHTML = matches.map(client => 
                    `<div class="client-suggestion" data-client-id="${client.client_id}">
                        <div class="client-name">${client.client_name}</div>
                        <div class="client-phone">${client.phones[0]}</div>
                    </div>`
                ).join('');
                
                suggestionsDiv.style.display = 'block';
                
                // Обработчики клика по предложениям
                suggestionsDiv.querySelectorAll('.client-suggestion').forEach(suggestion => {
                    suggestion.addEventListener('click', () => {
                        const clientId = suggestion.dataset.clientId;
                        const client = demoData.clients.find(c => c.client_id == clientId);
                        
                        clientInput.value = client.client_name;
                        clientPhone.value = client.phones[0];
                        suggestionsDiv.style.display = 'none';
                    });
                });
            } else {
                suggestionsDiv.style.display = 'none';
            }
        });
        
        // Скрытие подсказок при клике вне поля
        document.addEventListener('click', (e) => {
            if (!clientInput?.contains(e.target) && !suggestionsDiv?.contains(e.target)) {
                suggestionsDiv.style.display = 'none';
            }
        });
    }
    
    showNewOrderForm() {
        this.resetForm();
        this.isEditMode = false;
        this.currentOrderId = null;
        document.getElementById('order-form-title').textContent = 'Новый заказ';
        window.showPage('new-order');
    }
    
    editOrder(order) {
        this.isEditMode = true;
        this.currentOrderId = order.order_id;
        document.getElementById('order-form-title').textContent = `Редактирование заказа #${order.order_id}`;
        
        // Заполнение формы данными заказа
        document.getElementById('order-name').value = order.order_name;
        document.getElementById('order-date').value = order.order_date;
        document.getElementById('priority').value = order.priority;
        document.getElementById('planned-completion').value = order.planned_completion_date;
        document.getElementById('total-amount-input').value = order.total_amount;
        document.getElementById('discount').value = order.discount;
        document.getElementById('client-name').value = order.client_name;
        document.getElementById('client-phone').value = order.client_phone;
        document.getElementById('main-material').value = order.material_id || '';
        document.getElementById('edge-type').value = order.edge_type_id || '';
        document.getElementById('film').value = order.film_id || '';
        document.getElementById('milling-type').value = order.milling_type_id || '';
        document.getElementById('parts-count').value = order.parts_count;
        document.getElementById('total-area').value = order.total_area;
        
        // Загрузка деталей заказа
        this.currentDetails = getOrderDetails(order.order_id) || [];
        this.renderDetails();
        
        this.calculateDiscountedAmount();
    }
    
    resetForm() {
        document.getElementById('order-form').reset();
        this.currentDetails = [];
        this.renderDetails();
        
        // Установка значений по умолчанию
        document.getElementById('order-date').value = new Date().toISOString().split('T')[0];
        const plannedDate = new Date();
        plannedDate.setDate(plannedDate.getDate() + 14);
        document.getElementById('planned-completion').value = plannedDate.toISOString().split('T')[0];
        document.getElementById('priority').value = 'Средний';
        document.getElementById('discount').value = 0;
        document.getElementById('parts-count').value = 1;
    }
    
    showDetailModal(detailIndex = -1) {
        this.editingDetailIndex = detailIndex;
        const modal = document.getElementById('detail-modal');
        
        if (detailIndex >= 0) {
            // Редактирование существующей детали
            const detail = this.currentDetails[detailIndex];
            document.getElementById('detail-modal-title').textContent = 'Редактировать деталь';
            document.getElementById('detail-name').value = detail.detail_name;
            document.getElementById('detail-number').value = detail.detail_number;
            document.getElementById('detail-width').value = detail.width;
            document.getElementById('detail-height').value = detail.height;
            document.getElementById('detail-quantity').value = detail.quantity;
            document.getElementById('detail-material').value = detail.material_id || '';
            document.getElementById('detail-edge').value = detail.edge_type_id || '';
            document.getElementById('detail-film').value = detail.film_id || '';
            document.getElementById('detail-note').value = detail.note || '';
        } else {
            // Новая деталь
            document.getElementById('detail-modal-title').textContent = 'Добавить деталь';
            document.getElementById('detail-form').reset();
            const nextNumber = this.currentDetails.length + 1;
            document.getElementById('detail-number').value = nextNumber;
            document.getElementById('detail-quantity').value = 1;
        }
        
        modal.classList.add('active');
        this.calculateDetailArea();
    }
    
    closeDetailModal() {
        document.getElementById('detail-modal').classList.remove('active');
        this.editingDetailIndex = -1;
    }
    
    saveDetail() {
        const form = document.getElementById('detail-form');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        const detailData = {
            detail_name: document.getElementById('detail-name').value,
            detail_number: parseInt(document.getElementById('detail-number').value),
            width: parseFloat(document.getElementById('detail-width').value),
            height: parseFloat(document.getElementById('detail-height').value),
            quantity: parseInt(document.getElementById('detail-quantity').value),
            area: (parseFloat(document.getElementById('detail-width').value) * 
                   parseFloat(document.getElementById('detail-height').value) * 
                   parseInt(document.getElementById('detail-quantity').value)) / 1000000, // в м²
            material_id: document.getElementById('detail-material').value || null,
            edge_type_id: document.getElementById('detail-edge').value || null,
            film_id: document.getElementById('detail-film').value || null,
            note: document.getElementById('detail-note').value
        };
        
        if (this.editingDetailIndex >= 0) {
            // Обновление существующей детали
            this.currentDetails[this.editingDetailIndex] = {
                ...this.currentDetails[this.editingDetailIndex],
                ...detailData
            };
        } else {
            // Добавление новой детали
            detailData.detail_id = Date.now(); // Временный ID
            this.currentDetails.push(detailData);
        }
        
        this.renderDetails();
        this.updateOrderTotals();
        this.closeDetailModal();
    }
    
    renderDetails() {
        const container = document.getElementById('details-container');
        
        if (this.currentDetails.length === 0) {
            container.innerHTML = '<p class="no-details">Детали не добавлены</p>';
            return;
        }
        
        container.innerHTML = this.currentDetails.map((detail, index) => {
            const material = getMaterialById(detail.material_id);
            const edge = demoData.edgeTypes.find(e => e.edge_type_id == detail.edge_type_id);
            const film = demoData.films.find(f => f.film_id == detail.film_id);
            
            return `
                <div class="detail-item">
                    <div class="detail-info">
                        <h4>${detail.detail_name}</h4>
                        <div class="detail-specs">
                            №${detail.detail_number} | 
                            ${detail.width} × ${detail.height} мм | 
                            Кол-во: ${detail.quantity} шт | 
                            Площадь: ${detail.area.toFixed(3)} м²
                            ${material ? ` | Материал: ${material.material_name}` : ''}
                            ${edge ? ` | Кромка: ${edge.edge_type_name}` : ''}
                            ${film ? ` | Пленка: ${film.film_name}` : ''}
                            ${detail.note ? ` | ${detail.note}` : ''}
                        </div>
                    </div>
                    <div class="detail-actions">
                        <button class="action-btn edit" onclick="window.orderFormManager.showDetailModal(${index})" title="Редактировать">✏</button>
                        <button class="action-btn delete" onclick="window.orderFormManager.removeDetail(${index})" title="Удалить">🗑</button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    removeDetail(index) {
        if (confirm('Удалить эту деталь?')) {
            this.currentDetails.splice(index, 1);
            this.renderDetails();
            this.updateOrderTotals();
        }
    }
    
    calculateDetailArea() {
        const width = parseFloat(document.getElementById('detail-width').value) || 0;
        const height = parseFloat(document.getElementById('detail-height').value) || 0;
        const quantity = parseInt(document.getElementById('detail-quantity').value) || 1;
        
        const area = (width * height * quantity) / 1000000; // в м²
        
        // Показываем площадь в интерфейсе (можно добавить элемент для отображения)
        console.log(`Площадь детали: ${area.toFixed(3)} м²`);
    }
    
    updateOrderTotals() {
        const totalArea = this.currentDetails.reduce((sum, detail) => sum + detail.area, 0);
        const totalParts = this.currentDetails.reduce((sum, detail) => sum + detail.quantity, 0);
        
        document.getElementById('total-area').value = totalArea.toFixed(2);
        document.getElementById('parts-count').value = totalParts;
    }
    
    calculateDiscountedAmount() {
        const totalAmount = parseFloat(document.getElementById('total-amount-input').value) || 0;
        const discount = parseFloat(document.getElementById('discount').value) || 0;
        const discountedAmount = totalAmount * (1 - discount / 100);
        
        // Можно добавить элемент для отображения суммы со скидкой
        console.log(`Сумма со скидкой: ${formatCurrency(discountedAmount)}`);
    }
    
    cancelOrder() {
        if (confirm('Отменить создание/редактирование заказа? Несохраненные данные будут потеряны.')) {
            window.showPage('orders-list');
        }
    }
    
    saveDraft() {
        if (this.validateForm()) {
            const orderData = this.collectFormData();
            orderData.status = 'Черновик';
            
            if (this.isEditMode) {
                this.updateOrder(orderData);
            } else {
                this.createOrder(orderData);
            }
            
            window.showMessage('Черновик сохранен', 'success');
        }
    }
    
    saveOrder() {
        if (this.validateForm()) {
            const orderData = this.collectFormData();
            orderData.status = 'Принят';
            
            if (this.isEditMode) {
                this.updateOrder(orderData);
            } else {
                this.createOrder(orderData);
            }
            
            window.showMessage(`Заказ ${this.isEditMode ? 'обновлен' : 'создан'}`, 'success');
            window.showPage('orders-list');
        }
    }
    
    validateForm() {
        const form = document.getElementById('order-form');
        if (!form.checkValidity()) {
            form.reportValidity();
            return false;
        }
        
        if (this.currentDetails.length === 0) {
            window.showMessage('Добавьте хотя бы одну деталь к заказу', 'error');
            return false;
        }
        
        return true;
    }
    
    collectFormData() {
        const clientName = document.getElementById('client-name').value;
        const clientPhone = document.getElementById('client-phone').value;
        
        // Найти или создать клиента
        let client = demoData.clients.find(c => c.client_name === clientName);
        if (!client) {
            const newClientId = Math.max(...demoData.clients.map(c => c.client_id)) + 1;
            client = {
                client_id: newClientId,
                client_name: clientName,
                phones: clientPhone ? [clientPhone] : []
            };
            demoData.clients.push(client);
        }
        
        return {
            order_id: this.currentOrderId || (Math.max(...demoData.orders.map(o => o.order_id)) + 1),
            order_name: document.getElementById('order-name').value,
            client_id: client.client_id,
            client_name: client.client_name,
            client_phone: clientPhone,
            order_date: document.getElementById('order-date').value,
            priority: document.getElementById('priority').value,
            planned_completion_date: document.getElementById('planned-completion').value,
            total_amount: parseFloat(document.getElementById('total-amount-input').value) || 0,
            discount: parseFloat(document.getElementById('discount').value) || 0,
            discounted_amount: (parseFloat(document.getElementById('total-amount-input').value) || 0) * 
                             (1 - (parseFloat(document.getElementById('discount').value) || 0) / 100),
            paid_amount: 0,
            payment_date: null,
            parts_count: parseInt(document.getElementById('parts-count').value) || 0,
            total_area: parseFloat(document.getElementById('total-area').value) || 0,
            material_id: document.getElementById('main-material').value || null,
            edge_type_id: document.getElementById('edge-type').value || null,
            film_id: document.getElementById('film').value || null,
            milling_type_id: document.getElementById('milling-type').value || null,
            manager_id: 1, // Текущий пользователь
            created_by: 1,
            completion_date: null,
            details: [...this.currentDetails]
        };
    }
    
    createOrder(orderData) {
        demoData.orders.unshift(orderData);
        
        // Добавить детали в базу данных деталей
        orderData.details.forEach(detail => {
            detail.order_id = orderData.order_id;
            detail.detail_id = Math.max(...demoData.orderDetails.map(d => d.detail_id), 0) + 1;
            demoData.orderDetails.push(detail);
        });
        
        if (window.filtersManager) {
            window.filtersManager.applyFilters();
        }
    }
    
    updateOrder(orderData) {
        const index = demoData.orders.findIndex(o => o.order_id === this.currentOrderId);
        if (index !== -1) {
            demoData.orders[index] = { ...demoData.orders[index], ...orderData };
            
            // Обновить детали
            demoData.orderDetails = demoData.orderDetails.filter(d => d.order_id !== this.currentOrderId);
            orderData.details.forEach(detail => {
                detail.order_id = this.currentOrderId;
                demoData.orderDetails.push(detail);
            });
            
            if (window.filtersManager) {
                window.filtersManager.applyFilters();
            }
        }
    }
}

// Экспорт для использования в других модулях
window.OrderFormManager = OrderFormManager;