// import React, { useState } from "react";

// // Компонент авторизации
// export const Login = ({ onLogin }) => {
//   const [name, setName] = useState("");
//   const [surname, setSurname] = useState("");
//   const [isAdmin, setIsAdmin] = useState(false);
// //   const [currentUser, setCurrentUser] = useState({})
//   const handleLogin = (e) => {
//     let id = Math.floor(Math.random() * 1000)
//     e.preventDefault();
//     if (name && surname) {
//       // Полное имя для отображения
//       const fullName = `${name} ${surname}`;
//       // Вызываем функцию, передавая имя и фамилию после успешной авторизации
//       onLogin(name, surname, isAdmin, id);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div className="form-group">
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             className="form-control"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="surname">Surname:</label>
//           <input
//             type="text"
//             className="form-control"
//             id="surname"
//             value={surname}
//             onChange={(e) => setSurname(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="admin">Admin:</label>
//           <input
//             type="checkbox"
//             className="form-control"
//             id="admin"
//             checked={isAdmin}
//             onChange={() => setIsAdmin((prev) => !prev)}

//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useContext, useEffect } from "react";
import { Context } from "../index";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { setIsUser } from "../store/user";
import { setCurrentUser } from "../store/bewertung";
import { doc, setDoc } from "firebase/firestore";
import { getCurrentUser } from "../store/selectors";

export function GoogleAuth() {
  const dispatch = useDispatch();
  const isUser = useSelector(getCurrentUser);
  console.log(isUser, "user user");

  const { auth, fireStore } = useContext(Context);

  // Проверяем, есть ли пользователь в localStorage и устанавливаем его в Redux
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      dispatch(setCurrentUser(storedUser));
    }
  }, [dispatch]);

  // Функция для входа через Google
  const onGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(fireStore, "users", user.uid), {
        id: user.uid,
        name: user.displayName.split(" ")[0],
        surname: user.displayName.split(" ")[1],
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        comments: [],
        ratings: [],
      });
      const userData = {
        id: user.uid,
        name: user.displayName.split(" ")[0],
        surname: user.displayName.split(" ")[1],
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        comments: [],
        ratings: [],
      };

      localStorage.setItem("currentUser", JSON.stringify(userData));
      dispatch(setCurrentUser(userData));

      console.log("Logged in user:", user);
    } catch (error) {
      console.error("Ошибка авторизации:", error);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#fff",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Login to Your Account</h2>
        <div
          onClick={onGoogleClick}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 20px",
            backgroundColor: "#DB4437",
            color: "#fff",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
  
          Continue with Google
        </div>
      </div>
    </div>
  );
}
// export default Login;
