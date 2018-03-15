import * as React from "react";

export interface HomeComponentProps { compiler: string; framework: string; }

export class HomeComponent extends React.Component<HomeComponentProps, {}> {
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}