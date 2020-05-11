import React from "react";

const Listgroup = ({
  genres,
  selectedGenre,
  onGenreSelect,
  textProprety = "genre",
  valueProprety = "_id",
}) => {
  return (
    <ul className="list-group-sm ">
      {genres.map((genre) => (
        <li
          key={genre[valueProprety]}
          className={
            selectedGenre === genre
              ? "list-group-item list-group-item-dark active"
              : "list-group-item list-group-item-dark"
          }
          onClick={() => onGenreSelect(genre)}
        >
          {genre[textProprety]}
        </li>
      ))}
    </ul>
  );
};

export default Listgroup;
