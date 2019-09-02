import React from "react";
import { Ground } from "components";
import { Interface } from "views/Interface";

interface IState {
    rotationX: number;
    rotationZ: number;
}

export class App extends React.PureComponent<{}, IState> {

    state: IState = { rotationX: 56, rotationZ: -36 };

    onInputRotationX = (rotationX: number) => {
        this.setState({ rotationX });
    }

    onInputRotationZ = (rotationZ: number) => {
        this.setState({ rotationZ });
    }

    render() {

        const { rotationX, rotationZ } = this.state;

        return (
            <React.Fragment>
                <Interface
                    minX={0} maxX={99} defaultXValue={rotationX}
                    minZ={-90} maxZ={0} defaultZValue={rotationZ}
                    onChangeX={this.onInputRotationX}
                    onChangeZ={this.onInputRotationZ}
                />
                <div style={{
                    perspective: 2000,
                    perspectiveOrigin: "50% 0"
                }}>
                    <div style={{
                        width: 450,
                        transform: `translate3d(-4000px, 0px, -10000px) rotateX(${rotationX}deg)`, // translate3d(100%, 100px, -76px)
                        transformStyle: "preserve-3d"
                    }}>
                        <div style={{
                            transform: `rotateZ(${rotationZ}deg)`,
                            transformStyle: "preserve-3d"
                        }}>
                            <Ground />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
