import { Slider, Typography, useTheme } from "@mui/material";
import { Dispatch, FC, SetStateAction, ChangeEvent } from "react";

export type CustomizeSliderProps = {
  defaultAmount: number;
  minAmount: number;
  maxAmount: number;
  steps: number;
  selectedAmount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  unit: string;
};

const CustomizeSlider: FC<CustomizeSliderProps> = ({
  defaultAmount,
  selectedAmount,
  maxAmount,
  minAmount,
  setAmount,
  steps,
  unit,
}) => {
  const theme = useTheme();

  const handleRevertedAmount = (
    event: Event | ChangeEvent<HTMLInputElement>,
    setAmount: Dispatch<SetStateAction<number>>
  ) => {
    const target = event.target as HTMLInputElement;
    setAmount(maxAmount - (target.value as unknown as number) + minAmount);
  };

  const handleInputAmount = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    let value = parseInt(target.value) as unknown as number;
    if (value > maxAmount) value = maxAmount;
    if (value < minAmount || value === 0) value = minAmount;
    setAmount(value);
  };

  return (
    <div
      className="flex flex-row items-center justify-between gap-5"
      style={{ width: "85%" }}
    >
      <Slider
        track="inverted"
        size="medium"
        aria-label="Area"
        sx={{ width: "80%" }}
        defaultValue={maxAmount - defaultAmount + minAmount}
        value={maxAmount - selectedAmount + minAmount}
        valueLabelDisplay="off"
        onChange={(e) => handleRevertedAmount(e, setAmount)}
        step={steps}
        marks
        min={minAmount}
        max={maxAmount}
      />
      <div
        className="flex flex-row gap-2 p-2 px-3 rounded-6 items-center justify-center"
        style={{ background: theme.palette.secondary.light }}
      >
        <input
          name="amount"
          type="number"
          max={maxAmount}
          min={minAmount}
          style={{ background: theme.palette.secondary.light, width: 35 }}
          color="text.black"
          className="text-center outline-none"
          onChange={(e) => handleInputAmount(e)}
          value={selectedAmount}
        />
        <Typography color={theme.palette.secondary.main} variant="body1">
          {unit}
        </Typography>
      </div>
    </div>
  );
};
export default CustomizeSlider;
