"use client";

import React, { createContext, useEffect, useReducer, useState } from "react";
import { Brand } from "@/types";
import Filter from "@/components/filter";

type VehicleModel =
  | { brand: "BMW"; models: ("m1" | "m2" | "m3")[] }
  | { brand: "Audi"; models: ("a1" | "a2" | "a3")[] };

// interface iVehicle {
//     brand: string;
//     models: string[];
// }

type BrandConfig =
  | { brand: "BMW"; models: ("X2" | "X5")[] }
  | {
      brand: "Chery";
      models: (
        | "Arrizo 8"
        | "Tiggo 4"
        | "Tiggo 7 Pro"
        | "Tiggo 7 Pro Max"
        | "Tiggo 8 Pro Max"
      )[];
    }
  | { brand: "BMW"; models: ("X2" | "X5")[] };

class Vehicle /*  implements iVehicle */ {
  brand: Brand;
  models: string[];
  constructor(brandConfig: BrandConfig) {
    this.brand = brandConfig.brand as Brand;
    this.models = brandConfig.models;
  }
}

// const v = new Vehicle();

export interface VehiclesState {
  BMW?: ("X2" | "X5")[];
  Chery?: (
    | "Arrizo 8"
    | "Tiggo 4"
    | "Tiggo 7 Pro"
    | "Tiggo 7 Pro Max"
    | "Tiggo 8 Pro Max"
  )[];
  EXEED?: ("LX" | "TXL" | "VX")[];
  Geely?: "Coolray"[];
  Hyundai?: "Sonata"[];
  Kia?: ("K5" | "Optima" | "Rio")[];
  Renault?: "Logan"[];
  Toyota?: "Camry"[];
}

interface MainState {
  filter: {
    vehicles: VehiclesState;
  };
  background: {
    color: string;
  };
}

const initialState: MainState = {
  filter: {
    vehicles: {
      BMW: ["X2"],
    },
  },
  background: {
    color: "",
  },
};

export const SET_DATA = "SET_DATA";
export const RESET_DATA = "RESET_DATA";
export const SET_BACKGROUND = "SET_BACKGROUND";
export const SET_VEHICLE_MODEL = "SET_VEHICLE_MODEL";

export type Action =
  | {
      type: typeof RESET_DATA;
      payload: undefined;
    }
  | {
      type: typeof SET_BACKGROUND;
      payload: "#686";
    }
  | {
      type: typeof SET_VEHICLE_MODEL;
      payload: VehicleModel;
    };

const resetData = (): Action => {
  return {
    type: RESET_DATA,
    payload: undefined,
  };
};

const setBackGround = (): Action => {
  return {
    type: "SET_BACKGROUND",
    payload: "#686",
  };
};

const setVehicleModel = (model: VehicleModel): Action => {
  return {
    type: SET_VEHICLE_MODEL,
    payload: model,
  };
};

const mainReducer = (state: MainState, action: Action): MainState => {
  switch (action.type) {
    default:
      return state;
  }
};

interface ContextModel {
  controller: {
    dispatch: React.Dispatch<Action> | null;
  };
  model: MainState;
}

export const mainContext = createContext<ContextModel>({
  controller: {
    dispatch: null,
  },
  model: initialState,
});

const App = () => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const [textInputValue, setTextInputValue] = useState("");

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <mainContext.Provider
      value={{
        model: state,
        controller: {
          dispatch,
        },
      }}
    >
      <div
        className="regular-container"
        style={{ backgroundColor: state.background.color }}
      >
        <div>
          <h2>choisen vehicles:</h2>
          <div>models</div>
          <Filter />
        </div>
      </div>
    </mainContext.Provider>
  );
};

function clickHandler(dispatch: React.Dispatch<Action>, action: Action) {
  dispatch(action);

  console.log(action);

  return 0;
}

export default App;

function insertModels() {}
