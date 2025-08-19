// demo-data.js — Демонстрационные данные (казахстанский контекст)
// Важное: для каждого заказа генерируется 30–40 позиций,
// по которым считаются агрегаты: positions_count, details_total, total_area (м²).

const demoData = {
  clients: [
    { client_id: 1, client_name: 'ТОО «КазМебель»', phones: ['+7 (701) 123-45-67'] },
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

  materialTypes: [
    { material_type_id: 1, material_type_name: 'ЛДСП' },
    { material_type_id: 2, material_type_name: 'МДФ' },
    { material_type_id: 3, material_type_name: 'Кромка' },
    { material_type_id: 4, material_type_name: 'Пленка' },
    { material_type_id: 5, material_type_name: 'Клей' },
    { material_type_id: 6, material_type_name: 'Фурнитура' }
  ],

  materials: [
    { material_id: 1, material_name: 'ЛДСП 16мм Белый', unit: 'лист', material_type_id: 1, vendor_id: 1 },
    { material_id: 2, material_name: 'ЛДСП 18мм Дуб Сонома', unit: 'лист', material_type_id: 1, vendor_id: 1 },
    { material_id: 3, material_name: 'МДФ 16мм Kronospan', unit: 'лист', material_type_id: 2, vendor_id: 2 },
    { material_id: 4, material_name: 'МДФ 18мм влагостойкий', unit: 'лист', material_type_id: 2, vendor_id: 2 }
  ],

  edgeTypes: [
    { edge_type_id: 1, edge_type_name: 'ПВХ 0.4мм' },
    { edge_type_id: 2, edge_type_name: 'ПВХ 2мм' },
    { edge_type_id: 3, edge_type_name: 'АБС 1мм' }
  ],

  films: [
    { film_id: 1, film_name: 'Белый глянец', film_vendor_id: 1, film_texture: false },
    { film_id: 2, film_name: 'Орех тёмный', film_vendor_id: 2, film_texture: true },
    { film_id: 3, film_name: 'Серый матовый', film_vendor_id: 3, film_texture: false },
    { film_id: 4, film_name: 'Дуб натуральный', film_vendor_id: 1, film_texture: true }
  ],

  millingTypes: [
    { milling_type_id: 1, milling_type_name: 'Средняя лапша' },
    { milling_type_id: 2, milling_type_name: 'Выборка 60×6' },
    { milling_type_id: 3, milling_type_name: 'Рифлёнка 8×2' }
  ],

  roles: [
    { role_id: 1, role_name: 'manager' },
    { role_id: 2, role_name: 'admin' }
  ],

  users: [
    { user_id: 1, username: 'amanov', employee_id: 1, role_id: 1 },
    { user_id: 2, username: 'akhmetova', employee_id: 2, role_id: 1 },
    { user_id: 3, username: 'smagulov', employee_id: 3, role_id: 1 },
    { user_id: 4, username: 'kasymkhanova', employee_id: 4, role_id: 1 }
  ],

  employees: [
    { employee_id: 1, full_name: 'Аманов Нурлан Кайратович', position: 'Менеджер по продажам' },
    { employee_id: 2, full_name: 'Ахметова Айсулу Ермековна', position: 'Менеджер по продажам' },
    { employee_id: 3, full_name: 'Смагулов Даурен Бахытович', position: 'Менеджер по продажам' },
    { employee_id: 4, full_name: 'Касымханова Жанна Маратовна', position: 'Менеджер по продажам' }
  ],

  orders: [
    {
      order_id: 1001, order_name: 'Кухонный гарнитур «Модерн»',
      client_id: 1, client_name: 'ТОО «КазМебель»', client_phone: '+7 (701) 123-45-67',
      order_date: '2025-08-15', priority: 'Высокий', planned_completion_date: '2025-08-25',
      status: 'В производстве', total_amount: 145000, discounted_amount: 130500, discount: 10,
      paid_amount: 70000, payment_date: '2025-08-15', manager_id: 1, created_by: 1,
      material_id: 2, edge_type_id: 2, film_id: 1, milling_type_id: 1
    },
    {
      order_id: 1002, order_name: 'Шкаф-купе «Астана»',
      client_id: 2, client_name: 'ИП Ахметов Е.К.', client_phone: '+7 (707) 234-56-78',
      order_date: '2025-08-16', priority: 'Средний', planned_completion_date: '2025-08-28',
      status: 'Принят', total_amount: 89000, discounted_amount: 89000, discount: 0,
      paid_amount: 45000, payment_date: '2025-08-16', manager_id: 1, created_by: 1,
      material_id: 1, edge_type_id: 1, film_id: 3, milling_type_id: 2
    },
    {
      order_id: 1003, order_name: 'Офисные столы «Нур-Султан»',
      client_id: 3, client_name: 'ТОО «Интерьер Плюс KZ»', client_phone: '+7 (747) 345-67-89',
      order_date: '2025-08-17', priority: 'Высокий', planned_completion_date: '2025-08-27',
      status: 'В производстве', total_amount: 235000, discounted_amount: 211500, discount: 10,
      paid_amount: 150000, payment_date: '2025-08-17', manager_id: 2, created_by: 2,
      material_id: 3, edge_type_id: 3, film_id: 4, milling_type_id: 1
    },
    {
      order_id: 1004, order_name: 'Тумбы под ТВ «Алатау»',
      client_id: 4, client_name: 'Сейдахметов Айдос Нурпеисович', client_phone: '+7 (776) 456-78-90',
      order_date: '2025-08-18', priority: 'Низкий', planned_completion_date: '2025-08-29',
      status: 'Принят', total_amount: 56000, discounted_amount: 56000, discount: 0,
      paid_amount: 0, payment_date: null, manager_id: 3, created_by: 3,
      material_id: 4, edge_type_id: 1, film_id: 2, milling_type_id: 3
    },
    {
      order_id: 1005, order_name: 'Кухня «Сарыарка»',
      client_id: 5, client_name: 'ТОО «Комфорт Мебель KZ»', client_phone: '+7 (701) 567-89-01',
      order_date: '2025-08-19', priority: 'Низкий', planned_completion_date: '2025-08-19',
      status: 'Готов к выдаче', total_amount: 45000, discounted_amount: 45000, discount: 0,
      paid_amount: 45000, payment_date: '2025-08-19', manager_id: 1, created_by: 1,
      material_id: 2, edge_type_id: 2, film_id: 1, milling_type_id: 2
    },
    {
      order_id: 1006, order_name: 'Гардеробная «Байтерек»',
      client_id: 6, client_name: 'ИП Садыкова А.Н.', client_phone: '+7 (705) 678-90-12',
      order_date: '2025-08-20', priority: 'Средний', planned_completion_date: '2025-08-30',
      status: 'В производстве', total_amount: 123000, discounted_amount: 117850, discount: 5,
      paid_amount: 80000, payment_date: '2025-08-20', manager_id: 2, created_by: 2,
      material_id: 1, edge_type_id: 2, film_id: 3, milling_type_id: 1
    },
    {
      order_id: 1007, order_name: 'Коммерческая стойка «Медеу»',
      client_id: 7, client_name: 'ТОО «Элит Мебель KZ»', client_phone: '+7 (771) 789-01-23',
      order_date: '2025-08-21', priority: 'Высокий', planned_completion_date: '2025-08-31',
      status: 'Принят', total_amount: 199000, discounted_amount: 179100, discount: 10,
      paid_amount: 100000, payment_date: '2025-08-21', manager_id: 3, created_by: 3,
      material_id: 4, edge_type_id: 3, film_id: 2, milling_type_id: 2
    },
    {
      order_id: 1008, order_name: 'Прихожая «Тулпар»',
      client_id: 8, client_name: 'Касымов Нуржан Еркинович', client_phone: '+7 (707) 890-12-34',
      order_date: '2025-08-22', priority: 'Средний', planned_completion_date: '2025-09-02',
      status: 'Принят', total_amount: 76000, discounted_amount: 76000, discount: 0,
      paid_amount: 20000, payment_date: '2025-08-22', manager_id: 4, created_by: 4,
      material_id: 3, edge_type_id: 1, film_id: 4, milling_type_id: 3
    },
    {
      order_id: 1009, order_name: 'Офисные шкафы «Есиль»',
      client_id: 9, client_name: 'ТОО «Office Design Astana»', client_phone: '+7 (701) 901-23-45',
      order_date: '2025-08-10', priority: 'Высокий', planned_completion_date: '2025-08-26',
      status: 'В производстве', total_amount: 152000, discounted_amount: 152000, discount: 0,
      paid_amount: 120000, payment_date: '2025-08-10', manager_id: 1, created_by: 1,
      material_id: 2, edge_type_id: 2, film_id: 1, milling_type_id: 2
    },
    {
      order_id: 1010, order_name: 'Кухня «Алматы»',
      client_id: 10, client_name: 'ИП Нұрқожаев Б.Б.', client_phone: '+7 (775) 012-34-56',
      order_date: '2025-08-10', priority: 'Средний', planned_completion_date: '2025-09-01',
      status: 'Принят', total_amount: 178000, discounted_amount: 169100, discount: 5,
      paid_amount: 90000, payment_date: '2025-08-10', manager_id: 2, created_by: 2,
      material_id: 1, edge_type_id: 3, film_id: 3, milling_type_id: 1
    }
  ],

  // Позиции заказа генерируются ниже
  order_items: [],
  warehouses: [
    { warehouse_id: 1, warehouse_name: 'Основной склад' },
    { warehouse_id: 2, warehouse_name: 'Склад №2' }
  ]
};

// ——— Генерация позиций для каждого заказа (30–40 шт/заказ) ———
(() => {
  let nextItemId = 1;

  // стабильный псевдослучайный генератор для воспроизводимости
  const rng = (seed => () => (seed = (seed * 9301 + 49297) % 233280) / 233280)(123456);

  const pick = arr => arr[Math.floor(rng() * arr.length)];
  const roundTo = (v, step) => Math.round(v / step) * step;

  const types = ['Фасад', 'Полка', 'Боковина', 'Перегородка', 'Дверца', 'Цоколь', 'Панель', 'Надставка'];
  const widths = [200, 250, 300, 350, 400, 450, 500, 550, 600, 700, 800, 900];
  const heights = [200, 300, 350, 400, 450, 500, 600, 700, 900, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400];

  // генерация позиций
  for (const order of demoData.orders) {
    const cnt = 30 + Math.floor(rng() * 11); // 30..40
    for (let i = 0; i < cnt; i++) {
      const w = pick(widths);
      const h = pick(heights);
      const qty = 1 + Math.floor(rng() * 4); // 1..4

      demoData.order_items.push({
        item_id: nextItemId++,
        order_id: order.order_id,
        item_name: `${pick(types)} ${i + 1}`,
        width_mm: roundTo(w, 10),
        height_mm: roundTo(h, 10),
        quantity: qty,
        material_id: pick([1, 2, 3, 4]),
        edge_type_id: pick([1, 2, 3]),
        film_id: pick([1, 2, 3, 4]),
        milling_type_id: pick([1, 2, 3]),
        note: ''
      });
    }
  }

  // расчёт агрегатов на заказ
  const recalcOne = (orderId) => {
    const items = demoData.order_items.filter(x => x.order_id === orderId);
    const positions = items.length;
    let details = 0;
    let areaM2 = 0;
    for (const it of items) {
      details += Number(it.quantity) || 0;
      const area = ((Number(it.width_mm) || 0) * (Number(it.height_mm) || 0)) / 1_000_000; // м² одной детали
      areaM2 += area * (Number(it.quantity) || 0);
    }
    const ord = demoData.orders.find(o => o.order_id === orderId);
    if (ord) {
      ord.positions_count = positions;
      ord.details_total = details;
      ord.total_area = Number(areaM2.toFixed(1)); // 1 знак после запятой
    }
  };

  for (const o of demoData.orders) recalcOne(o.order_id);

  // Экспортируем хелперы для других модулей
  window.recalcOrderAggregates = recalcOne;

  window.duplicateOrderItems = (srcOrderId, newOrderId) => {
    const src = demoData.order_items.filter(x => x.order_id === srcOrderId);
    for (const it of src) {
      demoData.order_items.unshift({
        ...it,
        item_id: nextItemId++,
        order_id: newOrderId,
        item_name: it.item_name.replace(/\d+$/, (m) => `${Number(m) + 100}`) // чтобы имена отличались
      });
    }
    recalcOne(newOrderId);
  };
})();
