import { Star, Camera } from "lucide-react";
import { UserRoundPen } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageUp } from "lucide-react";
import defaultAvatar from "/public/rashford-celebration.jpg";
import axios from "axios";

export default function PersonalArea({ user }) {
  const [isUploading, setIsUploading] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.image || null);
  const [backgroundImage, setBackgroundImage] = useState(
    user?.backgroundImage || null
  );
  const [isUploadingBg, setIsUploadingBg] = useState(false);

  const getImageSrc = (filename) => {
    if (!filename) return "/default-avatar.jpg";
    return `http://localhost:8080/user/images/${filename}`;
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("image", file);
      formData.append("imageType", "profile");

      const token = localStorage.getItem("jwt");

      if (!token) {
        alert("You must be logged in to change your profile picture");
        setIsUploading(false);
        return;
      }

      const response = await axios.put(
        `http://localhost:8080/user/image/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedUser = response.data;

      setProfileImage(updatedUser.image);
    } catch (error) {
      console.error("Error updating profile image:", error);
      alert("Failed to update profile image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleBackgroundChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploadingBg(true);

      const formData = new FormData();
      formData.append("image", file);
      formData.append("imageType", "background");

      const token = localStorage.getItem("jwt");
      if (!token) {
        alert("You must be logged in to change your background image");
        setIsUploadingBg(false);
        return;
      }

      const response = await axios.put(
        `http://localhost:8080/user/image/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedUser = response.data;
      setBackgroundImage(updatedUser.backgroundImage);
    } catch (error) {
      console.error("Error updating background image:", error);
      alert("Failed to update background image");
    } finally {
      setIsUploadingBg(false);
    }
  };

  useEffect(() => {
    setProfileImage(
      user?.image && user.image.trim() !== "" ? user.image : null
    );
  }, [user?.image]);

  useEffect(() => {
    setBackgroundImage(
      user?.backgroundImage && user.backgroundImage.trim() !== ""
        ? user.backgroundImage
        : null
    );
  }, [user?.backgroundImage]);

  if (user === null) {
    return (
      <div>
        <h1>User not found...</h1>
      </div>
    );
  }

  console.log(backgroundImage);

  return (
    <div className="relative w-full !font-[system-ui,Avenir,Helvetica,Arial,sans-serif]">
      <div className="relative w-full h-[350px] rounded-b-xl overflow-hidden group">
        <img
          src={
            backgroundImage && backgroundImage.trim() !== ""
              ? getImageSrc(backgroundImage)
              : "/public/backgroundbalotelli.jpg"
          }
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {isUploadingBg && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <div className="absolute inset-0 bg-black/30 opacity-0 rounded-b-xl group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"></div>
      </div>

      <div className="absolute -bottom-[30px] left-10">
        <div className="relative w-[168px] h-[168px]">
          <div className="w-full h-full rounded-full border-4 border-white overflow-hidden">
            <img
              src={
                profileImage && profileImage.trim() !== ""
                  ? getImageSrc(profileImage)
                  : defaultAvatar
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

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

          {isUploading && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-full">
              <div className="w-8 h-8 border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>

      <div className="mr-[850px] mt-2 pt-2 relative">
        <div className="grid justify-center gap-4">
          <h2 className="text-2xl font-bold">{user.username}</h2>

          <h3 className="text-yellow-500 flex items-center gap-1">
            <Star></Star>
            <div className="font-extrabold">{user.stars}</div>
          </h3>
        </div>

        <div className="absolute right-[-800px] top-0 flex items-center gap-2">
          <Button className=" !text-white hover:!bg-neutral-800 hover:!border-white">
            <UserRoundPen className="mr-2" /> Edit Profile
          </Button>
          <Button
            className="!bg-green-600 !text-white hover:!bg-green-700 hover:!border-white"
            onClick={() =>
              document.getElementById("background-image-upload").click()
            }
            disabled={isUploadingBg}
          >
            <ImageUp className="mr-2" /> Change Background
          </Button>
          <input
            type="file"
            id="background-image-upload"
            className="hidden"
            accept="image/*"
            onChange={handleBackgroundChange}
            disabled={isUploadingBg}
          />
        </div>
      </div>
    </div>
  );
}
