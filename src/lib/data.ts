import { db } from "./db";

export type Skill = {
  id: number;
  tier: number;
  name: string;
  sort_order: number;
};

export type Rating = {
  skill_id: number;
  rating: number | null;
  desire: number | null;
  definition: string | null;
  thought_response_1: string | null;
  thought_response_2: string | null;
  thought_response_3: string | null;
  updated_at: string;
};

export async function getSkillsForTier(tier: number): Promise<Skill[]> {
  const { rows } = await db.execute({
    sql: "SELECT id, tier, name, sort_order FROM skills WHERE tier = ? ORDER BY sort_order",
    args: [tier],
  });
  return rows.map((r) => ({
    id: Number(r.id),
    tier: Number(r.tier),
    name: String(r.name),
    sort_order: Number(r.sort_order),
  }));
}

export async function getUserById(id: number) {
  const { rows } = await db.execute({
    sql: "SELECT id, name, email, role, created_at FROM users WHERE id = ?",
    args: [id],
  });
  const r = rows[0];
  if (!r) return null;
  return {
    id: Number(r.id),
    name: String(r.name),
    email: String(r.email),
    role: String(r.role),
    created_at: String(r.created_at),
  };
}

export async function getAllSkills(): Promise<Skill[]> {
  const { rows } = await db.execute("SELECT id, tier, name, sort_order FROM skills ORDER BY tier, sort_order");
  return rows.map((r) => ({
    id: Number(r.id),
    tier: Number(r.tier),
    name: String(r.name),
    sort_order: Number(r.sort_order),
  }));
}

export async function getRatingsForParticipant(participantId: number): Promise<Map<number, Rating>> {
  const { rows } = await db.execute({
    sql: `SELECT skill_id, rating, desire, definition, thought_response_1, thought_response_2, thought_response_3, updated_at
          FROM ratings WHERE participant_id = ?`,
    args: [participantId],
  });
  const map = new Map<number, Rating>();
  for (const r of rows) {
    map.set(Number(r.skill_id), {
      skill_id: Number(r.skill_id),
      rating: r.rating === null ? null : Number(r.rating),
      desire: r.desire === null ? null : Number(r.desire),
      definition: r.definition === null ? null : String(r.definition),
      thought_response_1: r.thought_response_1 === null ? null : String(r.thought_response_1),
      thought_response_2: r.thought_response_2 === null ? null : String(r.thought_response_2),
      thought_response_3: r.thought_response_3 === null ? null : String(r.thought_response_3),
      updated_at: String(r.updated_at),
    });
  }
  return map;
}

export async function upsertRating(
  participantId: number,
  skillId: number,
  rating: number | null,
  desire: number | null,
  definition: string | null,
  thought1: string | null,
  thought2: string | null,
  thought3: string | null
) {
  await db.execute({
    sql: `INSERT INTO ratings (participant_id, skill_id, rating, desire, definition, thought_response_1, thought_response_2, thought_response_3, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
          ON CONFLICT(participant_id, skill_id)
          DO UPDATE SET rating = excluded.rating, desire = excluded.desire, definition = excluded.definition,
                         thought_response_1 = excluded.thought_response_1, thought_response_2 = excluded.thought_response_2,
                         thought_response_3 = excluded.thought_response_3, updated_at = datetime('now')`,
    args: [participantId, skillId, rating, desire, definition, thought1, thought2, thought3],
  });
}

