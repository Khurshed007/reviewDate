// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getUserData } from "../store/selectors";
// import { setUserData } from "../store/bewertung";
// import { getCurrentUser } from "../store/selectors";
// import styles from "./product.module.css"; 
// import { UserIcon } from "../svg/icons";
// import {
//   collection,
//   getDocs,
//   doc,
//   getDoc,
//   updateDoc,
// } from "firebase/firestore";
// import { database } from "../firebaseConfig/firebaseConfig";

// export const Product = () => {
//   const dispatch = useDispatch();
//   const userData = useSelector(getUserData);
//   const { productId } = useParams();
//   const dbInstance = collection(database, "users");
//   const [users, setUsers] = useState([]);
//   const currentUser = useSelector(getCurrentUser);
//   const currentProduct = userData.find((user) => String(user.id) === String(productId));

//   const [formData, setFormData] = useState({
//     newComment: "",
//     commentarerId: currentUser.id,
//     commentarerName: currentUser.name,
//   });

//   const [loading, setLoading] = useState(true); // Step 1: Add loading state

//   const updateComments = async () => {
//     const docRef = doc(database, "users", currentProduct.id);
//     try {
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         const currentData = docSnap.data();
//         const updatedComments = [...currentData.comments, { ...formData }];
//         await updateDoc(docRef, {
//           comments: updatedComments,
//         });
//         alert("Comment added!");
//         await getData(); // Fetch updated user data
//       } else {
//         console.log("Document does not exist");
//       }
//     } catch (error) {
//       console.error("Error updating comments: ", error);
//       alert("Error updating comments: " + error.message);
//     }
//   };

//   const getData = async () => {
//     setLoading(true); // Step 2: Set loading to true when fetching data
//     try {
//       const data = await getDocs(dbInstance);
//       const usersArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//       setUsers(usersArray);
//       dispatch(setUserData(usersArray));
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false); // Step 3: Set loading to false after data is fetched
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleAddComment = (e) => {
//     e.preventDefault();
//     updateComments();
//   };

//   // Step 4: Conditional rendering based on loading state
//   if (loading) {
//     return <div>Loading...</div>; // or a spinner/loading indicator
//   }

//   if (!currentProduct) {
//     return <div>Product not found</div>; // Handle case where product is not found
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.block}>
//         <UserIcon />
//         <h2 className={styles.blockName}>{currentProduct.name}</h2>
//         <form onSubmit={handleAddComment}>
//           <textarea
//             name="newComment"
//             value={formData.newComment}
//             onChange={handleChange}
//             placeholder="Write your comment here..."
//             className={styles.blockTextarea}
//           />
//           <button type="submit" className={styles.btnPrimary}>
//             Submit
//           </button>
//         </form>
//       </div>

