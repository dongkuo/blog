CREATE TABLE IF NOT EXISTS tb_post_category(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(20),
  url VARCHAR(100),
  sort_value INTEGER DEFAULT 0,
  visible BIT,
  created_time TIMESTAMP,
  updated_time TIMESTAMP
);
CREATE INDEX IF NOT EXISTS tb_post_category_sort_value_index ON tb_post_category (sort_value ASC);
CREATE TABLE IF NOT EXISTS tb_post(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL,
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
  finished_time TIMESTAMP,
  created_time TIMESTAMP,
  updated_time TIMESTAMP
);
CREATE TABLE IF NOT EXISTS tb_moment(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content VARCHAR(500) NOT NULL,
  created_time TIMESTAMP,
  updated_time TIMESTAMP
);
CREATE INDEX IF NOT EXISTS tb_moment_created_time_index ON tb_moment (created_time DESC);
CREATE TABLE IF NOT EXISTS tb_about(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  markdown text NOT NULL,
  html text NOT NULL,
  visible BIT,
  created_time TIMESTAMP,
  updated_time TIMESTAMP
);