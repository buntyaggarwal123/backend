const DbClient = require("../config/mysql.config");

function SqlQueryBuilder() { }

SqlQueryBuilder.prototype.ParameterType = {
    "Input": "IN",
    "Output": "OUT",
    "INOUT": "INOUT"
};

SqlQueryBuilder.prototype.SqlParameter = function (value) {
    try {
        if (typeof (value) !== 'number') {
            switch (value) {
                case "":
                case '':
                    value = null; // set same as value
                    break;
                default:
                    value = value || null;
                    break;
            }
        }
        return value;
    } catch (e) {
        throw e;
    }
};

SqlQueryBuilder.prototype.Execute = function (queryText, parameters) {
    return new Promise((resolve, reject) => {
        try {
            
            DbClient.getConnection(function (err, connection) {
                if (err) {
                    console.error("Error getting connection:", err);
                    return reject(err);
                }
                
                connection.query({
                    sql: queryText ? queryText : '',
                    timeout: 40000, // 40s
                    values: parameters ? parameters : []
                }, function (error, results, fields) {
                    connection.release();
                    if (error) {
                        console.error("Error executing query:", error);
                        reject(error);
                    } else {
                        console.log("Query executed successfully");
                        resolve(results);
                    }
                });
            });
        } catch (e) {
            console.error("Error in Execute:", e);
            reject(e.stack.toString());
        }
    });
};

module.exports.SqlQueryBuilder = new SqlQueryBuilder();
