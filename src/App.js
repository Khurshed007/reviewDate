import { useState, useEffect } from "react";
import "./App.css";
import { GoogleAuth } from "./GoogleAuth/GoogleAuth";
import { getCurrentUser, getRatingsData, getUserData } from "./store/selectors";
import { useSelector } from "react-redux";
import { RootRoutes } from "./routes";
import { useNavigate } from "react-router-dom";
import Registration from "./Registration/Registration";
import { setRatingsData } from "./store/bewertung";
import { useDispatch} from "react-redux";
import Navbar from "./Navbar/Navbar";
const App = () => {
  const dispatch =  useDispatch();
  const ratingsData = useSelector(getRatingsData)
  const usersData = useSelector(getUserData)

   useEffect(() => {
        // После создания ratingsData
  const ratingsData = usersData.map(user => {
    const ratingsSum = user.ratings.reduce((sum, rating) => sum + (rating.rating || 0), 0);
    return {
      id: user.id,
      ratingsSum: ratingsSum,
      ratingsCount: user.ratings.length,
    };
  });

  // Сохраняем данные в Redux
  dispatch(setRatingsData(ratingsData));
   }, [usersData])

  const navigate = useNavigate();
  const currentUser = useSelector(getCurrentUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Загружаем данные о пользователе и проверяем авторизацию
  useEffect(() => {
    if (currentUser) {
      setIsAuthenticated(true);
      // navigate("/login"); // Перенаправляем на страницу входа, если пользователь не авторизован
    }
  }, [currentUser, navigate]);

  return (
    <div>
      <RootRoutes />
    </div>
  );
};

export default App;
