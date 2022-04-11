-- Drop tables if any exit
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS ratings CASCADE;
DROP TABLE IF EXISTS comments CASCADE;


-- Create tables

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






-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS users CASCADE;

-- create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
);
INSERT INTO users (name, email, password, avatar) VALUES
('Alice', 'alice@gmail.com', 'alice', 'https://cdn.iconscout.com/icon/free/png-256/avatar-369-456321.png')


CREATE TABLE resources (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  external_url VARCHAR(255),
  title VARCHAR(255),
  topic VARCHAR(255),
);
INSERT INTO resources (title, topic, description, url, user_id)
VALUES ('jQuery', 'Web Development', 'A feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. ', 'https://jquery.com/', 1)

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  resource_id INTEGER REFERENCES resources(id),
);


CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  resource_id INTEGER REFERENCES resources(id)
  text VARCHAR(255),
  created_at time,
);



CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  resource_id INTEGER REFERENCES resources(id)
);





-- DROP TABLE likes;
-- DROP TABLE rates;
-- DROP TABLE comments;
-- DROP TABLE resources;
-- DROP TABLE users;

-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(255),
--   email VARCHAR(255),
--   password VARCHAR(255),
--   avatar VARCHAR(255)
-- );

INSERT INTO users (name, email, password, avatar) VALUES
('Alice', 'alice@gmail.com', 'alice', 'https://cdn.iconscout.com/icon/free/png-256/avatar-369-456321.png'),
('Kyle', 'kyle@gmail.com', 'kyle', 'https://cdn.iconscout.com/icon/free/png-256/avatar-369-456321.png'),
('Jane', 'jane@gmail.com', 'jane', 'https://cdn.iconscout.com/icon/free/png-256/avatar-369-456321.png'),
('Lucas', 'lucas@gmail.com', 'lucas', 'https://cdn.iconscout.com/icon/free/png-256/avatar-369-456321.png'),
('Tyler', 'tyler@gmail.com', 'lucas', 'https://cdn.iconscout.com/icon/free/png-256/avatar-369-456321.png'),
('Cathy', 'cathy@gmail.com', 'cathy', 'https://cdn.iconscout.com/icon/free/png-256/avatar-369-456321.png'),
('Lang', 'lang@gmail.com', 'lang', 'https://cdn.iconscout.com/icon/free/png-256/avatar-369-456321.png'),
('Eric', 'eric@gmail.com', 'eric', 'https://cdn.iconscout.com/icon/free/png-256/avatar-369-456321.png'),
('Cat', 'cat@gmail.com', 'cat','https://cdn.iconscout.com/icon/free/png-256/avatar-369-456321.png'),
('Monkey', 'monkey@gmail.com', 'monkey', 'https://cdn.iconscout.com/icon/free/png-256/avatar-369-456321.png'),
('Dog', 'dog@gmail.com', 'dog', 'https://cdn.iconscout.com/icon/free/png-256/avatar-369-456321.png'),
('Elephant', 'elephant@gmail.com', 'elephant','https://cdn.iconscout.com/icon/free/png-256/avatar-369-456321.png'),
('Tiger', 'tiger@gmail.com', 'tiger','https://cdn.iconscout.com/icon/free/png-256/avatar-369-456321.png'),
('Bob', 'bob@gmail.com', 'bob', 'https://cdn.iconscout.com/icon/free/png-256/avatar-369-456321.png');


CREATE TABLE resources (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  topic VARCHAR(255),
  description TEXT,
  url VARCHAR(255),
  user_id INTEGER REFERENCES users(id)
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    text VARCHAR(255),
    created_at BIGINT,
    user_id INTEGER REFERENCES users(id),
    resource_id INTEGER REFERENCES resources(id)
);

CREATE TABLE rates (
    id SERIAL PRIMARY KEY,
    score INTEGER,
    user_id INTEGER REFERENCES users(id),
    resource_id INTEGER REFERENCES resources(id)
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    resource_id INTEGER REFERENCES resources(id)
);


