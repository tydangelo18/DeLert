// Bring in Mongoose
const mongoose = require(`mongoose`);

// Create a Game Schema
const GameSchema = new mongoose.Schema({
  // A reference to the user model so that every game will associate with a user
  user: {
    // Connect to an id from the user model
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },

  score: {
    type: Number,
    max: 300,
    default: 0,
    // Validate function makes it so that at least one field must be filled in to generate metrics
    validate() {
      return this.score || this.strikes || this.spares || this.openFrames;
    },
  },

  strikes: {
    type: Number,
    max: 12,
    default: 0,
    // Validate function makes it so that at least one field must be filled in to generate metrics
    validate() {
      return this.score || this.strikes || this.spares || this.openFrames;
    },
  },

  spares: {
    type: Number,
    max: 10,
    default: 0,
    // Validate function makes it so that at least one field must be filled in to generate metrics
    validate() {
      return this.score || this.strikes || this.spares || this.openFrames;
    },
  },

  openFrames: {
    type: Number,
    max: 10,
    default: 0,
    // Validate function makes it so that at least one field must be filled in to generate metrics
    validate() {
      return this.score || this.strikes || this.spares || this.openFrames;
    },
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

// Export schema for external use
module.exports = Game = mongoose.model('game', GameSchema);
