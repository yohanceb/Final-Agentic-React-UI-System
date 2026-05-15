import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UtensilsCrossed, Flame, Tag } from 'lucide-react';
import {
  RestaurantProfileHeader,
  TabFilter,
  FoodCard,
  CartBar,
  BottomNavBar,
  SectionHeader,
  CardSkeleton,
  SkeletonLoader,
  AgentStatusBanner,
  ToastNotification,
  Badge,
  DotLoader,
  type NavItemId,
} from '../components/FoodDeliveryDesignSystem';

const MENU_ITEMS = [
  { id: 'cheese-pizza', name: 'Delicious cheese pizza', rating: 4.7, reviewCount: '5k+', minutes: 25, price: 50.99, badge: 'Best Seller' },
  { id: 'pepperoni',    name: 'Pepperoni pizza',        rating: 4.7, reviewCount: '450', minutes: 15, price: 50.99, badge: '' },
  { id: 'caprese',      name: 'Caprese pizza',          rating: 4.5, reviewCount: '4.5', minutes: 20, price: 30.99, badge: 'New' },
  { id: 'margherita',   name: 'Margherita pizza',       rating: 4.3, reviewCount: '320', minutes: 20, price: 24.99, badge: '' },
];

const TABS = [
  { label: 'All Items',       icon: <UtensilsCrossed className="h-3.5 w-3.5" /> },
  { label: 'Popular',         icon: <Flame className="h-3.5 w-3.5" /> },
  { label: 'Exclusive Offers',icon: <Tag className="h-3.5 w-3.5" /> },
];

export default function RestaurantPage() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav]   = useState<NavItemId>('home');
  const [activeTab, setActiveTab]   = useState('All Items');
  const [cart, setCart]             = useState<Set<string>>(new Set());
  const [favorites, setFavorites]   = useState<Set<string>>(new Set());
  const [loading, setLoading]       = useState(true);
  const [tabLoading, setTabLoading] = useState(false);
  const [agentStatus, setAgentStatus] = useState<'thinking' | 'success' | 'idle'>('thinking');
  const [toast, setToast]           = useState<{ msg: string; type: 'success' | 'info' } | null>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setAgentStatus('success'), 1200);
    const t2 = setTimeout(() => { setLoading(false); setAgentStatus('idle'); }, 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const showToast = (msg: string, type: 'success' | 'info' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setTabLoading(true);
    setAgentStatus('thinking');
    setTimeout(() => {
      setTabLoading(false);
      setAgentStatus('idle');
    }, 900);
  };

  const toggleCart = (itemId: string) => {
    setCart((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
        showToast('Removed from cart', 'info');
      } else {
        next.add(itemId);
        showToast('Added to cart ✓');
      }
      return next;
    });
  };

  const toggleFav = (itemId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(itemId) ? next.delete(itemId) : next.add(itemId);
      return next;
    });
    showToast(favorites.has(itemId) ? 'Removed from favourites' : 'Saved to favourites ♥');
  };

  const cartTotal = [...cart].reduce((sum, id) => {
    return sum + (MENU_ITEMS.find((m) => m.id === id)?.price ?? 0);
  }, 0);

  const visibleItems =
    activeTab === 'Popular'
      ? MENU_ITEMS.filter((m) => m.rating >= 4.5)
      : activeTab === 'Exclusive Offers'
      ? MENU_ITEMS.filter((m) => m.badge === 'New')
      : MENU_ITEMS;

  return (
    <div className="food-page bg-[#F0FDF4]">
      {/* Toast */}
      {toast && (
        <div className="food-toast-container">
          <ToastNotification
            type={toast.type}
            message={toast.msg}
            onDismiss={() => setToast(null)}
            className="food-slide-up"
          />
        </div>
      )}

      <div className="flex-1 overflow-y-auto pb-36">
        {/* Restaurant profile header */}
        <div className="px-5 pt-6">
          {loading ? (
            <div className="space-y-4">
              <SkeletonLoader height="h-44" rounded="3xl" />
              <div className="flex gap-3">
                <SkeletonLoader width="w-16" height="h-16" rounded="2xl" />
                <div className="flex-1 space-y-2 pt-1">
                  <SkeletonLoader height="h-5" width="w-1/2" />
                  <SkeletonLoader height="h-3" width="w-1/3" />
                </div>
              </div>
              <SkeletonLoader height="h-14" rounded="2xl" />
            </div>
          ) : (
            <RestaurantProfileHeader
              name="Domino's"
              isVerified
              isTrusted
              rating={4.7}
              reviewCount="50k+"
              priceRange="$10 - $100"
              satisfactionPercent={95}
              deliveryMinutes={15}
              onBack={() => navigate(-1)}
              onShare={() => showToast('Link copied to clipboard')}
              onMessage={() => showToast('Opening chat…', 'info')}
              onCall={() => showToast('Calling Domino\'s…', 'info')}
              className="food-fade-in"
            />
          )}
        </div>

        {/* Agent banner */}
        <div className="px-5 mt-4">
          {agentStatus !== 'idle' && (
            <AgentStatusBanner
              status={agentStatus}
              message={
                agentStatus === 'thinking'
                  ? 'Agent is curating the menu…'
                  : 'Menu ready!'
              }
              className="food-fade-in"
            />
          )}
        </div>

        {/* Tab filter */}
        <div className="px-5 mt-3">
          <TabFilter tabs={TABS} activeTab={activeTab} onTabChange={handleTabChange} />
        </div>

        {/* Menu grid */}
        <div className="px-5 mt-4">
          <div className="flex items-center justify-between mb-1">
            <SectionHeader title={`All Items in Domino's`} />
            {tabLoading && <DotLoader />}
          </div>
          <p className="text-xs text-gray-500 mb-4">
            A full list of all the available items in this store.
          </p>

          {loading || tabLoading ? (
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => <CardSkeleton key={i} />)}
            </div>
          ) : visibleItems.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center gap-2">
              <span className="text-4xl">🍕</span>
              <p className="font-semibold text-gray-700">No items in this tab</p>
              <p className="text-sm text-gray-400">Try switching to All Items</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {visibleItems.map((item) => (
                <div key={item.id} className="relative food-fade-in">
                  {item.badge && (
                    <div className="absolute top-2 left-2 z-10">
                      <Badge variant={item.badge === 'New' ? 'info' : 'warning'} size="sm">
                        {item.badge}
                      </Badge>
                    </div>
                  )}
                  <FoodCard
                    name={item.name}
                    rating={item.rating}
                    reviewCount={item.reviewCount}
                    deliveryMinutes={item.minutes}
                    deliveryFeeText="$0 Delivery fee over $30"
                    price={item.price}
                    isInCart={cart.has(item.id)}
                    isFavorite={favorites.has(item.id)}
                    onFavoriteToggle={() => toggleFav(item.id)}
                    onAddToCart={() => toggleCart(item.id)}
                    onClick={() => navigate(`/product/${item.id}`)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cart bar */}
      {cart.size > 0 && (
        <CartBar
          itemCount={cart.size}
          totalPrice={cartTotal}
          onView={() => showToast('Checkout coming soon…', 'info')}
          className="food-cart-bar food-slide-up"
        />
      )}

      <BottomNavBar
        activeItem={activeNav}
        onNavigate={setActiveNav}
        className="food-bottom-nav"
      />
    </div>
  );
}
