# React vs Vue.js : analyse comparative

Ce document compare les implémentations React et Vue.js d'une même application.
Les deux versions partagent les mêmes sections, les mêmes données, et le même design visuel basé sur Tailwind CSS.

## Comment sont créés les composants React

Dans mon projet, un composant React est une fonction JavaScript qui retourne du JSX.
Par exemple, pour FeatureCard.jsx, j'ai une fonction qui prend props en argument (que je déstructure en icon, title, description) et qui retourne le bloc JSX à afficher.
Il n'y a pas de format de fichier spécial, pas de convention imposée par le framework, je crée un fichier .jsx, j'écris ma fonction, je fais mon return (...), et j'exporte. Toute la logique et le rendu vivent dans le même bloc de code.

```jsx
function FeatureCard({ icon: Icon, title, description }) {
  return (
    <article className="rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/40">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500 shadow-lg shadow-violet-500/40">
        <Icon className="h-6 w-6 text-white" />
      </div>

      <h3 className="mt-6 text-lg font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
    </article>
  );
}

export default FeatureCard;
```

## Comment sont créés les composants Vue

Côté Vue, j'ai dû changer de réflexe. Un composant, c'est un fichier .vue découpé en blocs distincts.
`<script setup>` en haut, où je déclare mes props et ma logique.
`<template>` en dessous, où j'écris mon balisage.
Pour FeatureCard.vue, je déclare mes props avec defineProps() dans le script, et l'affichage se fait dans le template avec les {{ ... }} pour interpoler les valeurs.

```vue
<script setup>
defineProps({
  icon: { type: [Object, Function], required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});
</script>

<template>
  <article class="rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/40">
    <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500 shadow-lg shadow-violet-500/40">
      <component :is="icon" class="h-6 w-6 text-white" />
    </div>

    <h3 class="mt-6 text-lg font-semibold text-white">{{ title }}</h3>

    <p class="mt-2 text-sm leading-6 text-slate-400">{{ description }}</p>
  </article>
</template>
```

## Similitudes et différences

Dans les deux cas, un composant reste une brique réutilisable qui reçoit des props et produit un rendu.
Dans ce projet, j'ai également gardé les mêmes noms de composant et la même architecture de dossiers, donc le découpage logique de l'application est identique, seule la manière d'écrire chaque brique change.
La plus grosse différence pour moi est la séparation logique/template en Vue, qui n'existe pas en React.
En React, tout est mélangé dans le JS, alors qu'en Vue, c'est explicitement séparé en blocs.
Je ne pouvais pas juste "traduire" ligne par ligne, il a fallu repenser chaque composant en deux temps, d'abord la logique, ensuite le template.

## JSX

En React, le balisage est écrit directement dans le JavaScript avec JSX. On dirait du HTML, mais c'est en fait transformé en appels de fonction JavaScript.
Concrètement, ça veut dire que je peux mettre n'importe quelle expression JS dans mon rendu avec des accolades, comme un .map() par exemple pour afficher une liste. Mais ça veut aussi dire qu'il y a des règles à respecter qui ne sont pas du HTML classique. Comme className au lieu de class, chaque balise doit être fermée (y compris les `<img />`), et un composant ne peut retourner qu'un seul élément racine.
C'est justement ce genre de petits détails qui faisait planter mon build.

## Template Vue

Le template Vue reste plus proche du HTML pur.
Pas d'accolades JS partout, mais des directives dédiées (v-if, v-for, v-bind, v-on), et des doubles accolades {{ }} pour afficher une valeur.
Ici on se retrouve littéralement avec du HTML, mais avec des attributs en plus.

```
<!-- JSX -->
<p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>

<!-- Template Vue -->
<p class="mt-2 text-sm leading-6 text-slate-400">{{ description }}</p>
```

## Avantages et inconvénients

L'avantage du JSX est que je peux tout faire en JavaScript, pas besoin d'apprendre une syntaxe à part.
L'inconvénient est que ça demande de connaitre plein de petites règles spécifiques à JSX qui sont différentes du HTML normal.

Le template Vue à l'inverse est plus lisible et proche du HTML. Par contre les directives sont une syntaxe à part entière à apprendre, et le template ne peut pas contenir n'importe quelle logique JavaScript, je suis obligé de la sortir du template et de la mettre dans `<script setup>`.

