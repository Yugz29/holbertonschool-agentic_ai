import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DATA_PATH = resolve(ROOT, "public/data/movies.json");
const ENV_PATH = resolve(ROOT, ".env");
const API_BASE = "https://api.themoviedb.org/3";
const POSTER_BASE = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280";

const TITLES_TO_REMOVE = [
  "Mad Max: Fury Road",
  "The Grand Budapest Hotel",
  "Dune",
];

const TARGETS = [
  {
    query: "One Piece",
    type: "tv",
    year: 1999,
    mediaType: "Anime",
    themeColor: "#1d4e89",
  },
  {
    query: "Solo Leveling",
    type: "tv",
    year: 2024,
    mediaType: "Anime",
    themeColor: "#3b1f7a",
  },
  {
    query: "Assassination Classroom",
    type: "tv",
    year: 2015,
    mediaType: "Anime",
    themeColor: "#5c6b1a",
  },
  {
    query: "Hell's Paradise",
    type: "tv",
    year: 2023,
    mediaType: "Anime",
    themeColor: "#6b1414",
  },
  {
    query: "Death Note",
    type: "tv",
    year: 2006,
    mediaType: "Anime",
    themeColor: "#1a1a1e",
  },
  {
    query: "Rick and Morty",
    type: "tv",
    year: 2013,
    mediaType: "Série",
    themeColor: "#1e6b5c",
  },
  {
    query: "Family Guy",
    type: "tv",
    year: 1999,
    mediaType: "Série",
    themeColor: "#2f5d8c",
  },
  {
    query: "Brooklyn Nine-Nine",
    type: "tv",
    year: 2013,
    mediaType: "Série",
    themeColor: "#1f3d6b",
  },
  {
    query: "Severance",
    type: "tv",
    year: 2022,
    mediaType: "Série",
    themeColor: "#123a4a",
  },
  {
    query: "One Piece",
    type: "tv",
    year: 2023,
    mediaType: "Série",
    themeColor: "#205a7a",
  },
  {
    query: "Westworld",
    type: "tv",
    year: 2016,
    mediaType: "Série",
    themeColor: "#6b3a1e",
  },
  {
    query: "Squid Game",
    type: "tv",
    year: 2021,
    mediaType: "Série",
    themeColor: "#7a1f4a",
  },
  {
    query: "Scary Movie",
    type: "movie",
    collection: "Scary Movie",
    mediaType: "Film",
    themeColor: "#4a1f5c",
  },
  {
    query: "Mr. & Mrs. Smith",
    type: "movie",
    year: 2005,
    mediaType: "Film",
    themeColor: "#5c1f1f",
  },
  {
    query: "The Matrix",
    type: "movie",
    year: 1999,
    mediaType: "Film",
    themeColor: "#0d3b1e",
  },
  {
    query: "Le Prénom",
    type: "movie",
    year: 2012,
    mediaType: "Film",
    themeColor: "#6b2f3a",
  },
  {
    query: "The Prestige",
    type: "movie",
    year: 2006,
    mediaType: "Film",
    themeColor: "#2b2b3d",
  },
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

async function tmdb(apiKey, path, params = {}) {
  const url = new URL(`${API_BASE}${path}`);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("language", "fr-FR");

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TMDB ${path} a répondu ${response.status}`);
  }

  return response.json();
}

function getYear(result) {
  const date = result.release_date || result.first_air_date || "";

  return date ? Number(date.slice(0, 4)) : null;
}

function getTitle(result) {
  return result.title || result.name || "";
}

function formatDuration(details, type) {
  if (type === "movie") {
    const runtime = details.runtime;

    if (!runtime) {
      return "";
    }

    return `${Math.floor(runtime / 60)}h${String(runtime % 60).padStart(2, "0")}`;
  }

  const episodeRuntime = (details.episode_run_time || [])[0];

  if (episodeRuntime) {
    return `${episodeRuntime} min/ép.`;
  }

  const seasons = details.number_of_seasons;

  return seasons ? `${seasons} saison${seasons > 1 ? "s" : ""}` : "";
}

function normalize(value) {
  return (value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function matchesQuery(result, query) {
  const wanted = normalize(query);

  return [
    result.title,
    result.name,
    result.original_title,
    result.original_name,
  ].some((value) => normalize(value) === wanted);
}

function disambiguate(target, candidates) {
  const exact = candidates.filter((result) => matchesQuery(result, target.query));
  const shortlist = exact.length > 0 ? exact : candidates;

  if (shortlist.length === 1) {
    return { result: shortlist[0] };
  }

  const ranked = [...shortlist].sort(
    (a, b) => (b.popularity || 0) - (a.popularity || 0)
  );

  if ((ranked[0].popularity || 0) >= 3 * (ranked[1].popularity || 0)) {
    return { result: ranked[0] };
  }

  const details = ranked
    .slice(0, 5)
    .map(
      (result) =>
        `${getTitle(result)} [id ${result.id}, popularité ${Math.round(
          result.popularity || 0
        )}]`
    )
    .join(", ");

  return { error: `plusieurs résultats équivalents : ${details}` };
}

function pickResult(target, results) {
  if (results.length === 0) {
    return { error: "aucun résultat TMDB" };
  }

  if (target.collection) {
    const released = results
      .filter((result) => getYear(result) && result.poster_path)
      .filter((result) =>
        getTitle(result).toLowerCase().startsWith("scary movie")
      )
      .sort((a, b) => getYear(b) - getYear(a));

    if (released.length === 0) {
      return { error: "aucun épisode de la saga trouvé" };
    }

    return { result: released[0] };
  }

  const sameYear = results.filter((result) => getYear(result) === target.year);

  if (sameYear.length === 0) {
    const years = results
      .slice(0, 5)
      .map((result) => `${getTitle(result)} (${getYear(result) || "?"})`)
      .join(", ");

    return { error: `aucun résultat pour l'année ${target.year} — vus : ${years}` };
  }

  return disambiguate(target, sameYear);
}

