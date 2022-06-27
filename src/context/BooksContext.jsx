import { useState, useEffect, createContext } from "react";
import { collection, query, orderBy, getDocs, where } from "firebase/firestore";
import { db } from "../firebase";
export const BooksContext = createContext({});

export const BooksContextProvider = (props) => {
  const [books, setBooks] = useState([]);
  const [doneBooks, setDoneBooks] = useState([]);

  //Search State
  const [searchQuery, setSearchQuery] = useState("");

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
    where("done", "==", true)
  );
  useEffect(() => {
    const getBooks = async () => {
      const data = await getDocs(booksCollectionRef);
      setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getBooks();
  }, []);
  useEffect(() => {
    const getDoneBooks = async () => {
      const data = await getDocs(doneBooksCollectionRef);
      setDoneBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getDoneBooks();
  }, []);

  /************************************************************/
  return (
    <BooksContext.Provider
      value={{
        books,
        doneBooks,
        search,
        setSearchQuery,
      }}
    >
      {props.children}
    </BooksContext.Provider>
  );
};
