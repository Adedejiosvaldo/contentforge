"use client";

import React, { InputHTMLAttributes } from 'react';

type StyledInputProps = InputHTMLAttributes<HTMLInputElement> & {
  darkMode?: boolean;
};

export default function StyledInput({darkMode = false, ...props}: StyledInputProps) {
  return (
    <input
      {...props}
      style={{
        color: darkMode ? '#ffffff' : '#000000',
        WebkitTextFillColor: darkMode ? '#ffffff' : '#000000',
        ...props.style
      }}
    />
  );
}
