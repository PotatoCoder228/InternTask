import React from 'react';
import './TableStyle.css';
import axiosInstance from "../axios/Axios";

export function Table({allPersons, setAllPersons, index, setIndex, table, setTable}) {

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
    const onTableInputPrev = (e) => {
        e.preventDefault();
        let array = allPersons;
        let end = index - (index % 10);
        let start = end > 10 ? end - 10 : 0;
        if (start < 0) start = 0;
        if (end < array.length) {
            console.log(start, end);
            setIndex(end);
            setTable(dynamicTable(array.slice(start, end)))
        } else {
            setIndex(array.length);
        }
    }
    const onTableInputNext = (e) => {
        e.preventDefault();
        let array = allPersons;
        let start = index;
        let offset = (array.length - start) % 10;
        offset = (offset === 0) ? 10 : offset;
        if (start < array.length) {
            console.log(start, start + offset);
            setIndex(start + offset);
            setTable(dynamicTable(array.slice(start, start + offset)));
        } else {
            setIndex(array.length);
        }
    }

    const onTableInputSubmit = (e) => {
        e.preventDefault();
        axiosInstance.post("/clear",
            {
                name: "заглушка",
                currentIndex: 0
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(function (response) {
            if (response.status === 200) {
                let array = response.data.persons;
                setAllPersons(array);
                setTable("");
                setIndex(0);
            }
        });

    }

    return (
        <div className="TableBlock">
            <div id="TableDescription">
                <p id="TableDecriptionText">Таблица</p>
            </div>
            <div id="Table">
                <div id="TableHeaders">
                    <div id="TableNameColumn">Имя</div>
                    <div id="TableAgeColumn">Возраст</div>
                    <div id="TableRequestsCounterColumn">Количество<br></br>запросов</div>
                </div>
            </div>
            <div className="Columns" id="Columns">
                {table}
            </div>
            <div className="TableInputs">
                <input id="TableInputPrev" type="submit" onClick={onTableInputPrev} value="Предыдущие"/>
                <input id="TableInputClear" type="submit" onClick={onTableInputSubmit} value="Очистить"/>
                <input id="TableInputNext" type="submit" onClick={onTableInputNext} value="Следующие"/>
            </div>
        </div>
    )
}