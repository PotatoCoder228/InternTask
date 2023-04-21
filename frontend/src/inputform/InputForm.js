import React, {useState} from 'react';
import './InputFormStyle.css';
import axiosInstance from "../axios/Axios";

export function InputForm({setAllPersons, index, setIndex, setTable}) {

    const [isName, setIsName] = useState(<p className="StatPlaceholder">Ожидаю действий</p>);

    const ageCompare = (a, b) => {
        return (a.age > b.age) ? -1 : 1;
    }
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

    const onInputFormSubmit = (e) => {
        e.preventDefault();
        let textField = document.getElementById("InputFormInputTextField");
        let text = textField.value;
        let pattern = /^([А-ЯЁ]|[A-Z])(([a-z]|[а-яё])+$|$)/;//Валидация имени пользователя
        if (!pattern.test(text)) {
            setIsName(<p className="StatPlaceholder" style={{color: "red"}}>Имя не прошло валидацию</p>);
        } else {
            setIsName(<p style={{color: "green"}} className="StatPlaceholder">Отправка запроса...</p>);
            axiosInstance.post("/person",
                {
                    name: textField.value,
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
                    array.sort(ageCompare);
                    setAllPersons(array);
                    let end = index;
                    let offset = end % 10;
                    if (offset === 0) offset = 10;
                    let start = end - offset;
                    if (end <= array.length) {
                        setIndex(end);
                        let buf = [array.slice(start, end)];
                        setTable(dynamicTable(buf[0]));
                        console.log(start, end);
                    }
                    setIsName(<p style={{color: "green"}} className="StatPlaceholder">Запрос прошёл успешно<br></br>Возраст
                        человека: {response.data.personAge}</p>);
                } else {
                    setIsName(<p style={{color: "green"}} className="StatPlaceholder">{response.data.result}</p>);
                }
            });
        }
    }

    return (
        <div className="InputFormBlock">
            <div id="InputFormDescription">
                <p id="InputFormDesciptionText">Форма ввода</p>
            </div>
            <div id="InputFormInputs">
                <input id="InputFormInputTextField" type="text" placeholder="Введите имя"/>
                {isName}
            </div>
            <input id="InputFormSubmit" type="submit" onClick={onInputFormSubmit} value="Отправить"/>
        </div>
    )
}