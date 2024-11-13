CREATE DATABASE IF NOT EXISTS lochyl;
USE lochyl;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_pic VARCHAR(255),
    email VARCHAR(255) NOT NULL
);

INSERT INTO users (username, password, profile_pic, email) VALUES
    ("Lily", "pass_0", "../assets/images/Lily.png", "Lily@email.com"),
    ("Kiefer", "pass_1", "../assets/images/Kiefer.png", "Kiefer@email.com"),
    ("Jesse", "pass_2", "../assets/images/Jesse.png", "Jesse@email.com"),
    ("Clab", "pass_3", "../assets/images/Clab.png", "Clab@email.com");

CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    text TEXT,
    location VARCHAR(255),
    longitude DECIMAL(9,6),
    latitude DECIMAL(9,6),
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
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

CREATE TABLE IF NOT EXISTS post_interactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    interaction_type ENUM('like', 'dislike') NOT NULL,
    UNIQUE KEY (user_id, post_id)
);

CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    parent_id INT,
    username TEXT,
    text TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS zones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    center_longitude DECIMAL(9,7) NOT NULL,
    center_latitude DECIMAL(9,7) NOT NULL,
    radius INT NOT NULL
);

INSERT INTO zones (name, center_latitude, center_longitude, radius) VALUES
    ("IESB", 32.52639082775588, -92.6434647523128, 75),
    ("Student Center", 32.52692060207673, -92.64824658960131, 50),
    ("Toliver", 32.52641403031212, -92.64900297250526, 30),
    ("Nethken Hall", 32.52572653547901, -92.64477044672043, 40),
    ("University Crossing", 32.520169220490395, -92.65200185118128, 125);
