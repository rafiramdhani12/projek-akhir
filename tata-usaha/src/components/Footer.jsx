import React from "react";

const Footer = () => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="footer footer-center p-4 bg-base-300 text-base-content">
      <h1>{formattedDate}</h1>
    </div>
  );
};

export default Footer;
