# Svelte face à React et Vue.js : analyse comparative

Ce document analyse l'implémentation Svelte de l'application Agentic AI et la compare aux versions React et Vue.js réalisées précédemment.

## Comparaison générale

Les trois frameworks partagent le même socle conceptuel : des composants qui reçoivent des props, gèrent un état local, réagissent à un cycle de vie, et savent afficher du contenu de façon conditionnelle ou dynamique. Ce socle ne change jamais d'un framework à l'autre, seule son expression syntaxique change.

La vraie différence entre les trois se situe dans le moment où le travail de mise à jour du DOM est effectué. React calcule un Virtual DOM à l'exécution et le compare à l'ancien pour appliquer les différences. Vue s'appuie sur un système de réactivité basé sur des proxys, également actif à l'exécution. Svelte, à l'inverse, fait la majorité du travail à la compilation : le compilateur transforme le composant en code JavaScript qui manipule directement les bons nœuds du DOM, sans moteur générique embarqué dans le bundle final.

Cette différence de philosophie explique la plupart des différences de syntaxe observées sur le projet : `useState`/`useEffect` en React restent des fonctions génériques à encadrer de règles (immuabilité, tableau de dépendances), alors que `$state()`/`onMount` en Svelte et `ref()`/`onMounted` en Vue sont des primitives que le framework peut analyser plus directement.

## Composants Svelte

Un composant Svelte est un fichier `.svelte` découpé en blocs `<script>`, balisage, et `<style>` optionnel, dans le même esprit qu'un composant Vue à ce niveau. La structure du projet reprend les mêmes dossiers que les versions React et Vue (`components/ui/`, `components/cards/`, `components/layout/`, `sections/`).

React autorise plusieurs fonctions-composants dans un seul fichier, comme le faisait `Footer.jsx` avec ses quatre icônes SVG locales non exportées. En Svelte, un fichier `.svelte` ne peut exposer qu'un seul composant, donc ces icônes locales sont devenues quatre blocs `{#snippet}` déclarés au niveau du composant, appelés avec `{@render}`. Le même mécanisme a permis de factoriser le logo répété deux fois dans `Brand.svelte`, un cas où React se contentait de stocker le JSX dans une variable, ce qui n'a pas d'équivalent direct puisque le template Svelte n'est pas du JavaScript.

Le cas de `Brand` illustre bien trois façons différentes d'éviter (ou non) la duplication d'un même bloc de markup selon le href :

```jsx
// React : le JSX vit dans une variable JS classique
const logo = (
  <>
    <span className="..."><Sparkles size={isHeader ? 20 : 18} /></span>
    <span className="...">Agentic AI</span>
  </>
);

return href ? <a href={href}>{logo}</a> : <div>{logo}</div>;
```

```vue
<!-- Vue : pas d'équivalent direct, le markup est simplement dupliqué -->
<a v-if="href" :href="href" class="flex items-center gap-3 justify-self-start">
  <span class="..."><Sparkles :size="isHeader ? 20 : 18" /></span>
  <span class="...">Agentic AI</span>
</a>
<div v-else class="flex items-center gap-2">
  <span class="..."><Sparkles :size="isHeader ? 20 : 18" /></span>
  <span class="...">Agentic AI</span>
</div>
```

```svelte
<!-- Svelte : un {#snippet} factorise le bloc, réutilisé dans les deux branches -->
{#snippet logo()}
  <span class="..."><Sparkles size={isHeader ? 20 : 18} /></span>
  <span class="...">Agentic AI</span>
{/snippet}

{#if href}
  <a {href} class="flex items-center gap-3 justify-self-start">{@render logo()}</a>
{:else}
  <div class="flex items-center gap-2">{@render logo()}</div>
{/if}
```

Ce cas précis a été une vraie surprise en relisant le code Vue d'origine : contrairement à ce qu'on pourrait supposer, Vue n'offre pas de mécanisme comparable au `{#snippet}` de Svelte pour factoriser un fragment de template réutilisé à l'intérieur d'un même composant. La version Vue du projet a simplement dupliqué le bloc, là où React s'en sortait avec une variable JS et Svelte avec un snippet dédié.

## Templates et syntaxe

