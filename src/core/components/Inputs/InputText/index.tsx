import { Typography } from "@mui/material";
import classnames from "classnames";
import React, { memo, useState } from "react";
import Icon from "src/core/components/Icon";
import { IInputTextProps, TEXT_FIELD_TYPE } from "src/core/types/InputsTypes";

const InputText: React.FC<IInputTextProps> = (props) => {
  const {
    className,
    name,
    type,
    label,
    secondLabel,
    required,
    maxLength,
    hasSeprator,
    iconName,
    iconLeft,
    iconClassName,
    notPlaceHolderAsLabel,
    unit,
    removeError,
    placeholder,
    disabled,
    centered,
    left,
    autoComplete,
    autoFocus,
    inputclassname,
    beforeContent,
    onKeyPress,
    refInput,
    labelClassName,
    field = {},
    isError,
    value,
    defaultValue,
    handleChange,
    handleKeyUp,
    ...rest
  } = props;
  const [focused, setFocused] = useState<boolean>(false);
  
  return (
    <div
      className={classnames(
        "flex flex-col",
        disabled ? "opacity-40" : "",
        className
      )}
    >
      {label && (
        <div className={"flex iteme-center justify-between px-2 mb-2"}>
          {label && <h5 className={classnames("", labelClassName)}>{label}</h5>}
          {secondLabel && (
            <h6 className="text-btntext-thirdtext">{secondLabel}</h6>
          )}
        </div>
      )}
      <div
        className={classnames(
          "relative flex iteme-center py-4 px-2 rounded-12 duration-400 transition-[border] bordered",
          type !== TEXT_FIELD_TYPE.TEXTAREA ? "h-14" : "h-20",
          focused ? "border-primary-base" : ""
        )}
        style={{
          border: focused ? "solid 1.5px #BCBCBC" : "solid 1px #BCBCBC",
        }}
      >
        {iconName && (
          <Icon
            icon={iconName}
            size={rest?.iconSize ? rest.iconSize : 20}
            className={classnames(
              "absolute",
              !!beforeContent && beforeContent.length > 0 ? "ms-4" : "ms-3",
              iconClassName,
              value ? "text-secondry-base" : "text-secondry-fade",
              iconLeft ? "left-0" : "left-0"
            )}
          />
        )}
        {unit && <span className="absolute top-[35%] left-2">{unit}</span>}
        {!!beforeContent && beforeContent.length > 0 && (
          <div className="absolute me-10 pointer-events-none ">
            {beforeContent}
          </div>
        )}
        <input
          {...field}
          ref={refInput as React.LegacyRef<HTMLInputElement>}
          autoComplete={autoComplete?.toString()}
          autoFocus={autoFocus}
          type={type}
          placeholder={focused ? "" : placeholder}
          required={required}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          defaultValue={defaultValue}
          value={value}
          className={classnames(
            "break-words h-full focus:outline-none font-normal dir-ltr",
            unit ? "mr-4" : "",
            centered ? "text-center" : left ? "text-left" : "",
            inputclassname ?? "",
            !!beforeContent && beforeContent.length > 0
              ? "ps-14"
              : !iconName
              ? "ps-2"
              : "ps-10"
          )}
        />
      </div>
      {isError && !removeError && rest.errorMessage && (
        <div className="text-alert-negative text-12 mr-1 mt-1">
          <Typography
            color="error.main"
            variant="h1"
            sx={{
              marginRight: "0.25rem",
              fontSize: { xs: "12px", sm: "12px" },
              fontFamily: "dana-FaNum",
              fontWeight: "600",
            }}
          >
            {rest?.errorMessage as string}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default memo(InputText);
