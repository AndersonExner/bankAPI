export interface AccountDTO {
  id: string;
  balance: number;
  limit: number;
  open: boolean;
  clientID: string;
}

export interface NewAccountDTO {
  balance: number;
  limit: number;
  open: boolean;
  clientID: string;
}