import "./sidebar.css";
import { LineStyle, Timeline, PermIdentity, Report } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Ana Sayfa
              </li>
            </Link>

            <Link to="/yeni-siparis" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Yeni Sipraiş Oluştur
              </li>
            </Link>
            <Link to="/bekleyen-siparisler" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Bekleyen Siparişler
              </li>
            </Link>
            <Link to="/siparisler" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Tüm Siparişler
              </li>
            </Link>
            <Link to="/tamamlanan-siparisler" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Tamamlanan Siparişler
              </li>
            </Link>
            <Link to="/iptal-siparisler" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                İptal Edilen Siparişler
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
