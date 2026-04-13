vehicles [icon: car] {
vehicle_id SERIAL PK
vehicle_number VARCHAR(15) UNIQUE NOT NULL
vehicle_category_id INT FK
}

vehicle_categories [icon: list] {
category_id SERIAL PK
name ('bike','car','SUV','EV') VARCHAR(20)
}

parking_zones [icon: map] {
zone_id SERIAL PK
name ('general','vip','energy')
level INT
}

spot_categories [icon: tag] {
category_id SERIAL PK
name VARCHAR(20)  
}

parking_spots [icon: grid] {
spot_id SERIAL PK
zone_id INT FK
spot_category_id INT FK
}

parking_sessions [icon: clock] {
session_id SERIAL PK
vehicle_id INT FK
spot_id INT FK
entry_time TIMESTAMP NOT NULL
exit_time TIMESTAMP
}

tickets [icon: ticket] {
ticket_id SERIAL PK
session_id INT FK
issued_at TIMESTAMP
}

payments [icon: dollar-sign] {
payment_id SERIAL PK
session_id INT FK
amount DECIMAL(10,2)
status("paid","due") VARCHAR(10)  
 payment_time TIMESTAMP
}

vehicle_categories < vehicles
vehicles < parking_sessions
parking_spots < parking_sessions
parking_zones < parking_spots
spot_categories < parking_spots
parking_sessions - tickets
parking_sessions - payments
