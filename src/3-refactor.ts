const surveys: Survey[] = [];

interface Survey {
  name: string;
  questions: Question[];
}

interface Question {
  question: string;
  answers: string[];
}

class SurveyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SurveyError';
  }
}

class QuestionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'QuestionError';
  }
}

export function getSurveys(): Survey[] {
  return surveys;
}

export function createSurvey(name: string, questions: Question[]) {
  if (!name) return new Error('Name is required');
  if (typeof name !== 'string') return new Error('Name must be a string');
  if (name.trim().length < 3) return new Error('Name must be at least 3 characters long');

  const survey: Survey = {
    name,
    questions: [],
  };
  surveys.push(survey);

  if (Array.isArray(questions)) {
    const questionErrors: QuestionError[] = [];
    for (const question of questions) {
      try {
        if (typeof question !== 'object')
          throw new QuestionError('Question must be an object');
        if (!question.question)
          throw new QuestionError('Question must have a question property');
        if (typeof question.question !== 'string')
          throw new QuestionError('Question must have a string question property');
        if (!question.answers)
          throw new QuestionError('Question must have an answers property');
        if (!Array.isArray(question.answers))
          throw new QuestionError('Question answers must be an array');
        if (question.answers.length < 2)
          throw new QuestionError('Question must have at least 2 answers');
        if (question.answers.some((answer) => typeof answer !== 'string'))
          throw new QuestionError('Question answers must be strings');

        survey.questions.push({
          question: question.question,
          answers: question.answers,
        });
      } catch (e) {
        if (e instanceof QuestionError) {
          questionErrors.push(e);
        } else {
          questionErrors.push(new QuestionError('An unknown error occurred'));
        }
      }
    }
    if (questionErrors.length > 0) return questionErrors;
  }

  return survey;
}
