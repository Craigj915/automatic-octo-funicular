"use client";
import { useState, useEffect } from "react";
import Add from "./Add";

const Dashboard = (props) => {
  const [ads, setAds] = useState([]);
  const [current, setCurrent] = useState(undefined);

  const refreshList = () => {
    props.client.getAds().then((response) => {
      setAds(response.data);
    });
  };

  const removeAdvert = (id) => {
    props.client.removeAd(id).then(() => refreshList());
  };

  const updateAdvert = (ad) => {
    setCurrent(ad);
  };

  useEffect(() => {
    refreshList();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg w-full">
      <p className="text-2xl text-center"> Raccoon Fight Events </p>
      {ads?.map((ad) => {
        return (
          <div className="">
            <h2 className="text-2xl text-blue-600 font-bold">{ad.name}</h2>
            <p className="text-gray-400 text-sm">£{ad.price}</p>
            <p className="text-gray-400 text-sm">{ad.location}</p>
            <iframe className="w-1/2 border-2"
            src={`${ad.maps}`}
            ></iframe>
            <button
              className="bg-green-400 text-white font-bold"
              onClick={() => updateAdvert(ad)}
            >
              Update
            </button>
            <button
              className="bg-red-400 text-white font-bold"
              onClick={() => removeAdvert(ad._id)}
            >
              Delete
            </button>
          </div>
        );
      })}
      <Add
      refreshList={() => {
        refreshList();
        setCurrent(undefined);
      }}
      currentAd={current}
      client={props.client}
      />
    </div>
  );
};

export default Dashboard;
