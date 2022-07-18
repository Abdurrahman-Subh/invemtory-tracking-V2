import { useContext } from "react";
import { BooksContext } from "../../context/BooksContext";
import "./widgetLg.css";
import { Link } from "react-router-dom";
import { Visibility } from "@material-ui/icons";

export default function WidgetLg() {
  const { latestBooks } = useContext(BooksContext);

  return (
    <div className="widgetLg in-left">
      <h3 className="widgetLgTitle">Son Siparişler</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Müşteri</th>
          <th className="widgetLgTh">Tarih</th>
          <th className="widgetLgTh">Kapora</th>
          <th className="widgetLgTh">Durum</th>
          <th className="widgetLgTh">Akisyon</th>
        </tr>
        {latestBooks.map((book) => {
          return (
            <tr className="widgetLgTr">
              <td className="widgetLgUser">
                <span className="widgetLgName">{book.buyer}</span>
              </td>
              <td className="widgetLgDate">
                {new Date(book.createdAt.seconds * 1000).toLocaleDateString(
                  "en-UK"
                )}
              </td>
              <td className="widgetLgAmount">{book.insurance} TL</td>
              <td className="widgetLgStatus">
                {book.durum === 1 ? (
                  <button className="widgetLgButtonApp widgetLgButton">
                    Sipariş Tamamlandı
                  </button>
                ) : book.durum === 2 ? (
                  <button className="widgetLgButtonDec widgetLgButton">
                    Sipariş İptal Edildi
                  </button>
                ) : (
                  <button className="widgetLgButtonPen widgetLgButton">
                    Sipariş Bekleniyor
                  </button>
                )}
              </td>
              <td>
                <Link to={`/siprais/${book.id}`}>
                  <button className="widgetSmButton">
                    <Visibility className="widgetSmIcon" />
                    Görüntüle
                  </button>
                </Link>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
