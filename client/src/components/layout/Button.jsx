import styles from "../../styles/Components.module.scss";
import { className } from "../../utils/className";

export function Buttons(
  props: React.PropsWithChildren<{
    className?: string;
    onClick?: () => void;
    outline?: boolean;
    disabled?: boolean;
  }>
) {

  return (
    <button
      className={className(
        styles.buttons,
        props.outline && styles.outline,
        props.disabled && styles.disabled,
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
