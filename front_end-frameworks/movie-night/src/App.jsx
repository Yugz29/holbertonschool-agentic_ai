import AppHeader from "./components/AppHeader.jsx";
import AppFooter from "./components/AppFooter.jsx";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <AppHeader favoritesCount={0} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 lg:px-8">
        <section className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Que voulez-vous regarder ce soir ?
          </h1>
          <p className="mt-3 text-lg text-slate-400">
            Parcourez, filtrez et gardez vos films préférés.
          </p>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

export default App;
