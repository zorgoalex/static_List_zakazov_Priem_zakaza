// demo-data.js - Демонстрационные данные
const demoData = {
    // Клиенты
   clients: [
        { client_id: 1, client_name: 'ТОО «КазМебель»', phones: ['+7 (701) 123-45-67', '+7 (701) 123-45-68'] },
        { client_id: 2, client_name: 'ИП Ахметов Е.К.', phones: ['+7 (707) 234-56-78'] },
        { client_id: 3, client_name: 'ТОО «Интерьер Плюс KZ»', phones: ['+7 (747) 345-67-89'] },
        { client_id: 4, client_name: 'Сейдахметов Айдос Нурпеисович', phones: ['+7 (776) 456-78-90'] },
        { client_id: 5, client_name: 'ТОО «Комфорт Мебель KZ»', phones: ['+7 (701) 567-89-01'] },
        { client_id: 6, client_name: 'ИП Садыкова А.Н.', phones: ['+7 (705) 678-90-12'] },
        { client_id: 7, client_name: 'ТОО «Элит Мебель KZ»', phones: ['+7 (771) 789-01-23'] },
        { client_id: 8, client_name: 'Касымов Нуржан Еркинович', phones: ['+7 (707) 890-12-34'] },
        { client_id: 9, client_name: 'ТОО «Office Design Astana»', phones: ['+7 (701) 901-23-45'] },
        { client_id: 10, client_name: 'ИП Нұрқожаев Б.Б.', phones: ['+7 (775) 012-34-56'] }
    ],

    // Материалы
    materials: [
        { material_id: 1, material_name: 'ЛДСП 16мм Белый', unit: 'лист', material_type_id: 1, vendor_id: 1 },
        { material_id: 2, material_name: 'ЛДСП 18мм Дуб Сонома', unit: 'лист', material_type_id: 1, vendor_id: 1 },
        { material_id: 3, material_name: 'МДФ 16мм Kronospan', unit: 'лист', material_type_id: 2, vendor_id: 2 },
        { material_id: 4, material_name: 'МДФ 18мм влагостойкий', unit: 'лист', material_type_id: 2, vendor_id: 2 },
        { material_id: 5, material_name: 'Кромка ПВХ 0.4мм белая', unit: 'пог.м', material_type_id: 3, vendor_id: 3 },
        { material_id: 6, material_name: 'Кромка ПВХ 2мм Дуб', unit: 'пог.м', material_type_id: 3, vendor_id: 3 },
        { material_id: 7, material_name: 'Пленка самоклеящаяся ДубР', unit: 'пог.м', material_type_id: 4, vendor_id: 4 },
        { material_id: 8, material_name: 'Клей-расплав для кромки', unit: 'кг', material_type_id: 5, vendor_id: 5 },
        { material_id: 9, material_name: 'Петля Blum Clip top', unit: 'шт', material_type_id: 6, vendor_id: 6 },
        { material_id: 10, material_name: 'Направляющие Blum Tandem 500мм', unit: 'комп', material_type_id: 6, vendor_id: 6 }
    ],

    // Типы кромок
    edgeTypes: [
        { edge_type_id: 1, edge_type_name: 'ПВХ 0.4мм' },
        { edge_type_id: 2, edge_type_name: 'ПВХ 2мм' },
        { edge_type_id: 3, edge_type_name: 'АБС 1мм' },
        { edge_type_id: 4, edge_type_name: 'Меламиновая' }
    ],

    // Пленки
    films: [
        { film_id: 1, film_name: 'Дуб натуральный', film_vendor_id: 1, film_texture: true },
        { film_id: 2, film_name: 'Белый глянец', film_vendor_id: 1, film_texture: false },
        { film_id: 3, film_name: 'Орех итальянский', film_vendor_id: 2, film_texture: true },
        { film_id: 4, film_name: 'Венге', film_vendor_id: 2, film_texture: true }
    ],

    // Типы фрезеровки
    millingTypes: [
        { milling_type_id: 1, milling_type_name: 'Фрезеровка под петли', cost_per_sqm: 150 },
        { milling_type_id: 2, milling_type_name: 'Кромочная фрезеровка', cost_per_sqm: 80 },
        { milling_type_id: 3, milling_type_name: 'Художественная фрезеровка', cost_per_sqm: 300 },
        { milling_type_id: 4, milling_type_name: 'Пазы под полки', cost_per_sqm: 120 }
    ],

    // Пользователи
    users: [
        { user_id: 1, username: 'ivanov', employee_id: 1, role_id: 1 },
        { user_id: 2, username: 'petrov', employee_id: 2, role_id: 1 },
        { user_id: 3, username: 'sidorov', employee_id: 3, role_id: 1 },
        { user_id: 4, username: 'kozlov', employee_id: 4, role_id: 1 }
    ],

    // Сотрудники
    employees: [
        { employee_id: 1, full_name: 'Аманов Нурлан Кайратович', position: 'Менеджер по продажам' },
        { employee_id: 2, full_name: 'Ахметова Айсулу Ермековна', position: 'Менеджер по продажам' },
        { employee_id: 3, full_name: 'Смагулов Даурен Бахытович', position: 'Менеджер по продажам' },
        { employee_id: 4, full_name: 'Касымханова Жанна Маратовна', position: 'Менеджер по продажам' }
    ],

    // Заказы
    orders: [
        {
            order_id: 1001,
            order_name: 'Кухонный гарнитур "Модерн"',
            client_id: 1,
            client_name: 'ТОО «КазМебель»',
            client_phone: '+7 (701) 123-45-67',
            order_date: '2025-08-15',
            priority: 'Высокий',
            completion_date: null,
            planned_completion_date: '2025-08-25',
            status: 'В производстве',
            total_amount: 145000,
            discounted_amount: 130500,
            discount: 10,
            paid_amount: 70000,
            payment_date: '2025-08-15',
            parts_count: 25,
            total_area: 15.8,
            manager_id: 1,
            created_by: 1,
            material_id: 2,
            edge_type_id: 2,
            film_id: 1,
            milling_type_id: 1
        },
        {
            order_id: 1002,
            order_name: 'Шкаф-купе "Астана"',
            client_id: 2,
            client_name: 'ИП Ахметов Е.К.',
            client_phone: '+7 (707) 234-56-78',
            order_date: '2025-08-16',
            priority: 'Средний',
            completion_date: null,
            planned_completion_date: '2025-08-28',
            status: 'Принят',
            total_amount: 89000,
            discounted_amount: 89000,
            discount: 0,
            paid_amount: 45000,
            payment_date: '2025-08-16',
            parts_count: 12,
            total_area: 8.4,
            manager_id: 1,
            created_by: 1,
            material_id: 1,
            edge_type_id: 1,
            film_id: 3,
            milling_type_id: 2
        },
        {
            order_id: 1003,
            order_name: 'Офисные столы "Нур-Султан"',
            client_id: 3,
            client_name: 'ТОО «Интерьер Плюс KZ»',
            client_phone: '+7 (747) 345-67-89',
            order_date: '2025-08-17',
            priority: 'Высокий',
            completion_date: null,
            planned_completion_date: '2025-08-27',
            status: 'В производстве',
            total_amount: 235000,
            discounted_amount: 211500,
            discount: 10,
            paid_amount: 150000,
            payment_date: '2025-08-17',
            parts_count: 34,
            total_area: 22.1,
            manager_id: 2,
            created_by: 2,
            material_id: 3,
            edge_type_id: 3,
            film_id: 4,
            milling_type_id: 1
        },
        {
            order_id: 1004,
            order_name: 'Тумбы под ТВ "Алатау"',
            client_id: 4,
            client_name: 'Сейдахметов Айдос Нурпеисович',
            client_phone: '+7 (776) 456-78-90',
            order_date: '2025-08-18',
            priority: 'Низкий',
            completion_date: null,
            planned_completion_date: '2025-08-29',
            status: 'Принят',
            total_amount: 56000,
            discounted_amount: 56000,
            discount: 0,
            paid_amount: 0,
            payment_date: null,
            parts_count: 10,
            total_area: 6.7,
            manager_id: 3,
            created_by: 3,
            material_id: 4,
            edge_type_id: 1,
            film_id: 2,
            milling_type_id: 3
        },
        {
            order_id: 1005,
            order_name: 'Кухня "Сарыарка"',
            client_id: 5,
            client_name: 'ТОО «Комфорт Мебель KZ»',
            client_phone: '+7 (701) 567-89-01',
            order_date: '2025-08-19',
            priority: 'Низкий',
            completion_date: '2025-08-19',
            planned_completion_date: '2025-08-19',
            status: 'Готов к выдаче',
            total_amount: 45000,
            discounted_amount: 45000,
            discount: 0,
            paid_amount: 45000,
            payment_date: '2025-08-19',
            parts_count: 8,
            total_area: 4.2,
            manager_id: 1,
            created_by: 1,
            material_id: 2,
            edge_type_id: 2,
            film_id: 1,
            milling_type_id: 2
        },
        {
            order_id: 1006,
            order_name: 'Гардеробная "Байтерек"',
            client_id: 6,
            client_name: 'ИП Садыкова А.Н.',
            client_phone: '+7 (705) 678-90-12',
            order_date: '2025-08-20',
            priority: 'Средний',
            completion_date: null,
            planned_completion_date: '2025-08-30',
            status: 'В производстве',
            total_amount: 123000,
            discounted_amount: 117850,
            discount: 5,
            paid_amount: 80000,
            payment_date: '2025-08-20',
            parts_count: 18,
            total_area: 12.3,
            manager_id: 2,
            created_by: 2,
            material_id: 1,
            edge_type_id: 2,
            film_id: 3,
            milling_type_id: 1
        },
        {
            order_id: 1007,
            order_name: 'Коммерческая стойка "Медеу"',
            client_id: 7,
            client_name: 'ТОО «Элит Мебель KZ»',
            client_phone: '+7 (771) 789-01-23',
            order_date: '2025-08-21',
            priority: 'Высокий',
            completion_date: null,
            planned_completion_date: '2025-08-31',
            status: 'Принят',
            total_amount: 199000,
            discounted_amount: 179100,
            discount: 10,
            paid_amount: 100000,
            payment_date: '2025-08-21',
            parts_count: 28,
            total_area: 17.9,
            manager_id: 3,
            created_by: 3,
            material_id: 4,
            edge_type_id: 3,
            film_id: 2,
            milling_type_id: 2
        },
        {
            order_id: 1008,
            order_name: 'Прихожая "Тулпар"',
            client_id: 8,
            client_name: 'Касымов Нуржан Еркинович',
            client_phone: '+7 (707) 890-12-34',
            order_date: '2025-08-22',
            priority: 'Средний',
            completion_date: null,
            planned_completion_date: '2025-09-02',
            status: 'Принят',
            total_amount: 76000,
            discounted_amount: 76000,
            discount: 0,
            paid_amount: 20000,
            payment_date: '2025-08-22',
            parts_count: 16,
            total_area: 9.8,
            manager_id: 4,
            created_by: 4,
            material_id: 3,
            edge_type_id: 1,
            film_id: 4,
            milling_type_id: 3
        },
        {
            order_id: 1009,
            order_name: 'Офисные шкафы "Есиль"',
            client_id: 9,
            client_name: 'ТОО «Office Design Astana»',
            client_phone: '+7 (701) 901-23-45',
            order_date: '2025-08-10',
            priority: 'Высокий',
            completion_date: null,
            planned_completion_date: '2025-08-26',
            status: 'В производстве',
            total_amount: 152000,
            discounted_amount: 152000,
            discount: 0,
            paid_amount: 120000,
            payment_date: '2025-08-10',
            parts_count: 31,
            total_area: 19.4,
            manager_id: 1,
            created_by: 1,
            material_id: 2,
            edge_type_id: 2,
            film_id: 1,
            milling_type_id: 2
        },
        {
            order_id: 1010,
            order_name: 'Кухня "Алматы"',
            client_id: 10,
            client_name: 'ИП Нұрқожаев Б.Б.',
            client_phone: '+7 (775) 012-34-56',
            order_date: '2025-08-10',
            priority: 'Средний',
            completion_date: null,
            planned_completion_date: '2025-09-01',
            status: 'Принят',
            total_amount: 178000,
            discounted_amount: 169100,
            discount: 5,
            paid_amount: 90000,
            payment_date: '2025-08-10',
            parts_count: 41,
            total_area: 24.7,
            manager_id: 2,
            created_by: 2,
            material_id: 1,
            edge_type_id: 3,
            film_id: 3,
            milling_type_id: 1
        }
    ],
    // Детали заказов (примеры для первых трех заказов)
    orderDetails: [
        // Заказ 1001
        { detail_id: 1, order_id: 1001, detail_name: 'Столешница', detail_number: 1, width: 600, height: 2400, quantity: 1, area: 1.44, material_id: 2, edge_type_id: 2, film_id: 1, detail_cost: 5800 },
        { detail_id: 2, order_id: 1001, detail_name: 'Боковина левая', detail_number: 2, width: 560, height: 720, quantity: 1, area: 0.40, material_id: 2, edge_type_id: 2, film_id: 1, detail_cost: 1600 },
        { detail_id: 3, order_id: 1001, detail_name: 'Боковина правая', detail_number: 3, width: 560, height: 720, quantity: 1, area: 0.40, material_id: 2, edge_type_id: 2, film_id: 1, detail_cost: 1600 },
        { detail_id: 4, order_id: 1001, detail_name: 'Дверца верхняя', detail_number: 4, width: 396, height: 356, quantity: 6, area: 0.84, material_id: 2, edge_type_id: 2, film_id: 1, detail_cost: 3400 },
        { detail_id: 5, order_id: 1001, detail_name: 'Дверца нижняя', detail_number: 5, width: 396, height: 596, quantity: 4, area: 0.94, material_id: 2, edge_type_id: 2, film_id: 1, detail_cost: 3800 },
        
        // Заказ 1002
        { detail_id: 6, order_id: 1002, detail_name: 'Стенка задняя', detail_number: 1, width: 1200, height: 2200, quantity: 1, area: 2.64, material_id: 1, edge_type_id: 1, film_id: 2, detail_cost: 4200 },
        { detail_id: 7, order_id: 1002, detail_name: 'Стенка боковая', detail_number: 2, width: 600, height: 2200, quantity: 2, area: 2.64, material_id: 1, edge_type_id: 1, film_id: 2, detail_cost: 4200 },
        { detail_id: 8, order_id: 1002, detail_name: 'Полка', detail_number: 3, width: 580, height: 1180, quantity: 4, area: 2.74, material_id: 1, edge_type_id: 1, film_id: 2, detail_cost: 4400 },
        { detail_id: 9, order_id: 1002, detail_name: 'Дверь раздвижная', detail_number: 4, width: 600, height: 2180, quantity: 2, area: 2.62, material_id: 1, edge_type_id: 1, film_id: 2, detail_cost: 4200 },
        
        // Заказ 1003
        { detail_id: 10, order_id: 1003, detail_name: 'Стол рабочий', detail_number: 1, width: 800, height: 1600, quantity: 5, area: 6.40, material_id: 3, edge_type_id: 3, film_id: 3, detail_cost: 10200 },
        { detail_id: 11, order_id: 1003, detail_name: 'Тумба подкатная', detail_number: 2, width: 420, height: 600, quantity: 5, area: 1.26, material_id: 3, edge_type_id: 3, film_id: 3, detail_cost: 2000 },
        { detail_id: 12, order_id: 1003, detail_name: 'Стеллаж офисный', detail_number: 3, width: 800, height: 1800, quantity: 3, area: 4.32, material_id: 3, edge_type_id: 3, film_id: 3, detail_cost: 6900 }
    ]
};

