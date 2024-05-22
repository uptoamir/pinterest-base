export interface loginResponseProps {
  refresh: string;
  access: string;
}

export type LoginType = {
  username: string | undefined;
  password: string | number;
};

export type PostLoginRequest = {
  data: LoginType;
};
