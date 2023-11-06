const express = require("express");
const router = express.Router();

const artist_controller = require("../controllers/artistController");
const vinyl_controller = require("../controllers/vinylController");
const vinylInstance_controller = require("../controllers/vinylInstanceController");
const genre_controller = require("../controllers/genreController");

//artist routes
router.get("/artist/create", artist_controller.artist_create_get);
router.post("artist/create", artist_controller.artist_create_post);
router.get("/artist/:id/delete", artist_controller.artist_delete_get);
router.post("/artist/:id/delete", artist_controller.artist_delete_post);
router.get("/artist/:id/update", artist_controller.artist_update_get);
router.post("/artist/:id/update", artist_controller.artist_update_post);
router.get("/artist/:id", artist_controller.artist_detail);
router.get("/artist", artist_controller.artist_list);

//vynil routes
router.get("/vinyl/create", vinyl_controller.vinyl_create_get);
router.post("/vynil/create", vinyl_controller.vinyl_create_post);
router.get("/vinyl/:id/delete", vinyl_controller.vinyl_delete_get); 
router.post("/vynil/:id/delete", vinyl_controller.vinyl_delete_post); 
router.get("/vinyl/:id/update", vinyl_controller.vinyl_update_get); 
router.post("/vinyl/:id/update", vinyl_controller.vinyl_update_post); 
router.get("/vinyl/:id", vinyl_controller.vinyl_detail);
router.get("/vinyl", vinyl_controller.vinyl_list);

//vinylinstance routes
router.get("/copy/create", vinylInstance_controller.copy_create_get);
router.post("/copy/create", vinylInstance_controller.copy_create_post);
router.get("/copy/:id/delete", vinylInstance_controller.copy_delete_get);
router.post("/copy/:id/delete", vinylInstance_controller.copy_delete_post);
router.get("/copy/:id/update", vinylInstance_controller.copy_update_get);
router.post("/copy/:id/update", vinylInstance_controller.copy_update_post);
router.get("/copy/:id", vinylInstance_controller.copy_detail);
router.get("/copies", vinylInstance_controller.copy_list);

//genre routes
router.get("/genre/create", genre_controller.genre_create_get);
router.post("/genre/create", genre_controller.genre_create_post);
router.get("/genre/:id/delete", genre_controller.genre_delete_get);
router.post("/genre/:id/delete", genre_controller.genre_delete_post);
router.get("/genre/:id/update", genre_controller.genre_update_get);
router.post("/genre/:id/update", genre_controller.genre_update_post);
router.get("/genre/:id", genre_controller.genre_detail);
router.get("/genres", genre_controller.genre_list);

module.exports = router;