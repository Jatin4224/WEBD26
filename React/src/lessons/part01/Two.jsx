import React from "react";

const books = [
  {
    _id: 1,
    title: "The Great Gatsby",
    author_id: 100,
    genre: "Classic",
  },
  {
    _id: 2,
    title: "Nineteen Eighty-Four",
    author_id: 101,
    genre: "Dystopian",
  },
  {
    _id: 3,
    title: "To Kill a Mockingbird",
    author_id: 102,
    genre: "Classic",
  },
];

const Two = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-800 p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {books.map((book, index) => (
          <div
            key={index}
            className="bg-[#f8f1d4] text-black rounded-xl shadow-2xl p-6 border-4 border-yellow-900 hover:scale-105 transition-all duration-300 relative"
          >
            {/* Book Spine Effect */}
            <div className="absolute left-0 top-0 h-full w-3 bg-yellow-800 rounded-l-xl"></div>

            {/* Book Content */}
            <h2 className="text-xl font-bold mb-3 border-b-2 border-yellow-700 pb-2">
              {book.title}
            </h2>

            <p className="text-sm uppercase tracking-widest text-gray-700 mb-2">
              {book.genre}
            </p>

            <p className="text-sm text-gray-600 italic">
              A timeless collection from your library.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Two;
