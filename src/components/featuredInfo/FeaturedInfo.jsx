import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { BooksContext } from "../../context/BooksContext";
export default function FeaturedInfo() {
  const { books, doneBooks, waitingBooks, canceledBooks } =
    useContext(BooksContext);

  return (
    <div className="featured in-left">
      <div className="featuredItem1">
        <span className="featuredTitle">Toplam Sipariş Sayısı</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{books.length}</span>
        </div>
        <hr />
      </div>
      <div className="featuredItem2">
        <span className="featuredTitle">Onaylanan Sipariş Sayısı</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{doneBooks.length}</span>
        </div>
        <hr />
      </div>
      <div className="featuredItem3">
        <span className="featuredTitle">Bekleyen Sipariş Sayısı</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{waitingBooks.length}</span>
        </div>
        <hr />
      </div>
      <div className="featuredItem4">
        <span className="featuredTitle">İptal Edilen Sipariş Sayısı</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{canceledBooks.length}</span>
        </div>
        <hr />
      </div>
    </div>
  );
}
