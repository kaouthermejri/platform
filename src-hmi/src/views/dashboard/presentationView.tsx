// represents what a teacher can show to his students

// EXTERNAL IMPORTS
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"
import * as chartjs from "react-chartjs-2"

// INTERNAL IMPORTS
import { View as QuizView } from "../../views/quiz/quizView"
import { View as QuizStatView } from "./quizStatView"
import { QuizType, Quiz } from "../../models/class/class"

import { chartColors } from "../../models/consts"

export interface StateProps {
    isTeacher: boolean

    // a quiz
    quiz: Quiz
    // statistics: choice => count
    stats: any
    // true => we show the right answer
    showCorrection: boolean

    isConnected: boolean
}
export interface ActionProps { }

var maxSize = {
    height: "100%"
}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    caculateChoiceData(stats): any {
        let choices = [],
            count = []
            
        for(var k in stats) {
            choices.push(k)
            count.push(stats[k])
        }

        let len = choices.length

        return {
            labels: choices,
            datasets: [
                {
                    label: "Choix",
                    data: count,
                    backgroundColor: chartColors[1]
                }
            ]
        }
    }

    render() {
        const {
            isTeacher,
            
            quiz,
            stats,
            showCorrection,
            isConnected
        } = this.props;

        let quizRender 
        if(quiz) {
            quizRender = (<QuizView 
                quiz={ quiz } 
                quizChoice={ quiz.answer }
                showCorrection={ showCorrection } 
                forceUnfold={ true } 
                nextQuiz={ null } 
                prevQuiz={ null }
                choose={ null }
                validate={ null }
                back={ null }
            />)
        }

        // if there are stats we put them on the right
        let res = null
        if (!showCorrection) {
            res = (
                <div className="page-content">
                    { quizRender ? quizRender : <h1>En attente d'un quiz</h1> }
                </div>
            )
        } else {
            res = (
                <div className="page-content">
                    <div className="row">
                        <div className= { showCorrection ? "col-lg-7" : "col-lg-12" }>
                            { quizRender }
                        </div>
                        { showCorrection && 
                        <div className="col-lg-5">
                            <div className="panel">
                                <div className="panel-heading">
                                    Statistiques:
                                </div>
                                <div className="panel-body pan white-background"> 
                                    <chartjs.Bar data={ this.caculateChoiceData(stats) }/>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            )
        }
        
        // the quiz or the buttons are on the left and the scores are on the right
        return (
            <div>
                { isTeacher ?
                    (isConnected ? 
                        res :
                        <div>
                            <h1>Connection au server...</h1>
                        </div>)
                    :
                    <div className="row">
                        <h1>Vous ne pouvez pas accéder à la vue de présentation en tant qu'étudiant (bien essayé)</h1>
                    </div>
                }
            </div>
        );
    }
}