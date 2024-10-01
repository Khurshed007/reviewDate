import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MyUsers } from "../myUsers/myUsers";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { database } from "../firebaseConfig/firebaseConfig";
import { getCurrentUser, getUserData } from "../store/selectors";
import { saveUserToFirestore } from "../store/async"; // Импортируйте вашу функцию
import styles from "./index.module.css";
import { setUserData } from "../store/bewertung";
import Navbar from "../Navbar/Navbar";
const CommentsApp = () => {
  const userData = useSelector(getUserData);
  const currentUser = useSelector(getCurrentUser)
  const [users, setUsers] = useState([]);
  const dbInstance = collection(database, "users");
  const dispatch = useDispatch(); // Добавляем useDispatch

  // Асинхронная функция для получения данных
  const getData = async () => {
    try {
      const data = await getDocs(dbInstance);
      const usersArray = data.docs.map((e) => {
        return { ...e.data(), id: e.id }; // Сохраняем также ID документа
      });
      setUsers(usersArray);
      dispatch(setUserData(usersArray))
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  useEffect(() => {
    // Вызов getData в useEffect
    getData();
  }, []);



   const deleteData = (id) => {
     let dataToUpdate = doc(dbInstance, id);
     console.log("id", id);
     deleteDoc(dataToUpdate)
       .then(() => {
         window.location.reload();
         alert("Data u[dated");
       })
       .catch((err) => alert(err));
   };
 
 useEffect(() => {
   getData()
 }, [])







  console.log(userData, "data y ")

  // Вызов saveUserToFirestore после получения данных
  // useEffect(() => {
  //   if (users.length > 0) {
  //     console.log(users[0]["dates"], userData, "my my users");

  //     // Пример вызова saveUserToFirestore для каждого пользователя
  //     users.forEach((user) => {
  //       dispatch(saveUserToFirestore(user));
  //     });
  //   }
  // }, [users, userData, dispatch]); // Добавляем dispatch в зависимости
  
  return (
     <>
     <Navbar/>
    <div className="container">
      <div className={styles.nearbyContainer}>
        <div className={styles.header}>
          <h1 className={styles.txt}>User Cards</h1>
        </div>
        <div className={styles.userCardWrap}>
        {userData.length > 0 ? (
  userData.map((user, index) => (
    <div key={index}>
      <MyUsers
        id={user.id}
        name={user.name}
        comments={
          user.comments
            ? user.comments.map(({ name, text, rating }) => ({
                name: name,
                text: text,
                rating: rating,
              }))
            : []
        }
      />
      {currentUser.isAdmin && currentUser.id !== user.id && ( // Добавлено условие
        <button onClick={() => deleteData(user.id)}>
          Удалить пользователя
        </button>
      )}
    </div>
  ))
) : (
  <p>No users yet</p>
)}
        </div>
      </div>

    </div>
    </>
  );
};

export default CommentsApp;