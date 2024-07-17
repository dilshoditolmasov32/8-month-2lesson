import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import { SignIn, Main, Order, Service, Cleints } from "@pages";

const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="main/*" element={<Main />} >
        <Route index element={<Cleints />} />
        <Route path="service" element={<Service />} />
        <Route path="order" element={<Order />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Index;
