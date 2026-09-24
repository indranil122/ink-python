function normalizeUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (explicit) {
    return normalizeUrl(explicit);
  }

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();

  if (productionHost) {
    return `https://${productionHost}`;
  }

  const previewHost = process.env.VERCEL_URL?.trim();

  if (previewHost) {
    return `https://${previewHost}`;
  }

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export function absoluteUrl(pathname = "/"): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;

  if (path === "/") {
    return `${siteUrl}/`;
  }

  return `${siteUrl}${path}`;
}
