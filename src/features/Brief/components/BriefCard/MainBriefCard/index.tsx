import classnames from "classnames";
import React, { FC } from "react";
import { IBriefCardProps } from "..";
import { useRouter } from "next/router";
import { BriefImage } from "../../BriefImage";

const MainBriefCard: FC<IBriefCardProps> = ({
  brief,
  footer,
  withFooter = false,
  changeRouteToBriefOff = true,
  ...props
}) => {
  const { main_image } = brief;
  const router = useRouter();
  const changeRouteToBrief = () => {
    if (changeRouteToBriefOff) {
      router.push(`/briefs/${brief.id}`);
    }
  };
  return (
    <div
      className={classnames(
        props.className ?? "my-1 rounded-8",
        "cursor-pointer primary-rounded-box bg-transparent transition-all duration-300",
        props?.isSummary ? "" : "",
        props?.shadowOff
          ? ""
          : "hover:border-transparent hover:bg-background-primary hover:shadow-md hover:shadow-primary"
      )}
      style={{ height: "90%" }}
    >
      <button
        onClick={changeRouteToBrief}
        className="flex flex-col justify-end items-stretch brief-card w-full"
      >
        <BriefImage
          image={main_image ?? ""}
          name={brief.name}
          className="brief-card-image-mobile"
          imageClassName="w-full h-full object-cover"
        />
        <div className="flex flex-col justify-between text-left py-1 brief-card-content">
          <div
            className="font-semibold text-16 line-clamp-2"
            title={brief.name}
          >
            {brief.name}
          </div>
          {props?.children && <div>{props.children}</div>}
          <div className="text-left justify-center items-start pt-2 dir-ltr">
            <span className={classnames("text-disabledText")}>
              {brief.description}
            </span>
          </div>
        </div>
      </button>
      {props?.iconComponent && props?.iconComponent()}
    </div>
  );
};

export default MainBriefCard;
