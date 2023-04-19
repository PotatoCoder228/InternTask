import React, {useState} from 'react';
import './TableStyle.css';
import axiosInstance from "../axios/Axios";

export function Table({table, setTable}) {

    const [index, setIndex] = useState(0);

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
        axiosInstance.post("/previous",
            {
                name: "заглушка",
                currentIndex: index
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(function (response) {
            if (response.status === 200) {
                let array = response.data.persons;
                setTable(dynamicTable(array));
                let buf = index-10;
                if(buf<0){
                    buf = 0;
                }
                setIndex(buf);
            }
        });
    }
     const onTableInputNext = (e) => {
        e.preventDefault();
        axiosInstance.post("/previous",
            {
                name: "заглушка",
                currentIndex: index
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(function (response) {
            if (response.status === 200) {
                let array = response.data.persons;
                setTable(dynamicTable(array));
                setIndex(index+10);
            }
        });
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
                setTable("");
                setIndex(10);
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
            <div className="Columns">
                {table}
            </div>
            <div className="TableInputs">
                <input id="TableInputSubmit" type="submit" onClick={onTableInputPrev} value="Предыдущие"/>
                <input id="TableInputSubmit" type="submit" onClick={onTableInputSubmit} value="Очистить"/>
                <input id="TableInputSubmit" type="submit" onClick={onTableInputNext} value="Следующие"/>
            </div>
        </div>
    )
}