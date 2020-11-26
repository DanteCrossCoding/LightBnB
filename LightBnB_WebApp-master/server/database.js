const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

const properties = require('./json/properties.json');
const users = require('./json/users.json');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const query = (`
  SELECT *
  FROM users
  WHERE email = $1
  `);
  const values = [email]
  return pool.query(query, values)
    .then((res) => {
      if(res.rows.length === 0) return null;
      return res.rows[0]
    })
    .catch(err => console.error('error', err.stck));
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const query = (`
  SELECT *
  FROM users
  WHERE id = $1
  `);
  const values = [id]
  return pool.query(query, values)
    .then((res) => {
      if(res.rows.length === 0) return null;
      return res.rows[0]
    })
    .catch(err => console.error('error', err.stck));
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const query = (`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `);
  const values = [user.name, user.email, user.password];
  return pool.query(query, values)
    .then((res) => res.rows)
    .catch(err => console.error('error', err.stack))
    }

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const query = (`
  SELECT reservations.*, properties.*, AVG(rating) as average_rating
FROM reservations
JOIN users ON users.id = guest_id
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id 
WHERE reservations.guest_id = $1
AND reservations.end_date < NOW()::DATE
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date
LIMIT $2;
  `)
  const values = [guest_id, limit]
  return pool.query(query, values)
    .then((res) => res.rows)
    .catch(err => console.error('error', err.stack))
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  return pool.query(`
  SELECT * FROM properties
  LIMIT $1
  `, [limit])
  .then(res => res.rows);
}


  
  
  // const limitedProperties = {};
  // for (let i = 1; i <= limit; i++) {
  //   limitedProperties[i] = properties[i];
  // }
  // return Promise.resolve(limitedProperties);
// }
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
