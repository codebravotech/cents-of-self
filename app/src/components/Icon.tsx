import cx from "classnames";

export default function Icon({
  src,
  alt,
  onClick,
  className,
}: {
  src: string;
  alt: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={cx(className, "w-10 cursor-pointer hover:opacity-70")}
      onClick={onClick}
    />
  );
}
