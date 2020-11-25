INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');

INSERT INTO users (name, email, password)
VALUES ('Samael Cross', Sam@example.com, $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.).
('Gwen Stacy', Stacey@example.com, $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.),
('Kat Dennings', KatieKat@example.com, $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.);

INSERT INTO properties (ower_id, title, description, thumbnail_photo_url, cover_photo_url,cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'That Corner', 'description', http://images.thumbnail.url, http://images.cover.url, 950, 1, 2, 2, 'Canada', '651 Nami Road', 'Chilliwack', 'BC', 'V2R1A7', true),
(1, 'Dirt Road', 'description', http://images.thumbnail.url, http://images.cover.url, 500, 10, 1, 1, 'Canada', '7575 Watcom Road', 'Abbotsford', 'BC', 'V2Z1F7', true),
(1, 'Pent House', 'description', http://images.thumbnail.url, http://images.cover.url, 2000, 1, 2, 3, 'Canada', '100 Price Place', 'Vancouver', 'BC', 'V7W1T6', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES (2018-09-11, 2019-09-26, 2, 3),
(2019-01-04, 2019-02-01, 2, 2),
(2021-10-01, 2021-10-14, 1, 1);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (2, 3, 1, 3, 'messages'),
(1, 2, 2, 4, 'messages'),
(3, 2, 1, 4, 'messages');