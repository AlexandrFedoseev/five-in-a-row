import React, {
    Component
} from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Link, Route
} from "react-router-dom";

import "./app.scss";
import LogoImg from "./assets/images/logo.svg";

import { HomeComponent } from "./components/home-component";
import { PostsComponent } from "./components/posts-component";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <div>
                        <h1>Hello from react</h1>
                        <img src={LogoImg}/>
                    </div>
                    <ul>
                        <li>
                            <Link to={"/"}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to={"/posts"}>
                                Posts
                            </Link>
                        </li>
                    </ul>
                    <main>
                        <Route path="/" exact={true} component={HomeComponent} />
                        <Route path="/posts" component={PostsComponent} />
                    </main>
                </div>
            </Router>
        );
    }
};
export default App;
ReactDOM.render( < App / > , document.getElementById("root"));