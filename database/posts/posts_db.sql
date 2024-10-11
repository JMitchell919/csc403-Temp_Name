CREATE DATABASE IF NOT EXISTS posts_db;
USE posts_db;

CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    date VARCHAR(50),
    text TEXT,
    like_count INT DEFAULT 0,
    dislike_count INT DEFAULT 0,
    comment_count INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS post_pics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    pic_url VARCHAR(255),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

