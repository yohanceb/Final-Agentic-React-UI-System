import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Clock, DollarSign } from 'lucide-react';
import {
  AppHeader,
  BottomNavBar,
  SearchInput,
  FilterChip,
  HeroOrderCard,
  CarouselDots,
  SectionHeader,
  CategoryPill,
  StaffPickCard,
  CardSkeleton,
  SkeletonLoader,
  AgentStatusBanner,
  ToastNotification,
  Badge,
  type NavItemId,
} from '../components/FoodDeliveryDesignSystem';

const CATEGORIES = [
  { icon: '🍕', label: 'Pizza' },
  { icon: '🍔', label: 'Burger' },
  { icon: '🍪', label: 'Cookie' },
  { icon: '🎂', label: 'Cake' },
  { icon: '🌮', label: 'Tacos' },
  { icon: '🍜', label: 'Noodles' },
];

const STAFF_PICKS = [
  { id: 'cheese-pizza', name: 'Delicious cheese pizza', rating: 4.2, price: 50, minutes: 15 },
  { id: 'pepperoni',    name: 'Pepperoni pizza',        rating: 4.7, price: 50, minutes: 15 },
  { id: 'caprese',      name: 'Caprese pizza',          rating: 4.5, price: 30.99, minutes: 20 },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav]         = useState<NavItemId>('home');
  const [selectedCategory, setCategory]   = useState('Pizza');
  const [carouselIndex, setCarouselIndex] = useState(1);
  const [loading, setLoading]             = useState(true);
  const [agentStatus, setAgentStatus]     = useState<'thinking' | 'success' | 'idle'>('thinking');
  const [toast, setToast]                 = useState<string | null>(null);

  // Simulate initial data fetch
  useEffect(() => {
    const t1 = setTimeout(() => setAgentStatus('success'), 1400);
    const t2 = setTimeout(() => {
      setLoading(false);
      setAgentStatus('idle');
      showToast('Personalised picks loaded for you 🎉');
    }, 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCategorySelect = (label: string) => {
    setCategory(label);
    setAgentStatus('thinking');
    setTimeout(() => {
      setAgentStatus('success');
      setTimeout(() => setAgentStatus('idle'), 800);
    }, 1000);
  };

  return (
    <div className="food-page">
      {/* Toast */}
      {toast && (
        <div className="food-toast-container">
          <ToastNotification
            type="success"
            message={toast}
            onDismiss={() => setToast(null)}
            className="food-slide-up"
          />
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="px-5 pt-12 pb-4 bg-[#F0FDF4]">
          <AppHeader
            deliveryAddress="Madhavaram Milk..."
            cartItemCount={2}
            onAddressChange={() => showToast('Change delivery location')}
            onCartPress={() => navigate('/restaurant/dominos')}
          />

          {/* Search */}
          <SearchInput
            placeholder="What did you eat today?"
            onMicClick={() => showToast('Listening…')}
            className="mt-4"
          />

          {/* Filter chips */}
          <div className="food-scroll-x mt-3 pb-1">
            <FilterChip icon={<Truck className="h-3 w-3" />}    label="Pickup" />
            <FilterChip icon={<Clock className="h-3 w-3" />}    label="Under 30 min" isActive />
            <FilterChip icon={<DollarSign className="h-3 w-3" />} label="Price" />
          </div>
        </div>

        <div className="px-5 space-y-6 pb-28">
          {/* Agent status banner */}
          {agentStatus !== 'idle' && (
            <AgentStatusBanner
              status={agentStatus}
              message={
                agentStatus === 'thinking'
                  ? 'Agent is loading your personalised feed…'
                  : 'Your feed is ready!'
              }
              className="food-fade-in"
            />
          )}

          {/* Hero card */}
          <div>
            {loading ? (
              <SkeletonLoader height="h-28" rounded="3xl" />
            ) : (
              <HeroOrderCard
                name="Pepperoni Pizza"
                restaurant="Ali Hotels & Food"
                price={90}
                deliveryMinutes={15}
                isFreeDelivery
                onOrderTrack={() => navigate('/restaurant/dominos')}
                className="food-fade-in"
              />
            )}
            <CarouselDots
              count={4}
              activeIndex={carouselIndex}
              onDotClick={setCarouselIndex}
              className="mt-3"
            />
          </div>

          {/* Popular Category */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <SectionHeader title="Popular Category" onMore={() => {}} />
              <Badge variant="success">Live</Badge>
            </div>
            <div className="food-category-row">
              {CATEGORIES.map(({ icon, label }) => (
                <CategoryPill
                  key={label}
                  icon={icon}
                  label={label}
                  isSelected={selectedCategory === label}
                  onSelect={handleCategorySelect}
                />
              ))}
            </div>
          </div>

          {/* Staff Picks */}
          <div>
            <SectionHeader title="Staff Picks" onMore={() => {}} className="mb-3" />
            <div className="food-scroll-x">
              {loading
                ? [1, 2, 3].map((i) => (
                    <CardSkeleton key={i} className="w-44 flex-shrink-0" />
                  ))
                : STAFF_PICKS.map((item) => (
                    <StaffPickCard
                      key={item.id}
                      name={item.name}
                      rating={item.rating}
                      price={item.price}
                      deliveryMinutes={item.minutes}
                      className="w-44 food-fade-in"
                      onClick={() => navigate(`/product/${item.id}`)}
                    />
                  ))}
            </div>
          </div>

          {/* Near You section — skeleton only while loading */}
          <div>
            <SectionHeader title="Near You" onMore={() => {}} className="mb-3" />
            <div className="space-y-3">
              {loading
                ? [1, 2].map((i) => (
                    <div key={i} className="flex gap-3 items-center">
                      <SkeletonLoader width="w-16" height="h-16" rounded="2xl" />
                      <div className="flex-1 space-y-2">
                        <SkeletonLoader height="h-4" width="w-3/4" />
                        <SkeletonLoader height="h-3" width="w-1/2" />
                      </div>
                    </div>
                  ))
                : [
                    { label: "Domino's", sub: '15 min · $0 delivery', badge: 'Trending' },
                    { label: 'Ali Hotels & Food', sub: '20 min · Free delivery', badge: 'Popular' },
                  ].map(({ label, sub, badge }) => (
                    <button
                      key={label}
                      onClick={() => navigate('/restaurant/dominos')}
                      className="flex w-full gap-3 items-center rounded-2xl bg-white px-4 py-3 shadow-sm hover:shadow-md transition-shadow food-fade-in"
                    >
                      <div className="h-12 w-12 rounded-2xl bg-blue-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-lg">
                        D
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-sm text-gray-900">{label}</p>
                        <p className="text-xs text-gray-500">{sub}</p>
                      </div>
                      <Badge variant="warning">{badge}</Badge>
                    </button>
                  ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNavBar
        activeItem={activeNav}
        onNavigate={setActiveNav}
        className="food-bottom-nav"
      />
    </div>
  );
}
