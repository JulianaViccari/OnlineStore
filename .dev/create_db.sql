create schema if not exists online_store;

use online_store;

create table if not exists coupons(
    code varchar(50) not null,
    valid_at date not null,
    percent numeric(15,4) not null,
    quantity numeric(6,0) not null,
    primary key (code)
);

create table if not exists products(
    id varchar(100) not null,
    name varchar(50) not null, 
    description text not null, 
    price numeric(15,4) not null,
    width numeric(15,4) null,
    height numeric(15,4) null,
    length numeric(15,4) null,
    weight numeric(15,4) null,
    primary key (id)
);

create table if not exists clients(
    name varchar(100) not null,
    cpf  VARCHAR(14) not null,
    email varchar(100) null,
    address varchar(150) null,
    primary key (cpf)
);

create table if not exists orders(
    id varchar(100) not null,
    code varchar(100) not null,
    client_cpf varchar(14) not null,
    status varchar(50) null,
    created_at timestamp default current_timestamp,
    primary key (id),
    foreign key (client_cpf) references clients(cpf)
);

create table if not exists order_details(
    order_id varchar(100) not null,
    product_id varchar(100) not null,
    quantity numeric(15,4) not null,
    primary key (order_id, product_id),
    foreign key (order_id) references orders(id),
    foreign key (product_id) references products(id)
);

create user if not exists app_user identified by '123';
grant insert, select, delete, update on coupons to app_user;
grant insert, select, delete, update on products to app_user;
grant insert, select, delete, update on clients to app_user;
grant insert, select, delete, update on order_details to app_user;
grant insert, select, delete, update on orders to app_user;

insert into coupons (code, valid_at, percent, quantity) values ("discount10", "2023-12-31T23:59:59.0000-03:00", 10, 15);
insert into coupons (code, valid_at, percent, quantity) values ("discount20", "2023-6-24T23:59:59.0000-03:00", 20, 15);
insert into coupons (code, valid_at, percent, quantity) values ("discount5", "2023-1-24T23:59:59.0000-03:00", 10, 15);
insert into products (id, name, description, price, width, height, length, weight) values ("1", "Dove", "shampoo", 17.0, 8, 20, 20, 300);
insert into products (id, name, description, price, width, height, length, weight) values ("2", "Siege", "shampoo", 48.0, 8, 20, 20, 1);
insert into products (id, name, description, price, width, height, length, weight) values ("3", "Dove", "condicionador", 22.0, 8, 20, 20, 300);
insert into products (id, name, description, price, width, height, length, weight) values ("4", "Lux", "sabonete", 2.0, 8, 20, 20, -3);
insert into clients (cpf, name, email, address) values ("407.302.170-27", "Antonio Silva", "antonio.silva@gmail.com", "rua 10");