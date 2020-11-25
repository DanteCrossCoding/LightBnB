SELECT reservations.*, properties.*, AVG(rating) as average_rating
FROM reservations
JOIN users ON users.id = guest_id
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id 
WHERE reservations.guest_id = 1
AND reservations.end_date < NOW()::DATE
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date
LIMIT 10;