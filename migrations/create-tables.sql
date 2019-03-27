CREATE TABLE logins (
    twitterId           BIGINT UNSIGNED NOT NULL,
    token               TEXT,
    tokenSecret         TEXT,
    created             DATETIME,
    PRIMARY KEY (twitterId)
) ENGINE=InnoDB CHARACTER SET=utf8mb4 COLLATE=utf8mb4_general_ci
