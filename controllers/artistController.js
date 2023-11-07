const Artist = require("../models/artist");
const Vinyl = require("../models/vinyl");
const asyncHandler = require('express-async-handler')
const {body, validationResult} = require('express-validator');

exports.artist_list = asyncHandler(async (req, res, next) => {
    const allArtists = await Artist.find().sort({artist_name: 1}).exec();

    res.render("artist_list", {
        title: "Artist List",
        artists: allArtists,
    });
});

exports.artist_detail = asyncHandler(async (req, res, next) => {
    const [artist, vinylByArtist] = await Promise.all([
        Artist.findById(req.params.id).exec(),
        Vinyl.find({author: req.params.id}).exec(),
    ])

    if (artist === null) {
        const err = new Error("No matching artist found.");
        err.status = 404;
        return next(err);
    }

    res.render("artist_detail", {
        title: "Artist Detail",
        artist: artist,
        vinyl: vinylByArtist,
    })
})

exports.artist_create_get = asyncHandler(async (req, res, next) => {
    res.render("artist_form", {title: "Create Artist"});
})

exports.artist_create_post = [

    body("artist_name").trim().isLength({min:1}).escape().withMessage("First name must be specified."),
    body("formed_in").trim().isLength({min:1}).escape().withMessage("Band formation must be specified / Unknown"),
    body("description").trim().isLength({min: 1}).escape().withMessage("Description must not be empty"),
    body("image").escape(),

    asyncHandler(async (req, res, next) => {

        const error = validationResult(req);
        const artist = new Artist({
            artist_name: req.body.artist_name,
            formed_in: req.body.formed_in,
            description: req.body.description,
            image: req.file.path
        });

        if (!error.isEmpty()) {
            res.render("artist_form", {
                title: "Create Artist",
                artist: artist,
                errors: error.array(),
            }) 
            return;
        } else {
            await artist.save()
            res.redirect(artist.url)
        }
    })
]

exports.artist_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: artist delete GET");
});
  
exports.artist_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: artist delete POST");
});
  
exports.artist_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: artist update GET");
});
  
exports.artist_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: artist update POST");
});

