import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    rtl
    speed={3}
    height={124}
    style={{ width: "100%", height: "100%" }}
    viewBox="0 0 250 124"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
    <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
    <rect x="1" y="114" rx="3" ry="3" width="178" height="6" />
    <circle cx="20" cy="20" r="20" />
    <rect x="-1" y="95" rx="3" ry="3" width="380" height="6" />
  </ContentLoader>
);

export default MyLoader;
