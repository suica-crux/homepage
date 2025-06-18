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
  let borderColor = 'border-blue-500';
  let bgColor = 'bg-blue-100';
  let textColor = 'text-blue-800';
  let Icon = InformationCircleIcon;

  if (type === 'warn') {
    borderColor = 'border-yellow-500';
    bgColor = 'bg-yellow-100';
    textColor = 'text-yellow-800';
    Icon = ExclamationTriangleIcon;
  } else if (type === 'caution') {
    borderColor = 'border-red-500';
    bgColor = 'bg-red-100';
    textColor = 'text-red-800';
    Icon = XCircleIcon;
  }

  return (
    <div
      className={`flex items-start gap-3 border ${borderColor} ${bgColor} ${textColor} p-4 my-4 rounded-lg`}
    >
      <Icon className={`w-6 h-6 mt-1 shrink-0 ${textColor}`} />
      <p>{children}</p>
    </div>
  );
}
