import {useState} from "react";
import { Dispatch } from "../contextState.ts/Reducer";
import { FormStyle } from "./styled/FormStyle";
import { Wrapper } from "./styled/QuestionCard.Styles";

export type QuizStarterProps = {
    setup: {
        category: string
        difficulty: string
    }
    handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    handleDifficultyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    continueToQuiz: (e:React.FormEvent) => void
    // handler: Dispatch
}


const QuizStarter: React.FC<QuizStarterProps> = ({setup, handleCategoryChange, handleDifficultyChange, continueToQuiz}) => {

  return (
    <Wrapper>
        <h3>Welcome, Kindly fill the form to start the Quiz</h3>
      <FormStyle onSubmit={continueToQuiz}>
      
        <label htmlFor="country">Test Category</label>
        <select required value={setup.category} onChange={handleCategoryChange}>
        <option value="">Select Quiz Category</option>
          <option value="23">History</option>
          <option value="22">Geography</option>
          <option value="27">Animals</option>
          <option value="18">Computer</option>
        </select>
        

        <label htmlFor="country">Difficulty Level</label>
        <select required value={setup.difficulty} onChange={handleDifficultyChange}>
          <option value="">Select Difficulty Level</option>
          <option value="hard">Hard</option>
          <option value="medium">Medium</option>
          <option value="easy">Easy</option>
        </select>

      

        <button type="submit"  className="btn">Start Quiz &nbsp; <i className="fa fa-arrow-right"></i></button>
      </FormStyle>
    </Wrapper>
  );
};

export default QuizStarter;
