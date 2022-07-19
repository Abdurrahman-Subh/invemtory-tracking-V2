import {
  CalendarToday,
  LocationSearching,
  PermIdentity,
  PhoneAndroid,
  Book,
  Store,
  Money,
} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BooksContext } from "../../context/BooksContext";
import "./print.css";
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
export default function CustomerPrint() {
  const { books } = useContext(BooksContext);
  const { id } = useParams();
  const userList = books
    .filter((item) => item.id === id)
    .map((item) => {
      return item;
    });

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
  });
  return (
    <div className="user1">
      <div className="userTitleContainer1">
        <h1 className="userTitle">Fiş Yazdır</h1>
        <button className="userPrintButton" onClick={handlePrint}>
          Yazdır
        </button>
      </div>
      {userList.map((item) => (
        <div className="userContainer1" ref={componentRef}>
          <div className="userShow1">
            <div className="userShowTop">
              <div className="userShowBottom">
                <img
                  src="	https://www.kayakirtasiye.com.tr/skins/shared/images/logo.png"
                  alt=""
                />
                <span className="userShowTitle1">Sipariş Bilgileri</span>
                <div className="userShowInfo1">
                  <PermIdentity className="userShowIcon" />
                  &nbsp;&nbsp;&nbsp;
                  <span className="userShowUsername">
                    Müşteri Adı: {item.buyer}
                  </span>
                </div>
                <div className="userShowInfo">
                  <Book className="userShowIcon" />
                  <span className="userShowInfoTitle1">
                    Kitap Adı: {item.name}
                  </span>
                </div>

                <div className="userShowInfo">
                  <CalendarToday className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    Ne Zaman Sipariş Edildi:{" "}
                    {new Date(item.createdAt.seconds * 1000).toLocaleDateString(
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
                    <span className="userShowInfoTitle durum">Tamamlandı</span>
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
      ))}
    </div>
  );
}
