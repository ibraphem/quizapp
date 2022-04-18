import React from 'react';
import { Wrapper } from './styled/QuestionCard.Styles';
import ThumbsUp from "../images/thumbsup.gif"

type QuizResultProps = {
    score: number
    tryQuizAgain: (e:React.MouseEvent<HTMLButtonElement>) => void
}

const QuizResult: React.FC<QuizResultProps> = ({score, tryQuizAgain}) => {
    return (
        <Wrapper>
            <p className="score">Score: {score}</p>
            <div>
                <img src={ThumbsUp} style={{width: '100%', height:'250px'}}/>
            </div>
            <button className="next" onClick={tryQuizAgain}>
                Try Again
            </button>
        </Wrapper>
    );
};

export default QuizResult;