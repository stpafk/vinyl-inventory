const vinyl = require("../models/vinyl");
const asyncHandler = require("express-async-handler");

exports.vinyl_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: vinyl list");
  });
  
exports.vinyl_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: vinyl detail: ${req.params.id}`);
});
  
exports.vinyl_create_get = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: vinyl create GET");
});
  
exports.vinyl_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: vinyl create POST");
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