import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todos from "../Pages/Todos";
import Login from "../Pages/Login";
import AddTodos from "../Pages/addTodos";
import AuthChecker from "../Components/AuthChecker";
import Register from "../Pages/Register";
import EditTodos from "../Pages/editTodos";
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthChecker>
              <Todos />
            </AuthChecker>
          }
          // element={
          //   <Todos/>
          // }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<AddTodos />} />
        <Route path="/edit/:id" element={<EditTodos />} />
      </Routes>
    </BrowserRouter>
  );
}
