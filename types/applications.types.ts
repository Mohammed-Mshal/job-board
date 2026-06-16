export enum ApplicationStatus {
    PENDING = "pending",
    REVIEWING = "reviewing",
    ACCEPTED = "accepted",
    REJECTED = "rejected",
}
export type ApplicationStatusType = (typeof ApplicationStatus)[keyof typeof ApplicationStatus];