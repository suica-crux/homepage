import React from 'react';

type TextProperty =
  | {
      children?: React.ReactNode;
      className?: string;
      size?: 'normal' | 'sm' | 'xl';
      type: 'norm' | 'error';
      color?: never;
    }
  | {
      children?: React.ReactNode;
      className?: string;
      size?: 'normal' | 'sm' | 'xl';
      color?: 'norm' | 'gray' | 'blue' | 'red';
      type?: never;
    };

export default function Text(props: TextProperty) {
  // props から値を取り出す、
  // typeはundefinedでも'norm'でも「実質的な」挙動が変わらないからこそこれで通じる。やったね
  const { children, className = '', type = 'norm', size } = props;

  const textColor =
    props.type === 'error' || props.color === 'red'
      ? 'text-red-600 dark:text-red-400'
      : props.type === 'norm' ||
          props.color === 'norm' ||
          (props.type === undefined && props.color === undefined)
        ? 'text-main-text opacity-70'
        : props.color === 'blue'
          ? 'text-accent'
          : 'text-main-text opacity-50'; //例外処理が必ず必要らしいからとりあえずgray入れたんだけどこれどうしよう
  const textSize = size === 'sm' ? 'text-sm' : size === 'xl' ? 'text-xl' : 'text-base';

  const classNames =
    type === 'error'
      ? `${className} ${textColor} ${textSize} text-sm font-bold tracking-widest mb-4`
      : `${className} ${textColor} ${textSize} text-lg leading-relaxed text-pretty`;

  return <p className={classNames}>{children}</p>;
}
