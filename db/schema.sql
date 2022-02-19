create table category
(
    id          int primary key auto_increment,
    name        varchar(100) not null,
    link        varchar(100),
    status      tinyint      not null default 1 comment '-1 删除; 0: 隐藏; 1: 正常',
    create_time datetime     not null default current_timestamp
);

create table article
(
    id          integer primary key auto_increment,
    title       varchar(100) not null,
    content     text,
    category    int,
    post_time   datetime     not null default current_timestamp,
    status      tinyint      not null default 1 comment '-1 删除; 0: 隐藏; 1: 正常',
    create_time datetime     not null default current_timestamp
);

create table music
(
    id          integer primary key auto_increment,
    name        varchar(100) not null,
    url         varchar(500) not null,
    cover       varchar(500),
    status      tinyint      not null default 1 comment '-1 删除; 0: 隐藏; 1: 正常',
    create_time datetime     not null default current_timestamp
);