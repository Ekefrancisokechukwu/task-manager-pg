CREATE TYPE priority_level AS ENUM ('high', 'medium', 'low')


CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
)


CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id  UUID  REFERENCES users (id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  category VARCHAR(100),
  priority priority_level DEFAULT 'medium',
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

  INSERT INTO users (username,email,password)
  VALUES ('john doe', 'test@example.com', 'secret')
