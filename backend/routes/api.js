const express = require('express')
const router = express.Router()
const pool = require('../db')

const COMMENT_SELECT = `
  SELECT
    c.comment_id  AS id,
    u.username    AS author,
    u.avatar_url  AS authorAvatar,
    c.body        AS text,
    c.created_at  AS createdAt
  FROM comments c
  JOIN users u ON c.user_id = u.user_id
`

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM videos')

    const videos = await Promise.all(
      rows.map(async (row) => {
        const [comments] = await pool.query(
          COMMENT_SELECT + 'WHERE c.video_id = ? ORDER BY c.created_at DESC',
          [row.id]
        )

        return {
          id: row.id,
          title: row.title,
          channel: row.channel,
          channelAvatar: row.channel_avatar,
          thumbnail: row.thumbnail,
          category: row.category,
          duration: row.duration,
          views: row.views,
          uploadedAt: row.uploaded_at,
          subscribers: row.subscribers,
          description: row.description,
          videoUrl: row.video_url,
          comments: comments.map(c => ({ ...c, likes: 0, liked: false }))
        }
      })
    )

    res.json(videos)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Andmebaasi viga' })
  }
})
router.get('/:id/comments', async (req, res) => {
  try {
    const [rows] = await pool.query(
      COMMENT_SELECT + 'WHERE c.video_id = ? ORDER BY c.created_at DESC',
      [req.params.id]
    )
    res.json(rows.map(c => ({ ...c, likes: 0, liked: false })))
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Viga kommentaaride laadimisel' })
  }
})

router.post('/:id/comments', express.json(), async (req, res) => {
  try {
    const videoId = req.params.id
    const { text, userId } = req.body

    if (!text?.trim()) return res.status(400).json({ error: 'text is required' })

    const resolvedUserId = userId || 1

    const [result] = await pool.query(
      'INSERT INTO comments (video_id, user_id, body) VALUES (?, ?, ?)',
      [videoId, resolvedUserId, text.trim()]
    )

    const [rows] = await pool.query(
      COMMENT_SELECT + 'WHERE c.comment_id = ?',
      [result.insertId]
    )

    res.status(201).json({ ...rows[0], likes: 0, liked: false })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Viga kommentaari lisamisel' })
  }
})

router.delete('/:videoId/comments/:commentId', async (req, res) => {
  try {
    await pool.query('DELETE FROM comments WHERE comment_id = ?', [req.params.commentId])
    res.status(200).json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Kustutamine ebaõnnestus' })
  }
})
module.exports = router