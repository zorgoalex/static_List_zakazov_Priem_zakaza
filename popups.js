// popups.js — форма заказа (создание/просмотр/редактирование) + Позиции заказа
class OrderFormManager {
  constructor() {
    // состояние
    this.isEditMode = false;
    this.isReadOnly = false;
    this.currentOrderId = null;
    this.itemsLocal = []; // локальная копия позиций текущего заказа

    // кэш DOM
    this.cacheEls();
    this.bindBaseEvents();
    this.setDefaults();

    // утилиты
    if (!window.formatArea) window.formatArea = (m2, frac=1) => `${(Number(m2)||0).toFixed(frac)} м²`;
  }

  // ---------- DOM ----------
  cacheEls() {
    this.page = document.getElementById('new-order');
    this.title = document.getElementById('order-form-title');

    this.inputs = {
      order_name: document.getElementById('order-name'),
      order_date: document.getElementById('order-date'),
      planned_completion_date: document.getElementById('planned-completion'),
      total_amount: document.getElementById('total-amount-input'),
      discount: document.getElementById('discount'),
      client_name: document.getElementById('client-name'),
      client_phone: document.getElementById('client-phone')
    };

    this.btnAdd = document.getElementById('add-order-btn');
    this.btnCancel = document.getElementById('cancel-order');
    this.btnSave = document.getElementById('save-order');
    this.btnSaveDraft = document.getElementById('save-draft');
    this.form = document.getElementById('order-form');

    // позиции заказа
    this.btnAddItem = document.getElementById('add-item');
    this.itemsTbody = document.getElementById('order-items-tbody');
    this.sumPositions = document.getElementById('sum-positions');
    this.sumDetails = document.getElementById('sum-details');
    this.sumArea = document.getElementById('sum-area');
  }

  bindBaseEvents() {
    this.btnAdd?.addEventListener('click', () => {
      this.openCreate();
      window.showPage('new-order');
    });

    this.btnCancel?.addEventListener('click', () => {
      window.showPage('orders-list');
      this.setReadOnly(false);
    });

    this.btnSave?.addEventListener('click', () => this.save('final'));
    this.btnSaveDraft?.addEventListener('click', () => this.save('draft'));

    this.btnAddItem?.addEventListener('click', () => {
      if (this.isReadOnly) return;
      this.addItem();
    });

    // делегирование по таблице позиций
    this.itemsTbody?.addEventListener('input', (e) => this.onItemFieldChange(e));
    this.itemsTbody?.addEventListener('click', (e) => this.onItemActionClick(e));
  }

  setDefaults() {
    const today = new Date();
    const plus14 = new Date(today); plus14.setDate(today.getDate() + 14);
    if (this.inputs.order_date) this.inputs.order_date.value = today.toISOString().slice(0,10);
    if (this.inputs.planned_completion_date) this.inputs.planned_completion_date.value = plus14.toISOString().slice(0,10);
    if (this.inputs.discount) this.inputs.discount.value = 0;
  }

  // ---------- Открытие форм ----------
  openCreate() {
    this.isEditMode = false;
    this.currentOrderId = null;
    this.title && (this.title.textContent = 'Новый заказ');
    this.form?.reset();
    this.setDefaults();
    this.setReadOnly(false);
    this.toggleSaveButtons(true);
    this.itemsLocal = []; // новый заказ начинается без позиций
    this.renderItems();
  }

  openEdit(order) {
    this.isEditMode = true;
    this.currentOrderId = order.order_id;
    this.title && (this.title.textContent = `Редактирование заказа #${order.order_id}`);
    this.fillForm(order);
    this.setReadOnly(false);
    this.toggleSaveButtons(true);
    this.loadItems(order.order_id);
  }

  openView(order) {
    this.isEditMode = false;
    this.currentOrderId = order.order_id;
    this.title && (this.title.textContent = `Просмотр заказа #${order.order_id}`);
    this.fillForm(order);
    this.setReadOnly(true);
    this.toggleSaveButtons(false);
    this.loadItems(order.order_id);
  }

  // ---------- Форма заказа ----------
  fillForm(order) {
    this.inputs.order_name.value = order.order_name || '';
    this.inputs.order_date.value = (order.order_date || '').slice(0,10);
    this.inputs.planned_completion_date.value = (order.planned_completion_date || '').slice(0,10);
    this.inputs.total_amount.value = order.total_amount ?? order.discounted_amount ?? 0;
    this.inputs.discount.value = order.discount ?? 0;
    this.inputs.client_name.value = order.client_name || '';
    this.inputs.client_phone.value = order.client_phone || '';
  }

