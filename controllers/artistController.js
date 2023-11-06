const Artist = require("../models/artist");
const Genre = require("../models/genre");
const asyncHandler = require('express-async-handler')
const {body, validationResult} = require('express-validator');
const convert = require("mongo-image-converter");

exports.author_list = asyncHandler(async (req, res, next) => {
    const allArtists = await Artist.find().sort({artist_name: 1}).exec();

    res.render("artist_list", {
        title: "Artist List",
        artist_list: allArtists,
    });
});

exports.artist_detail = asyncHandler(async (req, res, next) => {
    //
})

exports.artist_create_get = asyncHandler(async (req, res, next) => {
    res.render("artist_form", {title: "Create Artist"});
})

exports.artist_create_post = [

    (req, res, next) => {
        const convertImage = async (event) => {
            try {
            const convertedImage = await convert.Convert(imageFile)
            if( convertedImage ){
                req.body.image = convertedImage;
                next();
            } else{
                const err = new Error("The file is not in format of image/jpeg or image/png");
                err.status = 404;
                return next(err)
            }
        } 
        catch (error) {
            console.warn(error.message)
            }
        }
        convertImage();
    },

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
            image: req.body.image,
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

