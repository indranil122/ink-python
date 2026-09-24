import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const root = path.join(process.cwd(), "out");
const port = Number(process.env.PORT ?? 3000);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".wasm": "application/wasm",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

if (!fs.existsSync(root)) {
  console.error("No out directory. Run `npm run build` first.");
  process.exit(1);
}

function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const relative = decoded.replace(/^\/+/, "");
  const candidates = decoded.endsWith("/")
    ? [path.join(root, relative, "index.html")]
    : [
        path.join(root, relative),
        path.join(root, `${relative}.html`),
        path.join(root, relative, "index.html"),
      ];

  for (const candidate of candidates) {
    const resolved = path.resolve(candidate);

    if (!resolved.startsWith(path.resolve(root))) {
      continue;
    }

    if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) {
      return resolved;
    }
  }

  return path.join(root, "404.html");
}

const server = http.createServer((request, response) => {
  const file = resolveFile(request.url ?? "/");
  const type = contentTypes[path.extname(file)] ?? "application/octet-stream";

  response.writeHead(fs.existsSync(file) ? 200 : 404, {
    "Content-Type": type,
    "Cache-Control": "no-cache",
  });
  response.end(fs.readFileSync(file));
});

server.listen(port, () => {
  console.log(`Static build served from out/ at http://localhost:${port}`);
});
