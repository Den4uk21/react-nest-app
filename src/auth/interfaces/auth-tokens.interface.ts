export interface ITokensData {
  userId: string
}

export interface ITokens {
  userName?: string,
  accessToken: string,
  refreshToken: string,
  expiresOn: number
}