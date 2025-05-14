import React from "react";

const StarRating = ({ value, max = 5, size = 28 }) => {
  const stars = [];
  for (let i = 1; i <= max; i++) {
    const fill =
      value >= i
        ? "#ffc107"
        : value + 1 > i
        ? `url(#starGradient${i})`
        : "#e4e5e9";
    stars.push(
      <svg
        key={i}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={{ marginRight: 2 }}
      >
        <defs>
          <linearGradient id={`starGradient${i}`}>
            <stop
              offset={`${Math.round(
                Math.max(0, value - (i - 1)) * 100
              )}%`}
              stopColor="#ffc107"
            />
            <stop
              offset={`${Math.round(
                Math.max(0, value - (i - 1)) * 100
              )}%`}
              stopColor="#e4e5e9"
            />
          </linearGradient>
        </defs>
        <polygon
          points="12,2 15,9 22,9.3 17,14.1 18.5,21 12,17.5 5.5,21 7,14.1 2,9.3 9,9"
          fill={fill}
        />
      </svg>
    );
  }
  return <span style={{ verticalAlign: "middle" }}>{stars}</span>;
};

export default StarRating;