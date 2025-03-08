export function notFoundError(res, message) {
  res.status(404);
  res.send(JSON.stringify({ error: message ?? "Not found!" }));
  res.end();
}

export function badRequestError(res, message) {
  res.status(400);
  res.send(JSON.stringify({ error: message ?? "Bad request!" }));
  res.end();
}

export function unauthorizedError(res, message) {
  res.status(401);
  res.send(JSON.stringify({ error: message ?? "Unauthorized!" }));
  res.end();
}
