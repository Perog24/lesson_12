function validation(req, res, next) {

   if (req.params.id) {
      const parsedId = Number(req.params.id);
      if (isNaN(parsedId)) {
         return res.status(400).send("Invalid id parameter");
      }
      req.params.id = parsedId;
   }

   if (req.query.price) {
      const parsedPrice = Number(req.query.price);
      if (isNaN(parsedPrice)) {
         return res.status(400).send("Invalid price parameter");
      }
      req.query.price = parsedPrice;
   }

   next();
}
module.exports = validation;