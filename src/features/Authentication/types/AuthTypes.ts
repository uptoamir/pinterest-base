export type MobileNumberType = {
  phoneNumber?: string | undefined;
};

/** this type for register/login and forget password page*/
export interface IOrderSteps<T> {
  action: string;
  payload?: any;
}
interface VerifyCodeSingUpResponseProps {
  signup_token: string;
}
interface VerifyCodeForgetPasswordResponseProps {
  forget_token: string;
}
interface VerifyCodeLoginResponseProps {
  refresh: string;
  access: string;
}
export interface IVerifyCodeResponseProps
  extends VerifyCodeSingUpResponseProps,
    VerifyCodeForgetPasswordResponseProps,
    VerifyCodeLoginResponseProps {}
