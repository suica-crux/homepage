import { Info, AlertTriangle, XCircle } from 'lucide-react';

type AlertProps = {
  type?: 'info' | 'warn' | 'caution';
  children: React.ReactNode;
}

export default function Alert({ children, type = 'info' }: AlertProps) {
  let borderColor = 'border-blue-500';
  let bgColor = 'bg-blue-100';
  let textColor = 'text-blue-800';
  let size = 'h-6 w-6';
  let Icon = Info;

  if (type === 'warn') {
    borderColor = 'border-yellow-500';
    bgColor = 'bg-yellow-100';
    textColor = 'text-yellow-800';
    size = 'h-9 w-9';
    Icon = XCircle;
  } else if (type === 'caution') {
    borderColor = 'border-red-500';
    bgColor = 'bg-red-100';
    textColor = 'text-red-800';
    Icon = AlertTriangle;
  }

  return (
    <div
      className={`flex items-start gap-3 border ${borderColor} ${bgColor} ${textColor} p-4 my-4 rounded-lg`}
    >
      <Icon className={`mt-1 shrink-0 ${size} ${textColor}`} />
      <p>{children}</p>
    </div>
  );
}
