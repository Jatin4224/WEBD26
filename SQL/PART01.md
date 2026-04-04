# Database & SQL Basics

---

## What is a Database?

1. The actual data is stored on disk (**Hard Disk / SSD**), not in the database itself.
2. A database is software (**SQL or NoSQL**) that manages this data.
3. Directly accessing data from a **hard disk** using programming is very complex, so a database manages it. The database is used to read and write data efficiently.

---

## What is SQL vs NoSQL?

1. Databases that understand **SQL language** are called **SQL databases**.
2. Databases that do not use SQL are called **NoSQL databases**.
3. Most **SQL databases (relational databases)** store data in table format.
4. **TypeScript** is a strictly typed language; similarly, SQL is strict.
5. Strong typing ensures your table structure is well-defined and prevents mistakes.
6. **NoSQL databases** are like **JavaScript** (flexible and schema-less).
7. **ORM (Object-Relational Mapping):** You define a table as a **JavaScript object**, and the ORM converts it into **SQL queries** to interact with the database.

---

## SQL (Structured Query Language)

VS Code extension → SQLTools

---

## Create a Table

SQL converts identifiers to lowercase by default. If you use capital letters or kebab-case, wrap the name in double quotes. The standard is to use **snake_case**.

```sql
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,  -- Auto-incrementing integer (starts from 1)
                                     -- Unique, NOT NULL, used in joins
    first_name VARCHAR(50) NOT NULL, -- Maximum 50 characters
    last_name VARCHAR(50),           -- Can be NULL
    email VARCHAR(322) UNIQUE NOT NULL,
    phone_number VARCHAR(10) UNIQUE,
    country_code VARCHAR(4),
    age INT CHECK (age > 12),

    current_status VARCHAR(20) DEFAULT 'active'
        CHECK (current_status IN ('active', 'graduated')),

    masterji_handle VARCHAR(50) UNIQUE,

    has_joined_masterji BOOLEAN DEFAULT FALSE,

    current_score INT DEFAULT 0
        CHECK (current_score >= 0 AND current_score <= 100),

    enrollment_date DATE DEFAULT CURRENT_DATE
);
```

---

## Alter Table

```sql
ALTER TABLE students
ADD COLUMN batch_name VARCHAR(50) DEFAULT 'Web Dev 2026';
```

---

## What is DDL?

- DDL stands for **Data Definition Language**
- It is used to define the structure of a database
- Examples: `CREATE TABLE`, `ALTER TABLE`

---

## Query the Data

```sql
CREATE TABLE ipl_players (
    player_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    nickname VARCHAR(50),
    team VARCHAR(50),
    role VARCHAR(50),
    runs_scored INT CHECK (runs_scored >= 0),
    wickets_taken INT CHECK (wickets_taken >= 0),
    auction_price_crores DECIMAL(5,2)
);

-- SELECT
SELECT * FROM ipl_players;
SELECT name, nickname, team FROM ipl_players;
```

---

## Filtering

```sql
-- Players from a specific team
SELECT * FROM ipl_players WHERE team = 'Mumbai Indians';
```

---

## Logical Operators (AND, OR)

```sql
-- All-rounders with more than 10 wickets
SELECT * FROM ipl_players
WHERE wickets_taken > 10 AND role = 'All-Rounder';

-- Teams CSK or RCB
SELECT * FROM ipl_players
WHERE team = 'CSK' OR team = 'RCB';
```

---

## Pattern Matching

```sql
-- ILIKE is case-insensitive
SELECT * FROM ipl_players WHERE name ILIKE '__s%';

-- Third character is 'a'
SELECT * FROM ipl_players WHERE name LIKE '__a%';

-- Teams in list
SELECT * FROM ipl_players
WHERE team IN ('Mumbai Indians', 'KKR', 'CSK', 'RCB');

-- Price between range
SELECT * FROM ipl_players
WHERE auction_price_crores BETWEEN 10 AND 20;
```

---

## Sorting (ORDER BY)

```sql
-- Highest sold players
SELECT name, nickname, auction_price_crores
FROM ipl_players
ORDER BY auction_price_crores DESC;

-- Multi-column sorting
SELECT name, nickname, auction_price_crores
FROM ipl_players
ORDER BY team ASC, auction_price_crores DESC;
```

---

## Pagination (LIMIT & OFFSET)

```sql
-- Top 3 players
SELECT name, nickname, auction_price_crores
FROM ipl_players
ORDER BY auction_price_crores DESC
LIMIT 3;

-- Skip 5, then take 3
SELECT name, nickname, auction_price_crores
FROM ipl_players
ORDER BY auction_price_crores DESC
LIMIT 3 OFFSET 5;
```

**Formula:**

```
LIMIT {limit} OFFSET (page - 1) * {limit}
```

---

## Modifying Data in Runtime

```sql
-- Convert crores to lakhs
SELECT name, nickname, auction_price_crores,
       (auction_price_crores * 100) AS price_in_lakhs
FROM ipl_players;

-- Add 2 crores
SELECT name, nickname,
       (auction_price_crores + 2) AS new_price
FROM ipl_players;
```

---

## Distinct Values

```sql
SELECT DISTINCT role FROM ipl_players;
```

---

## UPDATE, SET, DELETE

⚠️ Always use `WHERE` with `UPDATE` and `DELETE`.

```sql
CREATE TABLE canteen_menu (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(100),
    category VARCHAR(50),
    price INT,
    is_available BOOLEAN DEFAULT TRUE
);

INSERT INTO canteen_menu (item_name, category, price)
VALUES
('Masala chai', 'Beverages', 100),
('maggie', 'snacks', 10),
('ice tea', 'Beverages', 40);

-- Update price
UPDATE canteen_menu
SET price = 20
WHERE item_name = 'maggie';

-- Decrease price
UPDATE canteen_menu
SET price = price - 5
WHERE category = 'Beverages';

-- Delete item
DELETE FROM canteen_menu
WHERE item_name = 'maggie';

SELECT * FROM canteen_menu;
```

**This is called DML (Data Manipulation Language).**

---

## Aggregations

```sql
-- Count rows
SELECT COUNT(*) AS total_rows FROM smart_watch_sales;

-- Total revenue
SELECT SUM(units_sold * price_per_unit) AS total_revenue
FROM smart_watch_sales;

-- Average price
SELECT AVG(price_per_unit) AS avg_price_per_unit
FROM smart_watch_sales;

-- Minimum price
SELECT MIN(price_per_unit) AS cheapest
FROM smart_watch_sales;
```

---

## Group By

```sql
-- Total units sold per brand
SELECT brand, SUM(units_sold) AS total_units
FROM smart_watch_sales
GROUP BY brand
ORDER BY total_units DESC;

-- Multi-column grouping
SELECT city, brand, SUM(units_sold) AS units
FROM smart_watch_sales
GROUP BY city, brand;
```

---

## HAVING

- Used to filter grouped data
- Works like `WHERE` but for aggregated values

```sql
SELECT brand, SUM(units_sold) AS total_units
FROM smart_watch_sales
GROUP BY brand
HAVING SUM(units_sold) > 1000;
```