export type Experiment = {
  id: number;
  tier: number;
  skill_id: number | null;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export async function getExperimentsForParticipant(participantId: number, tier?: number): Promise<Experiment[]> {
  const sql = tier
    ? "SELECT id, tier, skill_id, description, status, created_at, updated_at FROM experiments WHERE participant_id = ? AND tier = ? ORDER BY created_at DESC"
    : "SELECT id, tier, skill_id, description, status, created_at, updated_at FROM experiments WHERE participant_id = ? ORDER BY created_at DESC";
  const args = tier ? [participantId, tier] : [participantId];
  const { rows } = await db.execute({ sql, args });
  return rows.map((r) => ({
    id: Number(r.id),
    tier: Number(r.tier),
    skill_id: r.skill_id === null ? null : Number(r.skill_id),
    description: String(r.description),
    status: String(r.status),
    created_at: String(r.created_at),
    updated_at: String(r.updated_at),
  }));
}

export async function addExperiment(
  participantId: number,
  tier: number,
  skillId: number | null,
  description: string
) {
  await db.execute({
    sql: `INSERT INTO experiments (participant_id, tier, skill_id, description) VALUES (?, ?, ?, ?)`,
    args: [participantId, tier, skillId, description],
  });
}

export async function updateExperimentStatus(participantId: number, experimentId: number, status: string) {
  await db.execute({
    sql: `UPDATE experiments SET status = ?, updated_at = datetime('now') WHERE id = ? AND participant_id = ?`,
    args: [status, experimentId, participantId],
  });
}

export type LeadershipApproachEntry = {
  id: number;
  body: string;
  created_at: string;
};

export async function getLeadershipApproachEntries(participantId: number): Promise<LeadershipApproachEntry[]> {
  const { rows } = await db.execute({
    sql: "SELECT id, body, created_at FROM leadership_approach_entries WHERE participant_id = ? ORDER BY created_at DESC",
    args: [participantId],
  });
  return rows.map((r) => ({
    id: Number(r.id),
    body: String(r.body),
    created_at: String(r.created_at),
  }));
}

export async function addLeadershipApproachEntry(participantId: number, body: string) {
  await db.execute({
    sql: "INSERT INTO leadership_approach_entries (participant_id, body) VALUES (?, ?)",
    args: [participantId, body],
  });
}

export type Observer = {
  id: number;
  name: string;
  note: string | null;
  token: string;
  status: string;
  created_at: string;
};

export async function getObserversForParticipant(participantId: number): Promise<Observer[]> {
  const { rows } = await db.execute({
    sql: "SELECT id, name, note, token, status, created_at FROM observers WHERE participant_id = ? ORDER BY created_at DESC",
    args: [participantId],
  });
  return rows.map((r) => ({
    id: Number(r.id),
    name: String(r.name),
    note: r.note === null ? null : String(r.note),
    token: String(r.token),
    status: String(r.status),
    created_at: String(r.created_at),
  }));
}

export async function addObserver(participantId: number, name: string, note: string | null, token: string) {
  await db.execute({
    sql: "INSERT INTO observers (participant_id, name, note, token) VALUES (?, ?, ?, ?)",
    args: [participantId, name, note, token],
  });
}

export type ObserverFeedback = {
  id: number;
  observer_id: number;
  observer_name: string;
  skill_id: number | null;
  skill_name: string | null;
  experiment_id: number | null;
  note: string;
  created_at: string;
};

export async function getObserverFeedbackForParticipant(participantId: number): Promise<ObserverFeedback[]> {
  const { rows } = await db.execute({
    sql: `SELECT f.id, f.observer_id, o.name as observer_name, f.skill_id, s.name as skill_name,
                 f.experiment_id, f.note, f.created_at
          FROM observer_feedback f
          JOIN observers o ON o.id = f.observer_id
          LEFT JOIN skills s ON s.id = f.skill_id
          WHERE o.participant_id = ?
          ORDER BY f.created_at DESC`,
    args: [participantId],
  });
  return rows.map((r) => ({
    id: Number(r.id),
    observer_id: Number(r.observer_id),
    observer_name: String(r.observer_name),
    skill_id: r.skill_id === null ? null : Number(r.skill_id),
    skill_name: r.skill_name === null ? null : String(r.skill_name),
    experiment_id: r.experiment_id === null ? null : Number(r.experiment_id),
    note: String(r.note),
    created_at: String(r.created_at),
  }));
}

export async function getObserverByToken(token: string) {
  const { rows } = await db.execute({
    sql: `SELECT o.id, o.name, o.status, o.participant_id, u.name as participant_name
          FROM observers o JOIN users u ON u.id = o.participant_id
          WHERE o.token = ?`,
    args: [token],
  });
  const r = rows[0];
  if (!r) return null;
  return {
    id: Number(r.id),
    name: String(r.name),
    status: String(r.status),
    participant_id: Number(r.participant_id),
    participant_name: String(r.participant_name),
  };
}

export async function getFeedbackForObserver(observerId: number): Promise<ObserverFeedback[]> {
  const { rows } = await db.execute({
    sql: `SELECT f.id, f.observer_id, f.skill_id, s.name as skill_name, f.experiment_id, f.note, f.created_at
          FROM observer_feedback f
          LEFT JOIN skills s ON s.id = f.skill_id
          WHERE f.observer_id = ?
          ORDER BY f.created_at DESC`,
    args: [observerId],
  });
  return rows.map((r) => ({
    id: Number(r.id),
    observer_id: observerId,
    observer_name: "",
    skill_id: r.skill_id === null ? null : Number(r.skill_id),
    skill_name: r.skill_name === null ? null : String(r.skill_name),
    experiment_id: r.experiment_id === null ? null : Number(r.experiment_id),
    note: String(r.note),
    created_at: String(r.created_at),
  }));
}

export async function addObserverFeedback(
  observerId: number,
  skillId: number | null,
  experimentId: number | null,
  note: string
) {
  await db.execute({
    sql: "INSERT INTO observer_feedback (observer_id, skill_id, experiment_id, note) VALUES (?, ?, ?, ?)",
    args: [observerId, skillId, experimentId, note],
  });
  await db.execute({
    sql: "UPDATE observers SET status = 'active' WHERE id = ?",
    args: [observerId],
  });
}

export async function markObserverStatus(observerId: number, status: string) {
  await db.execute({
    sql: "UPDATE observers SET status = ? WHERE id = ?",
    args: [status, observerId],
  });
}

export type ParticipantSummary = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  tierScores: Record<number, { total: number; rated: number; skillCount: number }>;
  observerCount: number;
};

