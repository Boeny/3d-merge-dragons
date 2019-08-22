import "./Ground.scss";
import React from "react";
import { Helpers } from "helpers";

export class Ground extends React.PureComponent {

    render() {

        const data = Helpers.range(1, 10).map(y => Helpers.range(1, 10).map(x => ({ x, y })));

        return (
            <div className="ground">
                {data.map((row, i) =>
                    <div key={i} className="row">
                        {row.map((col, i) =>
                            <div key={i} className="col">
                                <span>
                                    {`(${col.x}, ${col.y})`}
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}
