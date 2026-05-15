# Food Delivery Agentic Design System

React + TypeScript component library for a food delivery app.
Font: **Helvetica Neue Normal** · Primary: `#22C55E` · Secondary: `#FACC15` · Error: `#EF4444`

---

## Quick start

```tsx
// main.tsx or App.tsx — import once
import './styles/food-delivery-design-system.css';
```

Every component lives in one file:

```tsx
import {
  AppHeader, BottomNavBar, SearchInput, FilterChip,
  HeroOrderCard, CategoryPill, FoodCard, StaffPickCard,
  ToppingSelector, SizeSelector, CartBar, TabFilter,
  ProductDetailHeader, RestaurantProfileHeader,
  FoodAppButton, Badge, StarRating, Spinner, ErrorState,
  AgentStatusBanner,
} from './components/FoodDeliveryDesignSystem';
```

---

## Design tokens

### CSS custom properties (`food-delivery-design-system.css`)

| Token | Value | Use |
|---|---|---|
| `--food-primary` | `#22C55E` | Buttons, active states, category selection |
| `--food-primary-light` | `#4ADE80` | Hover, gradient mid-stop |
| `--food-primary-dark` | `#16A34A` | Active/pressed |
| `--food-secondary` | `#FACC15` | Stars, agent-suggested borders |
| `--food-error` | `#EF4444` | Error states, destructive actions |
| `--food-info` | `#3B82F6` | Verified badge |
| `--food-bg-app` | `#F0FDF4` | Page background |
| `--food-surface-glass` | `rgba(255,255,255,0.7)` | Card/input backgrounds |
| `--food-font` | `"Helvetica Neue", Helvetica, Arial, sans-serif` | All text |

### TypeScript tokens (`src/tokens/foodApp.ts`)

```ts
import { FoodAppTokens, FoodAppColorPalette, Spacing, BorderRadius, Shadows } from './tokens/foodApp';
```

---

## Components

### Atoms

#### `<Spinner>`
```tsx
<Spinner size="sm" color="green" />
<Spinner size="md" color="white" />   // inside buttons
<Spinner size="lg" color="gray" />
```
Props: `size` (`sm` | `md` | `lg`) · `color` (`green` | `white` | `gray`)

---

#### `<SkeletonLoader>`
```tsx
<SkeletonLoader width="w-3/4" height="h-4" rounded="xl" />
```
Pair with `<CardSkeleton />` for full food-card placeholders.

---

#### `<DotLoader>`
Three animated green dots. Used in `AgentStatusBanner`.
```tsx
<DotLoader className="my-2" />
```

---

#### `<Badge>`
```tsx
<Badge variant="success">Order confirmed</Badge>
<Badge variant="error" size="md">Out of stock</Badge>
<Badge variant="trusted"><Heart className="h-3 w-3" /> Trusted</Badge>
```
Variants: `default` · `success` · `warning` · `error` · `info` · `trusted`

---

#### `<VerifiedBadge>` / `<TrustedBadge>`
```tsx
<VerifiedBadge />          // blue circle with white check
<TrustedBadge />           // orange pill with heart icon
```

---

#### `<StarRating>`
```tsx
<StarRating rating={4.5} reviewCount="50k+" size="md" />
<StarRating rating={4} showCount={false} />
```
Props: `rating` (0–5) · `reviewCount` · `size` (`sm` | `md`) · `showCount`

---

#### `<SearchInput>`
```tsx
<SearchInput
  placeholder="What did you eat today?"
  onMicClick={() => startVoiceSearch()}
  isListening={listening}
/>
```

---

#### `<FilterChip>`
```tsx
<FilterChip icon={<Truck className="h-3 w-3" />} label="Pickup" />
<FilterChip label="Under 30 min" isActive />
<FilterChip label="Price" />
```

---

#### `<DeliveryInfo>` / `<FreeDeliveryBadge>`
```tsx
<DeliveryInfo minutes={15} />
<FreeDeliveryBadge />
```

---

#### `<PriceTag>`
```tsx
<PriceTag price={30.99} size="lg" />   // "$30.99" large display
<PriceTag price={9.99} size="sm" />
```

---

#### `<ErrorState>`
Full-screen or section-level error with optional retry.
```tsx
<ErrorState
  title="Couldn't load menu"
  message="Check your connection."
  onRetry={() => refetch()}
/>
```

