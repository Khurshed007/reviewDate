import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { database } from "../firebaseConfig/firebaseConfig";
import { setCurrentUser } from "../store/bewertung";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../store/selectors";
import { GoogleAuth } from "../GoogleAuth/GoogleAuth";
function Registration() {
  const dispatch = useDispatch();
  const isUser = useSelector(getCurrentUser);
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const auth = getAuth();

  const handleInputs = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Регистрация пользователя
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      // Обновление профиля пользователя, добавление имени
      await updateProfile(user, {
        displayName: data.name,
      });

      console.log("Профиль обновлен:", user);
      alert("Пользователь зарегистрирован с именем: " + data.name);

      // Добавление данных пользователя в Firestore
      const userDocRef = doc(database, "users", user.uid); // Создание ссылки на документ с UID пользователя
      await setDoc(userDocRef, {
        id: user.uid,
        name: data.name.split(" ")[0],
        surname: data.name.split(" ")[1] || "", // Фамилия, если указана
        displayName: data.name,
        email: data.email,
        photoURL: "", // Поскольку при регистрации через почту фото не добавляется, оставляем пустым
        comments: [],
        ratings: [],
        isAdmin: data.isAdmin, // Добавляем значение isAdmin из формы
      });

      // Сохранение данных пользователя в localStorage и обновление текущего пользователя в Redux
      const userData = {
        id: user.uid,
        name: data.name.split(" ")[0],
        surname: data.name.split(" ")[1] || "",
        displayName: data.name,
        email: data.email,
        photoURL: "",
        comments: [],
        ratings: [],
        isAdmin: data.isAdmin,
      };

      localStorage.setItem("currentUser", JSON.stringify(userData));
      dispatch(setCurrentUser(userData));

      alert("Данные пользователя успешно сохранены в Firestore.");
       navigate("/main")
    } catch (error) {
      console.error("Ошибка при регистрации пользователя:", error);
      alert(error.message);
    }
  };

  return (

    <div className="App-header">
      <input
        className="input-fields"
        placeholder="Имя"
        name="name"
        type="text"
        onChange={handleInputs}
      />
      <input
        className="input-fields"
        placeholder="Email"
        name="email"
        type="email"
        onChange={handleInputs}
      />
      <input
        className="input-fields"
        placeholder="Пароль"
        name="password"
        type="password"
        onChange={handleInputs}
      />
      <label style={{fontSize : "10px"}}>
      Зарегистрироваться как администратор
        <input
          type="checkbox"
          name="isAdmin"
          onChange={handleInputs}
        />
      
      </label>
      <button onClick={handleSubmit}>Регистрироваться</button>
      <Link to={"/sign-in"}>Зайти</Link>
      <GoogleAuth/>
    </div>
  );
}

export default Registration;