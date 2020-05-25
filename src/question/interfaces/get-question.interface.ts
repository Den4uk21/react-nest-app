export interface IGetQuestion {
  id: string,
  title: string,
  descriptions: string,
  category: string[],
  date: Date,
  userName: string,
  avatarUrl: string
}