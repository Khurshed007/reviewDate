import { Route, Routes } from "react-router-dom";
import { Product } from "./product/Product";
import CommentsApp from "./Comments/CommentsApp";
import SignIn from "./SignIn/SignIn";
import Registration from "./Registration/Registration";
export const RootRoutes = () => {
  return (
    
    <Routes>
       <Route path="/" element={<Registration/>} />
      <Route path="/main" element={<CommentsApp/>} />
      <Route path="/sign-in" element={<SignIn/>} />
      <Route path="/:productId" element={<Product />} />
    </Routes>
  );
};
