import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'table-pagination',
    templateUrl: './pagination.component.html',
    // styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
    @Output() pageChanged = new EventEmitter<any>();
    @Input() totalRecord:number = 0;
    @Input() id: string;

    currentPage: number = 1;
    pagination: any = {totalPages: null, pages: []}

    constructor() {
    }


    ngOnInit() {
        this.initPagination(this.totalRecord);
        console.log("totalRecord:",this.totalRecord);
    }

    ngOnChanges(){
        this.initPagination(this.totalRecord);
        console.log("*totalRecord:",this.totalRecord);
    }
    
    /**
     * 
     * @param totalRecord Total number of records
     */
    initPagination(totalRecord:number) {
        const totalPages = Math.ceil(totalRecord / 10);
        let pagination = [];
    
        for (let i = 1; i <= totalPages; i++) {
            pagination.push(i);
        }
    
        this.pagination = {totalPages: totalPages, pages: pagination};
    }

    /**
   * Get Records with pagination.
   * @param name 
   * @param currentPage 
   */
    getPagedRecords(name: string, currentPage?: number) {
        switch (name) {
            case 'doubleLeft':
                this.currentPage = 1;
                break;
            case 'doubleRight':
                this.currentPage = this.pagination.totalPages;
                break;
            case 'prev':
                this.currentPage = this.currentPage > 1 ? this.currentPage - 1 : 1;
                break;
            case 'next':
                this.currentPage = this.currentPage < this.pagination.totalPages ? this.currentPage + 1 : this.pagination.totalPages;
                break;
            case 'specific':
                this.currentPage = currentPage;
                break;

            default:
                break;
        }

        this.pageChanged.emit({currentPage: this.currentPage, paginationId: this.id});
    }
}
