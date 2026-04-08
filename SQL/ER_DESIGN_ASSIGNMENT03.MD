patients [icon: user ] {
patient_id SERIAL PK
name VARCHAR(50)
email VARCHAR(256)
phone VARCHAR(15)
date_of_birth DATE
}

departments [icon:stop-circle] {
department_id SERIAL PK
name TEXT
}

doctors [icon:doctor] {
doctor_id SERIAL PK
name VARCHAR(50)
email VARCHAR(256)
phone VARCHAR(15)
department_id FK
}

appointments [icon:file] {
appointment_id SERIAL PK
patient_id FK
doctor_id FK
appointment_date TIMESTAMP
status VARCHAR(20)

}

visit [icon:checklist] {
visit_id SERIAL PK
appointment_id FK
dr_ka_kagaz TEXT
visit_number INT
}

tests [icon: agent] {
test_id SERIAL PK
visit_id FK
test_name TEXT
status VARCHAR(20)
}

reports [icon: paper-plane] {
report_id SERIAL PK
test_id FK
report_file TEXT
generated_at TIMESTAMP
}

fees [icon:money] {
payment_id SERIAL PK
visit_id FK
amount DECIMAL
status VARCHAR(20)
}

doctors.doctor_id < appointments.doctor_id
departments.department_id < doctors.department_id
patients.patient_id < appointments.patient_id

appointments.appointment_id - visit.appointment_id

visit.visit_id < tests.visit_id

tests.test_id - reports.test_id

visit.visit_id - fees.visit_id
