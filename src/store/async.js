import { setDoc, doc } from "firebase/firestore";
import { database } from "../firebaseConfig/firebaseConfig";
import { setCurrentUser as setCurrentUserAction } from "./bewertung"; // Импорт экшна из slice

export const saveUserToFirestore = (user) => {
  return async (dispatch) => {
    try {
      const docRef = doc(database, "myUsers", String(user.uId));
      await setDoc(docRef, user);
      console.log("Пользователь успешно сохранен/обновлен в Firestore");

      // Диспатчим экшн для обновления состояния Redux
      dispatch(setCurrentUserAction(user));
    } catch (error) {
      console.error("Ошибка при сохранении пользователя в Firestore:", error);
    }
  };
};