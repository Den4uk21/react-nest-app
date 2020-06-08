export interface IAuth {
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