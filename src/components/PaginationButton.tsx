import { PropsWithChildren, useMemo } from "react";

type Props = PropsWithChildren & {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
};

const PaginationButton = ({ onClick, isActive, disabled, children }: Props) => {
  const className = useMemo(() => {
    let array = ["page-item"];

    if (isActive) {
      array.push("active");
    } else if (disabled) {
      array.push("disabled");
    }

    return array.join(" ");
  }, [disabled, isActive]);

  return (
    <li className={className}>
      <button className="page-link" onClick={onClick}>
        {children}
      </button>
    </li>
  );
};

export default PaginationButton;
