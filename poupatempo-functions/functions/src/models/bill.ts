export interface BillResponse {
    bills: Bill[];
}

export interface Bill {
    state: string;
    summary: BillItem;
}

export interface BillItem {
    due_date: Date;
    total_balance: number;
}