import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

export interface StateProps {
   score: number
   rank: number
   highScore: number
   average: number
}

export interface ActionProps {}

type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            score, rank, highScore, average
        } = this.props;

        var mediumSizeText = {
            fontSize: 30
        }

        return (
            <div>
                <div className="panel panel-blue">
                    <div className="panel-heading" style={mediumSizeText}>
                        Scores :
                    </div>
                    <div className="panel-body pan white-background">
                        <div className="pal" style={mediumSizeText}>
                            <h4>Score global : {score}</h4>
                            <h4>Rang : {rank}</h4>
                            <h4>high score : {highScore}</h4>
                            <h4>moyenne : {average}</h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}