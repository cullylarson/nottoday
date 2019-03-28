CREATE TABLE users (
    twitterId           BIGINT UNSIGNED NOT NULL,
    screenName          VARCHAR(64),
    accountUrl          TEXT,
    profileImageUrl     TEXT,
    token               TEXT,
    tokenSecret         TEXT,
    created             DATETIME,
    updated             DATETIME,
    PRIMARY KEY (twitterId)
) ENGINE=InnoDB CHARACTER SET=utf8mb4 COLLATE=utf8mb4_general_ci
