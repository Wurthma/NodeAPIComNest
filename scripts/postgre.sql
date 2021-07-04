CREATE DATABASE petshop_store
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

CREATE TABLE products (
    id        INT NOT NULL,
    title       varchar(80) NULL,
    description varchar(4000) NULL,
    CONSTRAINT products_pk PRIMARY KEY(id)
);