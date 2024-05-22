import React, { FC } from "react";
import { IDialogProps } from "src/core/types/GeneralTypes";
import CustomDialog from "src/core/components/CustomDialog";
import { navigationOption } from "src/core/utils/HOC/withPageHeader";
import strings from "src/translations/translations";
import { useRouter } from "next/router";

interface IMobileMenuNavigationProps extends IDialogProps {
  navigationOptions: navigationOption[];
}

const MobileMenuNavigation: FC<IMobileMenuNavigationProps> = ({
  navigationOptions,
  open: openMenu,
  handleClose,
}) => {
  const router = useRouter();

  const handleClick = (location: string) => {
    handleClose();
    router.push(location);
  };
  return (
    <CustomDialog
      open={openMenu}
      maxWidth={"lg"}
      onClose={handleClose}
      title={strings.menu.title}
    >
      <div className="flex flex-col w-full p-6 pt-4">
        {navigationOptions.map((optionMenu) => (
          <div
            key={optionMenu.id}
            className="w-full px-1 py-4 text-center text-btntext-secondrytext text-16 font-normal"
          >
            <button
              onClick={() => handleClick(optionMenu.href)}
              className="w-full h-full"
            >
              {optionMenu.title}
            </button>
          </div>
        ))}
      </div>
    </CustomDialog>
  );
};

export default MobileMenuNavigation;
