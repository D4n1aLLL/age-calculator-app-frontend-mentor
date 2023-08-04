import "./AgeCalculator.css";
import btnIcon from "../assets/images/icon-arrow.svg";
import { useState } from "react";

function AgeCalculator() {
    const [day, setDay] = useState({
        text: "",
        error: "",
    });
    const [month, setMonth] = useState({
        text: "",
        error: "",
    });
    const [year, setYear] = useState({
        text: "",
        error: "",
    });

    const [result, setResult] = useState({
        day: "--",
        month: "--",
        year: "--",
    });

    function dateDiff(startingDate: Date, endingDate: Date) {
        let startDate = new Date(new Date(startingDate).toISOString().substr(0, 10));
        let tmp = endingDate.toISOString();
        if (!endingDate) {
            tmp = new Date().toISOString().substr(0, 10);
        }
        let endDate = new Date(tmp);
        if (startDate > endDate) {
            const swap = startDate;
            startDate = endDate;
            endDate = swap;
        }
        const startYear = startDate.getFullYear();
        const february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
        const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        let yearDiff = endDate.getFullYear() - startYear;
        let monthDiff = endDate.getMonth() - startDate.getMonth();
        if (monthDiff < 0) {
            yearDiff--;
            monthDiff += 12;
        }
        let dayDiff = endDate.getDate() - startDate.getDate();
        if (dayDiff < 0) {
            if (monthDiff > 0) {
                monthDiff--;
            } else {
                yearDiff--;
                monthDiff = 11;
            }
            dayDiff += daysInMonth[startDate.getMonth()];
        }

        setResult({
            day: dayDiff.toString(),
            month: monthDiff.toString(),
            year: yearDiff.toString(),
        });
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validData = !validateForm();
        if (!validData) return;

        const dob = new Date(+year.text, +month.text - 1, +day.text);
        dateDiff(dob, new Date());
    };

    const validateForm = () => {
        let error = false;

        if (!day.text) {
            setDay({ ...day, error: "This field is required" });
            error = true;
        } else if (+day.text > 31 || +day.text < 1) {
            setDay({ ...day, error: "Must be a valid day" });
            error = true;
        } else {
            setDay({ ...day, error: "" });
        }

        if (!month.text) {
            setMonth({ ...month, error: "This field is required" });
            error = true;
        } else if (+month.text > 12 || +month.text < 1) {
            setMonth({ ...month, error: "Must be a valid month" });
            error = true;
        } else {
            setMonth({ ...month, error: "" });
        }

        if (!year.text) {
            setYear({ ...year, error: "This field is required" });
            error = true;
        } else if (+year.text > new Date().getFullYear() || +year.text < 1) {
            setYear({ ...year, error: "Must be a valid year" });
            error = true;
        } else {
            setYear({ ...year, error: "" });
        }

        if (error)
            setResult({
                day: "--",
                month: "--",
                year: "--",
            });

        return error;
    };

    return (
        <form className="age-modal" onSubmit={(e) => handleFormSubmit(e)}>
            <div className="user-input">
                <div className="row text-start">
                    <div className="col-4 col-lg-3">
                        <p className={day.error ? "error" : ""}>DAY</p>
                        <input
                            type="text"
                            placeholder="DD"
                            onChange={(e) => setDay({ ...day, text: e.target.value })}
                            value={day.text}
                            className={day.error ? "error" : ""}
                        />
                        <p className="error-msg">{day.error || "\u00A0"}</p>
                    </div>
                    <div className="col-4 col-lg-3">
                        <p className={month.error ? "error" : ""}>MONTH</p>
                        <input
                            type="text"
                            placeholder="MM"
                            onChange={(e) => setMonth({ ...month, text: e.target.value })}
                            value={month.text}
                            className={month.error ? "error" : ""}
                        />
                        <p className="error-msg">{month.error || "\u00A0"}</p>
                    </div>
                    <div className="col-4 col-lg-3">
                        <p className={year.error ? "error" : ""}>YEAR</p>
                        <input
                            type="text"
                            placeholder="YYYY"
                            onChange={(e) => setYear({ ...year, text: e.target.value })}
                            value={year.text}
                            className={year.error ? "error" : ""}
                        />
                        <p className="error-msg">{year.error || "\u00A0"}</p>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
                <div className="submit">
                    <hr />
                    <button className="submit-btn" type="submit">
                        <img src={btnIcon} alt="icon"></img>
                    </button>
                    <hr className="d-md-none d-lg-none" />
                </div>
            </div>
            <div className="result text-start">
                <div className="years">
                    <span className="age-digits">{result.year}</span> years
                </div>
                <div className="months">
                    <span className="age-digits">{result.month}</span> months
                </div>
                <div className="days">
                    <span className="age-digits">{result.day}</span> days
                </div>
            </div>
        </form>
    );
}

export default AgeCalculator;
