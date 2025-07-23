export interface IConfig {
  PORT: number;
  BOT_TOKEN: string;
  MONGODB_URI: string;
  EMAIL: string;
  PASSWORD: string;
  ADMIN_ID: string;
}

export interface IJob {
  id: string;
}

export interface IScrapedJob {
  title: string;
  url: string;
  desc: string;
  category: string;
  price: string;
  suggestions: string;
  daysLeft: string;
  deadline: string;
  postedDate: string;
  employer: string;
  employerUrl: string;
  employerAvatar: string;
}
