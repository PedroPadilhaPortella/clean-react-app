export type SurveyModel = {
  id: string
  question: string
  answers: SurveyAnswerModel[]
  date: Date
  didAnswer: boolean
};

interface SurveyAnswerModel {
  answer: string
  image?: string
}