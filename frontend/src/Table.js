import React, {useState} from 'react';
import './TableStyle.css';

export function Table() {

    const [table, setTable] = useState(<div className="Columns"></div>);
    return(
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
                {table}
            </div>
            <input id="TableInputSubmit" type = "submit" value="Очистить"/>
        </div>
    )
}