// Вспомогательные функции для работы с демо-данными
window.demoData = demoData;

// Функция для получения клиента по ID
function getClientById(clientId) {
    return demoData.clients.find(client => client.client_id === clientId);
}

// Функция для получения материала по ID
function getMaterialById(materialId) {
    return demoData.materials.find(material => material.material_id === materialId);
}

// Функция для получения сотрудника по ID
function getEmployeeById(employeeId) {
    return demoData.employees.find(employee => employee.employee_id === employeeId);
}

// Функция для получения пользователя по ID
function getUserById(userId) {
    return demoData.users.find(user => user.user_id === userId);
}

// Функция для получения деталей заказа
function getOrderDetails(orderId) {
    return demoData.orderDetails.filter(detail => detail.order_id === orderId);
}

// Функция для форматирования валюты
function formatCurrency(amount) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Функция для форматирования даты
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
}

// Генерация дополнительных данных для большей демонстрации
function generateMoreOrders() {
    const additionalOrders = [];
    const baseDate = new Date('2025-08-01');
    
    for (let i = 11; i <= 50; i++) {
        const orderDate = new Date(baseDate);
        orderDate.setDate(orderDate.getDate() + Math.floor(Math.random() * 30));
        
        const plannedDate = new Date(orderDate);
        plannedDate.setDate(plannedDate.getDate() + Math.floor(Math.random() * 20) + 5);
        
        const clientId = Math.floor(Math.random() * 10) + 1;
        const client = getClientById(clientId);
        
        const statuses = ['Принят', 'В производстве', 'Готов к выдаче', 'Выполнен'];
        const priorities = ['Высокий', 'Средний', 'Низкий'];
        const managerId = Math.floor(Math.random() * 4) + 1;
        
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const priority = priorities[Math.floor(Math.random() * priorities.length)];
        
        const totalAmount = Math.floor(Math.random() * 200000) + 30000;
        const discount = Math.floor(Math.random() * 15);
        const discountedAmount = totalAmount * (1 - discount / 100);
        const paidAmount = Math.floor(discountedAmount * (Math.random() * 0.8 + 0.2));
        
        const partsCount = Math.floor(Math.random() * 40) + 5;
        const totalArea = Math.round((Math.random() * 25 + 3) * 10) / 10;
        
        const orderNames = [
            'Кухонный гарнитур', 'Шкаф-купе', 'Гостиная', 'Спальня', 'Детская',
            'Прихожая', 'Кабинет', 'Библиотека', 'Ванная комната', 'Встроенная мебель',
            'Офисная мебель', 'Стеллаж', 'Комод', 'Тумба', 'Столешница'
        ];
        
        const styles = [
            'Классик', 'Модерн', 'Минимализм', 'Прованс', 'Лофт', 'Скандинавский',
            'Элегант', 'Престиж', 'Комфорт', 'Люкс', 'Стандарт', 'Эконом'
        ];
        
        const orderName = `${orderNames[Math.floor(Math.random() * orderNames.length)]} "${styles[Math.floor(Math.random() * styles.length)]}"`;
        
        additionalOrders.push({
            order_id: 1000 + i,
            order_name: orderName,
            client_id: clientId,
            client_name: client.client_name,
            client_phone: client.phones[0],
            order_date: orderDate.toISOString().split('T')[0],
            priority: priority,
            completion_date: status === 'Выполнен' ? plannedDate.toISOString().split('T')[0] : null,
            planned_completion_date: plannedDate.toISOString().split('T')[0],
            status: status,
            total_amount: totalAmount,
            discounted_amount: discountedAmount,
            discount: discount,
            paid_amount: paidAmount,
            payment_date: orderDate.toISOString().split('T')[0],
            parts_count: partsCount,
            total_area: totalArea,
            manager_id: managerId,
            created_by: managerId,
            material_id: Math.floor(Math.random() * 4) + 1,
            edge_type_id: Math.floor(Math.random() * 4) + 1,
            film_id: Math.floor(Math.random() * 4) + 1,
            milling_type_id: Math.floor(Math.random() * 4) + 1
        });
    }
    
    return additionalOrders;
}

// Добавляем дополнительные заказы к основным данным
demoData.orders = [...demoData.orders, ...generateMoreOrders()];