Le template Svelte reste proche du HTML, avec des directives dédiées (`{#if}`, `{#each}`) plutôt que des expressions JavaScript mêlées au balisage. En cela il ressemble davantage à Vue qu'à React : là où JSX permet d'écrire `{condition && <p>...}` directement, Svelte comme Vue séparent la logique de contrôle du reste via une syntaxe propre au template.

Un détail de cette proximité avec le HTML : les attributs SVG comme `strokeWidth` en JSX (camelCase, une convention propre à React) redeviennent `stroke-width` en kebab-case dans un template Svelte, la syntaxe DOM native. La même remarque vaut pour les gestionnaires d'événements, écrits `onsubmit`, `onfocus` en minuscules en Svelte, contre `onSubmit`, `onFocus` en JSX.

La limite la plus nette rencontrée concerne le typage. Le projet Svelte utilise `checkJs` (JavaScript avec vérification de type par JSDoc, sans TypeScript). Une prop déstructurée sans valeur par défaut, par exemple `let { href } = $props()`, est automatiquement déduite comme obligatoire, même si le composant la traite comme facultative (`Brand`, `Button`, `SectionTitle` recevaient toutes une prop `href` ou `accent` optionnelle côté React). Il a fallu ajouter une annotation `@type` explicite avec `?` pour corriger cette déduction, une contrainte que ni React ni Vue n'imposent de la même façon.

## Props et flux de données

`$props()` fonctionne comme un objet unique qu'on déstructure, comme les props d'un composant fonction React. La différence avec React tient à la nécessité, sur ce projet, de typer explicitement les props facultatives via JSDoc, ce qui rapproche davantage Svelte de la discipline de `defineProps()` en Vue que de la souplesse par défaut de React.

Un point resté identique entre les trois frameworks : le principe du composant qui reçoit une référence de composant en tant que prop, comme `FeatureCard` recevant une icône Lucide dans `icon`. En React comme en Svelte, il suffit de renommer la prop avec une majuscule à la déstructuration (`icon: Icon`) pour pouvoir l'utiliser directement comme balise. Svelte applique la même règle de casse que JSX pour distinguer un élément HTML d'un composant, ce qui a permis de reprendre presque telle quelle la logique déjà écrite en React.

## État et réactivité

`$state()` remplace `useState` pour les valeurs simples, mais surtout, appliqué à un objet, il le rend réactif en profondeur, comme le fait `reactive()` en Vue. C'est ce qui a permis, sur le formulaire de contact, de lier directement `bind:value={formData.fullName}` à une propriété imbriquée sans recréer l'objet entier à chaque frappe, alors que la version React devait passer par une fonction `handleChange` générique et un `setFormData((prev) => ({ ...prev, [name]: value }))`.

`$derived()` joue le même rôle que `computed()` en Vue pour les valeurs calculées à partir d'un état ou d'une prop, comme les indicateurs de validation du formulaire (`isNameValid`, `isFormValid`) ou la classe dynamique de `SectionTitle`. Le volume de code nécessaire est nettement plus faible côté Svelte et Vue que côté React sur ce genre de logique, précisément parce que React impose de recréer les structures de données à chaque mise à jour.

## Logique de rendu

Le rendu conditionnel en Svelte s'écrit avec des blocs `{#if}`/`{:else if}`/`{:else}`, à comparer avec l'opérateur `&&` ou le retour anticipé en React, et avec `v-if`/`v-else` en Vue. La différence la plus concrète est apparue en migrant `Insights.jsx` : le `if (error) { return <p>...</p>; }` de React repose sur le fait qu'un composant est une fonction qui peut s'interrompre avec `return`. Un composant Svelte n'a pas de `return` au milieu de son template, il a donc fallu envelopper toute la section dans un bloc `{#if error} ... {:else} ... {/if}`, une transformation plus structurelle qu'une simple traduction de syntaxe.

```jsx
// React
if (error) {
  return <p>{error}</p>;
}
return <section id="insights-section">...</section>;
```

```vue
<!-- Vue -->
<p v-if="error">{{ error }}</p>
<section v-else id="insights-section">...</section>
```

```svelte
<!-- Svelte -->
{#if error}
  <p>{error}</p>
{:else}
  <section id="insights-section">...</section>
{/if}
```