INSERT INTO resources (title, topic, description, url, user_id) VALUES
('jQuery', 'Web Development', 'A feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. ', 'https://jquery.com/', 1),
('ReactJS', 'Web Development', 'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.', 'https://reactjs.org/', 1),
('Express', 'Web Development', 'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.', 'https://expressjs.com/', 1),
('Organic Chemistry', 'Science', 'Organic chemistry is the chemistry subdiscipline for the scientific study of structure, properties, and reactions of organic compounds and organic materials (materials that contain carbon atoms).' ,'https://www.khanacademy.org/science/organic-chemistry', 2),
('Quantum physics', 'Science', 'Quantum mechanics (QM; also known as quantum physics, quantum theory, the wave mechanical model, or matrix mechanics), including quantum field theory, is a fundamental theory in physics which describes nature at the smallest scales of energy levels of atoms and subatomic particles.', 'https://en.wikipedia.org/wiki/Quantum_mechanics', 1),
('Asian Food', 'Lifestyle', 'You could spend your valuable time sifting through dozens of blogs on cooking eggs how you like them. Or you can take this course & get the exact information you need & want for your ideal egg. Let me cut through the noise, test the methods, & research the most straight-forward techniques to make your cooking experience as delicious as your imagination can conjure. ', 'https://www.udemy.com/cookthebesteggs/', 2),
('15 Min Workout', 'Lifestyle', 'It is simple, everything is explained in a way that even a 10 years old could understand', 'https://www.udemy.com/15-minute-hell/', 2),
('Music Theory', 'Music', 'This is a class designed for the average person who is ready to take music theory (or music interest) and turn it into a usable skill. Whether you are an active musician or an aspiring musician, this class is perfect for you.', 'https://www.udemy.com/music-theory-complete/', 1),
('PostgreSQL', 'Database', 'One of the most userful and powerful relational database', 'https://www.youtube.com/watch?v=fD7x8hd9yE4', 2),
('MongoDB', 'Database', 'The most powerful non-relational database', 'https://www.mongodb.com/', 1),
('Unsplash', 'Photography', 'Beautiful, free photos. Gifted by the world’s most generous community of photographers. This is the website that you can download and share photo for free', 'https://unsplash.com/' ,1),
('Consider Helping the community', 'Public Health', 'Public health is "the science and art of preventing disease, prolonging life and promoting human health through organized efforts and informed choices of society, organizations, public and private, communities and individuals".[1] Analyzing the health of a population and the threats is the basis for public health.[2] The "public" in question can be as small as a handful of people, an entire village or it can be as large as several continents, in the case of a pandemic. ', 'https://en.wikipedia.org/wiki/Public_health', 2),
('Six Sigma', 'Business Management', 'Six Sigma is a disciplined, data-driven approach and methodology for eliminating defects (driving toward six standard deviations between the mean and the nearest specification limit) in any process – from manufacturing to transactional and from product to service.', 'https://www.isixsigma.com', 2),
('89 Camping Tips', 'Outdoor', 'Most people hit their favorite campground for a 3 day weekend.  A smaller percentage camp for a week or more at a time.  But you don’t have to sacrifice comfort for adventure in the great outdoors if you know how to camp like a champ.  It helps to know the difference between essential camping gear and luxuries.', 'http://www.trailsherpa.com/how-to-camp-89-camping-tips/', 1),
('12 Outdoor Survival Skills Every Guy Should Master', 'Outdoor', 'Sure, you’re in decent shape, and your iPhone has GPS and an app for everything. But what happens when you’re injured or stranded and the batteries die? You need a few key skills for the inevitable moment when you find—or lose—yourself without that digital crutch.', 'https://www.mensjournal.com/health-fitness/12-outdoor-survival-skills-every-guy-should-master/', 1),
('PMP', 'Business Management', 'The Project Management Professional (PMP)® is the most important industry-recognized certification for project managers.', 'https://www.pmi.org/', 2);

INSERT INTO likes (user_id, resource_id) VALUES
(2,1), (3,1), (4,1), (5,1), (6,1), (7,1), (8,1);
