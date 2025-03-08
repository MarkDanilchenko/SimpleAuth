export function validateBody(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body);

      next();
    } catch (error) {
      res.status(400);
      res.send(JSON.stringify({ error: error.message }));
      res.end();
    }
  };
}
