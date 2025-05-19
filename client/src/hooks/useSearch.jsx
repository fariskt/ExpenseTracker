export const searchHook = (filterArr = [], searchValue = "", selectedFilter = "latest") => {
  const filtered = filterArr.filter((item) => {    
    const lowerSearch = searchValue.toLowerCase();    
  
    const subjectMatch = item.subject?.toLowerCase().includes(lowerSearch);
    const categoryMatch = item.category?.toLowerCase().includes(lowerSearch);
    const nameMatch = item.name?.toLowerCase().includes(lowerSearch);
    

    const searchMatch = subjectMatch || categoryMatch || nameMatch;
    
    return searchMatch;
  });
  
  if (selectedFilter === "latest") {
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  if (selectedFilter === "oldest") {
    return filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  return filtered;
};
