import { mainContext, VehiclesState } from "@/app/app/page";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const filterModel = {
  result: 1,
  brands: {
    name: "Марка",
    code: "brand",
    values: [
      "BMW",
      "Chery",
      "EXEED",
      "Geely",
      "Hyundai",
      "Kia",
      "Renault",
      "Toyota",
    ],
  },
  models: {
    name: "Модель",
    type: "model",
    values: [
      { brand: "BMW", models: ["X2", "X5"] },
      {
        brand: "Chery",
        models: [
          "Arrizo 8",
          "Tiggo 4",
          "Tiggo 7 Pro",
          "Tiggo 7 Pro Max",
          "Tiggo 8 Pro Max",
        ],
      },
      { brand: "EXEED", models: ["LX", "TXL", "VX"] },
      { brand: "Geely", models: ["Coolray"] },
      { brand: "Hyundai", models: ["Sonata"] },
      { brand: "Kia", models: ["K5", "Optima", "Rio"] },
      { brand: "Renault", models: ["Logan"] },
      { brand: "Toyota", models: ["Camry"] },
    ],
  },
  tarif: {
    name: "Тариф",
    type: "tarif",
    values: {
      "13": "Комфорт+",
      "14": "Комфорт",
      "22": "Комфорт2",
      "26": "Комфорт3",
    },
  },
};

type FilterModel = typeof filterModel;

const Filter = () => {
  const url = {
    filterModel: "https://test.taxivoshod.ru/api/test/?w=catalog-filter",
  };

  const { data: filter, started, finished } = useAxios(url.filterModel);

  useEffect(() => {
    console.log({ filter, started, finished });
  }, [filter, started, finished]);

  return <FilterView />;
};

export default Filter;

function FilterView({
  vehProps,
  vehicles,
}: {
  vehProps?: string[];
  vehicles?: VehiclesState;
}) {
  return (
    <div className="filter">
      <h2>filter</h2>
      <div className="filter__item__brands">
        <h2>{"brands".toLocaleUpperCase()}</h2>
        <div></div>
      </div>
      <div className="filter__item__models">
        <h2>{"models".toLocaleUpperCase()}</h2>
        <div></div>
      </div>
      <div className="filter__item__tariffs">
        <h2>{"tariffs".toLocaleUpperCase()}</h2>
        <div></div>
          </div>
          
    </div>
  );
}

function useAxios(url: string) {
  const [data, setData] = useState<FilterModel | null>(null);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    console.log("axios start");
    setStarted(true);
    axios
      .get<FilterModel>(url)
      .then((response) => {
        console.log("axios finished");
          const { data } = response;
          if (data) {
              setData(data);
          }
      })
      .catch((err) => err)
      .finally(() => {
        setFinished(true);
      });
  }, [url]);

    return {
        data,
        started,
        finished,
    };
}
