import { ReactNode } from "react";
import cx from "classnames";

export default function Button({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      className={cx(
        className,
        "bg-black text-[#F2F2F2] px-5 py-4 rounded-full hover:opacity-70 cursor-pointer"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