  setReadOnly(flag) {
    this.isReadOnly = flag;
    const disable = el => el && (el.disabled = flag, el.readOnly = flag);
    Object.values(this.inputs).forEach(disable);
    // блокируем кнопки управления позициями
    if (this.btnAddItem) this.btnAddItem.disabled = flag;
    // инпуты в таблице блокируются при рендере (см. itemRowHTML)
    this.renderItems();
  }

  toggleSaveButtons(show) {
    const disp = show ? 'inline-flex' : 'none';
    if (this.btnSave) this.btnSave.style.display = disp;
    if (this.btnSaveDraft) this.btnSaveDraft.style.display = disp;
  }

  collectOrderHeader() {
    return {
      order_id: this.currentOrderId ?? (Math.max(0, ...demoData.orders.map(o => +o.order_id)) + 1),
      order_name: this.inputs.order_name.value.trim(),
      order_date: this.inputs.order_date.value,
      planned_completion_date: this.inputs.planned_completion_date.value,
      total_amount: Number(this.inputs.total_amount.value || 0),
      discounted_amount: Number(this.inputs.total_amount.value || 0) * (1 - Number(this.inputs.discount.value || 0)/100),
      discount: Number(this.inputs.discount.value || 0),
      client_name: this.inputs.client_name.value.trim(),
      client_phone: this.inputs.client_phone.value.trim(),
      status: this.isEditMode
        ? (demoData.orders.find(o => o.order_id === this.currentOrderId)?.status ?? 'Принят')
        : 'Принят',
      priority: demoData.orders.find(o => o.order_id === this.currentOrderId)?.priority ?? 'Средний',
      manager_id: 1,
      created_by: 1
    };
  }

  save(mode) {
    if (this.isReadOnly) return;

    // простая валидация
    if (!this.inputs.order_name.value.trim()) return window.showMessage('Введите название заказа', 'error');
    if (!this.inputs.client_name.value.trim()) return window.showMessage('Укажите клиента', 'error');

    const header = this.collectOrderHeader();

    // запись шапки
    if (this.isEditMode) {
      const idx = demoData.orders.findIndex(o => o.order_id === this.currentOrderId);
      if (idx >= 0) demoData.orders[idx] = { ...demoData.orders[idx], ...header };
    } else {
      demoData.orders.unshift(header);
      this.currentOrderId = header.order_id;
    }

    // запись позиций
    this.persistItems(this.currentOrderId);

    window.recalcOrderAggregates?.(this.currentOrderId) || this.recalcAggregatesLocal(this.currentOrderId);
    window.filtersManager?.applyFilters();
    window.showMessage(this.isEditMode ? 'Изменения сохранены' : 'Заказ создан', 'success');
    window.showPage('orders-list');
  }

  // ---------- Позиции заказа ----------
  loadItems(orderId) {
    if (!demoData.order_items) demoData.order_items = [];
    // делаем «мягкую» копию, чтобы не портить исходники до сохранения
    const rows = demoData.order_items.filter(x => x.order_id === orderId);
    this.itemsLocal = rows.map(r => ({ ...r }));
    this.renderItems();
  }

  addItem() {
    const n = this.itemsLocal.length + 1;
    this.itemsLocal.push({
      item_id: null,            // будет присвоен при сохранении
      order_id: this.currentOrderId, // для нового — поставим при сохранении
      item_name: `Позиция ${n}`,
      width_mm: 600,
      height_mm: 400,
      quantity: 1,
      material_id: 1,
      edge_type_id: 1,
      film_id: 1,
      milling_type_id: 1,
      note: ''
    });
    this.renderItems(true);
  }

  duplicateItem(index) {
    const src = this.itemsLocal[index];
    if (!src) return;
    const copy = { ...src, item_id: null, item_name: src.item_name + ' (копия)' };
    this.itemsLocal.splice(index + 1, 0, copy);
    this.renderItems(true);
  }

  deleteItem(index) {
    this.itemsLocal.splice(index, 1);
    this.renderItems(true);
  }

