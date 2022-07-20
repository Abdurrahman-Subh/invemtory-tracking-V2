import {
  CalendarToday,
  LocationSearching,
  PermIdentity,
  PhoneAndroid,
  Book,
  Store,
  Money,
} from "@material-ui/icons";
import { doc, updateDoc } from "firebase/firestore";
import { useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BooksContext } from "../../context/BooksContext";
import { db } from "../../firebase";
import "./user.css";
import styled from "styled-components";
import { useReactToPrint } from "react-to-print";
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
export default function User() {
  const { books, navigate } = useContext(BooksContext);
  const { id } = useParams();
  const userList = books
    .filter((item) => item.id === id)
    .map((item) => {
      return item;
    });
  const [newBookName, setNewBookName] = useState(
    books.filter((item) => item.id === id).map((item) => item.name)
  );
  const [newInsurance, setNewInsurance] = useState(
    books.filter((item) => item.id === id).map((item) => item.insurance)
  );
  const [user, setNewUser] = useState(
    books.filter((item) => item.id === id).map((item) => item.user)
  );
  const [newSeller, setNewSeller] = useState(
    books.filter((item) => item.id === id).map((item) => item.seller)
  );
  const [newBuyer, setNewBuyer] = useState(
    books.filter((item) => item.id === id).map((item) => item.buyer)
  );
  const [newPhone, setNewPhone] = useState(
    books.filter((item) => item.id === id).map((item) => item.phone)
  );
  const [newDurum, setNewDurum] = useState(
    books.filter((item) => item.id === id).map((item) => item.durum)
  );
  // const handleConfirm = (e) => {
  //   setNewDone([true]);
  //   e.currentTarget.disabled = true;
  // };
  // console.log(newDone);
  // const handleDecline = (e) => {
  //   setNewDone([false]);
  //   e.currentTarget.disabled = true;
  // };
  /* function to update firestore */
  const handleUpdate = async (e) => {
    e.preventDefault();
    const taskDocRef = doc(db, "books", id);
    try {
      await updateDoc(taskDocRef, {
        name: newBookName.toString(),
        insurance: parseInt(newInsurance),
        phone: parseInt(newPhone),
        user: user.toString(),
        buyer: newBuyer.toString(),
        seller: newSeller.toString(),
        durum: parseInt(newDurum[0]),
        edited: new Date(),
      });
      navigate("/siparisler");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Sipariş Düzenle</h1>
        <Link to="/yeni-siparis">
          <button className="userAddButton">Yeni Sipariş Oluştur</button>
        </Link>
        <Link to={`/yazdir/${id}`}>
          <button className="userPrintButton">Yazdır</button>
        </Link>
      </div>
      {userList.map((item) => (
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <div>
                <div className="userShowBottom">
                  <span className="userShowTitle">Sipariş Bilgileri</span>
                  <div className="userShowInfo">
                    <PermIdentity className="userShowIcon" />
                    &nbsp;&nbsp;&nbsp;
                    <span className="userShowUsername">
                      Müşteri Adı: {item.buyer}
                    </span>
                  </div>
                  <div className="userShowInfo">
                    <Book className="userShowIcon" />
                    <span className="userShowInfoTitle">
                      Kitap Adı: {item.name}
                    </span>
                  </div>

                  <div className="userShowInfo">
                    <CalendarToday className="userShowIcon" />
                    <span className="userShowInfoTitle">
                      Ne Zaman Sipariş Edildi:{" "}
                      {new Date(
                        item.createdAt.seconds * 1000
                      ).toLocaleDateString("en-UK")}
                    </span>
                  </div>
                  <div className="userShowInfo">
                    <CalendarToday className="userShowIcon" />
                    <span className="userShowInfoTitle">
                      Son Güncelleme Tarihi:{" "}
                      {new Date(item.edited?.seconds * 1000).toLocaleDateString(
                        "en-UK"
                      )}
                    </span>
                  </div>
                  <div className="userShowInfo">
                    <PhoneAndroid className="userShowIcon" />
                    <span className="userShowInfoTitle">
                      Telefon NO: 0{item.phone}
                    </span>
                  </div>
                  <div className="userShowInfo">
                    <Store className="userShowIcon" />
                    <span className="userShowInfoTitle">
                      Nerde Sipariş Edildi: {item.seller}
                    </span>
                  </div>
                  <div className="userShowInfo">
                    <Money className="userShowIcon" />
                    <span className="userShowInfoTitle">
                      Kapora: {item.insurance}
                    </span>
                  </div>
                  <div className="userShowInfo">
                    <LocationSearching className="userShowIcon" />
                    {item.durum === 0 ? (
                      <span className="userShowInfoTitle durum">
                        Sipariş Alındı
                      </span>
                    ) : item.durum === 1 ? (
                      <span className="userShowInfoTitle durum">
                        Tamamlandı
                      </span>
                    ) : (
                      <span className="userShowInfoTitle durum">
                        İptal Edildi
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <div className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Müşteri Adı</label>
                  <input
                    type="text"
                    className="userUpdateInput"
                    value={newBuyer}
                    onChange={(e) => setNewBuyer(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Kitap Adı</label>
                  <input
                    type="text"
                    className="userUpdateInput"
                    value={newBookName}
                    onChange={(e) => setNewBookName(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Müşteri Numarası</label>
                  <input
                    type="number"
                    className="userUpdateInput"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Satıcı</label>
                  <Select onChange={(e) => setNewSeller(e.target.value)}>
                    <Option value={newSeller} hidden>
                      {newSeller}
                    </Option>
                    <Option value="Derya">Derya</Option>
                    <Option value="Başarı">Başarı</Option>
                    <Option value="Kida">Kida</Option>
                  </Select>
                </div>
                <div className="userUpdateItem">
                  <label>Sipraiş Eden Kişi</label>
                  <Select onChange={(e) => setNewUser(e.target.value)}>
                    <Option value={user} hidden>
                      {user}
                    </Option>
                    <Option value="Elif">Elif</Option>
                    <Option value="Ramazan">Ramazan</Option>
                    <Option value="Güngör">Güngör</Option>
                    <Option value="Emre">Emre</Option>
                    <Option value="Kübra">Kübra</Option>
                    <Option value="Çağla">Çağla</Option>
                  </Select>
                </div>

                <div className="userUpdateItem">
                  <label>Kapora</label>
                  <input
                    type="number"
                    className="userUpdateInput"
                    value={newInsurance}
                    onChange={(e) => setNewInsurance(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Sipraiş Durumu</label>
                  <Select onChange={(e) => setNewDurum(e.target.value)}>
                    <Option value={newDurum} hidden></Option>
                    <Option value={0}>Bekliyor</Option>
                    <Option value={1}>Tamamla</Option>
                    <Option value={2}>İptal Et</Option>
                  </Select>
                </div>
                {/* {item.done ? (
                  <div className="userUpdateItem">
                    <button className="orderDecButton" onClick={handleDecline}>
                      Tamamlama
                    </button>
                  </div>
                ) : (
                  <div className="userUpdateItem">
                    <button
                      className="orderConfirmButton"
                      onClick={handleConfirm}
                    >
                      Tamamla
                    </button>
                  </div>
                )} */}
              </div>
              <div className="userUpdateRight">
                <button className="userUpdateButton" onClick={handleUpdate}>
                  Güncelle
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
