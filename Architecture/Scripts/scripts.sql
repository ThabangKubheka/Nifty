use intertech;

CREATE TABLE user (
    userId INT AUTO_INCREMENT unique,
    username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE userInfo (
    username VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    cellphone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    status BOOLEAN DEFAULT false,
    FOREIGN KEY (username) REFERENCES user(username)
);

DELIMITER / / CREATE PROCEDURE GetUserInformation(IN p_username VARCHAR(255)) BEGIN
SELECT
    *
FROM
    userInfo
WHERE
    username = p_username;

END / / DELIMITER;

CALL GetUserInformation('Vusi');