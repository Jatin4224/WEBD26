### Authentication - who are you?

- If I am a user and I request something from a server, the server may send me to `/login`. This means I am not authenticated.

- If I am authenticated, the server will send me to `/feed` or return my data. This means the server knows who I am.

### Authorization - are you authorized to access this resource?

- For example, in your college, can a random person enter the campus? No, because the security guard does not recognize them.

- But if you are a student, you have a ID card. You can show your ID card to the security guard, and the guard will allow you to enter.

- Now, based on your ID card, can you enter the staff room? No, because your ID card shows you are a student, so you are not authorized to enter the staff room.

- A teacher can enter both the staff room and the classroom because they are authorized for both.

- So, for authorization, you have to be authenticated.
