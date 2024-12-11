export type RemoteSurveyResultModel = {
  question: string
  date: string
  answers: RemoteSurveyResultAnswerModel[]
};

export type RemoteSurveyResultAnswerModel = {
  answer: string
  count: number
  percent: number
  image?: string
  isCurrentAccountAnswer: boolean
};