import {AnswerObject} from "../App"
import { ButtonWrapper, Wrapper } from "./styled/QuestionCard.Styles";

type QuestionCardProps = {
    question: string
    answers: string[]
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined
    questionNo: number
    totalQuestions: number
}

const QuestionCard: React.FC<QuestionCardProps> = ({question, answers, callback, userAnswer, questionNo, totalQuestions}) => {
    console.log(userAnswer);
    
    return (
        <Wrapper>
            <p className="number">Question: {questionNo} / {totalQuestions}</p>
            <p dangerouslySetInnerHTML={{__html: question}}/>
            <div>
                {answers && answers.map((answer) => (
                    <ButtonWrapper key={answer} correct={userAnswer?.correctAnswer === answer} userClicked={userAnswer?.answer === answer}>
                        <button disabled={!!userAnswer} onClick={callback} value={answer}>
                            <span dangerouslySetInnerHTML={{__html:answer}}/>
                        </button>
                    </ButtonWrapper>
                ))}
            </div>
        </Wrapper>
    );
};

export default QuestionCard;