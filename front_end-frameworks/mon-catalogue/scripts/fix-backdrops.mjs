import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DATA_PATH = resolve(ROOT, "public/data/movies.json");
const ENV_PATH = resolve(ROOT, ".env");
const API_BASE = "https://api.themoviedb.org/3";
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280";

const TARGETS = [
  { title: "Interstellar", year: 2014 },
  { title: "The Batman", year: 2022 },
  { title: "Ratatouille", year: 2007 },
  { title: "Spider-Man: Into the Spider-Verse", year: 2018 },
  { title: "The Truman Show", year: 1998 },
];

async function readApiKey() {
  const content = await readFile(ENV_PATH, "utf8");
  const line = content
    .split("\n")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith("VITE_TMDB_API_KEY="));

  if (!line) {
    throw new Error("VITE_TMDB_API_KEY introuvable dans .env");
  }

  return line.slice("VITE_TMDB_API_KEY=".length).replace(/^["']|["']$/g, "");
}

async function searchMovie(apiKey, query, year) {
  const url = new URL(`${API_BASE}/search/movie`);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("language", "fr-FR");
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("query", query);
  url.searchParams.set("primary_release_year", year);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TMDB a répondu ${response.status}`);
  }

  const payload = await response.json();

  return payload.results || [];
}

function normalize(value) {
  return (value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function pickResult(results, target) {
  const sameYear = results.filter(
    (result) => Number((result.release_date || "").slice(0, 4)) === target.year
  );

  const exact = sameYear.filter((result) =>
    [result.title, result.original_title].some(
      (value) => normalize(value) === normalize(target.title)
    )
  );

  const shortlist = exact.length > 0 ? exact : sameYear;
  const withBackdrop = shortlist.filter((result) => result.backdrop_path);

  if (withBackdrop.length === 0) {
    return { error: "aucun résultat TMDB avec backdrop pour ce titre/année" };
  }

  const ranked = [...withBackdrop].sort(
    (a, b) => (b.popularity || 0) - (a.popularity || 0)
  );

  if (
    ranked.length > 1 &&
    (ranked[0].popularity || 0) < 3 * (ranked[1].popularity || 0)
  ) {
    const details = ranked
      .slice(0, 5)
      .map((result) => `${result.title} [id ${result.id}]`)
      .join(", ");

    return { error: `plusieurs résultats équivalents : ${details}` };
  }

  return { result: ranked[0] };
}

async function main() {
  const apiKey = await readApiKey();
  const movies = JSON.parse(await readFile(DATA_PATH, "utf8"));
  const unresolved = [];

  for (const target of TARGETS) {
    const movie = movies.find(
      (entry) => entry.title === target.title && entry.year === target.year
    );

    if (!movie) {
      unresolved.push(`${target.title} (${target.year}) — absent du JSON`);
      continue;
    }

    const results = await searchMovie(apiKey, target.title, target.year);
    const { result, error } = pickResult(results, target);

    if (error) {
      unresolved.push(`${target.title} (${target.year}) — ${error}`);
      continue;
    }

    movie.backdropImage = `${BACKDROP_BASE}${result.backdrop_path}`;
    console.log(`OK  ${movie.title} → ${result.backdrop_path}`);
  }

  await writeFile(DATA_PATH, `${JSON.stringify(movies, null, 2)}\n`, "utf8");

  if (unresolved.length > 0) {
    console.log("\nNon résolus :");
    unresolved.forEach((line) => console.log(`  - ${line}`));
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
