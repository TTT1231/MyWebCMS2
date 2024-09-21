declare type Nullable<T> = T | null;
declare type JsonReturn<T> = {
   code: HttpStatusCode;
   message: string;
   data: T;
};
