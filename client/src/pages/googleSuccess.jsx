import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleSuccess() {

  const navigate = useNavigate();

  useEffect(() => {

    const params = new URLSearchParams(
      window.location.search
    );

    const token = params.get("token");

    if (token) {

      localStorage.setItem(
        "token",
        token
      );

      console.log(
        "Google login successful"
      );

      navigate("/");

    } else {

      console.log(
        "Google token not found"
      );

      navigate("/signup");

    }

  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">

      <div className="text-center">

        <h1 className="text-xl font-semibold">
          Signing you in...
        </h1>

        <p className="text-white/50 mt-2">
          Please wait
        </p>

      </div>

    </div>
  );
}