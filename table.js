// table.js — управление таблицей заказов с новыми колонками (позиции/детали/площадь)
if (!window.formatArea) {
  window.formatArea = (m2, fraction = 1) => `${(Number(m2) || 0).toFixed(fraction)} м²`;
}

class TableManager {
  constructor() {
    this.currentOrders = demoData.orders;
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.totalPages = 1;

    this.statusFlow = ['Принят', 'В производстве', 'Готов к выдаче', 'Выполнен'];
    this.priorityFlow = ['Низкий', 'Средний', 'Высокий'];

    this.initEventListeners();
    this.updateTable(this.currentOrders);
  }

  initEventListeners() {
    document.querySelectorAll('.sortable').forEach(th => {
      th.addEventListener('click', () => {
        const sortField = th.getAttribute('data-sort');
        if (window.filtersManager) window.filtersManager.setSortConfig(sortField);
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
    this.totalPages = Math.max(1, Math.ceil(this.currentOrders.length / this.itemsPerPage));
    if (this.currentPage > this.totalPages) this.currentPage = 1;
  }

  renderTable() {
    const tbody = document.getElementById('orders-tbody');
    if (!tbody) return;

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const pageOrders = this.currentOrders.slice(start, start + this.itemsPerPage);

    tbody.innerHTML = pageOrders.map(o => this.row(o)).join('');
    this.attachRowEvents();
  }

  row(order) {
    const overdue =
      new Date(order.planned_completion_date) < new Date() &&
      order.status !== 'Выполнен' &&
      order.status !== 'Готов к выдаче';

    const statusClass = ({
      'Принят': 'status-accepted',
      'В производстве': 'status-production',
      'Готов к выдаче': 'status-ready',
      'Выполнен': 'status-completed'
    })[order.status] || '';

    const priorityClass = ({
      'Высокий': 'priority-high',
      'Средний': 'priority-medium',
      'Низкий': 'priority-low'
    })[order.priority] || '';

    return `
      <tr class="order-row ${overdue ? 'overdue' : ''}" data-order-id="${order.order_id}">
        <td><strong>#${order.order_id}</strong></td>
        <td>${formatDate(order.order_date)}</td>
        <td>
          <div class="client-info">
            <div class="client-name">${order.client_name}</div>
            <div class="order-name">${order.order_name}</div>
          </div>
        </td>
        <td><a href="tel:${order.client_phone}" class="phone-link">${order.client_phone}</a></td>
        <td>
          <div class="amount-info">
            <div class="discounted-amount">${formatCurrency(order.discounted_amount)}</div>
            ${order.discount > 0 ? `<div class="original-amount">${formatCurrency(order.total_amount)}</div>` : ''}
          </div>
        </td>
        <td><span class="priority-badge ${priorityClass}" data-action="toggle-priority" data-order-id="${order.order_id}" title="Сменить приоритет">${order.priority}</span></td>
        <td><span class="status-badge ${statusClass}" data-action="next-status" data-order-id="${order.order_id}" title="Следующий статус">${order.status}</span></td>

        <td>${formatDate(order.planned_completion_date)}</td>

        <td class="text-center">${order.positions_count ?? 0}</td>
        <td class="text-center">${order.details_total ?? 0}</td>
        <td class="text-right">${formatArea(order.total_area ?? 0)}</td>

        <td>
          <div class="action-buttons">
            <button class="action-btn view" data-action="view" data-order-id="${order.order_id}" title="Просмотр">👁</button>
            <button class="action-btn edit" data-action="edit" data-order-id="${order.order_id}" title="Редактировать">✏</button>
            <button class="action-btn status prev" data-action="prev-status" data-order-id="${order.order_id}" title="Предыдущий статус">⟵</button>
            <button class="action-btn status next" data-action="next-status" data-order-id="${order.order_id}" title="Следующий статус">⟶</button>
            <button class="action-btn priority" data-action="toggle-priority" data-order-id="${order.order_id}" title="Переключить приоритет">⭐</button>
            <button class="action-btn duplicate" data-action="duplicate" data-order-id="${order.order_id}" title="Дублировать">⧉</button>
            <button class="action-btn delete" data-action="delete" data-order-id="${order.order_id}" title="Удалить">🗑</button>
          </div>
        </td>
      </tr>
    `;
  }

  attachRowEvents() {
    document.querySelectorAll('.order-row').forEach(row => {
      row.addEventListener('click', e => {
        if (e.target.closest('.action-buttons')) return;
        const id = Number(row.dataset.orderId);
        const order = demoData.orders.find(o => o.order_id === id);
        if (order && window.orderFormManager) {
          window.orderFormManager.openView(order);
          window.showPage('new-order');
        }
      });
    });

    document.querySelectorAll('.action-btn, .status-badge, .priority-badge').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const action = btn.dataset.action;
        const id = Number(btn.dataset.orderId);
        if (!action || !id) return;

        switch (action) {
          case 'view': {
            const order = demoData.orders.find(o => o.order_id === id);
            if (order && window.orderFormManager) {
              window.orderFormManager.openView(order);
              window.showPage('new-order');
            }
            break;
          }
          case 'edit': {
            const order = demoData.orders.find(o => o.order_id === id);
            if (order && window.orderFormManager) {
              window.orderFormManager.openEdit(order);
              window.showPage('new-order');
            }
            break;
          }
          case 'next-status': this.advanceStatus(id, +1); break;
          case 'prev-status': this.advanceStatus(id, -1); break;
          case 'toggle-priority': this.togglePriority(id); break;
          case 'duplicate': this.duplicateOrder(id); break;
          case 'delete': this.deleteOrder(id); break;
        }
      });
    });
  }

