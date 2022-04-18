import React, { useReducer, useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { fetchQuizQuestions, Difficulty, QuestionState } from "./API";
import { GlobalStyles, Wrapper } from "./components/styled/App.Styles";
import QuizStarter from "./components/QuizStarter";
import QuizResult from "./components/QuizResult";
// import { useQuizSettings } from "./contextState.ts/Reducer";



export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [setUp, setSetUp] = useState({name:"", category:"", difficulty:""})
  // const state = useQuizSettings() 


  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSetUp({...setUp, name: e.target.value})
  }
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSetUp({...setUp, category: e.target.value})
  }
  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSetUp({...setUp, difficulty: e.target.value})
  }

  const payload ={
    quizSettings: setUp
  }

  const continueToQuiz = async(e:React.FormEvent) => {
    e.preventDefault()
    // state.dispatch({
    //   type: "UPDATE_QUIZ_SETTINGS",
    //   payload
    // })
  

    setLoading(true)
    setGameOver(false)

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, setUp.difficulty, setUp.category)
    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)

  }

const tryQuizAgain = (e: React.MouseEvent<HTMLButtonElement>) => {
  setGameOver(true)
  setUserAnswers([])
}

  const checkAnswer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver) {
      const answer = e.currentTarget.value
      const correct = questions[number]?.correct_answer === answer
      if(correct) setScore(prev => prev + 1)
      
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }

      setUserAnswers((prev) => [...prev, answerObject])
    }
  };

  const nextQuestion = () => {
    const next = number + 1
    if(next === TOTAL_QUESTIONS) {
      setGameOver(true)
    }else{
      setNumber(next)
    }
  };

  

  return (
    <>
    <GlobalStyles/>
      <Wrapper>
        <h1>SMART QUIZ</h1>
        {gameOver ? (
          <QuizStarter 
          setup={setUp}
          handleCategoryChange={handleCategoryChange}
          handleDifficultyChange={handleDifficultyChange}
          continueToQuiz={continueToQuiz}
          // handler={state.dispatch}
          />
        ) : null}
        {/* { !gameOver ? <p className="score">Score: {score}</p> : null} */}
        {loading && <p>Loading Question ...</p>}
        {!loading && !gameOver && userAnswers?.length !== TOTAL_QUESTIONS &&(
          <QuestionCard
          questionNo={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number]?.question}
          answers={questions[number]?.answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1  && (
            <button className="next" onClick={nextQuestion}>
            Next Question
            </button>
        )}
        { userAnswers?.length === TOTAL_QUESTIONS ?  <QuizResult score={score} tryQuizAgain={tryQuizAgain}/> : null}
       
      
      </Wrapper>
      </>
  );
};

export default App;
