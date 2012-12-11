
/*
 * GET an image.
 */

exports.display = function(req, res){
  res.render('image', { title: 'Display a dot, a chinese symbol, an image and then noise.' });
};
