export interface ITokensData {
  userId: string
}

export interface ITokens {
  accessToken: string,
  refreshToken: string,
  expiresOn: number
}