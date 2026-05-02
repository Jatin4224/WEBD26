function AvatarCard({ avatar, level = "rookie" }) {
  return (
    <article className="bg-zinc-800 text-white p-4 rounded-xl shadow-md border border-zinc-700 hover:scale-105 transition-all duration-300">
      <div className="flex items-center gap-4">
        {/* Initial Circle */}
        <div className="w-12 h-12 rounded-full bg-yellow-500 text-black font-bold flex items-center justify-center text-lg uppercase">
          {avatar.name.charAt(0)}
        </div>

        {/* Author Info */}
        <div>
          <h2 className="text-lg font-semibold">{avatar.name}</h2>
          <p className="text-sm text-gray-400">Born: {avatar.birth_year}</p>
          <span className="text-xs text-green-400 uppercase tracking-wider">
            {level}
          </span>
        </div>
      </div>
    </article>
  );
}

export default AvatarCard;
