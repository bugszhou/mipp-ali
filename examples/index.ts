import { PageBase } from "../typings";

interface IData {
  name: string;
}

class Demo extends PageBase<IData> {
  data: IData = {
    name: "demo",
  };

  events: tinyapp.IPageEvents = {
    onBack: () => {
      console.log(this.data.name);
    },
  };
}
