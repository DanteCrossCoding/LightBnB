SELECT city, COUNT(reservations.property_id) as number_reservations
FROM properties
JOIN reservations ON properties.id = property_id
GROUP BY properties.city
ORDER BY number_reservations DESC;