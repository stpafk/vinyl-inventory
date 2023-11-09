const Genre = require("../models/genre");
const Vinyl = require('../models/vinyl');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require('express-validator');

exports.genre_list = asyncHandler(async (req, res, next) => {
    const genre = await Genre.find().sort({ name: 1 }).exec();

    res.render("genre_list", {
        title: "Genre List",
        genres: genre,
    });
});

exports.genre_detail = asyncHandler(async (req, res, next) => {
    const [genre, vinyls] = await Promise.all([
        Genre.findById(req.params.id).exec(),
        Vinyl.find({ genre: req.params.id })
        .populate("artist")
        .exec(),
    ]);

    if (genre === null) {
        const err = new Error("Genre not found.");
        err.status = 404;
        return next(err);
    }

    res.render("genre_detail", {
      title: "Genre Detail",
      genre: genre,
      vinyls: vinyls,
    })
});

exports.genre_create_get = asyncHandler(async (req, res, next) => {
    res.render("genre_form", { title: "Create Genre" });
});

exports.genre_create_post = [
    body("name", "Genre must contain at least 3 characters")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body("description").escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const genre = new Genre({ name: req.body.name, description: req.body.description });

        if (!errors.isEmpty()) {
            res.render("genre_form", {
                title: "Create Genre",
                genre: genre,
                errors: errors.array(),
            });
            return;
        } else {
            const genreExists = await Genre.findOne({ name: req.body.name }).exec();
            if (genreExists) {
                res.redirect(genreExists.url);
            } else {
                await genre.save();
                res.redirect(genre.url);
            }
        }
    })
];

exports.genre_delete_get = asyncHandler(async (req, res, next) => {
    const [genre, vinyls] = await Promise.all([
        Genre.findById(req.params.id).exec(),
        Vinyl.find({ genre: req.params.id }).exec(),
    ]);

    if (genre === null) {
        const err = new Error("Genre not found.");
        err.status = 404;
        return next(err);
    }

    res.render("genre_delete", {
        title: "Remove Genre",
        genre: genre,
        vinyl: vinyls,
    });
});

exports.genre_delete_post = asyncHandler(async (req, res, next) => {
    const [genre, vinyls] = await Promise.all([
      Genre.findById(req.params.id).exec(),
      Vinyl.find({genre: req.params.id}).exec(),
    ])

    if (vinyls.length > 0) {
      res.render("genre_delete", {
        title: "Remove Genre",
        genre: genre,
        vinyl: vinyls,
      });
    }

    await Genre.findByIdAndDelete(req.params.id);
    res.redirect("/catalog/genres");
});

exports.genre_update_get = asyncHandler(async (req, res, next) => {
    const genre = await Genre.findById(req.params.id);

    res.render("genre_form", { title: "Update Genre", genre: genre });
});

exports.genre_update_post = [
  body("name", "Genre must contain at least 3 characters")
      .trim()
      .isLength({ min: 3 })
      .escape(),
  body("description").escape(),

  asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
      const genre = new Genre({ 
        name: req.body.name, 
        description: req.body.description, 
        _id: req.params.id,
      });

      if (!errors.isEmpty()) {
          res.render("genre_form", {
              title: "Create Genre",
              genre: genre,
              errors: errors.array(),
          });
          return;
      }
          
      const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, genre, {});
      res.redirect(updatedGenre.url);
  })
];
