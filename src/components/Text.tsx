'use client';

type TextProperty = {
  children?: React.ReactNode;
  size?: 'normal' | 'sm' | 'xl';
  color?: 'black' | 'gray' | 'blue' | 'red' | 'white';
  className?: string;
};

export default function Text({
  children,
  size = 'normal',
  color = 'black',
  className = '',
}: TextProperty) {
  // 文字サイズ
  const textSize = size === 'sm' ? 'text-sm' : size === 'xl' ? 'text-xl' : 'text-base';
  // 文字色
  const textColor =
    color === 'gray'
      ? 'text-gray-700'
      : color === 'blue'
        ? 'text-blue-500'
        : color === 'red'
          ? 'text-red-500'
          : color === 'white'
            ? 'text-white'
            : 'text-black';
  return <p className={`${className} ${textSize} ${textColor}`}>{children}</p>;
}
