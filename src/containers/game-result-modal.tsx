import * as React from 'react';
import * as GameFieldActions from '../actions/game-field.actions';
import './game-result-modal.scss';

export interface GameResultModalProps {
    isWinnerModal: boolean;
}

export class GameResultModal extends React.Component<GameResultModalProps, {}> {
    constructor(props: null) {
        super(props);
    }

    public onRestartClick() {
        GameFieldActions.onRestartGame();
    }


    render() {
        const message = this.props.isWinnerModal ? 'Congratulations, you win' : 'You lose this game, but you can try again';

        return <div className='game-result-modal'>
            <div className='modal'>
                <h1>{message}</h1>
                <button onClick={this.onRestartClick.bind(this)}>Play Again</button>
            </div>
        </div>
    }
}