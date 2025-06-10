'use client';

type TextProperty = {
  children?: React.ReactNode;
  size?: 'normal' | 'sm' | 'xl';
  colour?: 'black' | 'gray' | 'blue' |'red' | 'white';
  className?: string;
};

export default function Text({
  children,
  size = 'normal',
  colour = 'black',
  className = '',
}: TextProperty) {
  // 文字サイズ
  const textSize =
    size === 'sm'
      ? 'text-sm'
      : size === 'xl'
      ? 'text-xl'
      : 'text-base';
  // 文字色
  const textColour =
    colour === 'gray'
      ? 'text-gray-700'
      : colour === 'blue'
      ? 'text-blue-500'
      : colour === 'red'
      ? 'text-red-500'
      : colour === 'white'
      ? 'text-white'
      : 'text-black';
  return <p className={`${className} ${textSize} ${textColour}`}>{children}</p>;
}
