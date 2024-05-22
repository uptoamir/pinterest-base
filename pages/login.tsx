import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { IOrderSteps } from "src/features/Authentication/types/AuthTypes";
import { useRouter } from "next/dist/client/router";
import EnterWithUserPassTemplate from "src/features/Authentication/components/UserPassTemplate";
import { useDispatch } from "react-redux";
import { USER_TOKEN_KEY } from "src/core/constants";
import { setToastrMessage } from "src/core/redux/slices/toastrSlice";
import { useLoginMutation } from "src/features/Authentication/api/hooks";
import { LoginType } from "src/features/Authentication/types/AuthApiTypes";
import { BRIEF_LIST } from "src/core/routes";
import strings from "src/translations/translations";

const LoginPage: React.FC<NextPage> = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const { mutate: postLogin } = useLoginMutation();

  useEffect(() => {
    if (localStorage.getItem(USER_TOKEN_KEY)) {
      router.replace(BRIEF_LIST);
    }
  }, [router]);

  const handleSubmit = (values: LoginType) => {
    setLoading(true);
    postLogin(
      {
        data: {
          username: values.username && values.username,
          password: values.password && values?.password,
        },
      },
      {
        onSuccess(data) {
          localStorage?.setItem(USER_TOKEN_KEY, data?.data?.access);
          router.push(BRIEF_LIST);
          dispatch(
            setToastrMessage({
              message: strings.toast.success.login,
              type: "success",
            })
          );
        },
        onError() {
          setLoading(false);
        },
      }
    );
  };

  const handleSteps = <T,>(order: IOrderSteps<T>) => {
    switch (order.action) {
      case "SUBMIT_USER_AND_PASSWORD":
        handleSubmit(order?.payload);
        break;
      case "FORGET_PASSWORD":
        router.push("/forgetPassword");
        break;
      default:
        break;
    }
  };

  const useAndPassSteps = (
    <EnterWithUserPassTemplate
      key="enter-user-pass"
      loading={loading}
      stepAction={(value) => handleSteps(value)}
    />
  );

  return <>{useAndPassSteps}</>;
};

export default LoginPage;
