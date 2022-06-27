import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { Route, Routes, Outlet } from "react-router-dom";
import BooksList from "./pages/booksList/BooksList";
import User from "./pages/user/User";
import NewOrder from "./pages/newOrder/NewOrder";

import { BooksContextProvider } from "./context/BooksContext";
import DoneBooksList from "./pages/doneBooksList/DoneBooksList";
import CanceledBooksList from "./pages/canceledBooksList/CanceledBooksList";

const AppLayout = () => (
  <>
    <Topbar />
    <div className="container">
      <Sidebar />
      <Outlet />
    </div>
  </>
);

function App() {
  return (
    <>
      <BooksContextProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />}></Route>
            <Route path="/siparisler" element={<BooksList />}></Route>
            <Route
              path="/tamamlanan-siparisler"
              element={<DoneBooksList />}
            ></Route>
            <Route
              path="/iptal-siparisler"
              element={<CanceledBooksList />}
            ></Route>
            <Route path="/siprais/:id" element={<User />}></Route>
            <Route path="/yeni-siparis" element={<NewOrder />}></Route>
          </Route>
        </Routes>
      </BooksContextProvider>
    </>
  );
}

export default App;
