import "./Interface.scss";
import React from "react";
import { Slider } from "./Slider";

interface IProps {
    defaultXValue: number;
    minX: number;
    maxX: number;
    defaultZValue: number;
    minZ: number;
    maxZ: number;
    onChangeX: (x: number) => void;
    onChangeZ: (z: number) => void;
}

export class Interface extends React.PureComponent<IProps> {

    render() {

        const { defaultXValue, minX, maxX, onChangeX, defaultZValue, minZ, maxZ, onChangeZ } = this.props;

        return (
            <div className="interface">
                <Slider
                    defaultValue={defaultXValue}
                    min={minX}
                    max={maxX}
                    onChange={onChangeX}
                />
                <Slider
                    defaultValue={defaultZValue}
                    min={minZ}
                    max={maxZ}
                    onChange={onChangeZ}
                />
            </div>
        );
    }
}
