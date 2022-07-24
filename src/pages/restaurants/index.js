import React from "react";

export const getServerSideProps = async () => {
  const data = await fetch(`http://localhost:3000/api/restaurants`);
  const restaurants = await data.json();

  console.log(restaurants);
  return {
    props: { restaurants },
  };
};

const Restaurants = ({ restaurants }) => {
  return (
    <div>
      {restaurants.map((e) => {
        return <div>{e.name}</div>;
      })}
    </div>
  );
};

export default Restaurants;
