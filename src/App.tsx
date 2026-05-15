import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RestaurantPage from './pages/RestaurantPage';
import ProductDetailPage from './pages/ProductDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/restaurant/:id',
    element: <RestaurantPage />,
  },
  {
    path: '/product/:id',
    element: <ProductDetailPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
