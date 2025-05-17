export const searchHook = (filterArr= [], searchValue = "", selectedFilter = "") => {
  return filterArr.filter((item) => {
    const searchMatch = (item.name || item.category)
      ?.toLowerCase()
      .includes(searchValue.toLowerCase());

    const filterMatch = selectedFilter
      ? item.category?.toLowerCase() === selectedFilter.toLowerCase()
      : true;

    return searchMatch && filterMatch;
  });
};

