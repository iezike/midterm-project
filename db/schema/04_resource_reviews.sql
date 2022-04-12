-- Drop and recreate Resource Review table (Example)

DROP TABLE IF EXISTS resource_reviews CASCADE;
CREATE TABLE resource_reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  resource_id INTEGER REFERENCES resources(id) NOT
  NULL,
  comment TEXT,
  rating INTEGER,
  liked BOOLEAN DEFAULT FALSE
);
