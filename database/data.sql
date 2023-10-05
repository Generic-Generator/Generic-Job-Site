
DROP TABLE IF EXISTS applied;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posters;


CREATE TABLE users (
  user_num INTEGER UNIQUE NOT NULL DEFAULT NULL
);

CREATE TABLE posters (
  poster INTEGER UNIQUE NOT NULL DEFAULT NULL
);

CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL DEFAULT NULL,
  descript VARCHAR(1000) NOT NULL DEFAULT NULL,
  experience INTEGER NOT NULL DEFAULT NULL,
  poster INTEGER NOT NULL DEFAULT 10 REFERENCES posters (poster)
);

CREATE TABLE applied (
  user_num INTEGER NOT NULL DEFAULT NULL REFERENCES users (user_num),
  job INTEGER NOT NULL DEFAULT NULL REFERENCES jobs (id)
);

insert into posters (poster) values (10) returning *;
insert into posters (poster) values (0) returning *;
insert into users (user_num) values (0) returning *;


insert into jobs (title, descript, experience) values ('Full Stack I', 'Tech Stack: mongodb, express, angular, node', 0) returning *;
insert into jobs (title, descript, experience) values ('Full Stack II', 'Tech Stack: mongodb, express, react, node', 2) returning *;
insert into jobs (title, descript, experience) values ('Full Stack III', 'Tech Stack: mongodb, express, react, node', 4) returning *;
insert into jobs (title, descript, experience) values ('Full Stack dev', 'Tech Stack: typescript, vue, mysql, postgresql', 3) returning *;
insert into jobs (title, descript, experience) values ('Full Stack engineer', 'Tech Stack: mongodb, express, angular, node', 1) returning *;
insert into jobs (title, descript, experience) values ('Junior Full Stack', 'Tech Stack: mongodb, express, react, node', 0) returning *;
insert into jobs (title, descript, experience) values ('Entry level Full Stack', 'Tech Stack: mongodb, express, angular, node', 0) returning *;
insert into jobs (title, descript, experience) values ('Full Stack React', 'Tech Stack: mongodb, express, react, node, redux', 2) returning *;
insert into jobs (title, descript, experience) values ('Software Developer .Net', 'Tech Stack: .NET, C#', 5) returning *;
insert into jobs (title, descript, experience) values ('Full Stack, Ruby', 'Tech Stack: not sure', 3) returning *;
insert into jobs (title, descript, experience) values ('Full Stack Java Dev', 'Tech Stack: not sure something about spring?', 5) returning *;