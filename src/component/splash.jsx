// SplashScreen.jsx
import React, { useEffect } from "react";
import logo from "/assets/logo.png"; // update path if needed

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #ffffff,#ffffff)",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "#005596",
          animation: "fadeIn 0.6s ease-out",
        }}
      >
        <div
          style={{
            width: 160,
            height: 160,
            margin: "0 auto 16px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={logo}
            alt="Prarambh Infra"
            style={{ maxWidth: "120px", maxHeight: "120px" }}
          />
        </div>
        <h2 style={{ margin: 0, letterSpacing: "0.12em", fontSize: 18 }}>
          WELCOME TO
        </h2>
        <h1
          style={{
            margin: "6px 0 0",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.16em",
          }}
        >
          PRARAMBH INFRA
        </h1>
        <p style={{ marginTop: 10, fontSize: 13, opacity: 0.85 }}>
          Loading your real estate dashboard...
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
