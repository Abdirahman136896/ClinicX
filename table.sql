create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    contactNumber varchar(20),
    email varchar(50),
    password varchar(250),
    status varchar(20),
    role varchar(20),
    UNIQUE (email)
);

create table branch(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    location varchar(250),
    contactNumber varchar(60),
    email varchar(50),
    password varchar(250),
    status varchar(20),
    role varchar(20),
    UNIQUE (email)
);

create table doctor(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    description varchar(255),
    contactNumber varchar(20),
    email varchar(50),
    password varchar(250),
    branchId integer not null,
    categoryId integer not null,
    productId integer not null,
    status varchar(20),
    UNIQUE (email)
);

ALTER TABLE doctor ADD role varchar(20) NOT NULL DEFAULT 'doctoruser' AFTER status;

insert into user(name,contactNumber,email,password,status,role) values('Admin','123456789','admin@gmail.com','admin','true','admin');

create table category(
    id int not null auto_increment,
    name varchar(255) not null,
    primary key(id)
);

create table product(
    id int not null auto_increment,
    name varchar(255) not null,
    categoryId integer not null,
    description varchar(255),
    price integer,
    status varchar(20),
    primary key(id)
);

create table bill(
    id int not null auto_increment,
    uuid varchar(200) not null,
    name varchar(255) not null,
    email varchar(255) not null,
    contactNumber varchar(20) not null,
    paymentMethod varchar(50) not null,
    total int not null,
    branch varchar not null,
    doctorDetails json not null default,
    productDetails json not null default,
    createdBy varchar(255) not null,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP not null,
    primary key(id)
);