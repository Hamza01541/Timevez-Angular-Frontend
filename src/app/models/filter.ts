
export class attendanceFilter {
    type: string;
    startDate: string;
    endDate: string;
}

export enum dateType {
    currentDate = "currentDate",
    currentMonth = "currentMonth",
    lastMonth = "lastMonth",
    currentYear = "currentYear",
    lastYear = "lastYear",
    custom = "custom",
}

export enum leaveType {
    annual = "annual",
    casual = "casual"
}


export enum leaveStatus {
    approved = "approved",
    pending = "pending"
}

export class leaveFilter {
    status: string;
    type: string;
}
