'use client';

export default function Button({ onClick }: { onClick: () => void }) {
  return <button onClick={onClick}>Click me</button>;
}
