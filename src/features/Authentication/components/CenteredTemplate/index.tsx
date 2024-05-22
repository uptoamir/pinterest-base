import React from "react";

export interface ICenteredTemplateProps {
  children: React.ReactNode;
}

const CenteredTemplate: React.FC<ICenteredTemplateProps> = (props) => {
  return (
    <div className="flex flex-row justify-center items-center space-s-0 sm:space-s-0 md:space-s-16 h-full py-16">
      {props.children}
    </div>
  );
};

export default CenteredTemplate;
