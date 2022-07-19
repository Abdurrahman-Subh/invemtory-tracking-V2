import React, { useContext, useState } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { BooksContext } from "../../context/BooksContext";
import { UserAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Topbar() {
  const { waitingBooks } = useContext(BooksContext);
  const { user, logout } = UserAuth();
  const handleLogout = async () => {
    try {
      await logout();
      console.log("You are logged out");
      window.location.reload(false);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className="topbar">
      <div className="topLeft">
        <span className="menuTitle">Hızlı Menü</span>
      </div>
      <div className="topbarWrapper">
        <span className="logo">Kitap Sipariş Takibi</span>

        <div className="topRight">
          <div className="topbarIconContainer">
            <Link to="/bekleyen-siparisler">
              <NotificationsNone
                style={{ color: "gray" }}
                className="iconNotif"
              />
            </Link>
            <span className="topIconBadge">{waitingBooks.length}</span>
          </div>
          <div className="topbarIconContainer">
            <img
              src="https://www.kayakirtasiye.com.tr/uploads/favicon.png"
              alt=""
              className="topAvatar"
            />
          </div>
          <div className="topbarIconContainer">
            <button className="logoutBtn" onClick={handleLogout}>
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
