const Vinyl = require("../models/vinyl");
const Genre = require('../models/genre');
const Artist = require('../models/artist');
const VinylInstance = require('../models/vinyl_instance');
const {body, validationResult} = require('express-validator');
const asyncHandler = require("express-async-handler");

exports.vinyl_list = asyncHandler(async (req, res, next) => {
    const vinyls = await Vinyl.find().sort({vinyl_name: 1}).exec();

    res.render("vinyl_list", {
        title: "All Vinyls",
        vinyls: vinyls,
    });
  });
  
exports.vinyl_detail = asyncHandler(async (req, res, next) => {
    const [vinyl, copy] = await Promise.all([
        Vinyl.findById(req.params.id).exec(),
        VinylInstance.find({vinyl: req.params.id}),
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

  
exports.vinyl_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: vinyl delete GET");
});
  
exports.vinyl_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: vinyl delete POST");
});
  
exports.vinyl_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: vinyl update GET");
});
  
exports.vinyl_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: vinyl update POST");
});