import "./home.css";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
export default function Home() {
  return (
    <div className="home">
      <FeaturedInfo />
      <div className="homeWidgets">
        <WidgetLg />
      </div>
    </div>
  );
}
