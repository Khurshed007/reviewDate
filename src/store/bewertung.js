import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  try {
    const serializedData = localStorage.getItem("userData");
    if (serializedData === null) {
      return [
        {
          name: "Khurshed",
          id: 1,
          comments: [
            { text: "Good", rating: 4, name: "Jessica" },
            { text: "Good", rating: 4, name: "Mina" },
          ],
          ratings: [],
        },
        {
          name: "Alex",
          id: 2,
          comments: [{ text: "Good", rating: 4, name: "Jessica" }],
          ratings: [],
        },
      ]; // Дефолтные данные
    }
    return JSON.parse(serializedData);
  } catch (e) {
    console.warn("Error loading data from localStorage", e);
    return [];
  }
};

// Функция для сохранения данных в localStorage
const saveToLocalStorage = (data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem("userData", serializedData);
  } catch (e) {
    console.warn("Error saving data to localStorage", e);
  }
};

// Начальное состояние с загрузкой данных из localStorage

export const bewertungSlice = createSlice({
  name: "bewertung",
  initialState: {
    currentUser: null,
    userData: [],
    ratingsData : []
  },

  reducers: {
    setCurrentUser: (state, { payload }) => {
      // const existingUserIndex = state.userData.findIndex( // Проверяем по uId если пользователь у нас в списке
      //   (user) => user.uId === payload.id
      // );
      //    console.log(payload, "payload")
      // if (existingUserIndex === -1) { // Если пользователя нет то добавить
      //   state.userData.push({
      //     id: state.userData.length + 1,
      //     uId : payload.id,
      //     name: payload.name,
      //     comments: [],
      //     ratings: [],
      //   });
      // }
      state.currentUser = payload;
    },

    setRatingsData : (state, {payload}) => {
           console.log(payload, "rarings data")
           state.ratingsData = payload;
    },
    setUserData: (state, { payload }) => {
      console.log(payload, "papapapa");
      state.userData = [...payload];
      saveToLocalStorage(state.userData);
    },
    addComment: (state, action) => {
      // const { targetId, commenterName, newComment, rating } = action.payload;

      // // Проверяем, есть ли пользователь в userData, которому оставляют комментарий
      // const existingUserIndex = state.userData.findIndex(
      //   (user) => user.id === targetId
      // );

      // if (existingUserIndex !== -1) {
      //   // Если пользователь существует, добавляем новый комментарий в массив его комментариев
      //   state.userData[existingUserIndex].comments.push({
      //     name: commenterName,
      //     text: newComment,
      //     rating: rating,
      //   });
      // } else {
      //   // Если пользователя нет, создаём нового пользователя с массивом комментариев
      //   state.userData.push({
      //     name: targetId,
      //     id: state.userData.length + 1, // Генерация нового ID для пользователя
      //     comments: [
      //       {
      //         name: commenterName,
      //         text: newComment,
      //         rating: rating,
      //       },
      //     ],
      //   });
      // }

      // // Сохраняем обновленные данные в localStorage
      // saveToLocalStorage(state.userData);
    },
    addRaiting: (state, { payload }) => {
      const { userId, currentUserId, rating } = payload;
      const existingUserIndex = state.userData.findIndex(
        (user) => String(user.id) === String(userId)
      );

      if (existingUserIndex !== -1) {
        let isRatingOfCurrentId = state.userData[
          existingUserIndex
        ].ratings.some((e) => e.id === currentUserId);
        // Если пользователь существует, добавляем новый комментарий в массив его комментариев
        if (!isRatingOfCurrentId && rating !== 0) {
          state.userData[existingUserIndex].ratings.push({
            id: currentUserId,
            rating: rating,
          });
        }
      }
      saveToLocalStorage(state.userData);
    },
  },
});

export const { setUserData, setCurrentUser, addComment, addRaiting,setRatingsData } =
  bewertungSlice.actions;
export default bewertungSlice.reducer;
