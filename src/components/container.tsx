import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col bg-white/5 ">
      {children}
    </div>
  );
}
