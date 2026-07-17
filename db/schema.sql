CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin','participant')),
  guidelines_acknowledged_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS invite_tokens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  token TEXT NOT NULL UNIQUE,
  purpose TEXT NOT NULL CHECK (purpose IN ('invite','reset')),
  expires_at TEXT NOT NULL,
  used_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS skills (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tier INTEGER NOT NULL CHECK (tier BETWEEN 1 AND 4),
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS ratings (
  participant_id INTEGER NOT NULL REFERENCES users(id),
  skill_id INTEGER NOT NULL REFERENCES skills(id),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  desire INTEGER CHECK (desire BETWEEN 1 AND 5),
  definition TEXT,
  thought_response_1 TEXT,
  thought_response_2 TEXT,
  thought_response_3 TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (participant_id, skill_id)
);

CREATE TABLE IF NOT EXISTS experiments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  participant_id INTEGER NOT NULL REFERENCES users(id),
  tier INTEGER NOT NULL,
  skill_id INTEGER REFERENCES skills(id),
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','completed','abandoned')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS leadership_approach_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  participant_id INTEGER NOT NULL REFERENCES users(id),
  body TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS observers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  participant_id INTEGER NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  note TEXT,
  token TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'invited' CHECK (status IN ('invited','active')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS observer_feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  observer_id INTEGER NOT NULL REFERENCES observers(id),
  skill_id INTEGER REFERENCES skills(id),
  experiment_id INTEGER REFERENCES experiments(id),
  note TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_ratings_participant ON ratings(participant_id);
CREATE INDEX IF NOT EXISTS idx_experiments_participant ON experiments(participant_id);
CREATE INDEX IF NOT EXISTS idx_observers_participant ON observers(participant_id);
CREATE INDEX IF NOT EXISTS idx_observer_feedback_observer ON observer_feedback(observer_id);
CREATE INDEX IF NOT EXISTS idx_leadership_participant ON leadership_approach_entries(participant_id);
