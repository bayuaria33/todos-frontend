import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
export default function Header(props) {
const navigate = useNavigate()
  const token = "Bearer " + localStorage.getItem("accessToken");
  const decoded_token = jwtDecode(token);
  const fullname = decoded_token.fullname;
  function logout(){
    localStorage.clear()
    navigate("/login")
  }
  return (
    <div className="w-full flex justify-end">
      <p className="font-bold m-3">Welcome {fullname}</p>
      <button className="font-bold m-3 text-red-700" onClick={()=>{
        logout()
      }}>Logout</button>
    </div>
  );
}
