import cx from "classnames";
import { ReactNode } from "react";

export default function Button({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      className={cx(
        className,
        "cursor-pointer rounded-full bg-black px-5 py-4 text-[#F2F2F2] hover:opacity-70",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
