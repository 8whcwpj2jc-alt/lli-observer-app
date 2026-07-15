import { createClient } from "@libsql/client";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN in environment.");
  process.exit(1);
}

const client = createClient({ url, authToken });

const SKILLS = [
  // Tier 1 — Character, tendencies and behaviors (13)
  [1, "Demeanor"], [1, "Attitude"], [1, "Presence"], [1, "Professionalism"],
  [1, "Communication"], [1, "Caring"], [1, "Intentional"], [1, "Trust"],
  [1, "Authenticity"], [1, "Humility"], [1, "Kindness"], [1, "Compassion"],
  [1, "Personal Brand"],
  // Tier 2 — working with and through others (9)
  [2, "Collaboration"], [2, "Patience"], [2, "Empathy"], [2, "Focus"],
  [2, "Empowerment"], [2, "Positive Encouragement"], [2, "Listening"],
  [2, "Questioning"], [2, "Goal setting"],
  // Tier 3 — the "how" of getting things done (20)
  [3, "Agenda setting and management"], [3, "Facilitation"], [3, "Prioritization"],
  [3, "Project management"], [3, "Linking people to strategy and operations"],
  [3, "Developing a leadership pipeline"], [3, "Continuous improvement"],
  [3, "Developing depth"], [3, "Retention of key performers"],
  [3, "Dealing with nonperformers"], [3, "Having honest, difficult conversations"],
  [3, "Building and reviewing strategic plans"],
  [3, "Budgeting, synchronizing resources, operational plans"],
  [3, "Time management"], [3, "Team building"], [3, "Data acquisition and use"],
  [3, "Developing Success Metrics"], [3, "Understanding Success Metrics"],
  [3, "Delivering Success Metrics"], [3, "Modeling Success"],
  // Tier 4 — vision and big-picture leadership (10)
  [4, "Thinking/Acting Strategically"], [4, "The Big Picture"],
  [4, "Connecting the Big Picture to strategy, plans and actions"], [4, "Framing"],
  [4, "Organizational development"], [4, "Execution"],
  [4, "Motivation (self/others)"], [4, "Innovation"], [4, "Ownership"],
  [4, "Decision making"],
];

async function main() {
  const schema = readFileSync(path.join(__dirname, "..", "db", "schema.sql"), "utf-8");
  await client.executeMultiple(schema);
  console.log("Schema applied.");

  const { rows } = await client.execute("SELECT COUNT(*) as count FROM skills");
  if (Number(rows[0].count) > 0) {
    console.log(`Skills table already has ${rows[0].count} rows — skipping seed.`);
    return;
  }

  let sortOrder = 0;
  for (const [tier, name] of SKILLS) {
    sortOrder += 1;
    await client.execute({
      sql: "INSERT INTO skills (tier, name, sort_order) VALUES (?, ?, ?)",
      args: [tier, name, sortOrder],
    });
  }
  console.log(`Seeded ${SKILLS.length} skills.`);
}

main()
  .then(() => {
    console.log("Done.");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
