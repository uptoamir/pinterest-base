import React from "react";
import { IOrderSteps } from "src/features/Authentication/types/AuthTypes";
import CenteredTemplate from "src/features/Authentication/components/CenteredTemplate";
import CenteredHeader from "src/features/Authentication/components/CenteredHeader";
import FormContainer from "src/features/Authentication/components/FormContainer";
import UserNameAndPasswordForm from "src/features/Authentication/components/Forms/UserNameAndPasswordForm";
import strings from "src/translations/translations";

interface IEnterWithUserPassTemplateProps {
  loading: boolean;
  stepAction: (value: IOrderSteps<any>) => void;
}

const EnterWithUserPassTemplate: React.FC<IEnterWithUserPassTemplateProps> = ({
  loading,
  stepAction,
  ...props
}) => {
  const EnterWithUserPassHeader = (
    <CenteredHeader
      title={"Login to your account"}
      subtitle={strings.inputs_form.phone_number}
    />
  );
  return (
    <CenteredTemplate>
      <FormContainer
        className="min-w-80 w-full xs:w-1/2 lg:w-1/2"
        header={() => EnterWithUserPassHeader}
      >
        <UserNameAndPasswordForm
          loading={loading}
          onFormSubmit={(values: object) =>
            stepAction({ action: "SUBMIT_USER_AND_PASSWORD", payload: values })
          }
          forgetPasswordHandle={() => stepAction({ action: "FORGET_PASSWORD" })}
        />
      </FormContainer>
    </CenteredTemplate>
  );
};

export default EnterWithUserPassTemplate;
