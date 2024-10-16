CREATE DATABASE IF NOT EXISTS lochyl;
USE lochyl;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_pic VARCHAR(255)
);

INSERT INTO users (username, password, profile_pic) VALUES
    ("Lily", "pass_0", "../assets/images/Lily.png"),
    ("Kiefer", "pass_1", "../assets/images/Kiefer.png"),
    ("Jesse", "pass_2", "../assets/images/Jesse.png"),
    ("Clab", "pass_3", "../assets/images/Clab.png");

CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    date DATE,
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