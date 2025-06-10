import {
  InformationCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';

interface AlertProps {
  type?: 'info' | 'warn' | 'caution';
  children: React.ReactNode;
}

export default function Alert({ children, type = 'info' }: AlertProps) {
  let borderColour = 'border-blue-500';
  let bgColour = 'bg-blue-100';
  let textColour = 'text-blue-800';
  let Icon = InformationCircleIcon;

  if (type === 'warn') {
    borderColour = 'border-yellow-500';
    bgColour = 'bg-yellow-100';
    textColour = 'text-yellow-800';
    Icon = ExclamationTriangleIcon;
  } else if (type === 'caution') {
    borderColour = 'border-red-500';
    bgColour = 'bg-red-100';
    textColour = 'text-red-800';
    Icon = XCircleIcon;
  }

  return (
    <div
      className={`flex items-start gap-3 border ${borderColour} ${bgColour} ${textColour} p-4 my-4 rounded-lg`}
    >
      <Icon className={`w-6 h-6 mt-1 shrink-0 ${textColour}`} />
      <p>{children}</p>
    </div>
  );
}
