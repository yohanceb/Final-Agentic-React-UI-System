import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ProductDetailHeader,
  ProductInfo,
  NutritionRow,
  SizeSelector,
  ToppingSelector,
  OrderButton,
  BottomNavBar,
  AgentStatusBanner,
  ToastNotification,
  Badge,
  SkeletonLoader,
  StarRating,
  type NavItemId,
} from '../components/FoodDeliveryDesignSystem';

const PRODUCTS: Record<string, {
  name: string; subtitle: string; rating: number; reviewCount: number;
  price: number; calories: number; diameter: string; portions: number;
  description: string; emoji: string; tag: string;
}> = {
  'cheese-pizza': {
    name: 'Cheese Pizza', subtitle: 'With Extra Cheese',
    rating: 4.7, reviewCount: 5000, price: 50.99,
    calories: 420, diameter: '12', portions: 6,
    description: 'A golden, crispy crust layered with rich tomato sauce and a generous blanket of mozzarella. Simple, classic, and absolutely delicious every single time.',
    emoji: '🧀', tag: 'Best Seller',
  },
  'pepperoni': {
    name: 'Pepperoni Pizza', subtitle: 'Classic American Style',
    rating: 4.7, reviewCount: 450, price: 50.99,
    calories: 450, diameter: '12', portions: 6,
    description: 'Loaded with premium pepperoni slices on a bed of tangy tomato sauce and melted mozzarella. The all-time crowd favourite — order it once and you\'ll keep coming back.',
    emoji: '🍕', tag: 'Trending',
  },
  'caprese': {
    name: 'Caprese Pizza', subtitle: 'With Tomato Flavour',
    rating: 4.5, reviewCount: 4.5, price: 30.99,
    calories: 385, diameter: '10', portions: 4,
    description: 'This quick and easy three-cheese Caprese pizza comes together in less than 30 minutes for a fresh, fun dinner that your whole family will love.',
    emoji: '🍅', tag: 'Chef\'s Pick',
  },
  'margherita': {
    name: 'Margherita Pizza', subtitle: 'Traditional Italian',
    rating: 4.3, reviewCount: 320, price: 24.99,
    calories: 310, diameter: '10', portions: 4,
    description: 'The original Neapolitan pizza. San Marzano tomatoes, fresh basil, and buffalo mozzarella on a thin hand-tossed crust baked to perfection.',
    emoji: '🌿', tag: 'Light',
  },
};

const TOPPINGS = [
  { icon: '🍅', label: 'Tomato' },
  { icon: '🧀', label: 'Cheese' },
  { icon: '🍗', label: 'Chicken' },
  { icon: '🥚', label: 'Egg' },
  { icon: '🌶️', label: 'Chilli', outOfStock: true },
  { icon: '🫑', label: 'Pepper' },
];

