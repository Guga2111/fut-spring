import { Star, Camera, ImageUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import defaultAvatar from "/public/rashford-celebration.jpg";
import EditProfile from "./EditProfile";
import { API_BASE_URL } from "../../../config";
import axiosInstance from "../../../api/axiosInstance";

export default function PersonalArea({ user }) {
  const [isUploading, setIsUploading] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.image || null);
  const [backgroundImage, setBackgroundImage] = useState(
    user?.backgroundImage || null
  );
  const [isUploadingBg, setIsUploadingBg] = useState(false);

  const getImageSrc = (filename) => {
    if (!filename) return "/default-avatar.jpg";
    return `${API_BASE_URL}/user/images/${filename}`;
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("imageType", "profile");
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        alert("You must be logged in to change your profile picture");
        return;
      }
      const response = await axiosInstance.put(
        `/user/image/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProfileImage(response.data.image);
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
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        alert("You must be logged in to change your background image");
        return;
      }
      const response = await axiosInstance.put(
        `/user/image/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setBackgroundImage(response.data.backgroundImage);
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

  if (!user) {
    return (
      <div>
        <h1>User not found...</h1>
      </div>
    );
  }

  return (
    <div className="w-full !font-[system-ui,Avenir,Helvetica,Arial,sans-serif]">
      {/* --- Seção do Background --- */}
      <div className="relative w-full h-[200px] sm:h-[300px] rounded-b-xl overflow-hidden group">
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

      {/* --- Seção de Conteúdo Principal (Avatar, Infos e Botões) --- */}
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Container principal alterado para alinhar verticalmente ao centro em telas médias+ */}
        <div className="relative flex flex-col md:flex-row items-center md:items-center md:-mt-12"> {/* <-- A MUDANÇA ESTÁ AQUI */}
          
          {/* --- Avatar --- */}
          <div className="relative w-[140px] h-[140px] sm:w-[168px] sm:h-[168px] flex-shrink-0 -mt-[84px]">
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

          {/* --- Container para Nome de Usuário e Botões --- */}
          <div className="w-full flex-grow flex flex-col md:flex-row justify-between items-center md:ml-6 mt-4 md:mt-0">
            
            {/* Nome e Posição */}
            <div>
              <h2 className="text-2xl font-extrabold">{user.username}</h2>
              <h4 className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mt-1">
                {user.position}
              </h4>
            </div>

            {/* --- Botões de Ação --- */}
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <EditProfile user={user}></EditProfile>

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
      </div>
    </div>
  );
}

