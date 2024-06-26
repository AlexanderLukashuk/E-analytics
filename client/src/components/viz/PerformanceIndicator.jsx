import React from "react";
import { IDataset, IKPI } from "../../types.tsx";
import styles from "../../styles/Components.module.scss";
import { parseFunc } from "../../utils/parseFunc.ts";
import { ErrorBoundary } from "../layout/ErrorBoundary.tsx";
import { formatNumber } from "../../utils/numberFormatter.ts";

export function PerformanceIndicator(
  props: React.PropsWithChildren<{
    config: IKPI;
    data: IDataset;
  }>
) {
  const myEvalFunction = React.useMemo(() => {
    return parseFunc(props.config.javascriptFunction, (data: IDataset) => 0);
  }, [props.config]);

  const value = React.useMemo(() => {
    const val = myEvalFunction(props.data);
    if (typeof val === "number") return formatNumber(val);
    return val;
  }, [myEvalFunction, props.data]);

  return (
    <ErrorBoundary>
      <div className={styles.performanceIndicator}>
        <div className={styles.label}>
          {props.config.title.replace("Average", "Avg.")}
        </div>
        <div className={styles.value}>{value}</div>
      </div>
    </ErrorBoundary>
  );
}
