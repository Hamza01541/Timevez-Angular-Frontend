
export class filterModel {
    type: string;
    startDate: string;
    endDate: string;
}

export enum dateTypesEnum {
    currentDate = "currentDate",
    currentMonth = "currentMonth",
    lastMonth = "lastMonth",
    currentYear = "currentYear",
    lastYear = "lastYear",
    custom = "custom",
}

export enum leaveTypeEnum {
    sickLeave = "sickLeave",
    weedingLeave = "weedingLeave",
    personalLeave = "personalLeave",
    bereavement = "bereavement",
    examsLeave = "examsLeave",
    emergencyLeave = "emergencyLeave",
    casual = "casual"
}
