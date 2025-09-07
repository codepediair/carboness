export function json(data: unknown, status: number = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function badRequest(message: string, issues?: unknown) {
  return json({ error: message, issues }, 400);
}

export function notFound(message = "Not found") {
  return json({ error: message }, 404);
}

export function serverError(error: unknown) {
  console.error(error);
  return json({ error: "Server error", detail: `${error}` }, 500);
}