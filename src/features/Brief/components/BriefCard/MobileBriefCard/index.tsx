import classnames from "classnames";
import React, { FC } from "react";
import { IBriefCardProps } from "..";
import { useRouter } from "next/router";
import { Backdrop, CircularProgress } from "@mui/material";
import { BriefImage } from "../../BriefImage";

const MobileBriefCard: FC<IBriefCardProps> = ({
  brief,
  footer,
  withFooter = false,
  isLoading = false,
  changeRouteToBriefOff = true,
  ...props
}) => {
  const { name, main_image, description } = brief;
  const router = useRouter();

  const changeRouteToBrief = () => {
    if (changeRouteToBriefOff) {
      router.push(`/briefs/${brief.id}`);
    }
  };
  return (
    <div
      className={classnames(
        props.className,
        "flex flex-col justify-around py-2 my-1 cursor-pointer bg-transparent relative"
      )}
    >
      {isLoading && (
        <Backdrop
          sx={{
            zIndex: 10,
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          }}
          open={true}
        >
          <CircularProgress color="secondary" size={25} />
        </Backdrop>
      )}
      <button
        onClick={changeRouteToBrief}
        className="flex flex-col justify-end items-stretch brief-card"
      >
        <BriefImage
          image={main_image ?? ""}
          name={name}
          className="brief-card-image-mobile"
          imageClassName="w-full h-full object-cover"
        />
        <div className="flex flex-col justify-between text-left py-1 brief-card-content">
          <div className="font-semibold text-16 line-clamp-2" title={name}>
            {name}
          </div>
          {props?.children && <div>{props.children}</div>}
          <div className="text-right justify-center items-start pt-2">
            <span className={classnames("text-disabledText")}>
              {description}
            </span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default MobileBriefCard;
