import React, {useState} from 'react';
import './FileFormStyle.css';
import axiosInstance from "../axios/Axios";

export function FileForm({table, setTable}) {

    const [fileStat, setFileStat] = useState(<div className="StatPlaceholder">Файл не загружен</div>);
    const [selectedData, setSelectedData] = useState(null);
    const onFileInputLabelClick = (e) => {
        e.preventDefault();
        let fileInput = document.getElementById("FileFormInput");
        fileInput.click();
        if (fileInput.value !== undefined) {
            setFileStat(<div className="StatPlaceholder">{fileInput.value}</div>);
        } else {
            setFileStat(<div className="StatPlaceholder">Файл не загружен</div>);
        }
    }

    const onFileFormInputSubmitClick = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('customFile', selectedData);
        axiosInstance.post("/upload", formData, {
            headers: {"Content-Type": "multipart/form-data"},
        }).then(function (response) {
            if (response.status === 200) {
                setFileStat(<div className="StatPlaceholder">Файл отправлен</div>);
                let array = response.data.persons;
                let buf = "<div>";
                for (const element of array) {
                    console.log(element.name);
                    buf.innerhtml += "<div class='Columns'>{Array.prototype.toString(element.name)}</div>";
                    buf.innerhtml += "<div class='Columns'>{element.age}</div>";
                    buf.innerhtml += "<div class='Columns'>{element.requests}</div>";
                }
                buf.innerhtml+="</div>"
                setTable(buf);
            } else {
                setFileStat(<div className="StatPlaceholder">Не удалось отправить файл</div>);
            }
        }).catch = (c) => {
            console.log(c.target.data);
            setFileStat(<div style={{color: "red"}} className="StatPlaceholder">Не удалось отправить файл</div>);
        };

    }

    const onFileInputChange = (e) => {
        if (e.target.value !== undefined) {
            setSelectedData(e.target.files[0]);
            console.log(e.target.files[0]);
            let string = e.target.value;
            let array = string.split("\\");
            setFileStat(<div style={{color: "green"}} className="StatPlaceholder">{array.slice(-1)}</div>);
        } else {
            setFileStat(<div className="StatPlaceholder">Файл не загружен</div>);
        }
    }

    return (
        <div className="FileFormBlock">
            <div id="FileFormDescription">
                <p id="FileFormDecriptionText">Форма загрузки</p>
            </div>
            <div id="FileForm">
                <label id="FileFormInputLabel" onClick={onFileInputLabelClick}>Загрузите файл</label>
                {fileStat}
                <input id="FileFormInput" onChange={onFileInputChange} accept=".txt" type="file"
                       style={{display: "none"}}></input>
            </div>
            <input id="FileFormInputSubmit" onClick={onFileFormInputSubmitClick} type="submit" value="Отправить"/>
        </div>
    )
}