import { ReactNode } from "react";
import cx from "classnames";

export default function EmptyTemplate({ children }: { children: ReactNode }) {
  return <div className={cx()}>{children}</div>;
}
