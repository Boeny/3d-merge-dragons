import "./Interface.scss";
import React from "react";

interface IProps {
    defaultValue: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
}

interface IState {
    value: number;
}

export class Interface extends React.Component<IProps, IState> {

    dragStartingPosition: number | null = null;
    maxPosition = 0;
    mouseMoveWaiting = false;

    state: IState = { value: this.props.defaultValue };

    onChange = (value: number) => {
        if (isNaN(value) || value < this.props.min || value > this.props.max) {
            return;
        }
        this.setState({ value }, () => this.props.onChange(value));
    }

    shouldComponentUpdate(_: IProps, nextState: IState): boolean {
        return this.state.value !== nextState.value;
    }

    onDragStart = (position: number) => {
        this.dragStartingPosition = position;
        this.maxPosition = this.props.max * position / this.state.value;
    }

    onDragEnd = () => {
        this.dragStartingPosition = null;
    }

    onMouseMove = (position: number) => {
        if (!this.mouseMoveWaiting && this.dragStartingPosition !== null) {
            this.mouseMoveWaiting = true;
            setTimeout(() => this.mouseMoveWaiting = false, 50);

            this.onChange(this.props.max * position / this.maxPosition);
        }
    }

    render() {

        return (
            <div className="interface" onMouseMove={e => this.onMouseMove(e.clientY)} onMouseUp={this.onDragEnd}>
                <div className="rotationX">
                    <div
                        className="slider"
                        style={{ top: `${this.state.value * (this.props.max - this.props.min) / 100}%` }}
                        onMouseDown={e => e.button === 0 ? this.onDragStart(e.clientY) : undefined}
                    />
                </div>
            </div>
        );
    }
}
