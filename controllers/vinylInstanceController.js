const Copy = require("../models/vinyl_instance");
const asyncHandler = require("express-async-handler");
const Vinyl = require("../models/vinyl")
  
exports.copy_detail = asyncHandler(async (req, res, next) => {
    const copy = Copy.findById(req.params.id)
    .exec()
    .populate("vinyl").exec();

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
res.send("NOT IMPLEMENTED: copy create GET");
});
  
exports.copy_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: copy create POST");
});
  
exports.copy_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: copy delete GET");
});
  
exports.copy_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: copy delete POST");
});
  
exports.copy_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: copy update GET");
});
  
exports.copy_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: copy update POST");
});