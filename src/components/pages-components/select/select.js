import React, { Component } from "react";

import "./select.scss";

class Select extends Component {
  componentDidMount() {
    const { name, callback } = this.props;
    var selectItem = document.getElementsByName(name)[0];
    const divWrapper = document.createElement("div");

    divWrapper.className = "select";

    divWrapper.innerHTML = selectItem.outerHTML;
    selectItem.parentNode.replaceChild(divWrapper, selectItem);

    const firstChildWrapper = document.createElement("div");

    firstChildWrapper.className = "select-styled";
    divWrapper.append(firstChildWrapper);
    firstChildWrapper.innerHTML = "Оберіть торгову точку";

    const ul = document.createElement("ul");
    ul.className = "select-options";

    if (selectItem.classList.contains("select-up")) {
      ul.className += " select-up";
    }

    firstChildWrapper.append(ul);

    for (let option of selectItem.options) {
      const li = document.createElement("li");

      li.setAttribute("rel", option.textContent);
      li.setAttribute("value", option.getAttribute("value"));
      li.innerHTML = option.textContent;

      ul.append(li);
    }

    firstChildWrapper.addEventListener("click", function(e) {
      e.stopPropagation();

      selectItem.classList.toggle("active");
      ul.classList.toggle("block");
    });

    for (const element of ul.children) {
      element.addEventListener("click", e => {
        e.stopPropagation();

        firstChildWrapper.innerHTML = e.target.getAttribute("rel");
        ul.classList.toggle("block");
        firstChildWrapper.append(ul);

        if (callback) {
          callback(e.target.getAttribute("value"));
        }
      });
    }

    document.addEventListener("click", function() {
      firstChildWrapper.classList.remove("active");
      ul.classList.remove("block");
    });
  }

  render() {
    const { options, name, up = false } = this.props;
    let className = "footer-cities-dropdown";

    if (up) {
      className += " select-up";
    }

    return (
      <select className={className} name={name}>
        {options.map(option => {
          return (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          );
        })}
      </select>
    );
  }
}

export default Select;