---

#### `<InlineError>` / `<InlineSuccess>`
Field-level validation feedback. Returns `null` when `message` is undefined.
```tsx
<InlineError message={errors.email} />
<InlineSuccess message="Email looks good!" />
```

---

#### `<EmptyState>`
```tsx
<EmptyState
  title="No results"
  message="Try a different search term."
  action={<FoodAppButton variant="ghost">Clear filters</FoodAppButton>}
/>
```

---

#### `<ToastNotification>`
```tsx
<ToastNotification type="success" message="Order placed!" onDismiss={dismiss} />
<ToastNotification type="error" message="Payment failed." onDismiss={dismiss} />
```
Types: `success` · `error` · `warning` · `info`
Wrap with the `.food-toast-container` CSS class for fixed positioning.

---

#### `<NutritionRow>`
```tsx
<NutritionRow calories={385} diameter="10" portions={4} />
```

---

### Inputs

#### `<TextInput>`
Full form field with label, helper text, and validation states.
```tsx
<TextInput
  label="Delivery address"
  placeholder="123 Main St"
  errorMessage={errors.address}
  leftIcon={<MapPin className="h-4 w-4" />}
  agentId="address-input"
/>
```

---

### Molecules

#### `<SizeSelector>`
```tsx
const [size, setSize] = useState('Small');
<SizeSelector
  sizes={['Small', 'Medium', 'Large']}
  selectedSize={size}
  onSizeChange={setSize}
/>
```

---

#### `<CarouselDots>`
```tsx
<CarouselDots count={4} activeIndex={current} onDotClick={setCurrent} />
```

---

#### `<SectionHeader>`
```tsx
<SectionHeader title="Popular Category" onMore={() => router.push('/categories')} />
<SectionHeader title="Staff Picks" />
```

---

#### `<HeroOrderCard>`
Featured item card — green background, price, restaurant, delivery meta, track button.
```tsx
<HeroOrderCard
  image="/images/pepperoni.jpg"
  name="Pepperoni Pizza"
  restaurant="Ali Hotels & Food"
  price={90}
  deliveryMinutes={15}
  isFreeDelivery
  onOrderTrack={() => router.push('/track')}
/>
```

---

#### `<FoodCard>`
Compact menu item card used in restaurant menus and search results.
```tsx
<FoodCard
  image="/images/cheese.jpg"
  name="Delicious cheese pizza"
  rating={4.7}
  reviewCount="5k+"
  price={50.99}
  isInCart={inCart}
  isFavorite={liked}
  onFavoriteToggle={toggleLike}
  onAddToCart={addToCart}
  onClick={() => router.push('/item/cheese')}
  agentId="food-card-cheese"
  agentContext={{ action: 'view_item', itemId: 'cheese-01' }}
  onAgentMutate={handleAgent}
/>
```

---

#### `<StaffPickCard>`
Wider card for editorial/staff-pick sections.
```tsx
<StaffPickCard
  image="/images/pepperoni.jpg"
  name="Pepperoni pizza"
  rating={4.7}
  price={50}
  deliveryMinutes={15}
  onClick={() => router.push('/item/pepperoni')}
/>
```

---

#### `<CartBar>`
Sticky "View your cart" bar (use with `.food-cart-bar` CSS class).
```tsx
<CartBar
  itemCount={4}
  totalPrice={88.79}
  onView={() => router.push('/cart')}
  className="food-cart-bar"
/>
```

---

#### `<StatBadge>` / `<StatRow>`
```tsx
<StatRow
  priceRange="$10 - $100"
  satisfactionPercent={95}
  deliveryMinutes={15}
/>

// Or individual badges:
<StatBadge value="$10 - $100" label="Price Range" />
```

---

#### `<TabFilter>`
Horizontal tab row (All Items / Popular / Exclusive Offers).
```tsx
const TABS = [
  { label: 'All Items', icon: <UtensilsCrossed className="h-3.5 w-3.5" /> },
  { label: 'Popular' },
  { label: 'Exclusive Offers' },
];
<TabFilter tabs={TABS} activeTab={tab} onTabChange={setTab} />
```

---

