const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const { Pool } = require("pg");

const pool = new Pool();

async function selectRows(sql, values = []) {
  const client = await pool.connect();
  try {
    const res = await client.query(sql, values);
    return res.rows;
  } finally {
    client.release();
  }
}

const router = express.Router();

router.get("/classes", async (req, res) => {
  const data = await selectRows(`SELECT * FROM classes`);
  res.json(data);
});

router.get("/classes/:classId", async (req, res) => {
  const data = await selectRows(`SELECT * FROM classes WHERE id = $1`, [
    req.params.classId,
  ]);
  if (data.length === 0) {
    res.status(404).json({ message: "not found" });
  } else {
    res.json(data[0]);
  }
});

const app = express();
app.use(cors());
app.use("/.netlify/functions/api", router);

exports.handler = serverless(app);
