export default function buttonPlugin(cls) {
  if (cls === "chai-btn") {
    return `.chai-btn {
      padding: 10px 18px;
      border-radius: 12px;
      font-weight: 600;
      transition: all 0.2s ease;
      cursor: pointer;
    }

    .chai-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    }

    .chai-btn:active {
      transform: translateY(0);
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }\n`;
  }

  if (cls === "chai-btn-primary") {
  return `.chai-btn-primary {
    background: #3b82f6;
    color: white;
  }`;
}

if(cls === "chai-a"){
    return `a {
    text-decoration: none;
    color: inherit;
  }`
  }

  return null;
}