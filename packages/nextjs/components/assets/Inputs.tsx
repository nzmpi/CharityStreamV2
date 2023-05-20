import { useMemo, useState } from "react";
import { CommonInputProps, InputBase, SIGNED_NUMBER_REGEX } from "~~/components/scaffold-eth";
import { useAppStore } from "~~/services/store/store";

/**
 * Input for ETH amount.
 */
export const Input = ({ value, name, placeholder, onChange }: CommonInputProps) => {
  const [transitoryDisplayValue, setTransitoryDisplayValue] = useState<string>();
  const ethPrice = useAppStore(state => state.ethPrice);

  // The displayValue is derived from the ether value that is controlled outside of the component
  const displayValue = useMemo(() => {
    const newDisplayValue = value;
    if (transitoryDisplayValue && parseFloat(newDisplayValue) === parseFloat(transitoryDisplayValue)) {
      return transitoryDisplayValue;
    }
    // Clear any transitory display values that might be set
    setTransitoryDisplayValue(undefined);
    return newDisplayValue;
  }, [ethPrice, transitoryDisplayValue, value]);

  const handleChangeNumber = (newValue: string) => {
    if (newValue && !SIGNED_NUMBER_REGEX.test(newValue)) {
      return;
    }

    // Since the display value is a derived state (calculated from the ether value), usdMode would not allow introducing a decimal point.
    // This condition handles a transitory state for a display value with a trailing decimal sign
    if (newValue.endsWith(".") || newValue.endsWith(".0")) {
      setTransitoryDisplayValue(newValue);
    } else {
      setTransitoryDisplayValue(undefined);
    }

    const newEthValue = newValue;
    onChange(newEthValue);
  };

  return (
    <InputBase
      name={name}
      value={displayValue}
      placeholder={placeholder}
      onChange={handleChangeNumber}
      prefix={<span className="pl-4 -mr-2 text-primary self-center">{name}</span>}
    />
  );
};