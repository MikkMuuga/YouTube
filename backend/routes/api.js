const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/videos', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM videos')
  res.json(rows)
})

router.get('/videos/:id', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM videos WHERE id = ?', [req.params.id])
  res.json(rows[0])
})

module.exports = router