import React from 'react';
import './vacancies-list.scss';
import VacanciesListItem from '../vacancies-list-item';

const VacanciesList = () => {
    const vacancies = [
        {
            id: 1,
            name: 'fullstack Borista',
            salary: 'groshi bez sna'
        },
        {
            id: 2,
            name: 'Developer',
            salary: 'дайте гроши'
        },
        {
            id: 3,
            name: 'Fullstack w odno ebalo',
            salary: '100500kkk/nanosec'
        }
    ];

    return (
        <div className="vacancies-list">
            {
                vacancies.map(vacancy => {
                    return <VacanciesListItem key={vacancy.id} {...vacancy} />
                })
            }
        </div>
    );
};

export default VacanciesList;