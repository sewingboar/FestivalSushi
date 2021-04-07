import React from "react";
import "./vacancies.scss";

import VacanciesList from "../../pages-components/vacancies/vacancies-list";

const Vacancies = () => {
  return (
    <section className="vacancies">
      <VacanciesList />
    </section>
  );
};

export default Vacancies;
