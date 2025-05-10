"use client";

import React, { PropsWithChildren } from "react";
import ReactLenis from "lenis/react";

const Lenis = ({ children }: PropsWithChildren) => {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.4, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
};

export default Lenis;
