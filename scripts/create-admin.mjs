import { createClient } from "@libsql/client";
import bcrypt from "bcryptjs";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

const [, , email, password, name] = process.argv;

if (!email || !password || !name) {
  console.error("Usage: node --env-file=.env.local scripts/create-admin.mjs <email> <password> \"<name>\"");
  process.exit(1);
}

const client = createClient({ url, authToken });

async function main() {
  const passwordHash = await bcrypt.hash(password, 12);
  const { rows } = await client.execute({
    sql: "SELECT id FROM users WHERE email = ?",
    args: [email.toLowerCase().trim()],
  });

  if (rows[0]) {
    await client.execute({
      sql: "UPDATE users SET password_hash = ?, name = ?, role = 'admin' WHERE id = ?",
      args: [passwordHash, name, rows[0].id],
    });
    console.log(`Updated existing user ${email} to admin with new password.`);
  } else {
    await client.execute({
      sql: "INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, 'admin')",
      args: [email.toLowerCase().trim(), passwordHash, name],
    });
    console.log(`Created admin user ${email}.`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
