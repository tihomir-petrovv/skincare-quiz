import { useParams } from 'react-router-dom';
import Questions from '../../components/Questions/Questions';
import questions from '../../data/questions.js';

export default function Quiz() {
    let { questionId } = useParams();
    questionId = +questionId;

    return (
        <Questions question={questions[questionId - 1]} questionId={questionId} allQuestions={questions.length}/>
    );
}