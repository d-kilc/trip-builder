-- name: CreateTrip :one
INSERT INTO trips (owner_user_id, destination, start_date, end_date)
VALUES ($1, $2, $3, $4)
RETURNING id, owner_user_id, destination, start_date, end_date, created_at;

-- name: ListTripsByUser :many
SELECT id, owner_user_id, destination, start_date, end_date, created_at
FROM trips
WHERE owner_user_id = $1
ORDER BY start_date DESC;
