import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { GetCurrentUser } from "../api/users";
import { SetUser } from "../redux/userSlice";
import { message, Layout, Menu } from "antd";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Header, Content, Footer, Sider } = Layout;

  useEffect(() => {
    const getValidUser = async () => {
      try {
        dispatch(ShowLoading()); // loading = true
        const response = await GetCurrentUser();
        console.log(response);
        dispatch(SetUser(response.data));
        dispatch(HideLoading()); // loading = false
      } catch (error) {
        console.log(error);
        message.error(error.message);
        dispatch(HideLoading()); // loading = false
      }
    };
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, []);

  const navItems = [
    { label: "Home", icon: <HomeOutlined /> },
    {
      label: `${user ? user.name : ""}`,
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <span
              onClick={() => {
                if (user.role === "admin") {
                  navigate("/admin");
                } else if (user.role === "partner") {
                  navigate("/partner");
                } else {
                  navigate("/profile");
                }
              }}
            >
              My Profile
            </span>
          ),
          icon: <ProfileOutlined />,
        },
        {
          label: (
            <Link
              to="/login"
              onClick={() => {
                localStorage.removeItem("token");
              }}
            >
              Logout
            </Link>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  return (
    user && (
      <>
        <Layout>
          <Header
            className="justify-content-between"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3 className="text-white m-0">Book My Show</h3>
            <Menu items={navItems} theme="dark" mode="horizontal" />
          </Header>
          <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
            {children}
          </div>
        </Layout>
      </>
    )
  );
};

export default ProtectedRoute;
