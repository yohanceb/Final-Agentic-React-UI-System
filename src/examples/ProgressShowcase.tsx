import { useState } from 'react';
import {
  ProgressBar,
  ProgressCircle,
  SectionHeader,
  Badge,
  type ProgressStatus,
} from '../components/FoodDeliveryDesignSystem';
import '../styles/food-delivery-design-system.css';

const STATES: { status: ProgressStatus; label: string; badge: 'default' | 'success' | 'error' | 'warning' | 'info' }[] = [
  { status: 'loading', label: 'Loading',  badge: 'default' },
  { status: 'default', label: 'Default',  badge: 'default' },
  { status: 'success', label: 'Success',  badge: 'success' },
  { status: 'error',   label: 'Error',    badge: 'error'   },
  { status: 'warning', label: 'Warning',  badge: 'warning' },
  { status: 'info',    label: 'Info',     badge: 'info'    },
];

export default function ProgressShowcase() {
  const [value, setValue] = useState(65);

  return (
    <div className="food-page">
      <div className="flex-1 overflow-y-auto px-5 pt-10 pb-10 space-y-8">

        <div>
          <h1 className="food-heading-2 mb-1">Progress Components</h1>
          <p className="food-body-sm">Loading bars and circles with all system states.</p>
        </div>

        {/* Progress Bar — all states */}
        <section className="space-y-4">
          <SectionHeader title="Progress Bar — States" />
          {STATES.map(({ status, label }) => (
            <ProgressBar
              key={status}
              value={status === 'loading' ? undefined : value}
              status={status}
              size="md"
              label={label}
              showLabel
            />
          ))}
        </section>

        {/* Progress Bar — sizes */}
        <section className="space-y-3">
          <SectionHeader title="Progress Bar — Sizes" />
          <ProgressBar value={value} status="success" size="sm" label="Small (sm)" />
          <ProgressBar value={value} status="success" size="md" label="Medium (md)" />
          <ProgressBar value={value} status="success" size="lg" label="Large (lg)" />
        </section>

        {/* Value slider */}
        <section className="space-y-2">
          <SectionHeader title="Adjust Value" />
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={100}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="flex-1 accent-green-500"
            />
            <span className="w-10 text-right text-sm font-semibold text-gray-700">{value}%</span>
          </div>
        </section>

        {/* Progress Circle — all states */}
        <section className="space-y-4">
          <SectionHeader title="Progress Circle — States" />
          <div className="flex flex-wrap gap-6">
            {STATES.map(({ status, label, badge }) => (
              <div key={status} className="flex flex-col items-center gap-2">
                <ProgressCircle
                  value={status === 'loading' ? undefined : value}
                  status={status}
                  size="md"
                  showValue
                />
                <Badge variant={badge}>{label}</Badge>
              </div>
            ))}
          </div>
        </section>

        {/* Progress Circle — sizes */}
        <section className="space-y-4">
          <SectionHeader title="Progress Circle — Sizes" />
          <div className="flex items-end gap-8">
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <ProgressCircle value={value} status="success" size={size} showValue />
                <span className="text-xs text-gray-500">{size}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
