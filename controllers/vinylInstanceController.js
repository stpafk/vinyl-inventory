const Copy = require("../models/vinyl_instance");
const asyncHandler = require("express-async-handler");
const Vinyl = require("../models/vinyl");
const {body, validationResult} = require('express-validator');
  
exports.copy_detail = asyncHandler(async (req, res, next) => {
    const copy = await Copy.findById(req.params.id).populate("vinyl").exec();

    if (copy === null) {
        const err = new Error("Instance does not exist.");
        err.status = 404;
        return next(err);
    }

    res.render("copy_detail", {
        title: "Vinyl Issue",
        copy: copy,
    })
});
  
exports.copy_create_get = asyncHandler(async (req, res, next) => {
    const vinyl = await Vinyl.find().exec();

    res.render("copy_form", {
        title: "Create Issue",
        vinyl: vinyl,
    })
});
  
exports.copy_create_post = [
    body("copy_name").trim().isLength({min: 1}).escape("Input vinyl name."),
    body("year").isLength({min: 0, max: 4}).escape("Input valid year."),
    body("released_by").trim().isLength({min: 1, max: 100}).escape("Input valid Record Label."),
    body("released_in").trim().isLength({max: 28}).escape("Input a valid Country."),
    body("quantity").isInt().escape("Input quantity."),
    body("price").isInt().escape(),
    body("status").escape(),

    asyncHandler(async (req, res, next) => {

        const vinylExist = await Vinyl.findOne({vinyl_name: req.body.copy_name})
        if (vinylExist) {
            req.body.copy_name = vinylExist._id;
        }
        
        const errors = validationResult(req);
        const copy = new Copy({
            vinyl: req.body.copy_name,
            year: req.body.year,
            released_by: req.body.released_by,
            released_in: req.body.released_in,
            quantity: req.body.quantity,
            price: req.body.price,
            status: req.body.status,
        });
        
        if (!errors.isEmpty()) {
            const vinyl = await Vinyl.find().exec();
            
            res.render("copy_form", {
                title: "Create Issue",
                vinyl: vinyl,
                copy: copy,
                errors: errors.array()
            });
            return;
        }

        await copy.save();
        res.redirect(copy.url)
    })
]
  
exports.copy_delete_get = asyncHandler(async (req, res, next) => {
    const copy = await Copy.findById(req.params.id).exec();

    res.render("copy_delete", {
        title: "Delete Vinyl Issue",
        copy: copy
    })
});
  
exports.copy_delete_post = asyncHandler(async (req, res, next) => {
    const copy = await Copy.findById(req.params.id).populate("vinyl").exec();
    const vinyl = await Vinyl.findById(copy.vinyl._id);

    await Copy.findByIdAndDelete(req.params.id);
    res.redirect(vinyl.url)
});
  
exports.copy_update_get = asyncHandler(async (req, res, next) => {
    const copy = await Copy.findById(req.params.id).populate("vinyl").exec();

    if (copy === null) {
        const err = new Error("Copy not found.");
        err.status = 404;
        return next(err);
    }

    res.render("copy_form", {
        title: "Update Copy",
        copy: copy,
    })
});
  
exports.copy_update_post = [
    body("copy_name").trim().isLength({min: 1}).escape("Input vinyl name."),
    body("year").isLength({min: 0, max: 4}).escape("Input valid year."),
    body("released_by").trim().isLength({min: 1, max: 100}).escape("Input valid Record Label."),
    body("released_in").trim().isLength({max: 28}).escape("Input a valid Country."),
    body("quantity").isInt().escape("Input quantity."),
    body("price").isInt().escape(),
    body("status").escape(),

    asyncHandler(async (req, res, next) => {

        const vinylExist = await Vinyl.findOne({vinyl_name: req.body.copy_name})
        if (vinylExist) {
            req.body.copy_name = vinylExist._id;
        }
        
        const errors = validationResult(req);
        const copy = new Copy({
            vinyl: req.body.copy_name,
            year: req.body.year,
            released_by: req.body.released_by,
            released_in: req.body.released_in,
            quantity: req.body.quantity,
            price: req.body.price,
            status: req.body.status,
            _id: req.params.id,
        });
        
        if (!errors.isEmpty()) {
            const vinyl = await Vinyl.find().exec();
            
            res.render("copy_form", {
                title: "Update Issue",
                vinyl: vinyl,
                copy: copy,
                errors: errors.array()
            });
            return;
        }

        const updatedCopy = await Copy.findByIdAndUpdate(req.params.id, copy, {});
        res.redirect(copy.url)
    })
]