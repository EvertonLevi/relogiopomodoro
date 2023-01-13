import { makeAutoObservable } from "mobx";
import { createContext } from "react";

class HomeStore {
  feature = "";

  featuresFixed = "";

  constructor() {
    makeAutoObservable(this);
  }

  setFeature(feature: any) {
    this.feature = feature;
  }
}
export default createContext(new HomeStore());
