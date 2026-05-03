const express = require('express')
const router = express.Router()
const pool = require('../db')

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM videos')

    const videos = rows.map(row => ({
      id: row.id,
      title: row.title,
      channel: row.channel,
      channelAvatar: row.channel_avatar,
      thumbnail: row.thumbnail,
      duration: row.duration,
      views: row.views,
      uploadedAt: row.uploaded_at,
      subscribers: row.subscribers,
      description: row.description,
    }))

    res.json(videos)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Andmebaasi viga' })
  }
})

module.exports = router