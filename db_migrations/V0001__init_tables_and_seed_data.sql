CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    mood VARCHAR(50),
    location VARCHAR(50),
    size VARCHAR(50),
    style VARCHAR(50),
    available BOOLEAN DEFAULT true,
    price_range VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS dialogue_messages (
    id SERIAL PRIMARY KEY,
    step VARCHAR(50) NOT NULL,
    message_text TEXT NOT NULL,
    emotion VARCHAR(50) DEFAULT 'idle',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_sessions (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    preferences JSONB,
    last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_requests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    contact VARCHAR(255) NOT NULL,
    preferences JSONB,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO dialogue_messages (step, message_text, emotion) VALUES
('welcome', 'Хэй-хэй, привет чел! Я тут за уют отвечаю 🌿', 'greeting'),
('welcome', 'О! Гость! Заходи, я покажу кое-что редкое.', 'greeting'),
('welcome', 'Привет. Я дерево. Я не кусаюсь. Я — выбираю красоту 😌', 'idle'),
('mood', 'Давай начнём с простого: какое у тебя сейчас настроение?', 'thinking'),
('mood', 'Выбери листочек, который тебе откликается', 'thinking'),
('location', 'Отлично! А куда планируешь поселить растение?', 'happy'),
('size', 'Понял. Сколько у тебя места?', 'thinking'),
('style', 'Почти готово! Какой у тебя интерьер?', 'thinking'),
('reveal', 'Окей, я кое-что нашёл... Дай-ка я потрясу ветки!', 'presenting'),
('reveal', 'Сейчас покажу редкость...', 'presenting')
ON CONFLICT DO NOTHING;

INSERT INTO products (name, description, mood, location, size, style, available, price_range, image_url) VALUES
('Тихое дерево', 'Спокойная композиция из исландского мха на камне вулканической породы', 'calm', 'home', 'small', 'warm', true, '5000-7000₽', 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=800'),
('Зелёный всплеск', 'Яркое сочетание мха разных оттенков для энергичных интерьеров', 'vibrant', 'office', 'medium', 'industrial', true, '8000-12000₽', 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800'),
('Минимал-куб', 'Лаконичная геометрия с одним акцентом зелени', 'minimal', 'office', 'small', 'minimal', true, '4000-6000₽', 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800'),
('Лесной подарок', 'Небольшая композиция в деревянной раме, идеально для подарка', 'calm', 'gift', 'small', 'warm', true, '3500-5000₽', 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=800'),
('Лофт-сад', 'Крупная композиция на бетонном основании для индустриальных пространств', 'vibrant', 'cafe', 'large', 'industrial', true, '15000-20000₽', 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=800')
ON CONFLICT DO NOTHING;