async function buildEntry(apiKey, target, id, watchedOn) {
  const search = await tmdb(apiKey, `/search/${target.type}`, {
    query: target.query,
    include_adult: "false",
  });

  const { result, error } = pickResult(target, search.results || []);

  if (error) {
    return { error };
  }

  const details = await tmdb(apiKey, `/${target.type}/${result.id}`);
  const genre = (details.genres || [])[0];
  const year = getYear(details) ?? getYear(result);

  if (!result.poster_path || !result.backdrop_path) {
    return { error: "poster ou backdrop manquant sur TMDB" };
  }

  return {
    entry: {
      id,
      title: getTitle(details) || getTitle(result),
      category: genre ? genre.name : "",
      mediaType: target.mediaType,
      year,
      duration: formatDuration(details, target.type),
      personalRating: 7,
      watchedOn,
      personalNote: "",
      coupDeCoeur: false,
      favorite: false,
      posterImage: `${POSTER_BASE}${result.poster_path}`,
      backdropImage: `${BACKDROP_BASE}${result.backdrop_path}`,
      themeColor: target.themeColor,
      description: details.overview || result.overview || "",
    },
  };
}

async function main() {
  const apiKey = await readApiKey();
  const existing = JSON.parse(await readFile(DATA_PATH, "utf8"));

  const kept = existing
    .filter((movie) => !TITLES_TO_REMOVE.includes(movie.title))
    .map((movie) => ({
      ...movie,
      mediaType: movie.mediaType || "Film",
    }));

  const watchedOn = new Date().toISOString().slice(0, 10);
  const entries = [];
  const unresolved = [];
  let nextId = Math.max(0, ...kept.map((movie) => movie.id)) + 1;

  for (const target of TARGETS) {
    const { entry, error } = await buildEntry(
      apiKey,
      target,
      nextId,
      watchedOn
    );

    if (error) {
      unresolved.push(`${target.query} (${target.mediaType}) — ${error}`);
      continue;
    }

    entries.push(entry);
    nextId += 1;
    console.log(`OK  ${entry.title} — ${entry.year} — ${entry.category}`);
  }

  const merged = [...kept, ...entries].map((movie) => ({
    id: movie.id,
    title: movie.title,
    category: movie.category,
    mediaType: movie.mediaType,
    year: movie.year,
    duration: movie.duration,
    personalRating: movie.personalRating,
    watchedOn: movie.watchedOn,
    personalNote: movie.personalNote,
    coupDeCoeur: movie.coupDeCoeur,
    favorite: movie.favorite,
    posterImage: movie.posterImage,
    backdropImage: movie.backdropImage,
    themeColor: movie.themeColor,
    description: movie.description,
  }));

  await writeFile(DATA_PATH, `${JSON.stringify(merged, null, 2)}\n`, "utf8");

  console.log(`\n${merged.length} entrées écrites dans ${DATA_PATH}`);

  if (unresolved.length > 0) {
    console.log("\nNon résolus :");
    unresolved.forEach((line) => console.log(`  - ${line}`));
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
