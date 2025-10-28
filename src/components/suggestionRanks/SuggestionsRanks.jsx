import React from "react";
import styles from "./SuggestionsRanks.module.css";

function SuggestionsRanks({ suggestions }) {
  let percentage;
  //   console.log(suggestions);
  const calculatePercentage = (num, nor) => {
    if (parseInt(nor, 10) !== 0) {
      let overall = parseInt(num, 10);
      let ratings = parseInt(nor, 10);
      percentage = ((ratings * overall) / (ratings * 5)) * 100;

      return percentage;
    } else {
      return 0;
    }
  };

  return (
    <div className={styles.component}>
      <div>
        <h1>
          Faculties suggested by seniors for {suggestions[0]?.coursecode} from
          this year's FFCS list
        </h1>
       
        <ol className={styles.facultyList}>
          {suggestions
            .sort((a, b) => (a.overall < b.overall ? 1 : -1))
            .map((course) => {
              return (
                <li>
                  <div className={styles.listElement}>
                    <h4>{course.facultyname}</h4>
                    <p
                      className={
                        calculatePercentage(course.overall, course.nor) >= 70
                          ? styles.green
                          : calculatePercentage(course.overall, course.nor) <=
                            35
                          ? styles.red
                          : styles.orange
                      }
                    >
                      {calculatePercentage(course.overall, course.nor) !== 0
                        ? ` Overall recommendation:${" "}
                    ${calculatePercentage(course.overall, course.nor)}%`
                        : "No ratings found"}
                    </p>
                  </div>
                </li>
              );
            })}
        </ol>
      
      </div>
      <p
        style={{
          fontSize: "12px",
          borderTop: "1px solid lightgray",
          paddingTop: "5px",
          marginBottom: "0px",
        }}
      >
        For detailed faculty reviews, visit our{" "}
        <a
          href="https://faculty.vitrendz.com/"
          target="_blank"
          rl="noreferrer"
        > 
          Faculty Review app
        </a>
      </p>
    </div>
  );
}

export default SuggestionsRanks;
