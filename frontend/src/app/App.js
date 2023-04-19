import './App.css';
import {Header} from "../header/Header"
import {FileForm} from "../fileform/FileForm"
import {InputForm} from "../inputform/InputForm"
import {Table} from "../table/Table"
import {useState} from "react";

function App() {
    const [table, setTable] = useState(<div className="Columns"></div>);

    return (
        <div className="App">
            <Header></Header>
            <div id="AppInteractiveZone">
                <FileForm table={table} setTable={setTable}></FileForm>
                <InputForm table={table} setTable={setTable}></InputForm>
                <Table table={table} setTable={setTable}></Table>
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
