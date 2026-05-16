import { createHashRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RestaurantPage from './pages/RestaurantPage';
import ProductDetailPage from './pages/ProductDetailPage';
import FoodAppButtonShowcase from './examples/FoodAppButtonShowcase';
import CategoryPillShowcase from './examples/CategoryPillShowcase';
import OrderButtonShowcase from './examples/OrderButtonShowcase';
import ProgressShowcase from './examples/ProgressShowcase';
import DesignSystemHub from './examples/DesignSystemHub';

const router = createHashRouter([
  // Food app
  { path: '/',              element: <HomePage /> },
  { path: '/restaurant/:id', element: <RestaurantPage /> },
  { path: '/product/:id',    element: <ProductDetailPage /> },

  // Design system showcase
  { path: '/showcase',           element: <DesignSystemHub /> },
  { path: '/showcase/buttons',   element: <FoodAppButtonShowcase /> },
  { path: '/showcase/categories', element: <CategoryPillShowcase /> },
  { path: '/showcase/order',     element: <OrderButtonShowcase /> },
  { path: '/showcase/loading',   element: <ProgressShowcase /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
