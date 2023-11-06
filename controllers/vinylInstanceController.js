const Copy = require("../models/vinyl_instance");
const asyncHandler = require("express-async-handler");

exports.copy_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: copy list");
  });
  
exports.copy_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: copy detail: ${req.params.id}`);
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