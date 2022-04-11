-- Drop tables if any e
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS ratings CASCADE;
DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE resources (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  external_url VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  topic VARCHAR(255) NOT NULL
);


CREATE TABLE favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER REFERENCES resources(id) ON DELETE CASCADE
);


CREATE TABLE ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER REFERENCES resources(id) ON DELETE CASCADE,,
  rating INTEGER
);


CREATE TABLE comments (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE
  CASCADE,
  resource_id INTEGER REFERENCES resources(id) ON DELETE CASCADE,
  text VARCHAR(255),
  created_at TIME NOT NULL
);




INSERT INTO users (name, email, password)
VALUES ('Eva Stanley', 'sebastianguerra@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Louisa Meyer', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Dominic Parks', 'victoriablackwell@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Devin Sanders', 'tristanjacobs@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Iva Harrison', 'allisonjackson@mail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO resources(user_id, external_url, title, topic)
VALUES
('https://www.pinterest.ca/', 'Pinterest', 'A replica of resource wall'),
('https://www.lighthouselabs.ca/', 'Skills training for software development')

INSERT INTO favorites(user_id, resource_id)
VALUES(1,1), (2,2), (1,5), (4,3), (5,2);

INSERT INTO ratings(user_id, resource_id, rating)
VALUES(2, 1, 4), (1,3, 5), (3,4,5), (4,1,4), (5, 5, 3)