export default function ProductDetailPage() {
  const { id = 'caprese' } = useParams();
  const navigate             = useNavigate();
  const product              = PRODUCTS[id] ?? PRODUCTS['caprese'];

  const [activeNav, setActiveNav]           = useState<NavItemId>('home');
  const [selectedSize, setSelectedSize]     = useState('Small');
  const [selectedToppings, setToppings]     = useState<Set<string>>(new Set(['Tomato']));
  const [isFav, setIsFav]                   = useState(false);
  const [loading, setLoading]               = useState(true);
  const [orderStatus, setOrderStatus]       = useState<'idle' | 'thinking' | 'success' | 'error'>('idle');
  const [toast, setToast]                   = useState<{ msg: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Simulate product detail fetch
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, [id]);

  const showToast = (msg: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleTopping = (label: string) => {
    setToppings((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  };

  const handleOrderComplete = () => {
    setOrderStatus('thinking');
    setTimeout(() => {
      setOrderStatus('success');
      showToast('Order confirmed! Track it in real time ✓');
      setTimeout(() => {
        setOrderStatus('idle');
        navigate('/');
      }, 2000);
    }, 2000);
  };

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

      <div className="flex-1 overflow-y-auto pb-32">
        {/* Header */}
        <div className="px-5 pt-12">
          {loading ? (
            <div className="flex items-center gap-3">
              <SkeletonLoader width="w-10" height="h-10" rounded="xl" />
              <div className="flex-1 space-y-1.5">
                <SkeletonLoader height="h-4" width="w-1/3" />
                <SkeletonLoader height="h-3" width="w-1/4" />
              </div>
              <div className="flex gap-2">
                {[1,2,3].map(i => <SkeletonLoader key={i} width="w-9" height="h-9" rounded="full" />)}
              </div>
            </div>
          ) : (
            <ProductDetailHeader
              restaurantName="Domino's"
              restaurantLabel="Food Store"
              isFavorite={isFav}
              onFavoriteToggle={() => {
                setIsFav((v) => !v);
                showToast(isFav ? 'Removed from favourites' : 'Saved to favourites ♥');
              }}
              onShare={() => showToast('Link copied to clipboard', 'info')}
              onClose={() => navigate(-1)}
              className="food-fade-in"
            />
          )}
        </div>

        {/* Product image */}
        <div className="flex items-center justify-center mt-6 mb-2 px-5">
          {loading ? (
            <SkeletonLoader width="w-56" height="h-56" rounded="full" />
          ) : (
            <div className="relative flex items-center justify-center food-fade-in">
              <div className="h-56 w-56 rounded-full bg-green-100 flex items-center justify-center shadow-inner">
                <span className="text-8xl food-float select-none">{product.emoji}</span>
              </div>
              <span className="absolute -top-3 right-8 text-2xl rotate-12 select-none opacity-70">🌿</span>
              <span className="absolute bottom-2 -left-4 text-xl -rotate-12 select-none opacity-70">🌱</span>
              {/* Tag badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                <Badge variant="warning" size="md">{product.tag}</Badge>
              </div>
            </div>
          )}
        </div>

        {/* Agent banner for order processing */}
        {orderStatus !== 'idle' && (
          <div className="px-5 mt-4">
            <AgentStatusBanner
              status={orderStatus === 'thinking' ? 'thinking' : 'success'}
              message={
                orderStatus === 'thinking'
                  ? 'Agent is placing your order…'
                  : 'Order placed! Redirecting…'
              }
              className="food-fade-in"
            />
          </div>
        )}

        {/* Content */}
        <div className="px-5 mt-6 space-y-5">
          {loading ? (
            <>
              <div className="space-y-2">
                <SkeletonLoader height="h-7" width="w-2/3" />
                <SkeletonLoader height="h-4" width="w-1/2" />
                <SkeletonLoader height="h-4" width="w-1/3" />
                <SkeletonLoader height="h-8" width="w-1/4" />
              </div>
              <div className="flex gap-8">
                <div className="space-y-1"><SkeletonLoader height="h-3" width="w-14" /><SkeletonLoader height="h-5" width="w-20" /></div>
                <div className="space-y-1"><SkeletonLoader height="h-3" width="w-20" /><SkeletonLoader height="h-5" width="w-24" /></div>
              </div>
              <div className="flex gap-2">
                {[1,2,3].map(i => <SkeletonLoader key={i} width="w-20" height="h-10" rounded="xl" />)}
              </div>
            </>
          ) : (
            <>
              {/* Name, rating, price */}
              <ProductInfo
                name={product.name}
                subtitle={product.subtitle}
                rating={product.rating}
                reviewCount={product.reviewCount}
                price={product.price}
                className="food-fade-in"
              />

              {/* Nutrition */}
              <NutritionRow
                calories={product.calories}
                diameter={product.diameter}
                portions={product.portions}
                className="food-fade-in"
              />

              <div className="h-px bg-gray-100" />

              {/* Size */}
              <div className="food-fade-in">
                <p className="text-sm font-semibold text-gray-700 mb-2">Size</p>
                <SizeSelector
                  sizes={['Small', 'Medium', 'Large']}
                  selectedSize={selectedSize}
                  onSizeChange={(s) => {
                    setSelectedSize(s);
                    showToast(`${s} size selected`, 'info');
                  }}
                />
              </div>

              {/* Toppings */}
              <div className="food-fade-in">
                <p className="text-sm font-semibold text-gray-700 mb-3">Topping</p>
                <div className="food-topping-row gap-3">
                  {TOPPINGS.map(({ icon, label, outOfStock }) => (
                    <ToppingSelector
                      key={label}
                      icon={<span>{icon}</span>}
                      label={label}
                      isActive={selectedToppings.has(label)}
                      isOutOfStock={outOfStock}
                      onSelect={(l) => {
                        toggleTopping(l);
                        if (!outOfStock) showToast(`${l} ${selectedToppings.has(l) ? 'removed' : 'added'}`, 'info');
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Reviews snapshot */}
              <div className="food-fade-in rounded-2xl bg-white p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-800">Reviews</p>
                  <StarRating rating={product.rating} reviewCount={`${product.reviewCount}`} size="md" />
                </div>
                {[
                  { name: 'Maria G.', stars: 5, comment: 'Absolutely amazing, will order again!' },
                  { name: 'James K.', stars: 4, comment: 'Great flavour, arrived hot and fresh.' },
                ].map(({ name, stars, comment }) => (
                  <div key={name} className="border-t border-gray-100 pt-3">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-xs font-semibold text-gray-700">{name}</p>
                      <StarRating rating={stars} showCount={false} size="sm" />
                    </div>
                    <p className="text-xs text-gray-500">{comment}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="food-fade-in">
                <p className="text-sm font-semibold text-gray-800 mb-1">Description</p>
                <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Book order CTA */}
      <div
        className="food-safe-bottom px-5 pb-4 pt-3 bg-[#F0FDF4] border-t border-gray-100"
        style={{ position: 'sticky', bottom: 0, zIndex: 50 }}
      >
        {loading ? (
          <SkeletonLoader height="h-14" rounded="2xl" />
        ) : (
          <OrderButton
            label={`Book Order $${product.price.toFixed(2)}`}
            className="w-full food-fade-in"
            onIntentComplete={handleOrderComplete}
            disabled={orderStatus !== 'idle'}
          />
        )}
      </div>

      <BottomNavBar
        activeItem={activeNav}
        onNavigate={setActiveNav}
        className="food-bottom-nav"
      />
    </div>
  );
}