  itemRowHTML(it, i) {
    const ro = this.isReadOnly ? 'disabled' : '';
    const area = ((Number(it.width_mm)||0) * (Number(it.height_mm)||0) / 1_000_000) * (Number(it.quantity)||0);
    return `
      <tr data-index="${i}">
        <td>${i+1}</td>
        <td><input ${ro} type="text" data-field="item_name" value="${(it.item_name||'').replace(/"/g,'&quot;')}" /></td>
        <td><input ${ro} type="number" min="1" step="10" data-field="width_mm" value="${it.width_mm ?? ''}" /></td>
        <td><input ${ro} type="number" min="1" step="10" data-field="height_mm" value="${it.height_mm ?? ''}" /></td>
        <td><input ${ro} type="number" min="1" step="1" data-field="quantity" value="${it.quantity ?? 1}" /></td>
        <td class="area-cell">${formatArea(area)}</td>
        <td>
          <div class="row-actions">
            <button type="button" class="dup" data-action="dup" ${this.isReadOnly?'disabled':''}>⧉</button>
            <button type="button" class="del" data-action="del" ${this.isReadOnly?'disabled':''}>🗑</button>
          </div>
        </td>
      </tr>
    `;
  }

  renderItems(scrollToEnd=false) {
    if (!this.itemsTbody) return;
    this.itemsTbody.innerHTML = this.itemsLocal.map((it,i)=>this.itemRowHTML(it,i)).join('');
    this.updateItemsSummary();
    if (scrollToEnd) this.itemsTbody.parentElement?.scrollTo({top: this.itemsTbody.parentElement.scrollHeight, behavior:'smooth'});
  }

  onItemFieldChange(e) {
    const input = e.target.closest('input[data-field]');
    if (!input) return;
    const row = input.closest('tr[data-index]');
    if (!row) return;
    const idx = Number(row.dataset.index);
    const field = input.dataset.field;
    let val = input.type === 'number' ? Number(input.value || 0) : input.value;
    if (['width_mm','height_mm','quantity'].includes(field)) val = Math.max(0, Math.round(val));
    this.itemsLocal[idx][field] = val;
    // пересчёт строки и итогов
    const it = this.itemsLocal[idx];
    const area = ((Number(it.width_mm)||0) * (Number(it.height_mm)||0) / 1_000_000) * (Number(it.quantity)||0);
    const areaCell = row.querySelector('.area-cell');
    if (areaCell) areaCell.textContent = formatArea(area);
    this.updateItemsSummary();
  }

  onItemActionClick(e) {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const row = btn.closest('tr[data-index]');
    if (!row) return;
    const idx = Number(row.dataset.index);
    const action = btn.dataset.action;
    if (action === 'dup') this.duplicateItem(idx);
    else if (action === 'del') this.deleteItem(idx);
  }

  updateItemsSummary() {
    let positions = this.itemsLocal.length;
    let details = 0;
    let areaM2 = 0;
    for (const it of this.itemsLocal) {
      const qty = Number(it.quantity)||0;
      details += qty;
      const areaOne = ((Number(it.width_mm)||0) * (Number(it.height_mm)||0)) / 1_000_000;
      areaM2 += areaOne * qty;
    }
    if (this.sumPositions) this.sumPositions.textContent = positions;
    if (this.sumDetails) this.sumDetails.textContent = details;
    if (this.sumArea) this.sumArea.textContent = formatArea(areaM2);
  }

  persistItems(orderId) {
    if (!demoData.order_items) demoData.order_items = [];
    // удалить старые позиции заказа (если редактирование)
    demoData.order_items = demoData.order_items.filter(x => x.order_id !== orderId);

    // назначить item_id и записать новые
    let nextItemId = Math.max(0, ...demoData.order_items.map(x => +x.item_id || 0)) + 1;
    for (const it of this.itemsLocal) {
      const copy = { ...it };
      copy.order_id = orderId;
      if (!copy.item_id) copy.item_id = nextItemId++;
      demoData.order_items.push(copy);
    }
  }

  // локальный пересчёт агрегатов на случай отсутствия глобального helper
  recalcAggregatesLocal(orderId) {
    const items = demoData.order_items.filter(x => x.order_id === orderId);
    const ord = demoData.orders.find(o => o.order_id === orderId);
    if (!ord) return;
    ord.positions_count = items.length;
    let details = 0, area = 0;
    for (const it of items) {
      details += Number(it.quantity)||0;
      area += ((Number(it.width_mm)||0) * (Number(it.height_mm)||0) / 1_000_000) * (Number(it.quantity)||0);
    }
    ord.details_total = details;
    ord.total_area = Number(area.toFixed(1));
  }
}

window.OrderFormManager = OrderFormManager;
