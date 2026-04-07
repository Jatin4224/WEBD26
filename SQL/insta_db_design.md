users [icon: user, color: Red] {
id serial pk
username varchar(50) not null
email varchar(50) unique not null
phone char(15)
dob date
password varchar(256)
bio txt
avatar_url text
forgot_password_token text
email_verification_token text

created_at timestamp
updated_at timestamp
}

posts [icon: notebook] {
id serial pk
caption text
//i can use this three as flag on frontend image_url haito image post hain
image_url text null //can be null
video_url text null
reel_url text //can be null

author_id int fk //user table ka

created_at timestamp
updated_at timestamp
}

stories [icon: notebook] {
id serial pk
caption text
image_url text null //can be null
video_url text null

post_id int fk null //story par post bhi daalte ho
author_id int fk //user table ka

created_at timestamp
updated_at timestamp
}

bookmarks [icon:bookmark] {
id serial pk

post_id int fk
author_id int fk

created_at timestamp
updated_at timestamp
}

account_setting [icon: account_setting] {
id serial pk
user_id int fk

is_account_private boolean

}

comments [icons: message-circle] {
id serial pk
author_id int fk
post_id int fk
content txt
created_at timestamp
updated_at timestamp
}

likes [icons: heart] {
id serial pk
author_id int fk
post_id int fk

created_at timestamp
updated_at timestamp
}

//Hint - user 1 can be followed by user 2
//user 2 can be followed by user 1
follower [icon:users] {

}
//ek user kitne user post kar skta hain ? many
//ek post kitne user ko belong kar skta hain ? one
//means my user table has one to many relation
users.id < posts.author_id

//one user can have many stories but one story belong to one user
users.id < stories.author_id
//ek story can have ek post - one to one
users.id < bookmarks.author_id

stories.post_id - posts.id //one to one
booksmarks.post_id > posts.id //single post can be part of multiple bookmarks - many to one

// one to one
users.id - account_setting.id

//one comment can have one user only
//one user can have many comments
// many to one
comments.author_id > users.id
comments.post_id > posts.id

likes.author_id > users.id
likes.post_id > posts.id
