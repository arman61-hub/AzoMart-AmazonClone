import React from "react";

interface QuantitySelectorProps {
  quantity: number;
  maxStock: number;
  onChange: (quantity: number) => void;
  disabled?: boolean;
}

export default function QuantitySelector({
  quantity,
  maxStock,
  onChange,
  disabled = false,
}: QuantitySelectorProps) {
  const limit = Math.min(10, maxStock);
  const options = Array.from({ length: limit }, (_, i) => i + 1);

  return (
    <div className="flex items-center">
      <label htmlFor="quantity-select" className="sr-only">
        Quantity
      </label>
      <select
        id="quantity-select"
        value={quantity}
        onChange={(e) => onChange(parseInt(e.target.value))}
        disabled={disabled}
        className="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-amazon focus:border-amazon block px-3 py-1.5 cursor-pointer hover:bg-gray-200 transition-all font-semibold outline-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            Qty: {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