Le rendu dynamique suit le même principe dans les trois frameworks (itérer sur un tableau, identifier chaque élément par une clé), mais avec des mécanismes distincts : `.map()` en React reste une méthode JavaScript standard, `v-for` en Vue est une directive posée sur l'élément à répéter, et `{#each tableau as élément (clé)}` en Svelte est un bloc de template avec sa propre syntaxe de clé entre parenthèses. Un détail à noter : sans clé explicite, comme dans `Insights.svelte`, Svelte garde par défaut un comportement d'identification par index, ce qui correspond exactement au `key={index}` utilisé côté React.

```jsx
// React
{features.map((feature) => (
  <FeatureCard key={feature.title} icon={feature.icon} title={feature.title} />
))}
```

```vue
<!-- Vue -->
<FeatureCard
  v-for="feature in features"
  :key="feature.title"
  :icon="feature.icon"
  :title="feature.title"
/>
```

```svelte
<!-- Svelte -->
{#each features as feature (feature.title)}
  <FeatureCard icon={feature.icon} title={feature.title} />
{/each}
```

## Cycle de vie et effets de bord

`onMount` a remplacé `useEffect(fn, [])` pour déclencher le chargement des données au montage du composant, sur `Insights.svelte` comme précédemment sur sa version React et Vue. La comparaison la plus utile ici est avec Vue : `onMount` et `onMounted` sont tous deux des fonctions nommées, importées du framework, qui expriment directement leur intention. React choisit une approche différente, un hook générique `useEffect` que l'on doit contraindre avec un tableau de dépendances pour obtenir le même comportement.

```jsx
// React
useEffect(() => {
  async function loadInsights() {
    try {
      const data = await getInsights();
      setInsights(data);
    } catch (err) {
      setError("Unable to load insights. Please try again later.");
    }
  }
  loadInsights();
}, []);
```

```vue
<!-- Vue -->
onMounted(async () => {
  try {
    const data = await getInsights();
    insights.value = data;
  } catch (err) {
    error.value = "Unable to load insights. Please try again later.";
  }
});
```

```svelte
<!-- Svelte -->
onMount(async () => {
  try {
    insights = await getInsights();
  } catch (err) {
    error = "Unable to load insights. Please try again later.";
  }
});
```

La version Svelte est la plus courte des trois : `insights = await getInsights()` réassigne directement la variable `$state`, sans passer par un setter (`setInsights`) ni par une propriété `.value` (`insights.value = data`) comme le demandent respectivement React et Vue.

Ce qui reste identique dans les trois cas, au-delà de la syntaxe, c'est le motif lui-même : une fonction asynchrone qui va chercher des données, un état de chargement ou d'erreur mis à jour en conséquence, et un template qui réagit à ce changement.

## Formulaires et événements

Le formulaire de contact illustre bien la progression entre les trois versions. React lie chaque champ manuellement (`value` et `onChange`) via un `formData` géré par `useState`. Vue simplifie ça avec `v-model`, qui lie directement un champ à une propriété réactive. Svelte fait la même chose avec `bind:value`, sur le même principe.

```jsx
// React
<input
  name="fullName"
  value={formData.fullName}
  onChange={handleChange}
/>
```

```vue
<!-- Vue -->
<input name="fullName" v-model="formData.fullName" />
```

```svelte
<!-- Svelte -->
<input name="fullName" bind:value={formData.fullName} />
```

Un point intéressant est apparu sur la gestion de la soumission du formulaire. En React, `handleSubmit` doit appeler `e.preventDefault()` explicitement. Vue permet d'éviter cet appel manuel grâce au modificateur `@submit.prevent` posé directement dans le template. Svelte, en revanche, n'a pas de système de modificateurs équivalent : `handleSubmit` doit donc appeler `e.preventDefault()` lui-même, exactement comme en React, malgré une syntaxe de binding par ailleurs très proche de Vue sur le reste du formulaire.

```jsx
// React : preventDefault appelé dans le handler
<form onSubmit={handleSubmit}>
async function handleSubmit(e) {
  e.preventDefault();
  // ...
}
```

```vue
<!-- Vue : le modificateur .prevent s'en charge dans le template -->
<form @submit.prevent="handleSubmit">
async function handleSubmit() {
  // pas de preventDefault ici
}
```

