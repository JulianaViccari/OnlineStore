import Presenter from "./presenter";

export default class JsonPresenter implements Presenter{
    presenter(data: any) {
      return data;
    }

}