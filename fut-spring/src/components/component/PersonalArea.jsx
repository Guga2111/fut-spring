import { Star, Camera } from "lucide-react";
import { UserRoundPen } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function PersonalArea({ user }) {
  const [isUploading, setIsUploading] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.image || null);

  const getImageSrc = (filename) => {
    if (!filename) return "/default-avatar.jpg";
    return `http://localhost:8080/user/images/${filename}`;
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);

      // Create form data
      const formData = new FormData();
      formData.append("image", file);

      // Get JWT from localStorage
      const token = localStorage.getItem("jwt");

      if (!token) {
        alert("You must be logged in to change your profile picture");
        setIsUploading(false);
        return;
      }

      // Send request to server using axios
      const response = await axios.put(
        `http://localhost:8080/user/image/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Axios will set the correct boundary
          },
        }
      );

      // Axios automatically handles JSON parsing
      const updatedUser = response.data;

      // Update profile image in state with the response from server
      setProfileImage(updatedUser.image);
    } catch (error) {
      console.error("Error updating profile image:", error);
      alert("Failed to update profile image");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    // Atualiza o estado local quando a prop user.image mudar
    setProfileImage(user?.image || null);
  }, [user?.image]);

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

      {/* Profile picture container */}
      <div className="absolute -bottom-[30px] left-10">
        {/* Main profile image container */}
        <div className="relative w-[168px] h-[168px]">
          <div className="w-full h-full rounded-full border-4 border-white overflow-hidden">
            <img
              src={
                profileImage
                  ? getImageSrc(profileImage)
                  : "/public/rashford-celebration.jpg"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Camera button - positioned with absolute and properly sized */}
          <div className="absolute bottom-2 right-2 z-10">
            <label
              htmlFor="profile-image-upload"
              className="block w-9 h-9 bg-gray-200 hover:bg-gray-300 rounded-full cursor-pointer flex items-center justify-center shadow-md transition-colors duration-200"
            >
              <Camera size={20} className="text-gray-700" />
            </label>
            <input
              type="file"
              id="profile-image-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isUploading}
            />
          </div>

          {/* Loading indicator */}
          {isUploading && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-full">
              <div className="w-8 h-8 border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>

      {/* Username positioned outside the cover image */}
      <div className="mr-[850px] mt-2 pt-2 relative">
        <div className="grid justify-center gap-4">
          <h2 className="text-2xl font-bold">{user.username}</h2>

          <h3 className="text-yellow-500 flex items-center gap-1">
            <Star></Star>
            <div className="font-extrabold">{user.stars}</div>
          </h3>
        </div>

        {/* Button positioned absolutely to the right */}
        <div className="absolute right-[-800px] top-0 ">
          <Button className="!bg-green-600 !text-white hover:!bg-green-700 hover:!border-white">
            <UserRoundPen className="mr-2" /> Change Background
          </Button>
        </div>
      </div>
    </div>
  );
}