export async function getAllParticipantsSummary(): Promise<ParticipantSummary[]> {
  const { rows: participants } = await db.execute(
    "SELECT id, name, email, created_at FROM users WHERE role = 'participant' ORDER BY created_at DESC"
  );

  const summaries: ParticipantSummary[] = [];
  for (const p of participants) {
    const participantId = Number(p.id);
    const { rows: ratingRows } = await db.execute({
      sql: `SELECT s.tier, r.rating, r.desire FROM ratings r JOIN skills s ON s.id = r.skill_id WHERE r.participant_id = ?`,
      args: [participantId],
    });
    const { rows: skillCountRows } = await db.execute("SELECT tier, COUNT(*) as count FROM skills GROUP BY tier");
    const { rows: observerCountRows } = await db.execute({
      sql: "SELECT COUNT(*) as count FROM observers WHERE participant_id = ?",
      args: [participantId],
    });

    const skillCounts: Record<number, number> = {};
    for (const r of skillCountRows) skillCounts[Number(r.tier)] = Number(r.count);

    const tierScores: ParticipantSummary["tierScores"] = {};
    for (let t = 1; t <= 4; t++) {
      tierScores[t] = { total: 0, rated: 0, skillCount: skillCounts[t] || 0 };
    }
    for (const r of ratingRows) {
      const tier = Number(r.tier);
      if (r.rating !== null && r.desire !== null) {
        tierScores[tier].total += Number(r.rating) * Number(r.desire);
        tierScores[tier].rated += 1;
      }
    }

    summaries.push({
      id: participantId,
      name: String(p.name),
      email: String(p.email),
      created_at: String(p.created_at),
      tierScores,
      observerCount: Number(observerCountRows[0]?.count || 0),
    });
  }
  return summaries;
}
