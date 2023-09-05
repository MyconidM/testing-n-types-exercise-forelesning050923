import {createSurvey, getSurveys} from './3-refactor'

let surveyNumber = 0

function createValidSurveyName() {
  surveyNumber++
  return `Survey ${surveyNumber}`
}

it('should add a new survey', () => {
  expect(getSurveys()).toHaveLength(0)
  const name = createValidSurveyName()

  createSurvey(name, [
    {
      question: 'How are you?',
      answers: ['Good', 'Bad'],
    },
  ])

  expect(getSurveys()).toHaveLength(1)
})

it('should not add a survey without a name', () => {
  const surveysCount = getSurveys().length
  expect(createSurvey()).toBeInstanceOf(Error)

  expect(getSurveys()).toHaveLength(surveysCount)
})

it('should not add a survey with a name shorter than 3 characters', () => {
  const surveysCount = getSurveys().length
  expect(createSurvey('Hi')).toBeInstanceOf(Error)

  expect(getSurveys()).toHaveLength(surveysCount)
})

it('should not add a survey with a name that is not a string', () => {
  const surveysCount = getSurveys().length
  expect(createSurvey(123)).toBeInstanceOf(Error)

  expect(getSurveys()).toHaveLength(surveysCount)
})

it('should not add a question that is not an object to a survey', () => {
  const name = createValidSurveyName()
  const result = createSurvey(name, [123])
  expect(Array.isArray(result)).toBe(true)
  expect(result.every(error => expect(error).toBeInstanceOf(Error)))

  const surveys = getSurveys()
  expect(surveys).toContainEqual({name, questions: []})
})

it('should not add a question without a question property to a survey', () => {
  const name = createValidSurveyName()
  const result = createSurvey(name, [{}])
  expect(Array.isArray(result)).toBe(true)
  expect(result.every(error => expect(error).toBeInstanceOf(Error)))


  const surveys = getSurveys()
  expect(surveys).toContainEqual({name, questions: []})
})

it('should not add a question with a question property that is not a string to a survey', () => {
  const name = createValidSurveyName()
  const result = createSurvey(name, [{question: 123}])
  expect(Array.isArray(result)).toBe(true)
  expect(result.every(error => expect(error).toBeInstanceOf(Error)))

  const surveys = getSurveys()
  expect(surveys).toContainEqual({name, questions: []})
})

it('should not add a question without an answers property to a survey', () => {
  const name = createValidSurveyName()
  const result = createSurvey(name, [{question: 'How are you?'}])
  expect(Array.isArray(result)).toBe(true)
  expect(result.every(error => expect(error).toBeInstanceOf(Error)))


  const surveys = getSurveys()
  expect(surveys).toContainEqual({name, questions: []})
})

it('should not add a question with an answers property that is not an array to a survey', () => {
  const name = createValidSurveyName()
  const result = createSurvey(name, [{question: 'How are you?', answers: 123}])
  expect(Array.isArray(result)).toBe(true)
  expect(result.every(error => expect(error).toBeInstanceOf(Error)))


  const surveys = getSurveys()
  expect(surveys).toContainEqual({name, questions: []})
})

it('should not add a question with an answers property that has less than 2 answers to a survey', () => {
  const name = createValidSurveyName()
  const result = createSurvey(name, [{question: 'How are you?', answers: ['Good']}])
  expect(Array.isArray(result)).toBe(true)
  expect(result.every(error => expect(error).toBeInstanceOf(Error)))


  const surveys = getSurveys()
  expect(surveys).toContainEqual({name, questions: []})
})

it('should not add a question with an answers property that has answers that are not strings to a survey', () => {
  const name = createValidSurveyName()
  const result =
    createSurvey(name, [{question: 'How are you?', answers: [123, 456]}])
  expect(Array.isArray(result)).toBe(true)
  expect(result.every(error => expect(error).toBeInstanceOf(Error)))

  const surveys = getSurveys()
  expect(surveys).toContainEqual({name, questions: []})
})

it('should add a question with a question and answers property to a survey', () => {
  const name = createValidSurveyName()
  expect(
    createSurvey(name, [
      {question: 'How are you?', answers: ['Good', 'Bad']},
    ]),
  ).toEqual({
    name,
    questions: [{question: 'How are you?', answers: ['Good', 'Bad']}],
  })

  const surveys = getSurveys()
  expect(surveys).toContainEqual({
    name,
    questions: [{question: 'How are you?', answers: ['Good', 'Bad']}],
  })
})
