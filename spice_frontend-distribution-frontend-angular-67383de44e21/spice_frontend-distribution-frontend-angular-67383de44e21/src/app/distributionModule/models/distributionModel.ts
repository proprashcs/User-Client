export class DistributionServices {
  id: number;
  service: string;
}
export class DistributionActions {
  id: string;
  distribution_action: string;
  constructor() { }
}

export class DistributionSources {
  id: number;
  distribution_source: string;
  constructor() { }
}

export class DistributionTypes {
  id: number;
  distribution_type: string;
}
export interface TransactionResources {
  id: number;
  distribution_transaction_id: string;
  resource_code: string;
}




// tslint:disable-next-line:class-name
export class getAllTransactions {
  id: number;
  user_id: string;
  service_id: number;
  distribution_action_id: number;
  distribution_type_id: string;
  distribution_source_id: string;
  distribution_transaction_status_id: string;
  description: string;
  distributionTransactionResources: TransactionResources[];
  distributionTypes: DistributionTypes;
  distributionActions: DistributionActions;
  distributionSources: DistributionSources;
}


// tslint:disable-next-line:class-name
export class getdistributionTransactionResourceStatuses {
  id: number;
  distribution_transaction_resource_status: string;
}

// tslint:disable-next-line:class-name
export class getByTransactionId {
  id: number;
  distribution_transaction_id: number;
  resource_code: string;
  remarks: string;
  distributionTransactionResourceStatuses: getdistributionTransactionResourceStatuses;
}
