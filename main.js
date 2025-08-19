// main.js — инициализация и навигация
// ===== Утилиты форматирования (добавить в самый верх main.js) =====
window.formatCurrency = (value, opts = {}) => {
  const n = Number(value) || 0;
  const fractionDigits = opts.fractionDigits ?? 0; // в тенге чаще без копеек
  try {
    return new Intl.NumberFormat('kk-KZ', {
      style: 'currency',
      currency: 'KZT',
      currencyDisplay: 'narrowSymbol', // символ ₸
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(n);
  } catch {
    return `${n.toLocaleString('ru-RU')} ₸`;
  }
};

window.formatDate = (iso) => {
  if (!iso) return '';
  // если это ISO YYYY-MM-DD, форматируем как ДД.ММ.ГГГГ
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (m) return `${m[3]}.${m[2]}.${m[1]}`;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
};
// ===== конец вставки =====


class App {
  constructor() {
    this.currentPage = 'orders-list';
    this.init();
  }

  init() {
    window.filtersManager = new FiltersManager();
    window.tableManager = new TableManager();
    window.orderFormManager = new OrderFormManager();

    this.bindNav();
    this.showPage('orders-list');
    this.loadInitialStats();
  }

  bindNav() {
    document.querySelectorAll('.nav-btn[data-page]').forEach(btn => {
      btn.addEventListener('click', () => this.showPage(btn.dataset.page));
    });
  }

  showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) target.classList.add('active');
    this.currentPage = id;
    if (id === 'orders-list') window.filtersManager?.applyFilters();
  }

  loadInitialStats() { window.filtersManager?.applyFilters(); }

  showMessage(text, type='info', duration=3000) {
    let box = document.getElementById('messages-container');
    if (!box) {
      box = document.createElement('div');
      box.id = 'messages-container';
      box.style.cssText = 'position:fixed;right:16px;bottom:16px;display:flex;flex-direction:column;gap:8px;z-index:9999';
      document.body.appendChild(box);
    }
    const el = document.createElement('div');
    el.className = `message ${type}`;
    el.style.cssText = 'padding:12px 16px;border-radius:8px;background:#111827;color:white;opacity:.95;box-shadow:0 6px 16px rgba(0,0,0,.2)';
    el.textContent = text;
    box.appendChild(el);
    setTimeout(() => el.remove(), duration);
  }
}

window.showPage = (pageId) => window.app?.showPage(pageId);
window.showMessage = (text, type='info', duration=3000) => window.app?.showMessage(text, type, duration);

document.addEventListener('DOMContentLoaded', () => { window.app = new App(); });
