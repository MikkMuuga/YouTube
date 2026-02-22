create table users (
    user_id int auto_increment primary key,
    username varchar(50) not null unique,
    email varchar(255) not null unique,
    password_hash varchar(255) not null,
    avatar_url varchar(500),
    bio text,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

create table videos (
    video_id int auto_increment primary key,
    user_id int not null,
    title varchar(255) not null,
    description text,
    video_url varchar(500) not null,
    thumbnail_url varchar(500),
    duration int,
    view_count int default 0,
    status enum('draft','published','private') default 'published',
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    foreign key (user_id) references users(user_id) on delete cascade
);

create table comments (
    comment_id int auto_increment primary key,
    video_id int not null,
    user_id int not null,
    parent_id int,
    body text not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    foreign key (video_id) references videos(video_id) on delete cascade,
    foreign key (user_id) references users(user_id) on delete cascade,
    foreign key (parent_id) references comments(comment_id) on delete cascade
);

create table video_votes (
    vote_id int auto_increment primary key,
    video_id int not null,
    user_id int not null,
    vote tinyint not null,
    created_at timestamp default current_timestamp,
    unique (video_id, user_id),
    foreign key (video_id) references videos(video_id) on delete cascade,
    foreign key (user_id) references users(user_id) on delete cascade
);

create table subscriptions (
    subscription_id int auto_increment primary key,
    subscriber_id int not null,
    channel_id int not null,
    created_at timestamp default current_timestamp,
    unique (subscriber_id, channel_id),
    foreign key (subscriber_id) references users(user_id) on delete cascade,
    foreign key (channel_id) references users(user_id) on delete cascade
);

create table watch_history (
    history_id int auto_increment primary key,
    user_id int not null,
    video_id int not null,
    watched_at timestamp default current_timestamp,
    progress_sec int default 0,
    foreign key (user_id) references users(user_id) on delete cascade,
    foreign key (video_id) references videos(video_id) on delete cascade
);

create table tags (
    tag_id int auto_increment primary key,
    name varchar(100) not null unique
);

create table video_tags (
    video_id int not null,
    tag_id int not null,
    primary key (video_id, tag_id),
    foreign key (video_id) references videos(video_id) on delete cascade,
    foreign key (tag_id) references tags(tag_id) on delete cascade
);