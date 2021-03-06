// Bring in express
const express = require('express');
// Bring in Express Router
const router = express.Router();
const { validationResult } = require('express-validator');
// Bring in Auth middleware
const auth = require('../../middleware/auth');
// Bring in Models
const Game = require('../../models/Game');
// const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route POST api/games
// @desc Create a Game
// @access Private
router.post(`/`, [auth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // user variable will grab onto Logged in User by Id
    const user = await (await User.findById(req.user.id)).isSelected(
      '-password'
    );
    // newGame variable will grab the key:value pairs from the User model above (user)
    // score, strikes, spares, openFrames come from req.body (client-side)
    const newGame = new Game({
      score: req.body.score,
      strikes: req.body.strikes,
      spares: req.body.spares,
      openFrames: req.body.openFrames,
      name: user.name,
      user: req.user.id,
    });
    // Save Game to DB
    const game = await newGame.save();
    res.json(game);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`Server Error`);
  }
});

// @route GET api/games
// @desc Get all Games
// @access Private
router.get(`/`, auth, async (req, res) => {
  try {
    // get games in order by date created
    const games = await Game.find().sort({ date: -1 });
    res.json(games);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`Server Error`);
  }
});

// @route GET api/games/:id
// @desc Get game by id
// @access Private
router.get(`/:id`, auth, async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    // Check if no game exists
    if (!game) {
      return res.status(404).json({ msg: `Game not found` });
    }
    res.json(game);
  } catch (err) {
    console.error(err.message);
    if (err.kind === `ObjectId`) {
      return res.status(404).json({ msg: `Game not found` });
    }
    res.status(500).send(`Server Error`);
  }
});

// @route DELETE api/games/:id
// @desc Delete a game
// @access Private
router.delete(`/:id`, auth, async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    // Check if game is not found
    if (!game) {
      return res.status(404).json({ msg: `Game not found` });
    }
    // Check if user that owns the game being deleted is the user that is logged in
    if (game.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: `User not authorized` });
    }

    await game.remove();
    res.json({ msg: `Game removed` });
  } catch (err) {
    console.error(err.message);
    // If invalid id is entered
    if (err.kind === `ObjectId`) {
      return res.status(404).json({ msg: `Game not found` });
    }
    res.status(500).send(`Server Error`);
  }
});

// Export Route for External Use
module.exports = router;
