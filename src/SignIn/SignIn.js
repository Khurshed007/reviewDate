import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore"; // Импорт необходимых функций
import { database } from "../firebaseConfig/firebaseConfig"; // Убедитесь, что путь к вашему firebaseConfig правильный
import { GoogleAuth } from "../GoogleAuth/GoogleAuth";

function SignIn() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // Обработчик ввода данных (обновление состояния)
  const handleInputs = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Функция для входа пользователя в систему
  const handle = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        // Получаем объект user из результата авторизации
        const user = userCredential.user;

        try {
          // Получаем данные пользователя из Firestore
          const userDocRef = doc(database, "users", user.uid); // Ссылка на документ пользователя по UID
          const userSnapshot = await getDoc(userDocRef);

          if (userSnapshot.exists()) {
            // Извлекаем данные из документа Firestore
            const userData = {
              ...userSnapshot.data(), // Все данные, которые были сохранены в Firestore
              id: user.uid, // Добавляем UID пользователя
              email: user.email, // Можем добавить или перезаписать email, если нужно
            };
            // Сохранение данных пользователя в localStorage
            localStorage.setItem("currentUser", JSON.stringify(userData));

            // Выводим данные пользователя в консоль (для проверки)
            console.log("Авторизованный пользователь:", userData);

            // Перенаправление на страницу /main
            alert("Успешно!");
            navigate("/main");
          } else {
            console.error("Пользовательские данные не найдены в Firestore.");
          }
        } catch (error) {
          console.error(
            "Ошибка при получении данных пользователя из Firestore:",
            error
          );
        }
      })
      .catch((error) => {
        // Обработка ошибок, выводим сообщение об ошибке
        alert(error.message);
      });
  };

  return (
    <div className="App-header">
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

      <button onClick={handle}>Зайти</button>
      <GoogleAuth/>
    </div>
  );
}

export default SignIn;
