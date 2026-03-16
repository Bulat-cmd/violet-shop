const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const PRODUCTS = [
  {
    id: 1,
    name: "Фиолетовый чайник",
    category: "Кухонная техника",
    price: 2599,
    description: "Класический, а главное удобный заварной чайник",
    image: "https://imgcdn.stablediffusionweb.com/2026/3/16/9c2d5d60-daa2-44cf-8656-71ffb419a310.webp"
  },
  {
    id: 2,
    name: "Беспроводные наушники Violet",
    category: "Гаджеты",
    price: 4599,
    description: "Стильные наушники для музыки и звонков. Фиолетовый лимит.",
    image: "https://imgcdn.stablediffusionweb.com/2026/3/16/361bf4b0-e1db-44b0-8314-ba823726d000.webp" // purple headphones
  },
  {
    id: 3,
    name: "Ортопедическая подушка",
    category: "Дом и уют",
    price: 1490,
    description: "Ультрамягкая подушка с эффектом памяти в фиолетовом чехле.",
    image: "https://imgcdn.stablediffusionweb.com/2026/3/16/d400faa6-cc4f-4175-a1f6-b32b24787add.webp" // purple pillow
  },
  {
    id: 4,
    name: "Violet Smart Watch",
    category: "Гаджеты",
    price: 3390,
    description: "Умные часы в фиолетовом корпусе. Все функции для спорта и жизни.",
    image: "https://imgcdn.stablediffusionweb.com/2026/3/16/8787f302-787b-46b3-a548-5d34b90f959f.webp" // smartwatch
  },
  {
    id: 5,
    name: "Термокружка Violet",
    category: "Товары для дома",
    price: 840,
    description: "Фиолетовая термокружка для ваших любимых напитков.",
    image: "https://kitfort.ru/upload/resize_cache/webp/upload/iblock/3f3/1xx6s42hza7ak06j951tvoarurxurjd9.webp" // purple mug
  },
  {
    id: 6,
    name: "Violet Backpack",
    category: "Аксессуары",
    price: 2550,
    description: "Городской рюкзак фиолетового цвета. Вместительный и стильный.",
    image: "https://imgcdn.stablediffusionweb.com/2026/3/16/cd124cd2-8865-4379-afa5-4467a1df10c1.webp" // purple backpack
  },
  {
    id: 7,
    name: "Текстильные полотенца Violet",
    category: "Товары для дома",
    price: 499,
    description: "Комплект мягких полотенец фиолетового оттенка.",
    image: "https://imgcdn.stablediffusionweb.com/2026/3/16/ecfef8a4-d680-4181-9985-775395134f25.webp" // towels purple
  },
  {
    id: 8,
    name: "Графический планшет Violet Pro",
    category: "Гаджеты",
    price: 2990,
    description: "Планшет для творчества и работы, фиолетовый корпус.",
    image: "https://imgcdn.stablediffusionweb.com/2026/3/16/dd3ea4fb-f3b1-498c-b723-1cd339b8afb6.webp" // graphics tablet
  }
];
let nextProductId = 9;
const REVIEWS = [
  { productId: 1, user: "Ирина", rating: 4, comment: "Чайник очень стильный!", date: new Date() },
  { productId: 2, user: "Миша", rating: 5, comment: "Удобные наушники. Звук на уровне!", date: new Date() },
  { productId: 4, user: "Ольга", rating: 5, comment: "Часы живые, все функции работают.", date: new Date() },
  { productId: 6, user: "Максим", rating: 4, comment: "Рюкзак вместительный и приятный цвет!", date: new Date() }
];

// API:
app.get('/products', (req, res) => {
  let result = PRODUCTS;
  const { category, minPrice, maxPrice, search } = req.query;
  if (category) result = result.filter(p => p.category === category);
  if (minPrice) result = result.filter(p => p.price >= +minPrice);
  if (maxPrice) result = result.filter(p => p.price <= +maxPrice);
  if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  res.json(result);
});

app.get('/products/:id', (req, res) => {
  const p = PRODUCTS.find(x => x.id === Number(req.params.id));
  if (!p) return res.status(404).json({error: "Not found"});
  res.json(p);
});

app.post('/products', (req, res) => {
  const prod = {...req.body, id: nextProductId++};
  PRODUCTS.push(prod);
  res.json(prod);
});

app.get('/products/:id/reviews', (req, res) => {
  res.json(REVIEWS.filter(r => r.productId === Number(req.params.id)));
});

app.post('/products/:id/reviews', (req, res) => {
  const { user, rating, comment } = req.body;
  const review = {
    productId: Number(req.params.id),
    user,
    rating,
    comment,
    date: new Date()
  };
  REVIEWS.push(review);
  res.json(review);
});

app.listen(5000, () => console.log('Violet Shop backend started on port 5000'));