#### `<ProductInfo>`
Name, subtitle, star rating, and large price display.
```tsx
<ProductInfo
  name="Caprese Pizza"
  subtitle="With Tomato Flavour"
  rating={4.5}
  reviewCount={4.5}
  price={30.99}
/>
```

---

### Molecules (existing — re-exported)

#### `<CategoryPill>` (`src/components/CategoryPill.tsx`)
Vertical icon + label category button with selected and agent-suggested states.
```tsx
<CategoryPill
  icon="🍕"
  label="Pizza"
  isSelected
  isSuggested={false}
  onSelect={(label) => setCategory(label)}
/>
```

---

#### `<ToppingSelector>` (`src/components/ToppingSelector.tsx`)
Square topping button with active, out-of-stock, and auto-select states.
```tsx
<ToppingSelector
  icon={<span>🍅</span>}
  label="Tomato"
  isActive
  onSelect={(label) => addTopping(label)}
/>
```

---

### Organisms

#### `<AppHeader>`
Top navigation with user avatar, delivery address, and cart icon.
```tsx
<AppHeader
  avatarSrc="/images/avatar.jpg"
  deliveryAddress="Madhavaram Milk..."
  cartItemCount={3}
  onAddressChange={() => openAddressPicker()}
  onCartPress={() => router.push('/cart')}
/>
```

---

#### `<BottomNavBar>`
Fixed bottom tab bar (use with `.food-bottom-nav` CSS class).
```tsx
<BottomNavBar
  activeItem="home"
  onNavigate={(id) => router.push(`/${id}`)}
  className="food-bottom-nav"
/>
```
Nav items: `home` · `offers` · `notifications` · `profile`

---

#### `<ProductDetailHeader>`
Restaurant logo, name, food store label, favorite/share/close actions.
```tsx
<ProductDetailHeader
  restaurantLogo="/logos/dominos.svg"
  restaurantName="Domino's"
  isFavorite={liked}
  onFavoriteToggle={toggleLike}
  onShare={openShare}
  onClose={() => router.back()}
/>
```

---

#### `<RestaurantProfileHeader>`
Full restaurant profile block: hero image, back/search/share overlay, logo,
verified badge, trusted badge, rating, stat row (price · satisfaction · time).
```tsx
<RestaurantProfileHeader
  heroImage="/images/dominos-hero.jpg"
  logo="/logos/dominos.svg"
  name="Domino's"
  isVerified
  isTrusted
  rating={4.7}
  reviewCount="50k+"
  priceRange="$10 - $100"
  satisfactionPercent={95}
  deliveryMinutes={15}
  onBack={() => router.back()}
  onShare={openShare}
  onMessage={openChat}
  onCall={openDialer}
/>
```

---

### Buttons (existing — re-exported)

#### `<FoodAppButton>` (`src/components/FoodAppButton.tsx`)
```tsx
<FoodAppButton variant="primary" size="lg" onClick={bookOrder}>
  Book Order $30.99
</FoodAppButton>

<FoodAppButton variant="agent-thinking" isLoading>
  Finding best deal…
</FoodAppButton>

<FoodAppButton variant="error" isError>
  Payment failed — Retry
</FoodAppButton>
```
Variants: `primary` · `secondary` · `agent-thinking` · `error` · `ghost`
Sizes: `sm` · `md` · `lg`

---

### Agentic

#### `<AgentStatusBanner>`
Shown when an AI agent is actively working in the UI.
```tsx
<AgentStatusBanner status="thinking" message="Finding the best match…" />
<AgentStatusBanner status="success" message="Order submitted!" />
<AgentStatusBanner status="error" message="Agent couldn't complete the order." />
```
Statuses: `thinking` (animated gradient + dots) · `success` · `error` · `idle` (renders null)

---

## Agentic props (all components)

Every component accepts these optional props from `AgenticBaseProps`:

| Prop | Type | Purpose |
|---|---|---|
| `agentId` | `string` | Unique ID for agent targeting via `data-agent-id` |
| `agentContext` | `AgentContext` | Serialised to `data-agent-context` |
| `onAgentMutate` | `(ctx) => void` | Callback when agent requests a mutation |
| `disabled` | `boolean` | Standard disable |
| `className` | `string` | Tailwind class override |

---

## CSS utility classes

