import { LucideIcon } from 'lucide-react';

interface QuickActionButtonProps {
  icon: LucideIcon;
  label: string;
  color: string;
  onClick: () => void;
}

export function QuickActionButton({ icon: Icon, label, color, onClick }: QuickActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2"
    >
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center ${color} text-white shadow-md hover:shadow-lg transition-shadow`}
      >
        <Icon className="h-7 w-7" />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
