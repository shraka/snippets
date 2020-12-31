
import { Controller } from "stimulus";

export default class extends Controller {
  connect() {
    const $element = $(this.element);

    if ($element.attr("data-custom=true")) {
      if ($element.attr("data-select2-id")) {
        return;
      }
      $element.select2();
    } else {
      if ($element.attr("data-select2-id")) {
        $element.select2('destroy');
      }
      $element.select2({
        minimumResultsForSearch: 9
      });
    }
  }
}
