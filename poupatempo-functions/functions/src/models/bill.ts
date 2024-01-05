export class bills {
    bills: bill[];
}

export class bill {
    state: string;
    summary: billItem;
}

export class billItem {
    due_date: string;
    total_balance: number;
}