//       <div className={styles.commentDisplay}>
//         <h3>Comments:</h3>
//         {currentProduct.comments.length > 0 ? (
//           currentProduct.comments.map((e, index) => (
//             <div key={index} className={styles.commentCard}>
//               <h4>{e.commentarerName}</h4>
//               <p>{e.newComment}</p>
//               <span className={styles.commentRating}>Rating: {e.rating}</span>
//             </div>
//           ))
//         ) : (
//           <p>No comments yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../store/selectors";
import { setUserData } from "../store/bewertung"; // Импортируем экшн
import { getCurrentUser } from "../store/selectors";
import styles from "./product.module.css"; // Correct import statement
import { UserIcon } from "../svg/icons";
import {
  collection,
  getDoc,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { database } from "../firebaseConfig/firebaseConfig";
import { Rating } from "../Rating/Rating";
import Navbar from "../Navbar/Navbar";

export const Product = () => {
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  const { productId } = useParams();
  const dbInstance = collection(database, "users");
  const currentUser = useSelector(getCurrentUser);

  const [isLoading, setIsLoading] = useState(true); // Состояние загрузки
  const [formData, setFormData] = useState({
    newComment: "",
    commentarer: "",
  });

  const [currenRaiting, setRaiting] = useState(0);
  const [isRatingOfCurrentUser, setIsRatingOfCurrentUser] = useState(false);

  const currentProduct = userData.find(
    (users) => String(users.id) === String(productId)
  );

  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        newComment: e.target.value,
        commentarerId: currentUser.id,
        commentarerName: currentUser.name,
      };
    });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    updateComments();
  };

  const updateComments = async () => {
    const docRef = doc(database, "users", currentProduct.id);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const currentData = docSnap.data();
        const updatedComments = [
          ...currentData.comments,
          { ...formData },
        ];

        await updateDoc(docRef, {
          comments: updatedComments,
        });
        getData();
        alert("Комментарий обновлен");
      } else {
        console.log("Документ не существует");
      }
    } catch (error) {
      console.error("Ошибка при обновлении комментариев: ", error);
      alert("Ошибка при обновлении комментариев: " + error.message);
    }
  };

  const getData = async () => {
    try {
      const data = await getDocs(dbInstance);
      const usersArray = data.docs.map((e) => {
        return { ...e.data(), id: e.id };
      });

      // Обновляем данные пользователей в Redux
      dispatch(setUserData(usersArray));
      setIsLoading(false); // Устанавливаем флаг загрузки в false после получения данных
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  const updateRating = async (newRating) => {
    const docRef = doc(database, "users", currentProduct.id);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const currentData = docSnap.data();
        const currentRatings = currentData.ratings || [];

        const isExistingRating = currentRatings.some(
          (e) => String(e.userId) === String(currentUser.id)
        );

        if (!isExistingRating) {
          const updatedRatings = [
            ...currentRatings,
            {
              userId: currentUser.id,
              fullName: currentUser.displayName,
              rating: newRating,
            },
          ];
          setRaiting(newRating);

          await updateDoc(docRef, { ratings: updatedRatings });
          alert("Рейтинг успешно добавлен");
          getData();
        } else {
          setIsRatingOfCurrentUser(true);
        }
      }
    } catch (error) {
      console.error("Ошибка при получении документа: ", error);
      alert("Ошибка при получении данных: " + error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (currentProduct && currentUser) {
      const currentProductRating = currentProduct.ratings.some(
        (e) => String(e.userId) === String(currentUser.id)
      );

      const isExistingRating = currentProduct.ratings.reduce((accu, items) => {
        if (String(items.userId) === String(currentUser.id)) {
          accu = items.rating;
        }
        return accu;
      }, 0);

      setRaiting(isExistingRating);
      setIsRatingOfCurrentUser(currentProductRating);
    }
  }, [currentProduct, currentUser]);

  if (isLoading) {
    return <div className={styles.loading}>Загрузка...</div>; // Индикатор загрузки
  }

  if (!currentProduct) {
    return <div className={styles.loading}>Продукт не найден</div>;
  }

  return (
    <>
     <Navbar/>
    <div className={styles.container}>
      <div className={styles.block}>
        <UserIcon />
        <h2 className={styles.blockName}>{currentProduct.name}</h2>

        <form>
          <textarea
            name="newComment"
            value={formData.newComment}
            onChange={handleChange}
            placeholder="Напишите ваш комментарий здесь..."
            className={styles.blockTextarea}
          />
          <div className={styles.formGroup}>
            <label htmlFor="rating-select">Выберите оценку:</label>
            <Rating
              isEditable={!isRatingOfCurrentUser}
              rating={currenRaiting}
              setRating={setRaiting}
              updateRating={updateRating}
            />
          </div>
          <button className={styles.btnPrimary} onClick={handleAddComment}>
            Отправить
          </button>
        </form>
      </div>

      <div className={styles.commentDisplay}>
        <h3>Комментарии:</h3>
        {currentProduct.comments.length > 0 &&
          currentProduct.comments.map((e, index) => (
            <div key={index} className={styles.commentCard}>
              <h4>{e.commentarerName}</h4>
              <p>{e.newComment}</p>
            </div>
          ))}
      </div>
    </div>
    </>
  );
};
