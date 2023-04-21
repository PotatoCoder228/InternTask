import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {UnhandledPath} from "../unhandledpath/UnhandledPath";
import {InteractiveBlock} from "./InteractiveBlock";

function App() {

    return (
        <div className="App" style={{position: "relative"}}>
            <BrowserRouter>
                <Routes>
                    <Route exact path='/main_page' element={<InteractiveBlock/>}/>
                    <Route exact path='/*' element={<UnhandledPath></UnhandledPath>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;
