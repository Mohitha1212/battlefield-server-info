const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/server-info', (req, res) => {
  res.json({
    players: "60/64",
    ping: "104ms",
    tickrate: "60 Hz",
    settings: {
      region: "Europe - DE",
      punkbuster: "ON",
      fairfight: "ON",
      password: "OFF",
      preset: "Normal"
    },
    advanced: {
      minimap_spotting: "ON",
      hud: "ON",
      vehicle_cam: "ON",
      regen_health: "ON",
      kill_cam: "OFF",
      friendly_fire: "OFF",
      id_spotting: "ON",
      enemy_tags: "ON"
    },
    rules: {
      squad_leader_spawn_only: "OFF",
      vehicle_spawn_delay: 25,
      bullet_damage: 100,
      team_kill_limit: 5,
      player_health: 100,
      respawn_time: 100,
      kill_role: 300,
      ban_after_kicks: 3,
      tickets: 400
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
