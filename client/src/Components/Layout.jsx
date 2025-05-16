import React, { useState, useEffect } from "react";
import SideBar from "./Sidebar/SideBar";
import MobileSideBar from "./Sidebar/MobileSideBar";
import { useQuery } from "@tanstack/react-query";
import Axioinstance from "../Api/AxiosInstance";
import { useAuthStore } from "../store/useAuthStore";
import Loader from "./ui/Loading";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  const { setUser, user } = useAuthStore();
  const { data, isLoading } = useQuery({
    queryKey: ["fetchUser"],
    queryFn: async () => {
      const res = await Axioinstance.get("/users/me");
      return res.data.user;
    },
  });

  useEffect(() => {
    if (data && !user) {
      setUser(data);
    }
  }, [data, user, setUser]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


useEffect(() => {
  if (!isLoading && (!data || !data.id)) {
    navigate("/login");
  }
}, [data, isLoading, navigate]);



  

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {isMobile ? (
        <MobileSideBar  />
      ) : (
        <SideBar  />
      )}

      <div className="flex-1 bg-[#040913] pb-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
