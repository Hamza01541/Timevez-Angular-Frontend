
export class Filter {
    filterType: string;
    fromDate: string;
    toDate: string;
    status: string;
    searchStr: string
}

export enum DurationType {
    currentDate = "currentDate",
    yesterday = "yesterday",
    currentMonth = "currentMonth",
    lastMonth = "lastMonth",
    currentYear = "currentYear",
    lastYear = "lastYear",
    future = "future",
    custom = "custom",
}

export enum LeaveType {
    annual = "annual",
    casual = "casual"
}

export enum LeaveStatus{
    approved = "approved",
    pending = "pending",
    rejected = "rejected"
}