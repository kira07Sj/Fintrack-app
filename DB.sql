--1 create DB
sqlite3 FinTrack.db

--2 create tables


CREATE TABLE IF NOT EXISTS balance
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    amount REAL NOT NULL
);


CREATE TABLE IF NOT EXISTS expense
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    amount REAL NOT NULL,
    date INT NOT NULL,
    balance_id INTEGER,
    FOREIGN KEY (balance_id) REFERENCES balance (id)
);


CREATE TABLE IF NOT EXISTS plans
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    amount REAL NOT NULL,
    balance_id INTEGER,
    FOREIGN KEY (balance_id) REFERENCES balance (id)
);

--3 sample inputs

-- balance table
INSERT INTO balance (name, amount) VALUES ('CBE', '1200');
INSERT INTO balance (name, amount) VALUES ('Tele birr', '320');
INSERT INTO balance (name, amount) VALUES ('AIB', '3258');
INSERT INTO balance (name, amount) VALUES ('BoA', '1039');
INSERT INTO balance (name, amount) VALUES ('Cash', '100');

-- expense table
INSERT INTO expense (name, amount, date, balance_id) VALUES ('Coffe', '25', '8/24/2024', 2);
INSERT INTO expense (name, amount, date, balance_id) VALUES ('Taxi', '15', '8/24/2024', 5);
INSERT INTO expense (name, amount, date, balance_id) VALUES ('Dinner', '125', '8/24/2024', 2);
INSERT INTO expense (name, amount, date, balance_id) VALUES ('pool', '30', '8/24/2024', 3);
INSERT INTO expense (name, amount, date, balance_id) VALUES ('Transport', '260', '8/25/2024', 1);


-- plans table
INSERT INTO plans (name, amount, balance_id) VALUES ('Gym', '800', 1);
INSERT INTO plans (name, amount, balance_id) VALUES ('Voice package', '35', 2);

