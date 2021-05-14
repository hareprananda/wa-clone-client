import React from "react";
import { Circle } from "better-react-spinkit";

const Loading = () => {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <div>
        <img
          src="http://pngimg.com/uploads/whatsapp/whatsapp_PNG21.png"
          alt=""
          style={{ marginBottom: 10 }}
          height={"200"}
        />
        <div style={{ margin: "0 auto", width: "60px" }}>
          <Circle color="#3CBC28" size={60} />
        </div>
      </div>
    </div>
  );
};

export default Loading;