```svelte
<!-- Svelte : pas de modificateur, retour à preventDefault manuel -->
<form onsubmit={handleSubmit}>
async function handleSubmit(e) {
  e.preventDefault();
  // ...
}
```

## Organisation du projet

La structure du projet Svelte reproduit intentionnellement celle des projets React et Vue, mêmes noms de dossiers et de composants, seule l'extension des fichiers change. Cette parité volontaire, décidée dès la migration Vue, a rendu la comparaison entre les trois versions plus lisible, puisque les différences observées viennent du framework et non d'un choix d'architecture différent.

Ce qui a changé à cause de contraintes propres à Svelte : deux composants qui n'existaient qu'à l'intérieur d'un autre fichier côté React (les icônes du `Footer`, le logo répété du `Brand`) ont dû être extraits sous forme de `{#snippet}`, faute de pouvoir déclarer plusieurs composants dans un seul fichier `.svelte`.

## Migration assistée par IA

Claude Code, utilisé directement dans l'éditeur, a servi tout au long de cette migration, aussi bien pour convertir les composants que pour déboguer les erreurs de build et de lint. Les versions React et Vue déjà existantes ont directement facilité ce travail : elles ont permis de donner des instructions précises et bornées à chaque étape (quels fichiers migrer, quelles dépendances étaient déjà prêtes), plutôt que de laisser l'outil deviner l'ensemble du projet d'un coup.

Ce qui a bien fonctionné : les composants simples et présentationnels (`ui/`, `cards/`) ont été migrés correctement du premier coup, et une fois qu'un motif était établi sur un composant (comme l'annotation JSDoc des props facultatives), l'outil l'a réappliqué de lui-même sur les composants suivants sans qu'il soit nécessaire de le redemander.

Ce qui a nécessité une relecture ou une correction manuelle : la déduction de type sur les props facultatives, corrigée via JSDoc ; et un vrai bug d'incompatibilité entre le bundler Rolldown de Vite 8 et un commentaire généré par le compilateur Svelte, qui empêchait le build de passer sur deux composants précis. Cette seconde correction a demandé de vérifier plusieurs pistes (mise à jour des paquets, changement d'emplacement de l'annotation) avant de conclure qu'il s'agissait d'un problème connu et encore ouvert de l'écosystème, et de choisir un compromis assumé (retirer l'annotation sur ces deux fichiers) plutôt qu'une solution non conforme aux contraintes du projet, comme passer en TypeScript.

L'ordre de migration a directement influencé la qualité du résultat : en avançant dossier par dossier selon les dépendances réelles du projet (les données et services d'abord, puis les composants `ui/`, puis `cards/`, puis `layout/`, puis les sections), chaque étape ne pouvait s'appuyer que sur du code déjà vérifié, ce qui a permis de repérer immédiatement les dépendances manquantes plutôt que de les découvrir plus tard sous forme de bug silencieux.

## Perspective professionnelle

Ce projet a montré qu'apprendre un troisième framework après en avoir déjà comparé deux va plus vite, non pas parce que Svelte est plus simple, mais parce que les concepts sous-jacents (composant, prop, état, cycle de vie, rendu conditionnel et dynamique) étaient déjà acquis avant même d'ouvrir la documentation Svelte. Le travail restant consistait à faire correspondre ces concepts à une nouvelle syntaxe, pas à les redécouvrir.

C'est aussi ce qui rend la compréhension de l'architecture plus importante que la mémorisation de la syntaxe : c'est la connaissance des dépendances réelles du projet React, pas la connaissance de Svelte, qui a permis d'anticiper qu'il fallait migrer `Brand` avant `Header`, ou de repérer qu'`Insights` dépendait d'un composant `InsightCard` jamais couvert par le plan de migration initial.

L'IA a clairement réduit la barrière entre les trois écosystèmes, en prenant en charge la traduction syntaxique une fois le contexte et l'ordre correctement définis. Mais les deux bugs rencontrés sur ce projet, l'un de typage, l'autre de bundler, n'ont été trouvés qu'en lisant le code généré, en lançant réellement le build et le linter, et en creusant au-delà du premier message d'erreur. Rien de tout cela ne se serait produit si le code généré avait simplement été accepté sans être vérifié.