## Props React

En React, les props sont passées comme un seul objet à ma fonction composant.
Dans le projet, je les déstructure directement dans les paramètres : function FeatureCard({ icon, title, description }). React ne fait aucune vérification de type sur les props par défaut, il n'y a rien qui m'empêche de passer un title qui est un nombre au lieu d'un texte, ça ne plantera pas.
Pour avoir une vraie validation il faudrait ajouter PropTypes (ou passer en TypeScript).

```jsx
function FeatureCard({ icon, title, description }) {
```

## Props Vue

En Vue, je dois déclarer mes props explicitement avec `defineProps()` dans le `<script setup>`, en précisant le type de chaque prop (String, Number, Object, ...) et éventuellement une valeur par défaut ou si elle est obligatoire. Si j'utilise une prop dans mon template sans l'avoir déclarée, elle ne sera pas reconnue.

```js
defineProps({
  icon: { type: [Object, Function], required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});
```

## Similitudes et différences

Dans les deux cas, le principe reste le même.
Les données descendent du parent vers l'enfant via les props, et l'enfant ne doit pas les modifier lui-même.
La différence est au niveau des déclarations : en Vue je suis obligé de tout déclarer avec un type, alors qu'en React je peux utiliser mes props sans rien déclarer formellement.
Dans le projet côté Vue, on peut voir la différence dans FeatureCard, StatCard et InsightCard, j'ai dû ajouter le bloc defineProps() dont je n'avais pas besoin en React.

## Gestion d'état React

En React, je gère l'état avec le hook useState, qui me retourne une valeur et une fonction pour la mettre à jour.
Sur le formulaire de contact, j'ai un state pour les champs (fullName, email, message) et je dois le traiter de façon immuable : je ne peux pas juste faire formData.email = "...", je dois passer par setFormData avec une fonction qui recopie l'ancien état avant de changer le champ modifié.
Si je mute directement sans passer par setFormData, React ne s'en rend même pas compte et rien ne se met à jour à l'écran.

```jsx
const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  message: "",
});

function handleChange(e) {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
}
```

## État réactif Vue

En Vue, avec la Composition API, j'utilise ref() ou reactive().
Pour le même formulaire de contact, j'ai un objet réactif avec reactive({ fullName: "", email: "", message: "" }), et cette fois je peux modifier un champ directement, genre formData.email = "...", sans recréer tout l'objet.
Vue détecte le changement tout seul et met à jour l'affichage.

```js
const formData = reactive({
  fullName: "",
  email: "",
  message: "",
});
```

## Similitudes et différences

Dans les deux cas, l'objectif est le même : garder l'état du formulaire dans le composant et déclencher un nouveau rendu quand il change.
La différence est dans la façon de modifier cet état : React m'oblige à rester immuable et à passer par setFormData, alors que Vue me laisse modifier directement mes données réactives.

## Cycle de vie React

En React, je gère le cycle de vie avec le hook useEffect, combiné à un tableau de dépendances.
Sur la section Insights, j'ai un useEffect(() => { ... }, []) pour aller chercher les données via insightsService dès que le composant s'affiche. Le tableau vide veut dire "une seule fois, au montage".
Si j'oublie ce tableau, ou si je mets une mauvaise dépendance dedans, l'effet peut se relancer à chaque rendu.

```jsx
useEffect(() => {
  async function loadInsights() {
    try {
      const data = await getInsights();
      setInsights(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load insights. Please try again later.");
    }
  }
  loadInsights();
}, []);
```

## Cycle de vie Vue

En Vue, j'utilise des fonctions dédiées importées de vue, comme onMounted.
Pour le même besoin sur Insights, j'ai onMounted(() => { ... }) qui va chercher les données au montage du composant.
Pas de tableau de dépendances à gérer, la fonction dit directement ce qu'elle fait.

```js
onMounted(async () => {
  try {
    const data = await getInsights();
    insights.value = data;
  } catch (err) {
    console.error(err);
    error.value = "Unable to load insights. Please try again later.";
  }
});
```

## Similitudes et différences

Dans les deux cas, le but est le même : déclencher une action au moment où le composant apparaît à l'écran, ici récupérer les insights.
La différence, c'est que React regroupe tout dans un seul hook générique (useEffect) qu'on contrôle avec un tableau de dépendances, alors que Vue propose des fonctions séparées et nommées pour chaque moment du cycle de vie.

