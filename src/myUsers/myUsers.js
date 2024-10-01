import React from "react";
import style from "./myUsers.module.css"; // Убедитесь, что пути корректны
import { Link } from "react-router-dom";
import { UserIcon } from "../svg/icons";
import { useSelector } from "react-redux";
import { getRatingsData } from "../store/selectors";

// Компонент для отображения пользователя и его комментариев
export const MyUsers = ({ name, comments, id }) => {
  const ratingsData = useSelector(getRatingsData);
  const currentRatings = ratingsData.find((e) => e.id === id);

  // Функция для вычисления среднего рейтинга и количества оценок
  const getAverageRating = () => {
    if (currentRatings) {
      const { ratingsSum, ratingsCount } = currentRatings;

      if (ratingsCount > 0) {
        return {
          rating: (ratingsSum / ratingsCount).toFixed(2), // Средний рейтинг
          ratingsCount: ratingsCount, // Количество оценок
        };
      }
    }
    return null; // Возврат null, если нет рейтингов
  };

  const averageRatingData = getAverageRating();

  // Функция для определения правильной формы слова "пользователь"
  const getUserLabel = (count) => {
    if (count === 1) {
      return "пользователя";
    } else {
      return "пользователей";
    }
  };

  return (
    <div className={style.card}>
      {averageRatingData ? (
        <>
          <p>Средний рейтинг: {averageRatingData.rating}</p>
          <p>
            Получено оценок от: {averageRatingData.ratingsCount}{" "}
            {getUserLabel(averageRatingData.ratingsCount)}
          </p>
        </>
      ) : (
        <p>Пока оценок нет</p>
      )}
      <h2 className={style.userName}>{name}</h2>
      <div className={style.photo}>
        <UserIcon classNames={style.icon} />
      </div>
      <Link to={`/${id}`}>
        <button className={style.add}>
          <span>+</span>
        </button>
      </Link>
    </div>
  );
};