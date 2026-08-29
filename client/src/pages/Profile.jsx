import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  Mail,
  User,
  Save,
  Trash2,
  LogOut,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import api from "../api/axios";

export default function Profile() {
  const navigate = useNavigate();

  // =========================
  // STATES
  // =========================

  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Dedicated avatar URL state
  const [avatarUrl, setAvatarUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // =========================
  // GET USER PROFILE
  // =========================

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/profile");

        const userData = res.data.user;

        console.log("PROFILE USER:", userData);
        console.log("PROFILE AVATAR:", userData?.avatar);

        setUser(userData);
        setName(userData.name || "");
        setEmail(userData.email || "");

        // Set saved avatar if it exists
        if (userData?.avatar) {
          setAvatarUrl(userData.avatar);
        }

        // Update localStorage
        localStorage.setItem(
          "user",
          JSON.stringify(userData)
        );
      } catch (error) {
        console.error("Profile Error:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // =========================
  // AVATAR UPLOAD
  // =========================

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    // Check file size
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5MB.");
      return;
    }

    try {
      setUploading(true);

      // ==================================
      // SHOW SELECTED IMAGE IMMEDIATELY
      // ==================================

      const localPreview = URL.createObjectURL(file);

      setAvatarUrl(localPreview);

      // ==================================
      // CREATE FORM DATA
      // ==================================

      const formData = new FormData();

      formData.append("avatar", file);

      // ==================================
      // UPLOAD TO BACKEND
      // ==================================

      const res = await api.post(
        "/users/profile/avatar",
        formData
      );

      console.log("FULL AVATAR RESPONSE:", res.data);
      console.log("CLOUDINARY URL:", res.data?.avatar);

      // ==================================
      // GET CLOUDINARY URL
      // ==================================

      const cloudinaryUrl = res.data?.avatar;

      if (!cloudinaryUrl) {
        throw new Error(
          "Backend did not return an avatar URL."
        );
      }

      // ==================================
      // SAVE CLOUDINARY URL IN STATE
      // ==================================

      setAvatarUrl(cloudinaryUrl);

      // ==================================
      // UPDATE USER OBJECT
      // ==================================

      const updatedUser = {
        ...res.data.user,
        avatar: cloudinaryUrl,
      };

      setUser(updatedUser);

      // ==================================
      // UPDATE LOCAL STORAGE
      // ==================================

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      console.log(
        "Avatar saved successfully:",
        cloudinaryUrl
      );

      alert("Profile picture updated successfully!");

    } catch (error) {
      console.error("Avatar Upload Error:", error);

      // Don't remove the image if backend failed
      // until we know what happened.
      console.error(
        "Response:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to upload profile picture."
      );

    } finally {
      setUploading(false);

      // Reset input so same image can be selected again
      e.target.value = "";
    }
  };

  // =========================
  // UPDATE PROFILE
  // =========================

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      alert("Name and email are required.");
      return;
    }

    try {
      setSaving(true);

      const res = await api.put("/users/profile", {
        name,
        email,
      });

      const updatedUser = res.data.user;

      // Preserve current avatar
      const finalUser = {
        ...updatedUser,
        avatar: avatarUrl || updatedUser?.avatar,
      };

      setUser(finalUser);

      // Update localStorage
      localStorage.setItem(
        "user",
        JSON.stringify(finalUser)
      );

      alert("Profile updated successfully!");

    } catch (error) {
      console.error("Update Profile Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update profile."
      );

    } finally {
      setSaving(false);
    }
  };

  // =========================
  // DELETE ACCOUNT
  // =========================

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      setDeleting(true);

      await api.delete("/users/profile");

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      alert("Your account has been deleted.");

      navigate("/login");

    } catch (error) {
      console.error("Delete Account Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete account."
      );

    } finally {
      setDeleting(false);
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // =========================
  // LOADING SCREEN
  // =========================

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  // =========================
  // USER INITIAL
  // =========================

  const userInitial =
    user?.name?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "U";

  // =========================
  // UI
  // =========================

  return (
    <div className="min-h-screen px-6 py-12">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >

        {/* =========================
            PAGE HEADER
        ========================= */}

        <div className="mb-8">

          <h1 className="text-3xl sm:text-4xl font-display font-semibold text-white">
            My Profile
          </h1>

          <p className="text-white/40 mt-2">
            Manage your HorizonX account and profile.
          </p>

        </div>

        {/* =========================
            PROFILE CARD
        ========================= */}

        <div className="glass border border-border rounded-2xl p-6 sm:p-8">

          {/* =========================
              AVATAR
          ========================= */}

          <div className="flex flex-col items-center mb-10">

            <div className="relative">

              {/* Avatar Circle */}

              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl">

                {avatarUrl ? (

                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onLoad={() => {
                      console.log(
                        "AVATAR IMAGE LOADED:",
                        avatarUrl
                      );
                    }}
                    onError={(e) => {
                      console.error(
                        "AVATAR IMAGE FAILED:",
                        avatarUrl
                      );

                      console.error(
                        "IMAGE ERROR:",
                        e
                      );
                    }}
                  />

                ) : (

                  <span className="text-5xl font-bold text-white">
                    {userInitial}
                  </span>

                )}

              </div>

              {/* Camera Button */}

              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 w-11 h-11 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center cursor-pointer border-4 border-[#0b1020] transition-all duration-300 hover:scale-105"
              >

                {uploading ? (

                  <Loader2 className="w-5 h-5 text-white animate-spin" />

                ) : (

                  <Camera className="w-5 h-5 text-white" />

                )}

              </label>

              {/* File Input */}

              <input
                id="avatar-upload"
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleAvatarChange}
                className="hidden"
                disabled={uploading}
              />

            </div>

            <p className="text-xs text-white/40 mt-4">

              {uploading
                ? "Uploading your photo..."
                : "Click the camera icon to change your photo"}

            </p>

            <p className="text-sm text-white mt-3">
              {user?.name}
            </p>

          </div>

          {/* =========================
              PROFILE FORM
          ========================= */}

          <form
            onSubmit={handleUpdateProfile}
            className="space-y-6"
          >

            {/* NAME */}

            <div>

              <label className="block text-sm text-white/60 mb-2">
                Name
              </label>

              <div className="relative">

                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Your name"
                  className="w-full bg-white/5 border border-border rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-400 transition-colors"
                />

              </div>

            </div>

            {/* EMAIL */}

            <div>

              <label className="block text-sm text-white/60 mb-2">
                Email
              </label>

              <div className="relative">

                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Your email"
                  className="w-full bg-white/5 border border-border rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-400 transition-colors"
                />

              </div>

            </div>

            {/* SAVE BUTTON */}

            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >

              {saving ? (

                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>

              ) : (

                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>

              )}

            </button>

          </form>

          {/* =========================
              ACCOUNT ACTIONS
          ========================= */}

          <div className="mt-10 pt-8 border-t border-border">

            <h2 className="text-lg font-medium text-white mb-4">
              Account
            </h2>

            {/* LOGOUT */}

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-all"
            >

              <LogOut className="w-4 h-4" />

              Logout

            </button>

            {/* DELETE */}

            <button
              onClick={handleDeleteAccount}
              disabled={deleting}
              className="w-full mt-3 flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
            >

              {deleting ? (

                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Deleting...
                </>

              ) : (

                <>
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </>

              )}

            </button>

          </div>

        </div>

      </motion.div>

    </div>
  );
}