| Class | Effect |
|---|---|
| `.food-glass` | Frosted-glass surface (backdrop-filter + border) |
| `.food-scroll-x` | Horizontal snap-scroll row, hides scrollbar |
| `.food-category-row` | Category pill row with scroll |
| `.food-topping-row` | Topping selector row with scroll |
| `.food-bottom-nav` | Fixed bottom nav bar (centered, max 430px) |
| `.food-cart-bar` | Fixed cart bar above bottom nav |
| `.food-toast-container` | Fixed toast stack at top |
| `.food-page` | Full-height page shell (max 430px, centered) |
| `.food-safe-bottom` | Adds `env(safe-area-inset-bottom)` padding |
| `.food-shimmer` | Shimmer sweep animation |
| `.food-agent-thinking` | Animated gradient (agent thinking state) |
| `.food-float` | Gentle vertical float animation |
| `.food-slide-up` | Slide-up entry animation |
| `.food-fade-in` | Fade + scale-in entry animation |
| `.food-scale-pop` | Scale pop (success confirmation) |
| `.food-heading-1/2/3` | Helvetica Neue heading styles |
| `.food-body` / `.food-body-sm` | Body text styles |
| `.food-caption` / `.food-label` | Small text styles |
| `.food-line-clamp-1/2` | Text truncation helpers |

---

## Full page example

```tsx
import { useState } from 'react';
import {
  AppHeader, SearchInput, FilterChip, HeroOrderCard, SectionHeader,
  CategoryPill, StaffPickCard, BottomNavBar, NavItemId,
} from './components/FoodDeliveryDesignSystem';
import './styles/food-delivery-design-system.css';

export default function HomePage() {
  const [activeNav, setActiveNav] = useState<NavItemId>('home');

  return (
    <div className="food-page">
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-24 space-y-5">
        <AppHeader deliveryAddress="Madhavaram Milk..." cartItemCount={2} />

        <SearchInput placeholder="What did you eat today?" onMicClick={() => {}} />

        <div className="food-scroll-x">
          <FilterChip icon="🚗" label="Pickup" />
          <FilterChip label="Under 30 min" isActive />
          <FilterChip label="Price" />
        </div>

        <HeroOrderCard
          name="Pepperoni Pizza"
          restaurant="Ali Hotels & Food"
          price={90}
          onOrderTrack={() => {}}
        />

        <SectionHeader title="Popular Category" onMore={() => {}} />
        <div className="food-category-row">
          {['Pizza', 'Burger', 'Cookie', 'Cake'].map((cat) => (
            <CategoryPill key={cat} icon="🍕" label={cat} />
          ))}
        </div>

        <SectionHeader title="Staff Picks" onMore={() => {}} />
        <div className="food-scroll-x">
          <StaffPickCard name="Delicious cheese pizza" rating={4.2} price={50} />
          <StaffPickCard name="Pepperoni pizza" rating={4.7} price={50} />
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
```

---

## File structure

```
src/
  components/
    FoodDeliveryDesignSystem.tsx   ← all new components + re-exports
    FoodAppButton.tsx
    CategoryPill.tsx
    ToppingSelector.tsx
    OrderButton.tsx
    Button.tsx
  styles/
    food-delivery-design-system.css
  tokens/
    foodApp.ts
  types/
    agentic.ts
  utils/
    agentic.ts
  hooks/
    useAgenticState.ts
  examples/
    FoodAppButtonShowcase.tsx
    CategoryPillShowcase.tsx
    OrderButtonShowcase.tsx
```

---

## Hooks

### `useAgenticState`
```ts
const { state, setLoading, setError, setDirty, handleAgentMutate } = useAgenticState();
// state: { isLoading, isError, isDirty, validationErrors }
```

### `useAgentTracking`
```ts
const { context, updateContext } = useAgentTracking('my-component');
```

---

## Utilities

```ts
import { cn, generateAgentId, createAgentAttributes } from './utils/agentic';

cn('px-4', isActive && 'bg-green-500');
generateAgentId('food-card'); // "food-card-1715783942000-a1b2c3"
createAgentAttributes('btn-01', { action: 'book' });
// → { 'data-agent-id': 'btn-01', 'data-agent-context': '{"action":"book"}' }
```

---

Built for AI-first UI development.
