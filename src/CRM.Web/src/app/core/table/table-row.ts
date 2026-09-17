import { Directive, Input } from "@angular/core";

interface RowContext<T> {
  $implicit: T;
}

@Directive({
  selector: "ng-template[tableRow]",
  standalone: true,
})
export class TableRowDirective<T> {
  @Input("tableRow") rows!: T[];

  static ngTemplateContextGuard<T>(
    dir: TableRowDirective<T>,
    ctx: unknown
  ): ctx is RowContext<T> {
    return true;
  }
}