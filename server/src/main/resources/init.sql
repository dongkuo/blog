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
  created_time DATETIME,
  updated_time DATETIME
)