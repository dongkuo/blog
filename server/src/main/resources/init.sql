CREATE TABLE IF NOT EXISTS tb_post(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TINYINT NOT NULL,
  state TINYINT NOT NULL,
  cover_image VARCHAR(500),
  cover_caption VARCHAR(50),
  title VARCHAR(50),
  summary VARCHAR(500),
  html TEXT,
  markdown TEXT,
  reading_number INT,
  like_number INT,
  commenting_number INT,
  finished_time DATETIME,
  created_time TIMESTAMP,
  updated_time TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tb_moment(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content VARCHAR(500) NOT NULL,
  created_time TIMESTAMP,
  updated_time TIMESTAMP
);
CREATE INDEX tb_moment_created_time_index ON tb_moment (created_time DESC);