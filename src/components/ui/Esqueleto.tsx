import React, { HTMLAttributes } from 'react';

export interface EsqueletoProps extends HTMLAttributes<HTMLDivElement> {
  largura?: string | number;
  altura?: string | number;
  redondo?: boolean;
}

export const Esqueleto: React.FC<EsqueletoProps> = ({
  largura,
  altura,
  redondo = false,
  className = '',
  style,
  ...props
}) => {
  return (
    <div
      aria-hidden="true"
      className={`bg-[var(--pergaminho-3)] animate-pulse ${
        redondo ? 'rounded-full' : 'rounded-md'
      } ${className}`}
      style={{
        width: largura,
        height: altura,
        ...style,
      }}
      {...props}
    />
  );
};
