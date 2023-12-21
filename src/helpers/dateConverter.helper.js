import moment from "moment";
const convertDate = (date) => {
  try {
    return moment(date, "DD/MM/YYYY").toDate();
  } catch (error) {
    console.log("error:", error);
  }
};
export default convertDate;
