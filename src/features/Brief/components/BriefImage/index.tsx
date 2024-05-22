import classnames from "classnames";
import { FC, useState } from "react";

interface IBriefImageProps {
  image: string;
  name: string;
  className?: string;
  imageClassName?: string;
}

export const BriefImage: FC<IBriefImageProps> = ({
  image,
  name,
  className,
  imageClassName,
  ...props
}) => {
  const [src, setSrc] = useState(image);
  return (
    <div className={classnames(className ? className : "text-right relative")}>
      <img
        src={src}
        width={100}
        height={100}
        alt="image"
        className={classnames(
          imageClassName ? imageClassName : "h-20 min-w-20 m-auto rounded-6"
        )}
        onError={() => setSrc("/assets/No-Image-Placeholder.svg")}
      />
    </div>
  );
};
