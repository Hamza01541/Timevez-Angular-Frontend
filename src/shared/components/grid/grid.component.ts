import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import 'jquery';
@Component({
  selector: 'jsgrid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnChanges {

  @Input() jscolumnDefs: any[] = [];
  @Input() rowData: any;
  @Input() jsfilter: any = {};
  @Input() pageCount: any;
  @Input() isShowAdd: boolean = true;
  @Output() performOperation = new EventEmitter<any>();

  @Output() filter = new EventEmitter<any>();

  gridApi;
  pageSize: number;
  rowSelection: string;
  enableFilter: boolean;
  pagination: boolean;
  enableSorting: boolean;
  selectedRow: any;
  search: any;

  resetSort: boolean;
  currentPageNo: number;
  selectedRowHighLight = [];

  constructor(public dialog: MatDialog, private change: ChangeDetectorRef,
  ) {

  }
  ngOnInit() {
  }

  ngOnChanges() {
    this.gridPageOpen();
  }

  ngAfterViewInit() {
    this.defineGrid()
  }

  defineGrid() {
    var $ = jQuery;

    let __this = this;
    if (__this.jscolumnDefs && __this.jscolumnDefs.length > 0) {
      let grid = ($("#test") as any);
      let pagerContainer = "#test-pager";
      grid.jsGrid({
        align: "center",

        filtering: true,
        editing: true,
        sorting: true,
        paging: true,
        inserting: false,
        visible: true,
        selecting: true,
        pageSize: 1,
        pageButtonCount: 3,
        pagerContainer: pagerContainer,
        pagerFormat: "Pages: {first} {prev} {pages} {next} {last}    {pageIndex} of {pageCount}",
        pagePrevText: "Prev",
        pageNextText: "Next",
        pageFirstText: "First",
        pageLastText: "Last",
        pageNavigatorNextText: ">",
        pageNavigatorPrevText: "<",
        pageIndex: 1,
        pageLoading: true,
        autoload: true,
        fields: __this.jscolumnDefs,
        controller: {

          /**
           * Fires When Grid data Loading is complete
           * @param filter
           */
          loadData: function (filter) {
            __this.jsfilter = filter;
            let result = __this.rowData;
            return { data: result, itemsCount: Math.ceil(__this.pageCount / 10) }
          },
        },

        /**
         * Set an object or a function returning an object supporting the following interface:
         * show & Hide
         */
        loadIndicator: {
          show: function () {
          },
          hide: function () {
          }
        },

        /**
         * Fires When Row clicked for Editing Purpose
         * @param args
         *  Call Back Method
         */
        rowClick: function (args: any) {
          let row = this.rowByItem(args.item)
          __this.highlightRow(row);
          __this.selectedRow = args.item;
        },

        /**
         * Fires once grid current page index is changed
         * @param args pageIndex
         *  Call Back Method
         */
        onPageChanged: function (args) {
          if (args.pageIndex != __this.jsfilter.pageIndex) {
            __this.filter.emit(args.pageIndex);
          }
        },

        /**
         * Fires before data loading.
         * @param args
         * Call Back Method
         */
        onDataLoading: function (args) {
        },

        /**
         * Fires after data loading.
         * @param args
         *  Call Back Method
         */
        onDataLoaded: function (args) {
          $('ul.nav li.dropdown').hover(function () {
            $(this).find('.secondary-menu').stop(true, true).delay(200).fadeIn(500);
          }, function () {
            $(this).find('.secondary-menu').stop(true, true).delay(200).fadeOut(500);
          });
        }
      });
    }
  }

  /**
   * Fires When we have to open page based on PageIndex
   */
  gridPageOpen() {
    ($('#test') as any).jsGrid("openPage", this.jsfilter.pageIndex);

  }

  /**
   * fires When Row is Selected
   * @param row
   */
  highlightRow(row: any) {
    this.selectedRowHighLight.push(row);
    if (this.selectedRowHighLight.length == 2) {
      this.selectedRowHighLight[0].removeClass('selected-row');
      this.selectedRowHighLight[1].addClass('selected-row');
      this.selectedRowHighLight.splice(0, 1);
    } else {
      this.selectedRowHighLight[0].addClass('selected-row');
    }
  }

  /**
   * Emits event.
   * @param action Operation name.
   * @param {number} currentRowId Selected row id.
   */
  emitAction(action: string, currentRowId: number = null) {
    this.performOperation.emit({ "selectedRowId": currentRowId, "action": action });
  }

  //   /**
  //    * Callback method.
  //    * Fires when grid row is successfully disabled or deleted. Removes row from grid cache.
  //    * @param {number} currentRowId Seleted row id.
  //    */
  deleteRowListener(currentRowId: number) {
    let temp = this.rowData.find(data => data.id == currentRowId);
    let index = this.rowData.indexOf(temp);
    this.rowData.splice(index, 1);
    ($('#test') as any).jsGrid("refresh");
  }
}
