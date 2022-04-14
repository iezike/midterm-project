-- Drop and recreate Resources table (Example)

DROP TABLE IF EXISTS resources CASCADE;
CREATE TABLE resources (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  topic VARCHAR(255) NOT NULL,
  external_url VARCHAR(255) NOT NULL,
  like_count INTEGER DEFAULT 0
);
