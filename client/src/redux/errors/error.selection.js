import { createSelector } from "reselect";

const errorState = state => state.errorState;

export const errorMessageSelector = createSelector(
  [errorState],
  error => error.msg
);

export const errorIdSelector = createSelector([errorState], error => error.id);
