import React from 'react';
import './vacancies-list-item.scss';

const VacanciesListItem = ({name, salary}) => {
    return (
        <div className="vacancies-list-item">
            <div className="vacancies-list-item-data">
                <div className="vacancies-list-item-data__name">{name}</div>
                <div className="vacancies-list-item-data__salary">{salary}</div>
            </div>
            <div className="vacancies-list-item-form">
                <input type="text" className="vacancies-list-item-form__input" placeholder="Имя"/>
                <input type="text" className="vacancies-list-item-form__input" placeholder="Номер телефона"/>
                <button className="vacancies-list-item-form__button">Отправить</button>
            </div>
        </div>
    );
};

export default VacanciesListItem;