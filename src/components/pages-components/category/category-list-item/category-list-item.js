import React from "react";
import "./category-list-item.scss";

const CategoryListItem = ({
  id,
  name,
  onSelect,
  image,
  filteredProducts,
  sushiStoreService
}) => {
  return (
    <div
      key={id}
      className={
        filteredProducts.includes(id)
          ? "category__link-wrapper--active"
          : "category__link-wrapper"
      }
      onClick={() => onSelect(id)}
    >
      <img
        className="category__link-image"
        src={sushiStoreService.getImage(image)}
        alt=""
      />
      <div key={id} className="category__link">
        {name}
      </div>
    </div>
  );
};

export default CategoryListItem;