  advanceStatus(orderId, step) {
    const order = demoData.orders.find(o => o.order_id === orderId);
    if (!order) return;
    const idx = this.statusFlow.indexOf(order.status);
    const nextIdx = Math.min(this.statusFlow.length - 1, Math.max(0, idx + step));
    if (nextIdx === idx) {
      window.showMessage(`Статус заказа #${orderId} уже крайний: «${order.status}»`, 'info');
      return;
    }
    order.status = this.statusFlow[nextIdx];
    const todayISO = new Date().toISOString().slice(0, 10);
    if (order.status === 'Выполнен') order.completion_date = todayISO;
    if (order.status === 'Готов к выдаче') order.issue_date = todayISO;

    window.showMessage(`Статус заказа #${orderId} → «${order.status}»`, 'success');
    window.filtersManager?.applyFilters();
  }

  togglePriority(orderId) {
    const order = demoData.orders.find(o => o.order_id === orderId);
    if (!order) return;
    const idx = this.priorityFlow.indexOf(order.priority);
    order.priority = this.priorityFlow[(idx + 1) % this.priorityFlow.length];
    window.showMessage(`Приоритет заказа #${orderId} → «${order.priority}»`, 'success');
    window.filtersManager?.applyFilters();
  }

  duplicateOrder(orderId) {
    const src = demoData.orders.find(o => o.order_id === orderId);
    if (!src) return;
    const newId = (Math.max(...demoData.orders.map(o => +o.order_id)) || 1000) + 1;

    const today = new Date();
    const plus7 = (d) => {
      const dt = new Date(d || today);
      dt.setDate(dt.getDate() + 7);
      return dt.toISOString().slice(0, 10);
    };

    const copy = {
      ...src,
      order_id: newId,
      order_name: `${src.order_name} (копия)`,
      order_date: today.toISOString().slice(0, 10),
      planned_completion_date: plus7(src.planned_completion_date),
      status: 'Принят'
    };
    demoData.orders.unshift(copy);

    // Дублируем позиции и пересчитываем агрегаты
    if (window.duplicateOrderItems) window.duplicateOrderItems(orderId, newId);

    window.showMessage(`Создана копия заказа #${orderId} → #${newId}`, 'success');
    window.filtersManager?.applyFilters();
  }

  deleteOrder(orderId) {
    if (!confirm('Удалить этот заказ?')) return;
    const idx = demoData.orders.findIndex(o => o.order_id === orderId);
    if (idx >= 0) {
      demoData.orders.splice(idx, 1);
      window.showMessage(`Заказ #${orderId} удалён`, 'success');
      window.filtersManager?.applyFilters();
    }
  }

  renderPagination() {
    const el = document.getElementById('pagination');
    if (!el) return;

    let html = `<button ${this.currentPage===1?'disabled':''} onclick="window.tableManager.goToPage(${this.currentPage-1})">← Предыдущая</button>`;
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, this.currentPage + 2);

    if (start > 1) {
      html += `<button onclick="window.tableManager.goToPage(1)">1</button>`;
      if (start > 2) html += `<span>...</span>`;
    }
    for (let i = start; i <= end; i++) {
      html += `<button class="${i===this.currentPage?'active':''}" onclick="window.tableManager.goToPage(${i})">${i}</button>`;
    }
    if (end < this.totalPages) {
      if (end < this.totalPages - 1) html += `<span>...</span>`;
      html += `<button onclick="window.tableManager.goToPage(${this.totalPages})">${this.totalPages}</button>`;
    }
    html += `<button ${this.currentPage===this.totalPages?'disabled':''} onclick="window.tableManager.goToPage(${this.currentPage+1})">Следующая →</button>
             <div class="pagination-info">Показано ${(this.currentPage-1)*this.itemsPerPage+1}-${Math.min(this.currentPage*this.itemsPerPage,this.currentOrders.length)} из ${this.currentOrders.length} записей</div>`;

    el.innerHTML = html;
  }

  goToPage(p) {
    if (p<1 || p>this.totalPages) return;
    this.currentPage = p;
    this.renderTable();
    this.renderPagination();
  }
}

window.TableManager = TableManager;
