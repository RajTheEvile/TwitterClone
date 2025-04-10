Database Info

User Table
------------------------------
Column	Type
user_id	INTEGER
name	TEXT
username	TEXT
password	TEXT
gender	TEXT

Follower Table
------------------------------
Column	Type
follower_id	INTEGER
follower_user_id	INTEGER
following_user_id	INTEGER
Here, if user1 follows user2 then,

follower_user_id is the user ID of user1 and following_user_id is the user ID of user2.

Tweet Table
----------------------------
Column	Type
tweet_id	INTEGER
tweet	TEXT
user_id	INTEGER
date_time	DATETIME

Reply Table
------------------------------
Column	Type
reply_id	INTEGER
tweet_id	INTEGER
reply	TEXT
user_id	INTEGER
date_time	DATETIME


Like Table
-----------------------------
Column	Type
like_id	INTEGER
tweet_id	INTEGER
user_id	INTEGER
date_time	DATETIME



CREATE TABLE sqlite_sequence(name,seq);
CREATE TABLE user (
            user_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            username TEXT,
            password TEXT,
            gender TEXT
          );
CREATE TABLE follower (
            follower_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            follower_user_id INT,
            following_user_id   INT,
            FOREIGN KEY(follower_user_id) REFERENCES user(user_id) ON DELETE CASCADE,
            FOREIGN KEY(following_user_id) REFERENCES user(user_id) ON DELETE CASCADE
          );
CREATE TABLE tweet (
            tweet_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            tweet TEXT,
            user_id     INT,
            date_time   DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE
          );
CREATE TABLE like (
            like_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            tweet_id INT,
            user_id INT
            date_time   DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE,
            FOREIGN KEY(tweet_id) REFERENCES tweet(tweet_id) ON DELETE CASCADE
          );
CREATE TABLE reply (
  reply_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  tweet_id INT,
  reply TEXT,
  user_id INT, -- ✅ Comma added here
  date_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE,
  FOREIGN KEY(tweet_id) REFERENCES tweet(tweet_id) ON DELETE CASCADE
);
sqlite> DROP TABLE IF EXISTS reply;
sqlite> CREATE TABLE reply (  reply_id INTEGER NOT NULL PRIMARY KEY,         -- This is the tweet_id of the reply tweet  tweet_id INTEGER NOT NULL,  
                   -- This is the tweet being replied to  date_time DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Optional: Can match the tweet's time  FOREIGN KEY (reply_id) REFERENCES tweet(tweet_id) ON DELETE CASCADE,  FOREIGN KEY (tweet_id) REFERENCES tweet(tweet_id) ON DELETE CASCADE);
(x1...> 
(x1...> ;
Parse error: near ";": syntax error
  ) REFERENCES tweet(tweet_id) ON DELETE CASCADE);  ;
                                      error here ---^
sqlite> .schema
CREATE TABLE sqlite_sequence(name,seq);
CREATE TABLE user (
            user_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            username TEXT,
            password TEXT,
            gender TEXT
          );
CREATE TABLE follower (
            follower_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            follower_user_id INT,
            following_user_id   INT,
            FOREIGN KEY(follower_user_id) REFERENCES user(user_id) ON DELETE CASCADE,
            FOREIGN KEY(following_user_id) REFERENCES user(user_id) ON DELETE CASCADE
          );
CREATE TABLE tweet (
            tweet_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            tweet TEXT,
            user_id     INT,
            date_time   DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE
          );
CREATE TABLE like (
            like_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            tweet_id INT,
            user_id INT
            date_time   DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE,
            FOREIGN KEY(tweet_id) REFERENCES tweet(tweet_id) ON DELETE CASCADE
          );
sqlite> CREATE TABLE reply (
(x1...>   reply_id INTEGER NOT NULL PRIMARY KEY,         -- This is the tweet_id of the reply tweet
(x1...>   tweet_id INTEGER NOT NULL,                     -- This is the tweet being replied to
(x1...>   date_time DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Optional: Can match the tweet's time
(x1...>   FOREIGN KEY (reply_id) REFERENCES tweet(tweet_id) ON DELETE CASCADE,
(x1...>   FOREIGN KEY (tweet_id) REFERENCES tweet(tweet_id) ON DELETE CASCADE
(x1...> );
sqlite> .schema
CREATE TABLE sqlite_sequence(name,seq);
CREATE TABLE user (
            user_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            username TEXT,
            password TEXT,
            gender TEXT
          );
CREATE TABLE follower (
            follower_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            follower_user_id INT,
            following_user_id   INT,
            FOREIGN KEY(follower_user_id) REFERENCES user(user_id) ON DELETE CASCADE,
            FOREIGN KEY(following_user_id) REFERENCES user(user_id) ON DELETE CASCADE
          );
CREATE TABLE tweet (
            tweet_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            tweet TEXT,
            user_id     INT,
            date_time   DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE
          );
CREATE TABLE like (
            like_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            tweet_id INT,
            user_id INT
            date_time   DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE,
            FOREIGN KEY(tweet_id) REFERENCES tweet(tweet_id) ON DELETE CASCADE
          );
CREATE TABLE reply (
  reply_id INTEGER NOT NULL PRIMARY KEY,         -- This is the tweet_id of the reply tweet
  tweet_id INTEGER NOT NULL,                     -- This is the tweet being replied to
  date_time DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Optional: Can match the tweet's time
  FOREIGN KEY (reply_id) REFERENCES tweet(tweet_id) ON DELETE CASCADE,
  FOREIGN KEY (tweet_id) REFERENCES tweet(tweet_id) ON DELETE CASCADE
);
sqlite> .schema
CREATE TABLE sqlite_sequence(name,seq);
CREATE TABLE user (
            user_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            username TEXT,
            password TEXT,
            gender TEXT
          );
CREATE TABLE follower (
            follower_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            follower_user_id INT,
            following_user_id   INT,
            FOREIGN KEY(follower_user_id) REFERENCES user(user_id) ON DELETE CASCADE,
            FOREIGN KEY(following_user_id) REFERENCES user(user_id) ON DELETE CASCADE
          );
CREATE TABLE tweet (
            tweet_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            tweet TEXT,
            user_id     INT,
            date_time   DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE
          );
CREATE TABLE like (
            like_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            tweet_id INT,
            user_id INT
            date_time   DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE,
            FOREIGN KEY(tweet_id) REFERENCES tweet(tweet_id) ON DELETE CASCADE
          );
CREATE TABLE reply (
  reply_id INTEGER NOT NULL PRIMARY KEY,         -- This is the tweet_id of the reply tweet
  tweet_id INTEGER NOT NULL,                     -- This is the tweet being replied to
  date_time DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Optional: Can match the tweet's time
  FOREIGN KEY (reply_id) REFERENCES tweet(tweet_id) ON DELETE CASCADE,
  FOREIGN KEY (tweet_id) REFERENCES tweet(tweet_id) ON DELETE CASCADE
);