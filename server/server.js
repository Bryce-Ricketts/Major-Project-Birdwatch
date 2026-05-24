import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "./db.js";
import { requireAuth } from "./authMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/api/auth/signup", async (req, res) => {
  const { email, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email",
      [email, passwordHash],
    );

    res.status(201).json(result.rows[0]);
  } catch {
    res.status(400).json({ message: "Email already exists" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  const user = result.rows[0];

  if (!user) {
    return res.status(401).json({ message: "Invalid login details" });
  }

  const passwordMatches = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatches) {
    return res.status(401).json({ message: "Invalid login details" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.json({ token, user: { id: user.id, email: user.email } });
});

app.get("/api/sightings", requireAuth, async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM sightings WHERE user_id = $1 ORDER BY created_at DESC",
    [req.user.id],
  );

  res.json(result.rows);
});

app.post("/api/sightings", requireAuth, async (req, res) => {
  const bird = req.body;

  const result = await pool.query(
    `INSERT INTO sightings
    (user_id, species_code, common_name, scientific_name, family_common_name, family_scientific_name, bird_order, log)
    VALUES ($1, $2, $3, $4, $5, $6, $7, '')
    RETURNING *`,
    [
      req.user.id,
      bird.speciesCode,
      bird.comName,
      bird.sciName,
      bird.familyComName,
      bird.familySciName,
      bird.order,
    ],
  );

  res.status(201).json(result.rows[0]);
});

app.patch("/api/sightings/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { log } = req.body;

  const result = await pool.query(
    `UPDATE sightings
     SET log = $1
     WHERE id = $2 AND user_id = $3
     RETURNING *`,
    [log, id, req.user.id],
  );

  res.json(result.rows[0]);
});

app.delete("/api/sightings/:id", requireAuth, async (req, res) => {
  await pool.query("DELETE FROM sightings WHERE id = $1 AND user_id = $2", [
    req.params.id,
    req.user.id,
  ]);

  res.json({ message: "Sighting deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
