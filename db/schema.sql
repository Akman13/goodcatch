CREATE DATABASE goodcatch;
\c goodcatch;


CREATE TABLE catches (
    catch_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    caption VARCHAR(40),
    experience VARCHAR(500),
    image_url TEXT,
    catch_state TEXT,
    catch_location VARCHAR(40),
    catch_date DATE NOT NULL
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(20),
    password_digest TEXT,
    user_img_url TEXT,
    user_about TEXT
);


-- Sample records in Catch to get things started
INSERT INTO catches (user_id, caption, experience, image_url, catch_state, catch_location, catch_date) VALUES (1, 'Big catch yo!', 'Went to a local form and caught me some of these - good dinner inbound!', 'https://images.theconversation.com/files/281656/original/file-20190627-76726-dg5e89.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop', 'VIC', 'Dande Farm', '2023-03-12');

INSERT INTO catches (user_id, caption, experience, image_url, catch_state, catch_location, catch_date) VALUES (1, 'Hope you like anchovies', 'not sure why I said that, I just really like anchovies, and I think these are it? Please lmk if i''m off guys', 'https://www.science.org/do/10.1126/science.acz9961/abs/_20220105_on_smallerfish.jpg', 'VIC', 'Gippsland', '2023-01-24');

INSERT INTO catches (user_id, caption, experience, image_url, catch_state, catch_location, catch_date) VALUES (1, 'Sardines for days', 'Caught a bunch of Sardines @ lakes entrance, hope I didn''t breach any fishing restrictions..', 'https://www.goodfood.com.au/content/dam/images/h/0/z/c/5/x/image.related.socialLead.620x349.h0yx3z.png/1524796963137.jpg', 'VIC', 'Lakes Entrance', '2023-01-24');

INSERT INTO catches (user_id, caption, experience, image_url, catch_state, catch_location, catch_date) VALUES (2, 'Enough to feed a family', '...of one (not a very big family either). Keen to try again another day still', 'https://i.redd.it/1s58xw6xm2c31.jpg', 'VIC', 'Mornington Pier', '2022-01-05');

INSERT INTO catches (user_id, caption, experience, image_url, catch_state, catch_location, catch_date) VALUES (3, 'Full to the bream', 'Yes, that is a bream fish and no I''m not ashamed of that joke. Cooked this last night after me and the kids got home, made for a good meal.', 'https://ondeckby.dinga.com.au/wp-content/uploads/2018/12/BREAM-FISHING-101-FEATURE-1.jpg', 'VIC', 'Gippsland Lake', '2022-04-12');

INSERT INTO catches (user_id, caption, experience, image_url, catch_state, catch_location, catch_date) VALUES (1, 'Catch & Run', 'Caught this fella but wasn''t sure what specie it was so i released him back. Does anyone know what this is?', 'https://www.nps.gov/subjects/fishing/images/Webp_4.jpg?maxwidth=1300&autorotate=false', 'VIC', 'Lakes Entrance', '2023-01-24');


-- Sample records in Users to keep things moving :-)
INSERT INTO users (username, password_digest, user_img_url, user_about) VALUES ('fisherman101', 'pudding', 'https://static.vecteezy.com/system/resources/previews/005/176/777/non_2x/user-avatar-line-style-free-vector.jpg', 'I''m just here to keep this site running, and not in the devOps sense.');

INSERT INTO users (username, password_digest, user_img_url, user_about) VALUES ('iLikeFish', 'pudding', 'https://static.vecteezy.com/system/resources/previews/005/176/777/non_2x/user-avatar-line-style-free-vector.jpg', 'I''m just here to keep this site running, and not in the devOps sense.');

INSERT INTO users (username, password_digest, user_img_url, user_about) VALUES ('I LOVE fish', 'pudding', 'https://static.vecteezy.com/system/resources/previews/005/176/777/non_2x/user-avatar-line-style-free-vector.jpg', 'I''m just here to keep this site running, and not in the devOps sense.');