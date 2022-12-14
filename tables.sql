-- Active: 1669383413878@@35.226.146.116@3306@Hopper-4314078-maicon-jesus

CREATE TABLE IF NOT EXISTS LAMA_BANDAS (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  music_genre VARCHAR(255) NOT NULL,
  responsible VARCHAR(255) UNIQUE NOT NULL 
);

CREATE TABLE IF NOT EXISTS LAMA_SHOWS (
  id VARCHAR(255) PRIMARY KEY,
  week_day VARCHAR(255) NOT NULL,
  start_time INT NOT NULL,
  end_time INT NOT NULL,
  band_id VARCHAR(255) NOT NULL,
  FOREIGN KEY(band_id) REFERENCES LAMA_BANDAS(id)
);

CREATE TABLE IF NOT EXISTS LAMA_USUÁRIOS (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
);

INSERT INTO `LAMA_BANDAS` (id, name, music_genre, responsible)
VALUES ("123456", "Foo Fighters", "Rock", "Dave Grohl"),
("789123", "Pearl Jam", "Rock", "Eddie Vedder");

  SELECT band_id, name, music_genre FROM `LAMA_SHOWS`AS s
      JOIN `LAMA_BANDAS` AS b ON b.id = s.band_id WHERE s.band_id = '789123';
     