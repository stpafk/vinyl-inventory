const Vinyl = require("../models/vinyl");
const Genre = require('../models/genre');
const Artist = require('../models/artist');
const VinylInstance = require('../models/vinyl_instance');
const {body, validationResult} = require('express-validator');
const asyncHandler = require("express-async-handler");

exports.vinyl_list = asyncHandler(async (req, res, next) => {
    const vinyls = await Vinyl.find({}, "vinyl_name artist")
    .sort({vinyl_name: 1})
    .populate("artist")
    .exec();

    res.render("vinyl_list", {
        title: "All Vinyls",
        vinyls: vinyls,
    });
  });
  
exports.vinyl_detail = asyncHandler(async (req, res, next) => {
    const [vinyl, copy] = await Promise.all([
        Vinyl.findById(req.params.id)
        .populate("artist")
        .populate("genre")
        .exec(),
        VinylInstance.find({vinyl: req.params.id}).exec(),

    ])

    if (vinyl === null) {
        const err = new Error("Vinyl not found.");
        err.status = 404;
        return next(err);
    }

    res.render("vinyl_detail", {
        title: "Vinyl Detail",
        vinyl: vinyl,
        copy: copy,
    })
});
  
exports.vinyl_create_get = asyncHandler(async (req, res, next) => {

    const genre = await Genre.find().exec();

    res.render("vinyl_form", {title: "Upload Vinyl", genres: genre});
});
  
exports.vinyl_create_post = [

    (req, res, next) => {

        if(!(req.body.genre instanceof Array)) {
            if (typeof req.body.genre === "undefined") req.body.genre = [];
            req.body.genre = new Array(req.body.genre);
        }

        if(req.file) {
            req.body.cover = req.file.path;
        }

        next();
    },  

    body("vinyl_name").trim().isLength({min: 1}).escape("Vinyl name must not be empty"),
    body("artist").trim().isLength({min: 1}).escape("Vinyl must not be empty"),
    body("summary").trim().isLength({min: 1}),
    body("date_of_release").isISO8601().toDate().escape("Input valid date."),
    body("genre").escape(),
    body("cover").escape(),

    asyncHandler(async (req, res, next) => {

        const errors = validationResult(req);
        const artistExist = await Artist.findOne({artist_name: req.body.artist});
        if (artistExist) {
            req.body.artist = artistExist._id;
        }

        const vinyl = new Vinyl({
            vinyl_name: req.body.vinyl_name,
            artist: req.body.artist,
            summary: req.body.summary,
            date_of_release: req.body.date_of_release,
            genre: req.body.genre,
            cover: req.body.cover,
        });

        if(!errors.isEmpty() || !artistExist) {
            const allGenres = await Genre.find().exec();
        
            for (const genre of allGenres) {
                if (vinyl.genre.includes(genre._id)) {
                    genre.checked = true;
                }
            }

            if (!artistExist) {
                errors.array().push("Artist not found");
                var artistError = "Artist Error"
            }

            res.render("vinyl_form", {
                title: "Upload Vinyl",
                vinyl: vinyl,
                genres: allGenres,
                artistError: artistError,
                errors: errors.array(),
            });
            return;
        }

        await vinyl.save();
        res.redirect(vinyl.url);

    })
];
  
exports.vinyl_delete_get = asyncHandler(async (req, res, next) => {
    const [vinyl, copy] = await Promise.all([
        Vinyl.findById(req.params.id).exec(),
        VinylInstance.find({vinyl: req.params.id})
        .populate("vinyl")
        .exec(),
    ])

    if (vinyl === null) {
        const err = new Error("Vinyl Not Found");
        err.status = 404;
        return next(err);
    }

    res.render("vinyl_delete", {
        title: "Delete Vinyl",
        vinyl: vinyl,
        copy: copy,
    });
});
  
exports.vinyl_delete_post = asyncHandler(async (req, res, next) => {
    const [vinyl, copy] = await Promise.all([
        Vinyl.findById(req.params.id).exec(),
        VinylInstance.find({vinyl: req.params.id})
        .populate("vinyl")
        .exec(),
    ])

    if (copy.length > 0) {
        res.render("genre_delete", {
            title: "Delete Vinyl",
            vinyl: vinyl,
            copy: copy,
        })
    }

    await Vinyl.findByIdAndDelete(req.params.id);
    res.redirect("/catalog/vinyls");
});
  
exports.vinyl_update_get = asyncHandler(async (req, res, next) => {

    const [vinyl, genre] = await Promise.all([
        Vinyl.findById(req.params.id).populate("artist").exec(),
        Genre.find().exec(),
    ])

    res.render("vinyl_form", {title: "Upload Vinyl", vinyl: vinyl, genres: genre});
});
  
exports.vinyl_update_post = [

    (req, res, next) => {
        if(!(req.body.genre instanceof Array)) {
            if (typeof req.body.genre === "undefined") req.body.genre = [];
            req.body.genre = new Array(req.body.genre);
        }
        next();
    },  

    body("vinyl_name").trim().isLength({min: 1}).escape("Vinyl name must not be empty"),
    body("artist").trim().isLength({min: 1}).escape("Vinyl must not be empty"),
    body("summary").trim().isLength({min: 1}),
    body("date_of_release").isISO8601().toDate().escape("Input valid date."),
    body("genre").escape(),

    asyncHandler(async (req, res, next) => {

        const artistExist = await Artist.findOne({artist_name: req.body.artist});
        if (artistExist) {
            req.body.artist = artistExist._id;
        } else {
            body("artist").escape("Artist does not exist. Upload it before assigning an Vinyl to them.")
        }

        const errors = validationResult(req);
        const vinyl = new Vinyl({
            vinyl_name: req.body.vinyl_name,
            artist: req.body.artist,
            summary: req.body.summary,
            date_of_release: req.body.date_of_release,
            genre: req.body.genre,
            _id: req.params.id,
        });

        if(!errors.isEmpty()) {
            const allGenres = await Genre.find().exec();
        
              for (const genre of allGenres) {
                if (vinyl.genre.includes(genre._id)) {
                  genre.checked = true;
                }
              }

            res.render("vinyl_form", {
                title: "Upload Vinyl",
                vinyl: vinyl,
                genres: allGenres,
                errors: errors.array(),
            });
            return;
        }

        const updatedCopy = Vinyl.findByIdAndUpdate(req.params.id, vinyl, {});
        res.redirect(vinyl.url)
    })
];