export interface IAuth {
  userName: string
  accessToken: string,
  refreshToken: string,
  expiresOn: number
}

export interface ILogin {
  email: string,
  password: string
}

export interface IRegister {
  userName: string,
  email: string,
  password: string
}

export interface IChangeEmail {
  token: string,
  email: string
}

export interface IChangeForgotPass {
  token: string,
  password: string
}