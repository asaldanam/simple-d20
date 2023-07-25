export type Entity<Props> = Props & { _id: string; }
export type EntityProps<Props> = Partial<Props> & { _id: string }