CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255),
    wifimacaddr VARCHAR(255),
    accountType VARCHAR(128)
);
