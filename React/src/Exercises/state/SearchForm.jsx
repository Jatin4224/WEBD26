import React from "react";

function SearchForm() {
  const [searchTerm, setSearchTerm] = React.useState("cats!");

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 shadow-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-white">
            Search Something
          </h1>

          <p className="text-sm text-zinc-400 mt-2">
            Clean minimal search experience
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="search-input"
              className="block text-sm text-zinc-400 mb-2"
            >
              Search
            </label>

            <input
              type="text"
              id="search-input"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              placeholder="Search here..."
              className="w-full h-12 rounded-2xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-zinc-500 outline-none focus:border-zinc-400 transition-all"
            />
          </div>
        </form>

        <div className="mt-6 rounded-2xl bg-white/5 border border-white/10 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2">
            Current Value
          </p>

          <p className="text-lg text-white break-words">{searchTerm}</p>
        </div>

        <button
          onClick={() => setSearchTerm(Math.random().toString())}
          className="w-full mt-6 h-12 rounded-2xl bg-white text-black font-medium hover:scale-[1.01] active:scale-95 transition-all"
        >
          Generate Random Value
        </button>
      </div>
    </div>
  );
}

export default SearchForm;
