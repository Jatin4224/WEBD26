import React from "react";
import AvatarCard from "../../components/AvatarCards";

const authors = [
  {
    _id: 100,
    name: "F. Scott Fitzgerald",
    birth_year: 1896,
    initials: "uhsdasadass",
  },
  {
    _id: 101,
    name: "George Orwell",
    birth_year: 1903,
    initials: "uhsdasadsas",
  },
  {
    _id: 102,
    name: "Harper Lee",
    birth_year: 1926,
    initials: "uhsdas",
  },
];

// Reusable Component
function Shell({ name, birth_year, children }) {
  return (
    <section className="border p-4 rounded-lg mb-4 bg-zinc-800">
      <p className="text-sm text-gray-400">Reusable Shell</p>
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-300">Born: {birth_year}</p>

      <div className="mt-2 text-yellow-400">{children}</div>
    </section>
  );
}

const Three = () => {
  return (
    <div className="text-white p-6">
      <section>
        <h1 className="text-2xl font-bold mb-6">Children in React</h1>

        <Shell name="Memo Example" birth_year="2024">
          Test Child Content
        </Shell>

        <div className="grid gap-4">
          {authors.map((author) => (
            <AvatarCard key={author._id} avatar={author} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Three;
