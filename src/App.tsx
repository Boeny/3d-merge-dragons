import React from "react";
import { Ground } from "components";
import { Interface } from "views/Interface";

interface IState {
    rotationX: number;
}

export class App extends React.PureComponent<{}, IState> {

    state: IState = { rotationX: 56 };

    onInputRotationX = (rotationX: number) => {
        this.setState({ rotationX });
    }

    render() {

        const { rotationX } = this.state;

        return (
            <React.Fragment>
                <Interface min={0} max={99} defaultValue={rotationX} onChange={this.onInputRotationX} />
                <div style={{
                    perspective: 2000,
                    perspectiveOrigin: "50% 0"
                }}>
                    <div style={{
                        width: 450,
                        transform: `translate3d(100%, 100px, -76px) rotateX(${rotationX}deg)`,
                        transformStyle: "preserve-3d"
                    }}>
                        <div style={{
                            transform: "rotateZ(-36deg)",
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
