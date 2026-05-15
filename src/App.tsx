import { useState } from 'react';
import { UtensilsCrossed, ShoppingCart, Tag } from 'lucide-react';
import {
  // Atoms
  Spinner,
  SkeletonLoader,
  CardSkeleton,
  DotLoader,
  Badge,
  VerifiedBadge,
  TrustedBadge,
  StarRating,
  SearchInput,
  FilterChip,
  DeliveryInfo,
  FreeDeliveryBadge,
  PriceTag,
  ErrorState,
  InlineError,
  InlineSuccess,
  EmptyState,
  ToastNotification,
  NutritionRow,
  // Inputs
  TextInput,
  // Molecules
  SizeSelector,
  CarouselDots,
  SectionHeader,
  HeroOrderCard,
  FoodCard,
  StaffPickCard,
  CartBar,
  StatRow,
  TabFilter,
  ProductInfo,
  // Organisms
  AppHeader,
  BottomNavBar,
  ProductDetailHeader,
  RestaurantProfileHeader,
  // Agentic
  AgentStatusBanner,
  // Existing components
  FoodAppButton,
  CategoryPill,
  ToppingSelector,
  OrderButton,
  type NavItemId,
} from './components/FoodDeliveryDesignSystem';

// ─── Section wrapper ─────────────────────────────────────────────────────────
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="space-y-4">
    <h2 className="border-b border-gray-200 pb-2 text-lg font-bold text-gray-800">
      {title}
    </h2>
    {children}
  </section>
);

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-wrap items-center gap-3">{children}</div>
);

// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeNav, setActiveNav] = useState<NavItemId>('home');
  const [selectedSize, setSelectedSize] = useState('Small');
  const [activeTab, setActiveTab] = useState('All Items');
  const [carouselIndex, setCarouselIndex] = useState(1);
  const [isListening, setIsListening] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [fav, setFav] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Top bar */}
      <div className="sticky top-0 z-40 border-b border-gray-200 bg-white px-4 py-3">
        <AppHeader
          deliveryAddress="Madhavaram Milk..."
          cartItemCount={4}
          onAddressChange={() => {}}
          onCartPress={() => {}}
        />
      </div>

      <div className="mx-auto max-w-2xl space-y-10 px-4 py-8">

        {/* ── Atoms ──────────────────────────────────────────────── */}
        <Section title="Loaders">
          <Row>
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="md" color="gray" />
          </Row>
          <Row>
            <DotLoader />
          </Row>
          <div className="space-y-2">
            <SkeletonLoader height="h-4" width="w-1/2" />
            <SkeletonLoader height="h-4" width="w-3/4" />
            <SkeletonLoader height="h-4" width="w-1/3" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </Section>

        <Section title="Badges">
          <Row>
            <Badge>Default</Badge>
            <Badge variant="success">Order confirmed</Badge>
            <Badge variant="warning">Busy</Badge>
            <Badge variant="error">Out of stock</Badge>
            <Badge variant="info">New</Badge>
            <TrustedBadge />
          </Row>
          <Row>
            <VerifiedBadge />
            <span className="text-sm text-gray-500">Verified badge</span>
          </Row>
        </Section>

        <Section title="Star Rating">
          <Row>
            <StarRating rating={4.5} reviewCount="50k+" size="md" />
            <StarRating rating={3} reviewCount={142} />
            <StarRating rating={5} showCount={false} />
          </Row>
        </Section>

        <Section title="Price Tag">
          <Row>
            <PriceTag price={9.99} size="sm" />
            <PriceTag price={30.99} size="md" />
            <PriceTag price={88.79} size="lg" />
          </Row>
        </Section>

        <Section title="Delivery Info">
          <Row>
            <DeliveryInfo minutes={15} />
            <DeliveryInfo minutes={30} />
            <FreeDeliveryBadge />
          </Row>
        </Section>

        <Section title="Notifications / Toasts">
          <div className="space-y-2">
            <ToastNotification type="success" message="Order placed successfully!" onDismiss={() => {}} />
            <ToastNotification type="error" message="Payment failed. Please retry." onDismiss={() => {}} />
            <ToastNotification type="warning" message="Restaurant closing in 10 mins." onDismiss={() => {}} />
            <ToastNotification type="info" message="Your rider is 2 mins away." onDismiss={() => {}} />
          </div>
        </Section>

        <Section title="Error / Empty States">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white shadow-sm">
              <ErrorState
                title="Couldn't load menu"
                message="Check your connection."
                onRetry={() => {}}
              />
            </div>
            <div className="rounded-2xl bg-white shadow-sm">
              <EmptyState
                icon={<UtensilsCrossed className="h-8 w-8 text-gray-400" />}
                title="No items found"
                message="Try a different category."
                action={
                  <FoodAppButton variant="ghost" size="sm">
                    Clear filters
                  </FoodAppButton>
                }
              />
            </div>
          </div>
        </Section>

        <Section title="Inline Validation">
          <div className="space-y-1">
            <InlineError message="Email address is required." />
            <InlineSuccess message="Phone number verified!" />
          </div>
        </Section>

        <Section title="Nutrition Row">
          <NutritionRow calories={385} diameter="10" portions={4} />
        </Section>

        {/* ── Inputs ─────────────────────────────────────────────── */}
        <Section title="Search Input">
          <SearchInput
            placeholder="What did you eat today?"
            onMicClick={() => setIsListening((v) => !v)}
            isListening={isListening}
          />
        </Section>

        <Section title="Filter Chips">
          <Row>
            <FilterChip label="Pickup" />
            <FilterChip label="Under 30 min" isActive />
            <FilterChip label="Price" />
            <FilterChip icon={<ShoppingCart className="h-3 w-3" />} label="Free delivery" />
          </Row>
        </Section>

        <Section title="Text Input">
          <div className="space-y-3">
            <TextInput label="Delivery address" placeholder="123 Main St" leftIcon={<Tag className="h-4 w-4" />} />
            <TextInput label="Promo code" placeholder="PIZZA20" successMessage="Promo applied — 20% off!" />
            <TextInput label="Phone number" placeholder="+1 555 0000" errorMessage="Invalid phone number." />
          </div>
        </Section>

        {/* ── Buttons ────────────────────────────────────────────── */}
        <Section title="Buttons — FoodAppButton">
          <Row>
            <FoodAppButton variant="primary" size="sm">Book Order</FoodAppButton>
            <FoodAppButton variant="primary">Book Order</FoodAppButton>
            <FoodAppButton variant="primary" size="lg">Book Order</FoodAppButton>
          </Row>
          <Row>
            <FoodAppButton variant="secondary">Rate Item</FoodAppButton>
            <FoodAppButton variant="ghost">See menu</FoodAppButton>
            <FoodAppButton variant="error">Cancel</FoodAppButton>
          </Row>
          <Row>
            <FoodAppButton variant="primary" isLoading>Processing…</FoodAppButton>
            <FoodAppButton variant="agent-thinking">Agent thinking</FoodAppButton>
            <FoodAppButton variant="primary" isSuccess>Confirmed</FoodAppButton>
            <FoodAppButton variant="primary" isError>Failed</FoodAppButton>
          </Row>
        </Section>

        <Section title="Order Button">
          <OrderButton label="Book Order $30.99" className="w-full" />
        </Section>

        {/* ── Molecules ──────────────────────────────────────────── */}
        <Section title="Size Selector">
          <SizeSelector
            sizes={['Small', 'Medium', 'Large']}
            selectedSize={selectedSize}
            onSizeChange={setSelectedSize}
          />
        </Section>

        <Section title="Carousel Dots">
          <CarouselDots count={4} activeIndex={carouselIndex} onDotClick={setCarouselIndex} />
        </Section>

        <Section title="Tab Filter">
          <TabFilter
            tabs={[
              { label: 'All Items', icon: <UtensilsCrossed className="h-3.5 w-3.5" /> },
              { label: 'Popular' },
              { label: 'Exclusive Offers' },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </Section>

        <Section title="Hero Order Card">
          <HeroOrderCard
            name="Pepperoni Pizza"
            restaurant="Ali Hotels & Food"
            price={90}
            deliveryMinutes={15}
            isFreeDelivery
            onOrderTrack={() => {}}
          />
        </Section>

        <Section title="Category Pills">
          <div className="food-category-row">
            {['🍕 Pizza', '🍔 Burger', '🍪 Cookie', '🎂 Cake', '🌮 Tacos'].map((cat) => {
              const [icon, label] = cat.split(' ');
              return (
                <CategoryPill
                  key={label}
                  icon={icon}
                  label={label}
                  isSelected={label === 'Pizza'}
                />
              );
            })}
          </div>
        </Section>

        <Section title="Topping Selector">
          <div className="food-topping-row gap-3">
            {[
              { icon: '🍅', label: 'Tomato', active: true },
              { icon: '🧀', label: 'Cheese', active: false },
              { icon: '🍗', label: 'Chicken', active: false },
              { icon: '🥚', label: 'Egg', active: false },
              { icon: '🌶️', label: 'Chilli', outOfStock: true },
            ].map(({ icon, label, active, outOfStock }) => (
              <ToppingSelector
                key={label}
                icon={<span>{icon}</span>}
                label={label}
                isActive={active}
                isOutOfStock={outOfStock}
              />
            ))}
          </div>
        </Section>

        <Section title="Food Cards">
          <div className="grid grid-cols-2 gap-3">
            <FoodCard
              name="Delicious cheese pizza"
              rating={4.7}
              reviewCount="5k+"
              deliveryMinutes={25}
              price={50.99}
              isInCart={inCart}
              isFavorite={fav}
              onFavoriteToggle={() => setFav((v) => !v)}
              onAddToCart={() => setInCart((v) => !v)}
            />
            <FoodCard
              name="Pepperoni pizza"
              rating={4.7}
              reviewCount="450"
              deliveryMinutes={15}
              price={50.99}
            />
          </div>
        </Section>

        <Section title="Staff Pick Cards">
          <div className="food-scroll-x">
            <StaffPickCard name="Delicious cheese pizza" rating={4.2} price={50} deliveryMinutes={15} />
            <StaffPickCard name="Pepperoni pizza" rating={4.7} price={50} deliveryMinutes={15} />
          </div>
        </Section>

        <Section title="Stat Row">
          <StatRow priceRange="$10 - $100" satisfactionPercent={95} deliveryMinutes={15} />
        </Section>

        <Section title="Product Info">
          <ProductInfo
            name="Caprese Pizza"
            subtitle="With Tomato Flavour"
            rating={4.5}
            reviewCount={4.5}
            price={30.99}
          />
        </Section>

        <Section title="Cart Bar">
          <CartBar itemCount={4} totalPrice={88.79} onView={() => {}} />
        </Section>

        {/* ── Organisms ──────────────────────────────────────────── */}
        <Section title="Product Detail Header">
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <ProductDetailHeader
              restaurantName="Domino's"
              restaurantLabel="Food Store"
              isFavorite={fav}
              onFavoriteToggle={() => setFav((v) => !v)}
              onShare={() => {}}
              onClose={() => {}}
            />
          </div>
        </Section>

        <Section title="Restaurant Profile Header">
          <RestaurantProfileHeader
            name="Domino's"
            isVerified
            isTrusted
            rating={4.7}
            reviewCount="50k+"
            priceRange="$10 - $100"
            satisfactionPercent={95}
            deliveryMinutes={15}
            onBack={() => {}}
            onShare={() => {}}
            onMessage={() => {}}
            onCall={() => {}}
          />
        </Section>

        {/* ── Agentic ────────────────────────────────────────────── */}
        <Section title="Agent Status Banner">
          <div className="space-y-2">
            <AgentStatusBanner status="thinking" message="Finding the best match for you…" />
            <AgentStatusBanner status="success" message="Order submitted successfully!" />
            <AgentStatusBanner status="error" message="Agent couldn't complete the order." />
          </div>
        </Section>

      </div>

      {/* Bottom nav */}
      <BottomNavBar
        activeItem={activeNav}
        onNavigate={setActiveNav}
        className="food-bottom-nav"
      />
    </div>
  );
}
