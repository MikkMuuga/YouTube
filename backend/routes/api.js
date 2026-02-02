const express = require('express');
const router = express.Router();


router.get('/hello', (req, res) => {
  res.json({ msg: 'hello from backend' });
});

router.post('/echo', (req, res) => {
  res.json({ body: req.body });
});

module.exports = router;
