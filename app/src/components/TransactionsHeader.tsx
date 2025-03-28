import cx from "classnames";

export default function TransactionsHeader() {
  return (
    <div
      className={cx(
        "mb-2 hidden w-full grid-cols-7 gap-2 border-b border-[#F2F2F2] px-4 py-2 text-xl text-[#F2F2F2] lg:grid",
      )}
    >
      <div>Title</div>
      <div className="col-span-2">Description</div>
      <div>From Account</div>
      <div>To Account</div>
      <div>Amount (USD)</div>
    </div>
  );
}
