-- Inserting test data into users table
INSERT INTO users (email, password, line_user_id, line_token, created_by, updated_by) VALUES
('user1@example.com', 'password1', 'U09e867f2177265774544a9e6b536c7f0', 'line_token1', 1, 1),
('user2@example.com', 'password2', 'line_id2', 'line_token2', 1, 1),
('user3@example.com', 'password2', 'line_id2', 'line_token2', 1, 1),
('user4@example.com', 'password2', 'line_id2', 'line_token2', 1, 1),
('user5@example.com', 'password2', 'line_id2', 'line_token2', 1, 1),
('user6@example.com', 'password2', 'line_id2', 'line_token2', 1, 1),
('user7@example.com', 'password2', 'line_id2', 'line_token2', 1, 1),
('user8@example.com', 'password2', 'line_id2', 'line_token2', 1, 1),
('user9@example.com', 'password2', 'line_id2', 'line_token2', 1, 1),
('user10@example.com', 'password2', 'line_id2', 'line_token2', 1, 1);

-- Inserting test data into shops table
INSERT INTO shops (area, name, url, created_by, updated_by) VALUES
('Area1', 'Shop1', 'http://shop1.com', 1, 1),
('Area2', 'Shop2', 'http://shop2.com', 1, 1),
('Area3', 'Shop3', 'http://shop3.com', 1, 1),
('Area4', 'Shop4', 'http://shop4.com', 1, 1),
('Area5', 'Shop5', 'http://shop5.com', 1, 1),
('Area6', 'Shop6', 'http://shop6.com', 1, 1),
('Area7', 'Shop7', 'http://shop7.com', 1, 1),
('Area8', 'Shop8', 'http://shop8.com', 1, 1),
('Area9', 'Shop9', 'http://shop9.com', 1, 1),
('Area10', 'Shop10', 'http://shop10.com', 1, 1);

-- Inserting test data into casts table
INSERT INTO casts (shop_id, name, profile, bast, weist, hip, twitter_id, created_by, updated_by) VALUES
(1, 'Cast1', 'Profile1', 80, 60, 90, 'twitter1', 1, 1),
(1, 'Cast2', 'Profile2', 81, 61, 91, 'twitter2', 1, 1),
(1, 'Cast3', 'Profile3', 80, 60, 90, 'twitter3', 1, 1),
(1, 'Cast4', 'Profile4', 81, 61, 91, 'twitter4', 1, 1),
(2, 'Cast5', 'Profile5', 80, 60, 90, 'twitter5', 1, 1),
(2, 'Cast6', 'Profile6', 81, 61, 91, 'twitter6', 1, 1),
(3, 'Cast7', 'Profile7', 80, 60, 90, 'twitter7', 1, 1),
(3, 'Cast8', 'Profile8', 81, 61, 91, 'twitter8', 1, 1),
(4, 'Cast9', 'Profile9', 80, 60, 90, 'twitter9', 1, 1),
(4, 'Cast10', 'Profile10', 81, 61, 91, 'twitter10', 1, 1);

-- Inserting test data into tweets table
INSERT INTO tweets (cast_id, twitter_id, created_by, updated_by) VALUES
(1, 'tweet1', 1, 1),
(2, 'tweet2', 1, 1),
(3, 'tweet3', 1, 1),
(4, 'tweet4', 1, 1),
(5, 'tweet5', 1, 1),
(6, 'tweet6', 1, 1);

-- Inserting test data into attendances table
INSERT INTO attendances (shop_id, cast_id, room, date, week_day, start_time, end_time, url, reservation_url, created_by, updated_by) VALUES
(1, 1, 'Room1', '2024-01-24', 'Monday', '10:00', '18:00', 'http://attendance1.com', 'http://reserve1.com', 1, 1),
(1, 1, 'Room2', '2024-01-25', 'Tuesday', '11:00', '19:00', 'http://attendance2.com', 'http://reserve2.com', 1, 1),
(1, 1, 'Room1', '2024-01-26', 'Monday', '10:00', '18:00', 'http://attendance1.com', 'http://reserve1.com', 1, 1),
(1, 2, 'Room1', '2024-01-24', 'Monday', '10:00', '18:00', 'http://attendance1.com', 'http://reserve1.com', 1, 1),
(1, 2, 'Room2', '2024-01-25', 'Tuesday', '11:00', '19:00', 'http://attendance2.com', 'http://reserve2.com', 1, 1),
(1, 2, 'Room1', '2024-01-26', 'Monday', '10:00', '18:00', 'http://attendance1.com', 'http://reserve1.com', 1, 1),
(2, 5, 'Room1', '2024-01-24', 'Monday', '10:00', '18:00', 'http://attendance1.com', 'http://reserve1.com', 1, 1),
(2, 6, 'Room2', '2024-01-25', 'Tuesday', '11:00', '19:00', 'http://attendance2.com', 'http://reserve2.com', 1, 1),
(2, 7, 'Room1', '2024-01-26', 'Monday', '10:00', '18:00', 'http://attendance1.com', 'http://reserve1.com', 1, 1);

-- Inserting test data into favorites table
INSERT INTO favorites (user_id, cast_id, faved_at, created_by, updated_by) VALUES
(1, 1, '2024-01-01 12:00', 1, 1),
(1, 2, '2024-01-02 13:00', 1, 1),
(1, 3, '2024-01-01 12:00', 1, 1),
(1, 4, '2024-01-01 12:00', 1, 1);
