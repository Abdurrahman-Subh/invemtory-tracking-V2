import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { Route, Routes, Outlet } from "react-router-dom";
import BooksList from "./pages/booksList/BooksList";
import User from "./pages/user/User";
import NewOrder from "./pages/newOrder/NewOrder";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import { BooksContextProvider } from "./context/BooksContext";
import DoneBooksList from "./pages/doneBooksList/DoneBooksList";
import CanceledBooksList from "./pages/canceledBooksList/CanceledBooksList";
import CustomerPrint from "./pages/customerPrint/CustomerPrint";
import SignIn from "./pages/SignIn/SignIn";
import { AuthContextProvider } from "./context/AuthContext";
import WaitList from "./pages/waitList/WaitList";
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
      <AuthContextProvider>
        <BooksContextProvider>
          <Routes>
            <Route path="/giris" index element={<SignIn />}></Route>
            <Route element={<AppLayout />}>
              <Route
                path="/"
                element={
                  <ProtectedRoutes>
                    <Home />
                  </ProtectedRoutes>
                }
              ></Route>
              <Route
                path="/siparisler"
                element={
                  <ProtectedRoutes>
                    <BooksList />
                  </ProtectedRoutes>
                }
              ></Route>
              <Route
                path="/bekleyen-siparisler"
                element={
                  <ProtectedRoutes>
                    <WaitList />
                  </ProtectedRoutes>
                }
              ></Route>
              <Route
                path="/tamamlanan-siparisler"
                element={
                  <ProtectedRoutes>
                    <DoneBooksList />
                  </ProtectedRoutes>
                }
              ></Route>
              <Route
                path="/iptal-siparisler"
                element={
                  <ProtectedRoutes>
                    <CanceledBooksList />
                  </ProtectedRoutes>
                }
              ></Route>
              <Route
                path="/siprais/:id"
                element={
                  <ProtectedRoutes>
                    <User />
                  </ProtectedRoutes>
                }
              ></Route>
              <Route
                path="/yeni-siparis"
                element={
                  <ProtectedRoutes>
                    <NewOrder />
                  </ProtectedRoutes>
                }
              ></Route>
              <Route
                path="/yazdir/:id"
                element={
                  <ProtectedRoutes>
                    <CustomerPrint />
                  </ProtectedRoutes>
                }
              ></Route>
            </Route>
          </Routes>
        </BooksContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
