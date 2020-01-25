import { createSelector } from "reselect";

const shopSelector = state => state.shop;
const shopItems = state => state.shop.items;

export const fabricSelection = createSelector([shopItems], items => {
  return items.fabric ? items.fabric.data : null;
});

export const accessoriesSelection = createSelector([shopItems], items => {
  return items.accessories ? items.accessories.data : null;
});

export const loadingSelection = createSelector(
  [shopSelector],
  shop => shop.loading
);

export const selectAll = shop =>
  createSelector([shopItems], items => {
    return items[shop] ? items[shop] : null;
  });
export const selectByCategory = (shop, category) =>
  createSelector([shopItems], items => {
    if (items[shop]) {
      let newData = items[shop].data.filter(data => data.category === category);
      return { data: newData, totalItem: newData.length };
    }
    return null;
  });

export const selectCategory = shop =>
  createSelector([shopItems], items => {
    if (items[shop]) {
      let category = items[shop].data.map(data => data.category);
      return [...new Set(category)];
    }
    return null;
  });

export const selectShowpage = createSelector([shopSelector], shop =>
  shop.showpage ? shop.showpage : null
);
