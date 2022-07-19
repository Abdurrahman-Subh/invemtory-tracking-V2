import { useContext, useState } from "react";
import { BooksContext } from "../../context/BooksContext";
import "./widgetLg.css";
import { Link } from "react-router-dom";
import { Print, Update, Visibility } from "@material-ui/icons";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import styled from "styled-components";
const Option = styled.option`
  text-align: start;
`;
const Select = styled.select`
  /* Reset */
  appearance: none;
  border: 0;
  outline: 0;
  font-size: 1rem;
  /* Personalize */
  width: 12em;
  height: 1.6em;
  padding: 0 4em 0 1em;
  background-image: linear-gradient(45deg, transparent 50%, #c4c4c4 50%),
    linear-gradient(135deg, #c4c4c4 50%, transparent 50%),
    linear-gradient(90deg, rgba(215, 44, 43, 1) 0%, rgba(245, 86, 85, 1) 85%);
  background-position: calc(100% - 20px) calc(1em + -4px),
    calc(100% - 15px) calc(1em + -4px), 100% 0;
  background-size: 5px 5px, 5px 5px, 2.5em 2.5em;
  background-repeat: no-repeat;
  color: #000;
  border-radius: 0.25em;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;
export default function WidgetLg() {
  const { latestBooks } = useContext(BooksContext);
  const [newDurum, setNewDurum] = useState([]);
  const handleUpdate = async (id) => {
    const taskDocRef = doc(db, "books", id);
    try {
      await updateDoc(taskDocRef, {
        durum: parseInt(newDurum),
      });
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(newDurum);
  return (
    <div className="widgetLg in-left">
      <h3 className="widgetLgTitle">Son 20 Sipariş</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Müşteri</th>
          <th className="widgetLgTh">Tarih</th>
          <th className="widgetLgTh">Kapora</th>
          <th className="widgetLgTh">Durum</th>
          <th className="widgetLgTh">İşlemler</th>
        </tr>
        {latestBooks.map((book) => {
          return (
            <tr className="widgetLgTr" key={book.id}>
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
              <td>
                <Link to={`/yazdir/${book.id}`}>
                  <button className="widgetSmButton">
                    <Print className="widgetSmIcon" />
                    Yazdır
                  </button>
                </Link>
              </td>
              <td>
                <Select onChange={(e) => setNewDurum(e.target.value)}>
                  <Option value={newDurum} hidden></Option>
                  <Option value={0}>Bekliyor</Option>
                  <Option value={1}>Tamamla</Option>
                  <Option value={2}>İptal Et</Option>
                </Select>
              </td>
              <td>
                <button
                  onClick={() => handleUpdate(book.id)}
                  className="widgetSmButton"
                >
                  <Update className="widgetSmIcon" />
                  Güncelle
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