## Rendu conditionnel React

En React, j'utilise directement des opérateurs JavaScript dans le JSX : le && pour afficher un élément seulement si une condition est vraie, ou un return anticipé pour remplacer tout le rendu.
Sur la section Insights, si le chargement des données échoue, je retourne directement un message d'erreur à la place de toute la section :

```jsx
if (error) {
  return <p>{error}</p>;
}
```

## Rendu conditionnel Vue

En Vue, j'utilise les directives v-if, v-else-if et v-else pour inclure ou non un élément dans le DOM, ou v-show pour juste le cacher visuellement sans le retirer du DOM.
Pour le même cas sur Insights, mon template affiche soit le message d'erreur, soit la section, avec v-if et v-else :

```vue
<p v-if="error">{{ error }}</p>
<section v-else id="insights-section">
  ...
</section>
```

## Similitudes et différences

Le résultat final est le même dans les deux cas : un élément s'affiche ou non selon une condition.
La différence, c'est que React réutilise du JS que je peux utiliser partout dans mon code, alors que Vue propose des directives dédiées, propres au template, faciles à repérer d'un coup d'œil mais qui ne marchent que dans le template.

## Rendu dynamique React

En React, j'utilise .map() pour transformer un tableau de données en tableau d'éléments JSX.
Sur la section Features, je fais features.map((feature) => <FeatureCard key={feature.title} ... />) pour afficher chaque élément de mon fichier data/features.js. Chaque élément a besoin d'une key pour que React s'y retrouve entre les rendus.

```jsx
{features.map((feature) => (
  <FeatureCard
    key={feature.title}
    icon={feature.icon}
    title={feature.title}
    description={feature.description}
  />
))}
```

## Rendu dynamique Vue

En Vue, j'utilise la directive v-for directement dans le template : v-for="feature in features" :key="feature.title".
Pour les mêmes données, je n'ai pas besoin de sortir du template pour itérer, la directive fait le travail sur place.

```vue
<FeatureCard
  v-for="feature in features"
  :key="feature.title"
  :icon="feature.icon"
  :title="feature.title"
  :description="feature.description"
/>
```

## Similitudes et différences

Les deux ont besoin d'une clé unique par élément, et les deux ont servi pour les mêmes données dans mon projet.
La différence est surtout syntaxique : .map() est du JS pur, donc je peux le combiner avec un filter ou un sort avant d'afficher, alors que v-for est plus concis directement dans le template mais je dois faire ce genre de transformation avant, dans le script.

## Gestion des formulaires React

Sur le formulaire de contact, chaque champ est un champ contrôlé : sa value est liée à mon state, et un onChange met à jour ce state à chaque frappe avec e.target.value.
À la soumission, je lis le state actuel et j'appelle e.preventDefault() pour empêcher le rechargement de la page.

```jsx
<input
  id="fullName"
  name="fullName"
  type="text"
  value={formData.fullName}
  onChange={handleChange}
/>
```

## Gestion des formulaires Vue

Pour le même formulaire, j'utilise v-model sur chaque champ, qui lie directement la valeur de l'input à ma donnée réactive dans les deux sens.
Je n'ai pas besoin d'écrire un gestionnaire onChange pour chaque champ comme en React.

```vue
<input
  id="fullName"
  name="fullName"
  type="text"
  v-model="formData.fullName"
/>
```

## Similitudes et différences

Les deux versions valident les mêmes champs (fullName, email, message) avant de permettre l'envoi.
La différence, c'est la quantité de code à écrire : en React je dois répéter value et onChange pour chaque champ, alors qu'en Vue v-model fait ça en une seule directive.

## Gestion des événements React

En React, je passe mes gestionnaires comme des props en camelCase, `onClick={handleSubmit}` ou `onSubmit={handleSubmit}`.
La valeur est une référence vers ma fonction, pas un appel direct. Sur le formulaire de contact, je dois aussi appeler e.preventDefault() moi-même dans la fonction pour empêcher le rechargement de la page :

```jsx
<form onSubmit={handleSubmit} ...>
```

```jsx
async function handleSubmit(e) {
  e.preventDefault();
  if (!isFormValid || isSending) return;
  // ...
}
```

