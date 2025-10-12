import { PositionStatus } from "@/enums/position.enum";

export interface Position {
    id: number;
    positionName: string;
    description: string;
    positionStatus: PositionStatus;
    createAt: string;
}