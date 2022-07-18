import "./newOrder.css";
import styled from "styled-components";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
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
  width: 24em;
  height: 2.4em;
  padding: 0 4em 0 1em;
  background-image: linear-gradient(45deg, transparent 50%, #c4c4c4 50%),
    linear-gradient(135deg, #c4c4c4 50%, transparent 50%),
    linear-gradient(90deg, rgba(215, 44, 43, 1) 0%, rgba(245, 86, 85, 1) 85%);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), 100% 0;
  background-size: 5px 5px, 5px 5px, 2.5em 2.5em;
  background-repeat: no-repeat;
  color: #000;
  border-radius: 0.25em;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;
export default function NewUser() {
  const [name, setName] = useState([]);
  const [query, setQuery] = useState("");
  const [number, setNumber] = useState();
  const [user, setUser] = useState("");
  const [insurance, setInsurance] = useState("");
  const [phone, setPhone] = useState("");
  const [seller, setSeller] = useState("");
  const [buyer, setBuyer] = useState("");
  const booksCollectionRef = collection(db, "books");
  const navigate = useNavigate();
  const createOrder = async (e) => {
    e.preventDefault();
    try {
      await addDoc(booksCollectionRef, {
        name: name,
        user: user.toString(),
        insurance: parseInt(insurance),
        seller: seller.toString(),
        buyer: buyer.toString(),
        phone: phone.toString(),
        sellerNumber: number.toString(),
        durum: 0,
        createdAt: new Date(),
      });
      navigate("/siparisler");
    } catch (err) {
      console.log(err);
    }
  };
  const addNewBook = () => {
    setName((name) => [...name, query]);
  };
  const updateQuery = ({ target }) => {
    // Update query onKeyPress of input box
    setQuery(target.value);
  };

  return (
    <div className="newUser">
      <div className="newContainer">
        <h1 className="newUserTitle">Yeni Sipariş Oluştur</h1>
        <h4 className="newUserTitle">Kitaplar:</h4>
        <ul>
          {name.map((book) => {
            return <li>{book}</li>;
          })}
        </ul>
        <div className="newUserForm">
          <div className="newUserItem">
            <label>Müşteri Adı</label>
            <input
              type="text"
              placeholder="Müşteri Adı Giriniz"
              onChange={(e) => setBuyer(e.target.value)}
            />
          </div>
          <div className="newUserItem">
            <label>Kitap Adı</label>
            <input
              type="text"
              placeholder="Kitap Adı Giriniz"
              onChange={updateQuery}
            />
          </div>
          <div className="newUserItem">
            <label>Müşteri Telefon Numarası</label>
            <input
              type="number"
              placeholder="0 Olmadan Müşteri Telefon Numarası Giriniz"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="newUserItem">
            <label>Nerden Sipariş Edildi</label>
            <Select onChange={(e) => setSeller(e.target.value)}>
              <Option value="" hidden>
                Seçiniz
              </Option>
              <Option value="Derya">Derya</Option>
              <Option value="Başarı">Başarı</Option>
              <Option value="Kida">Kida</Option>
            </Select>
          </div>
          <div className="newUserItem">
            <label>Kim Sipariş Etti</label>
            <Select onChange={(e) => setUser(e.target.value)}>
              <Option value="" hidden>
                Seçiniz
              </Option>
              <Option value="Elif">Elif</Option>
              <Option value="Ramazan">Ramazan</Option>
              <Option value="Güngör">Güngör</Option>
              <Option value="Emre">Emre</Option>
              <Option value="Kübra">Kübra</Option>
              <Option value="Çağla">Çağla</Option>
            </Select>
          </div>
          <div className="newUserItem">
            <label>Kapora</label>
            <input
              type="number"
              placeholder="Kapora Miktarı Giriniz"
              onChange={(e) => setInsurance(e.target.value)}
            />
          </div>
          <div className="newUserItem">
            <label>Bu Müşteri İçin Kaç Adet Kitap Sipariş Edildi</label>
            <input
              type="number"
              placeholder="Kitap Sayısı Giriniz"
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          {/* <h3>{name}</h3> */}
          {/* {showNewBook ? (
          <div className="newUserItem">
          <label>2. Kitap</label>
          <input
              type="text"
              placeholder="2. Kitap Giriniz"
              onChange={(e) => setName(name.push(e.target.value))}
              />
              </div>
              ) : (
          <h1></h1>
        )} */}
        </div>
        {/* <div className="newUserItem">
        <button className="newBookButton" onClick={addNewBook}>
        Aynı Müşteri İçin Farklı kitap Giriniz
        </button>
      </div> */}

        <div className="newUserItemBtn">
          <button className="newBookButton" onClick={addNewBook}>
            Kitap Ekle
          </button>
          <button className="newUserButton" onClick={createOrder}>
            Yeni Sipariş Oluştur
          </button>
        </div>
      </div>
    </div>
  );
}
