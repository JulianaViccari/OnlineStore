import Presenter from "./presenter";

export default class CsvPresenter implements Presenter {
  presenter(data: any) {
    const lines: string[] = [];
    for (const element of data) {
      const line: string[] = [];
      for (const key in element) {
        line.push(element[key]);
      }
      lines.push(line.join(";"));
    }
    return lines.join("/n");
  }
}