## Gestion des événements Vue

En Vue, j'utilise la directive v-on, la plupart du temps sous sa forme raccourcie @click ou @submit.
Je peux référencer une méthode ou écrire une petite expression directement dans le template. Pour le même formulaire de contact, le modificateur .prevent fait le travail de preventDefault directement dans le template, donc ma fonction handleSubmit n'a même pas besoin de l'appeler :

```vue
<form @submit.prevent="handleSubmit" ...>
```

## Similitudes et différences

Dans les deux cas, je passe une référence de fonction, pas un appel immédiat, mais la manière d'empêcher le rechargement de la page diffère : en React je dois appeler e.preventDefault() moi-même dans la fonction, alors qu'en Vue le modificateur .prevent le fait directement dans le template.
La différence est surtout syntaxique pour le reste : en JSX le gestionnaire ressemble à une prop normale, en Vue c'est une directive à part. Le raccourci @ de Vue rend aussi plus simple d'écrire un petit handler direct dans le template sans créer une fonction séparée juste pour ça.

## Structure du projet React

Mon projet React est organisé avec src/App.jsx, src/main.jsx, src/global.css, et un dossier components/ divisé en layout/ (Header, Footer), cards/ (FeatureCard, StatCard), ui/ (Brand, Button, SectionBadge, SectionTitle), plus InsightCard.jsx et StepItem.jsx à la racine.
Les sections de page sont dans sections/ (About, Features, Insights, Contact, et un composant Hero), les données dans data/ (features, insights, steps), et services/insightsService.js gère la récupération des données.

## Structure du projet Vue

J'ai gardé exactement la même structure côté Vue, mêmes noms de dossiers et de composants, seule l'extension change de .jsx à .vue. Le point d'entrée est main.js et le composant racine App.vue.

## Similitudes et différences

Les deux structures sont quasiment identiques, c'était voulu dès le départ pour garder les mêmes fonctionnalités et la même UX pendant la migration.
La seule vraie différence structurelle, c'est que j'ai dû désactiver la règle ESLint vue/multi-word-component-names pour garder des noms de composants à un seul mot comme Hero ou Brand, identiques à React, sinon le linter de Vue voulait m'imposer des noms à plusieurs mots.

## Outils IA utilisés

J'ai utilisé Claude Code pendant la migration, pour générer la version Vue de chaque composant à partir de sa source React, pour m'aider à déboguer les erreurs de build et de lint, et pour comprendre les nouveaux concepts au fur et à mesure.

## Ce qui a bien fonctionné

L'IA a été efficace sur les composants simples et surtout présentationnels, en particulier ceux de ui/ (Brand, Button, SectionBadge, SectionTitle) et de cards/, où il n'y avait pas beaucoup de logique et où le travail consistait surtout à transformer le JSX en template Vue en gardant les mêmes classes Tailwind.
J'ai suivi un ordre de migration précis : data/ vers services/ vers ui/ vers cards/ vers layout/ vers Hero vers sections vers App.vue vers main.js. Ça m'a permis de m'appuyer à chaque étape sur des composants déjà migrés et déjà vérifiés, donc moins d'erreurs qui s'accumulent.

## Ce qui a nécessité des corrections manuelles

Tous les fichiers générés n'étaient pas bons du premier coup. J'ai dû corriger à la main une balise `<a>` tronquée, à la fois dans Header.vue et Footer.vue, et une erreur de syntaxe dans Brand.vue où il y avait un point-virgule à la place d'une virgule dans un objet.
Aucune de ces erreurs ne plantait de façon évidente, je les ai trouvées en lançant npm run build et npm run lint et en lisant attentivement ce qu'ils me sortaient, et pour la balise tronquée en vérifiant visuellement la navigation dans le navigateur.

## Leçons tirées

La leçon principale, c'est qu'il faut vraiment lire et comprendre le code généré, pas juste faire confiance parce que le build passe. La balise tronquée par exemple n'a été repérée qu'en vérifiant visuellement la page, ni le lint ni le build ne l'avaient détectée.
Suivre l'ordre des dépendances a aussi rendu le débogage plus simple : une erreur trouvée dans un composant ui/ était corrigée une seule fois, au lieu d'être recopiée dans chaque carte et section qui l'utilisait ensuite.
