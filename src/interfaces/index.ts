export const Initial = "Initial";
export const Loading = "Loading";
export const Success = "Success";
export const Failure = "Failure";

export type reducerType = typeof Initial | Loading | Success | Failure;

export type dataType = typeof object[] | typeof object;
export type errorType = typeof object;
