import "./Interface.scss";
import React from "react";

interface IProps {
    defaultValue: number;
    min: number;
    max: number;
    onChange: (v: number) => void;
}

interface IState {
    v: number;
}

export class Slider extends React.Component<IProps, IState> {

    MIN = 0;
    LENGTH = 130;

    dragStart: number | null = null;
    length: number;
    Koef: number;

    constructor(props: IProps) {
        super(props);
        this.state = { v: this.props.defaultValue };

        this.length = this.props.max - this.props.min;
        this.Koef = this.LENGTH / this.length;
    }

    shouldComponentUpdate(_: IProps, nextState: IState): boolean {
        return this.state.v !== nextState.v;
    }

    onChange = (v: number) => {
        if (isNaN(v) || v < this.props.min || v > this.props.max) {
            return;
        }
        this.setState({ v }, () => this.props.onChange(v));
    }

    onDragStart = (position: number) => {
        this.dragStart = position;
    }

    onDragEnd = () => {
        this.dragStart = null;
    }

    mouseMoveWaiting = false;

    onMouseMove = (y: number) => {
        if (this.mouseMoveWaiting) {
            return;
        }
        if (this.dragStart === null) {
            return;
        }
        this.mouseMoveWaiting = true;
        setTimeout(() => this.mouseMoveWaiting = false, 50);

        this.onChange(this.Koef * (y - this.MIN) + this.props.min);
    }

    render() {

        return (
            <div className="rotation rotationX"
                onMouseMove={e => this.onMouseMove(e.clientY)}
                onMouseUp={this.onDragEnd}
                style={{
                    height: this.LENGTH,
                    marginLeft: this.MIN
                }}
            >
                <div
                    className="slider"
                    style={{
                        top: `${(this.state.v - this.props.min) / this.Koef + this.MIN}px`
                    }}
                    onMouseDown={e => e.button === 0 ? this.onDragStart(e.clientY) : undefined}
                />
            </div>
        );
    }
}
