const Genre = require("../models/genre");
const asyncHandler = require("express-async-handler");
const {body, validationResult} = require('express-validator');

exports.genre_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre list");
});

exports.genre_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
});

exports.genre_create_get = asyncHandler(async (req, res, next) => {
    res.render("genre_form", {title: "Create Genre"});
});

exports.genre_create_post = [
  
  body("name", "Genre must contain at least 3 characters")
  .trim()
  .isLength({min: 3})
  .escape(),
  body("description", "Description should not be empty")
  .trim()
  .isLength(1)
  .escape(),
  
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const genre = new Genre({name: req.body.name, description: req.body.description});

    if (!errors.isEmpty()) {
      res.render("genre_form", {
        title: "Create Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    } else {
      const genreExists = await Genre.findOne({name: req.body.name}).exec();
      if (genreExists) {
        res.redirect(genreExists.url);
      } else {
        await genre.save();
        res.redirect(genre.url)
      }
    }
})];

exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete GET");
});

exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete POST");
});

exports.genre_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
});

exports.genre_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update POST");
});
