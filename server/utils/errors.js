function notFoundError(res, message) {
  res.status(404);
  res.send(message ? JSON.stringify({ message }) : { message: "Not found!" });
  res.end();
}

function badRequestError(res, message) {
  res.status(400);
  res.send(message ? JSON.stringify({ message }) : { message: "Bad request!" });
  res.end();
}

function unauthorizedError(res, message) {
  res.status(401);
  res.send(message ? JSON.stringify({ message }) : { message: "Unauthorized!" });
  res.end();
}

export { notFoundError, badRequestError, unauthorizedError };
