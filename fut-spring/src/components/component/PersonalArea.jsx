export default function PersonalArea({ user }) {
  const getImageSrc = (filename) => {
    if (!filename) return "/default-avatar.jpg";
    return `http://localhost:8080/user/images/${filename}`;
  };

  if (user === null) {
    return (
      <div>
        <h1>User not found...</h1>
      </div>
    );
  }

  return (
    <div className="relative w-full !font-[system-ui,Avenir,Helvetica,Arial,sans-serif]">
      {/* Cover photo container with hover effect */}
      <div className="relative w-full h-[350px] rounded-b-xl overflow-hidden group">
        <img
          src={user?.coverImage || "/public/backgroundbalotelli.jpg"}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 rounded-b-xl group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"></div>
      </div>

      {/* Profile picture - moved more to the right and down */}
      <div className="absolute -bottom-[70px] left-10 w-[168px] h-[168px] rounded-full border-4 border-white overflow-hidden">
        <img
          src={user ? getImageSrc(user.image) : "/default-avatar.jpg"}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Username positioned outside the cover image */}
      <div className="mr-[850px] mt-2 pt-2">
        <h2 className="text-2xl font-bold">{user.username}</h2>
      </div>
    </div>
  );
}
