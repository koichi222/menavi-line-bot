DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS attendances;
DROP TABLE IF EXISTS tweets;
DROP TABLE IF EXISTS casts;
DROP TABLE IF EXISTS shops;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS reviews;

-- Users Table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    line_user_id VARCHAR(255),
    line_token VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER,
    updated_by INTEGER
);

-- Shops Table
CREATE TABLE shops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    area VARCHAR(100),
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER,
    updated_by INTEGER
);

-- Casts Table
CREATE TABLE casts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    shop_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    profile TEXT,
    bast INTEGER,
    weist INTEGER,
    hip INTEGER,
    twitter_id VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER,
    updated_by INTEGER,
    FOREIGN KEY (shop_id) REFERENCES shops(id)
);

-- Tweets Table
CREATE TABLE tweets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cast_id INTEGER NOT NULL,
    twitter_id VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER,
    updated_by INTEGER,
    FOREIGN KEY (cast_id) REFERENCES casts(id)
);

-- Attendances Table
CREATE TABLE attendances (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    shop_id INTEGER NOT NULL,
    cast_id INTEGER NOT NULL,
    room VARCHAR(100),
    date DATE NOT NULL,
    week_day VARCHAR(10),
    start_time TIME,
    end_time TIME,
    url VARCHAR(255),
    reservation_url VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER,
    updated_by INTEGER,
    FOREIGN KEY (shop_id) REFERENCES shops(id),
    FOREIGN KEY (cast_id) REFERENCES casts(id)
);

-- Favorites Table
CREATE TABLE favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    cast_id INTEGER NOT NULL,
    faved_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER,
    updated_by INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (cast_id) REFERENCES casts(id)
);

-- 口コミ (Reviews) Table
CREATE TABLE reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cast_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    price INTEGER,
    score INTEGER,
    FOREIGN KEY (cast_id) REFERENCES casts(id)
);
