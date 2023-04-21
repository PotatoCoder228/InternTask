import React, {useState} from "react";
import {Table} from "../table/Table";
import {InputForm} from "../inputform/InputForm";
import {FileForm} from "../fileform/FileForm";
import {Header} from "../header/Header";
import axiosInstance from "../axios/Axios";

export function InteractiveBlock() {
    const [table, setTable] = useState(<div></div>);

    const [load, setLoad] = useState(0);

    const [index, setIndex] = useState(0);

    const [allPersons, setAllPersons] = useState([]);

    const dynamicTable = (array) => {
        return array.map((data) => {
            return (
                <div className="ColumnRow">
                    <div className="ColumnCell">{data.name}</div>
                    <div className="ColumnCell">{data.age}</div>
                    <div className="ColumnCell">{data.requests}</div>
                </div>
            )
        })
    }
    const initDownload = () => {
        if (load > 0) return;
        setLoad(1);
        console.log("подгружаю таблицу")
        axiosInstance.post(
            "/download"
        ).then(function (response) {
            setIndex(0);
            if (response.status === 200) {
                let array = response.data.persons;
                setAllPersons(array);
                let offset = (array.length > 10) ? 10 : array.length;
                console.log(index, offset);
                setTable(dynamicTable(array.slice(index, offset)));
                setIndex(10);
            } else {
                setTable(<div className="Columns" style={{color: "red"}}>Не удалось загрузить данные с сервера</div>);
            }
        }).catch(function (error) {
            console.log(error);
            setTable(<div className="Columns" style={{color: "red"}}>{error.data.response}</div>);
        });
    }
    initDownload();

    return (
        <div>
            <Header></Header>
            <div onLoadStart={initDownload} id="AppInteractiveZone">
                <FileForm setAllPersons={setAllPersons} setIndex={setIndex}
                          setTable={setTable}></FileForm>
                <InputForm setAllPersons={setAllPersons} index={index} setIndex={setIndex}
                           setTable={setTable}></InputForm>
                <Table allPersons={allPersons} setAllPersons={setAllPersons} index={index} setIndex={setIndex}
                       table={table}
                       setTable={setTable}></Table>
            </div>
        </div>

    )
}