import { useNavigate } from 'react-router-dom';
import {
  FoodAppButton,
  Badge,
  ProgressBar,
  ProgressCircle,
  Spinner,
  DotLoader,
  ToastNotification,
  TextInput,
  SectionHeader,
} from '../components/FoodDeliveryDesignSystem';
import CategoryPill from '../components/CategoryPill';
import '../styles/food-delivery-design-system.css';
import { MapPin } from 'lucide-react';

interface HubCardProps {
  title: string;
  description: string;
  route: string;
  preview: React.ReactNode;
}

const HubCard = ({ title, description, route, preview }: HubCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gray-50 px-5 py-6 flex items-center justify-center min-h-36">
        {preview}
      </div>
      <div className="px-5 py-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-sm text-gray-900">{title}</p>
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        </div>
        <button
          type="button"
          onClick={() => navigate(route)}
          className="flex-shrink-0 rounded-xl bg-green-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-600 transition-colors"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default function DesignSystemHub() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F0FDF4] font-[Helvetica_Neue,Helvetica,Arial,sans-serif]">
      <div className="max-w-2xl mx-auto px-5 pt-12 pb-16 space-y-10">

        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Design System</h1>
            <Badge variant="success">Live</Badge>
          </div>
          <p className="text-sm text-gray-500">Food Delivery · Agentic UI · React + TypeScript</p>
        </div>

        {/* Component Showcases */}
        <section className="space-y-4">
          <SectionHeader title="Component Showcases" />
          <div className="grid grid-cols-1 gap-4">

            {/* Buttons */}
            <HubCard
              title="Buttons"
              description="FoodAppButton — all variants, sizes, loading, success and error states"
              route="/showcase/buttons"
              preview={
                <div className="flex flex-wrap gap-2 justify-center">
                  <FoodAppButton variant="primary" size="sm">Book Order</FoodAppButton>
                  <FoodAppButton variant="secondary" size="sm">Rate Item</FoodAppButton>
                  <FoodAppButton variant="agent-thinking" size="sm">Finding…</FoodAppButton>
                  <FoodAppButton variant="error" size="sm">Cancel</FoodAppButton>
                  <FoodAppButton variant="ghost" size="sm">View More</FoodAppButton>
                </div>
              }
            />

            {/* Inputs */}
            <HubCard
              title="Inputs"
              description="TextInput — label, helper text, error, success and icon states"
              route="/showcase/buttons"
              preview={
                <div className="w-full space-y-2 px-2">
                  <TextInput
                    label="Delivery address"
                    placeholder="123 Main St"
                    leftIcon={<MapPin className="h-4 w-4" />}
                  />
                  <TextInput
                    placeholder="Invalid address"
                    errorMessage="Address not found"
                  />
                </div>
              }
            />

            {/* Category Pills */}
            <HubCard
              title="Category Pills"
              description="CategoryPill — default, selected and agent-suggested states"
              route="/showcase/categories"
              preview={
                <div className="flex gap-3 justify-center">
                  <CategoryPill icon="🍕" label="Pizza" isSelected />
                  <CategoryPill icon="🍣" label="Sushi" isSuggested />
                  <CategoryPill icon="🍔" label="Burger" />
                </div>
              }
            />

            {/* Order Button */}
            <HubCard
              title="Order Button"
              description="OrderButton — default, loading and success state machine"
              route="/showcase/order"
              preview={
                <div className="flex gap-3 items-center">
                  <FoodAppButton variant="primary" size="lg">Book Order $30.99</FoodAppButton>
                </div>
              }
            />

            {/* Loading / Progress */}
            <HubCard
              title="Loading & Progress"
              description="ProgressBar and ProgressCircle — all 6 states with sm / md / lg sizes"
              route="/showcase/loading"
              preview={
                <div className="w-full px-2 space-y-3">
                  <ProgressBar value={72} status="success" size="md" label="Success" showLabel />
                  <ProgressBar value={40} status="error"   size="md" label="Error"   showLabel />
                  <ProgressBar status="loading" size="md" label="Loading" />
                  <div className="flex gap-4 justify-center pt-1">
                    <ProgressCircle value={72} status="success" size="sm" showValue />
                    <ProgressCircle value={40} status="warning" size="sm" showValue />
                    <ProgressCircle status="loading" size="sm" />
                    <ProgressCircle value={20} status="error"   size="sm" showValue />
                  </div>
                </div>
              }
            />
          </div>
        </section>

        {/* Atoms quick-reference */}
        <section className="space-y-4">
          <SectionHeader title="Atoms" />
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-5 space-y-5">

            {/* Badges */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Badge</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="trusted">Trusted</Badge>
              </div>
            </div>

            {/* Spinners */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Spinner</p>
              <div className="flex items-center gap-4">
                <Spinner size="sm" color="green" />
                <Spinner size="md" color="green" />
                <Spinner size="lg" color="green" />
                <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                  <Spinner size="sm" color="white" />
                </div>
              </div>
            </div>

            {/* Dot Loader */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">DotLoader</p>
              <DotLoader />
            </div>

            {/* Toasts */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Toast</p>
              <div className="space-y-2">
                <ToastNotification type="success" message="Order placed successfully!" />
                <ToastNotification type="error"   message="Payment failed. Try again." />
                <ToastNotification type="warning" message="Restaurant closing soon." />
                <ToastNotification type="info"    message="Delivery estimate updated." />
              </div>
            </div>
          </div>
        </section>

        {/* Food app link */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-sm text-gray-400 hover:text-green-600 transition-colors"
          >
            ← Back to Food App
          </button>
        </div>

      </div>
    </div>
  );
}
