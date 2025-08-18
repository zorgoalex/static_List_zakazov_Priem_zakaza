// main.js - Основная логика приложения
class App {
    constructor() {
        this.currentPage = 'orders-list';
        this.init();
    }
    
    init() {
        // Инициализация менеджеров
        window.filtersManager = new FiltersManager();
        window.tableManager = new TableManager();
        window.orderFormManager = new OrderFormManager();
        
        // Инициализация навигации
        this.initNavigation();
        
        // Первоначальная загрузка данных
        this.loadInitialData();
        
        // Показ сообщений
        this.initMessaging();
        
        console.log('Система управления заказами загружена');
    }
    
    initNavigation() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const page = btn.dataset.page;
                this.showPage(page);
                
                // Обновление активной навигации
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }
    
    showPage(pageId) {
        // Скрытие всех страниц
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Показ выбранной страницы
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageId;
            
            // Дополнительная логика для конкретных страниц
            if (pageId === 'orders-list') {
                window.filtersManager?.applyFilters();
            }
        }
    }
    
    loadInitialData() {
        // Первоначальная загрузка и отображение заказов
        if (window.filtersManager) {
            window.filtersManager.applyFilters();
        }
        
        // Установка текущей даты в фильтрах
        const today = new Date();
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        
        document.getElementById('date-from').value = weekAgo.toISOString().split('T')[0];
        document.getElementById('date-to').value = today.toISOString().split('T')[0];
    }
    
    initMessaging() {
        // Создание контейнера для сообщений если его нет
        if (!document.getElementById('messages-container')) {
            const container = document.createElement('div');
            container.id = 'messages-container';
            container.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                z-index: 2000;
                display: flex;
                flex-direction: column;
                gap: 10px;
                max-width: 400px;
            `;
            document.body.appendChild(container);
        }
    }
    
    showMessage(text, type = 'info', duration = 3000) {
        const container = document.getElementById('messages-container');
        const message = document.createElement('div');
        
        message.className = `message ${type} show`;
        message.textContent = text;
        message.style.cssText = `
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        container.appendChild(message);
        
        // Анимация появления
        setTimeout(() => {
            message.style.transform = 'translateX(0)';
        }, 10);
        
        // Автоматическое скрытие
        setTimeout(() => {
            message.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 300);
        }, duration);
    }
}

// Глобальные функции для удобства
window.showPage = function(pageId) {
    if (window.app) {
        window.app.showPage(pageId);
    }
};

window.showMessage = function(text, type = 'info', duration = 3000) {
    if (window.app) {
        window.app.showMessage(text, type, duration);
    }
};

// Инициализация приложения при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});