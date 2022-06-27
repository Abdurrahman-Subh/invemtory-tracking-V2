import { useState, useEffect, createContext } from "react";
import { collection, query, orderBy, getDocs, where } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
export const BooksContext = createContext({});

export const BooksContextProvider = (props) => {
  const [books, setBooks] = useState([]);
  const [doneBooks, setDoneBooks] = useState([]);
  const [canceledBooks, setCanceledBooks] = useState([]);

  //Search State
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  //Search Function
  const search = (task) => {
    return task.filter(
      (item) =>
        item.name.toString().toLowerCase().includes(searchQuery) ||
        item.buyer.toString().toLowerCase().includes(searchQuery) ||
        item.seller.toString().toLowerCase().includes(searchQuery) ||
        item.insurance.toString().toLowerCase().includes(searchQuery) ||
        item.user.toString().toLowerCase().includes(searchQuery) ||
        item.phone.toString().toLowerCase().includes(searchQuery)
    );
  };

  const booksCollectionRef = query(
    collection(db, "books"),
    orderBy("createdAt", "desc")
  );
  const doneBooksCollectionRef = query(
    collection(db, "books"),
    orderBy("createdAt", "desc"),
    where("durum", "==", 1)
  );
  const canceledBooksCollectionRef = query(
    collection(db, "books"),
    orderBy("createdAt", "desc"),
    where("durum", "==", 2)
  );
  useEffect(() => {
    const getBooks = async () => {
      const data = await getDocs(booksCollectionRef);
      setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getBooks();
  }, [navigate]);
  useEffect(() => {
    const getDoneBooks = async () => {
      const data = await getDocs(doneBooksCollectionRef);
      setDoneBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getDoneBooks();
  }, [navigate]);
  useEffect(() => {
    const getCanceledBooks = async () => {
      const data = await getDocs(canceledBooksCollectionRef);
      setCanceledBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getCanceledBooks();
  }, [navigate]);

  /************************************************************/
  return (
    <BooksContext.Provider
      value={{
        books,
        doneBooks,
        search,
        canceledBooks,
        setSearchQuery,
        navigate,
      }}
    >
      {props.children}
    </BooksContext.Provider>
  );
};
