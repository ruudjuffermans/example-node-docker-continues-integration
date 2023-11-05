import { DataTypes } from "sequelize";

const Student = (sequelize) => {
  return sequelize.define("Student", {
    text: DataTypes.STRING,
  });
};
export default Student;
