export const createCols = (col, fieldConfig) => {
  if (col) {
    return Object.keys(col).map((col, ind) => {
      if (fieldConfig[col]) {
        return {
          field: col,
          headerName: col,
          ...fieldConfig[col],
        };
      } else {
        return {
          field: col,
          headerName: col,
        };
      }
    });
  }
  return [];
};
export const createRows = (rows, rowsConfig) => {
  if (rows) {
    return rows?.map((row, ind) => {
      return {
        id: row?._id,
        ...row,
      };
    });
  }
  return [];
};
export const colsConfig = {
  _id: {
    headerName: "ID",
    flex: 1,
  },
  username: {
    headerName: "Username",
    flex: 1,
  },
  email: {
    headerName: "Email",
    flex: 1,
  },
  first_name: {
    headerName: "First Name",
    flex: 1,
  },
  last_name: {
    headerName: "Last Name",
    flex: 1,
  },
  date_joined: {
    headerName: "Date Joined",
    flex: 1,
    // width: 90,
  },
  last_login: {
    headerName: "Last Login",
    flex: 1,
    // width: 90,
  },
  is_active: {
    headerName: "Is Active",
    // width: 90,
  },
};
