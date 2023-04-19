import React, {useEffect} from 'react';
import './TableStyle.css';

export function Table({table, setTable}) {
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
            {table}
            <input id="TableInputSubmit" type="submit" value="Очистить"/>
        </div>
    )
}