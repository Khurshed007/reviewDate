import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./Rating.module.css";
import { Star } from "../svg/icons";

export const Rating = ({
  isEditable,
  rating,
  updateRating,
  className,
  setRating,
  ...props
}) => {
  useEffect(() => {
    if(rating > 0) {
     isEditable = false
    }
 }, [])

  const [ratingArray, setRatingArray] = useState(new Array(5).fill(<></>));
  const [edit, setEdit] = useState(isEditable);
  const [haq, setHaq] = useState(false);
  const [currentClass, setCurrentClass] = useState(styles.filed);

  useEffect(() => {
    constructRating(rating);
  }, [rating, haq, currentClass, edit]);


  

  const constructRating = (currentRating) => {
    const updatedArray = ratingArray.map((r, i) => {
      return (
        <span key={i}>
          <Star
            className={cn(styles.star, {
              [currentClass]: i < currentRating,
            })}
            data={i}
            rating={rating}
            setHaq={setHaq}
            changeDisplay={() => {
              setHaq(false);
              if (edit) setCurrentClass(styles.filed);
              changeDisplay(i + 1);
            }}
            leaveDisplay={() => {
              setHaq(false);
              setCurrentClass(styles.clicked);
              changeDisplay(i + 1);
            }}
            onClickDisplay={() => {
              setCurrentClass(styles.clicked);
              setHaq(true);
              onClickDisplay(i + 1);
            }}
            setCurrentClass={setCurrentClass}
            haq={haq}
          />
        </span>
      );
    });

    setRatingArray(updatedArray);
  };

  const changeDisplay = (i) => {
    if (!edit) {
      return;
    }
    constructRating(i);
  };

  const onClickDisplay = (i) => {
    if (!edit || !setRating) {
      return;
    }
 if(rating === 0) {
  setRating(i);
  updateRating(i)
 }
 
    
    setEdit(false);
  };

  return (
    <div {...props} className={cn(styles.rating, className)}>
      {ratingArray.map((r, i) => (
        <span key={i}>{r}</span>
      ))}
    </div>
  );
};