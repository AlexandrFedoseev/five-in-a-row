import * as React from 'react';
import * as GameFieldActions from '../actions/game-field.actions';
import './control-panel.scss';


export class ControlPanel extends React.Component<null, {}> {
    constructor(props: null) {
        super(props);
    }

    public onRestartClick() {
        GameFieldActions.onRestartGame();
    }
    public onSizeChange(size: number) {
        GameFieldActions.onSizeChange(size);
    }
    public onSideChange(size: number) {
        GameFieldActions.onSideChange();
    }

    render() {
        return <div className='control-panel'>
            <button onClick={this.onRestartClick.bind(this)}>Restart</button>
            <h2>Field size</h2>
            <button onClick={this.onSizeChange.bind(this, [10])}>10</button>
            <button onClick={this.onSizeChange.bind(this, [15])}>15</button>
            <button onClick={this.onSizeChange.bind(this, [20])}>20</button>
            <button onClick={this.onSizeChange.bind(this, [25])}>25</button>
            <h2>-</h2>
            <button onClick={this.onSideChange.bind(this)}>Change side</button>
        </div>
    }
}