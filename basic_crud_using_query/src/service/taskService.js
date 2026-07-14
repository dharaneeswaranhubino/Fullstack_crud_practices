const db = require("../config/db");
module.exports.getAllTask = async ({ page, limit, status }) => {
  try {
    let offset = (page - 1) * limit;
    let where = "";
    let filteredValue = [];

    if (status) {
      where = "where taskStatus = ?";
      filteredValue.push(status);
    }

    let gq = `SELECT * FROM NEW_TODOS ${where} ORDER BY COMPLETEDAT DESC LIMIT ? OFFSET ?`;
    let value = [...filteredValue, limit, offset];
    let [rows] = await db.query(gq, value);

    let [countRows] = await db.query(
      `SELECT COUNT(*) AS TOTALCOUNT FROM NEW_TODOS ${where}`,
      filteredValue,
    );

    let totalCount = countRows[0].TOTALCOUNT;
    let totalPage = Math.ceil(totalCount / limit);

    return {
      todos: rows,
      totalPage,
      currentPage: page,
      totalCount,
    };
  } catch (err) {
    throw err;
  }
};

module.exports.getSingleTask = async (id ) => {
  try {
    let [rows] = await db.query(`SELECT * FROM NEW_TODOS WHERE ID = ?`,[id]);
    console.log(rows[0] );
    
    return rows[0];
  } catch (error) {
    throw error;
  }
};
