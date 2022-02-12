create table category
(
    id          integer primary key autoincrement,
    name        varchar(100) not null,
    link        varchar(100),
    create_time datetime     not null default current_timestamp
);

create table article
(
    id          integer primary key autoincrement,
    title       varchar(100) not null,
    content     text,
    category    int,
    post_time   datetime     not null default current_timestamp,
    create_time datetime     not null default current_timestamp
);

create table music
(
    id          integer primary key autoincrement,
    name        varchar(100) not null,
    url         varchar(500) not null,
    cover       varchar(500),
    create_time datetime     not null default current_timestamp
);