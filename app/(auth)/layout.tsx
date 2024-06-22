import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h2>auth layout</h2>
      <div>{children}</div>
    </div>
  );
};

export default AuthLayout;
