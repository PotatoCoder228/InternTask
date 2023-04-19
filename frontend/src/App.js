import './App.css';
import {Header} from "./Header"
import {FileForm} from "./FileForm"
import {InputForm} from "./InputForm"
import {Table} from "./Table"

function App() {
    return (
        <div className="App">
            <Header></Header>
            <div id="AppInteractiveZone">
                <FileForm></FileForm>
                <InputForm></InputForm>
                <Table></Table>
            </div>
        </div>
    );
}

/**
 * Компоненты:
 * 1) Компонент с загрузкой файла и кнопкой "отправить"
 * 2) Компонент с формой для ввода текста (Имя_возраст)
 * 3) Компонент с таблицей топ-10 имён по величине возраста
 * и количеством запросов для каждого имени.
 * */

export default App;
