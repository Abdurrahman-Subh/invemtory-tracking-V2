import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Panel</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Ana Sayfa
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Hızlı Menü</h3>
          <ul className="sidebarList">
            <Link to="/yeni-siparis" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Yeni Sipraiş Oluştur
              </li>
            </Link>
            <Link to="/siparisler" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Siparişler
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

            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
