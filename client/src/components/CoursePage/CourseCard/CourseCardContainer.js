import React from "react";
import CourseCard from "./CourseCard";
import styles from "./CourseCardContainer.module.css";
import Container from "react-bootstrap/Container";
import { StylesProvider } from "@material-ui/core";

const CourseCardContainer = ({ enrolled_courses }) => {
  return (
    <div className={styles.container}>
     <Container className = {styles.innerContainer} >
        {enrolled_courses.map((course, i) => {
          return (
            <CourseCard
              
              key={i}
              name={`simple-controlled-${i}`}
              //imgScr={thumbnails[i]} // To be replaced by thumbnails from the DB, e.g.- {course.imgUrl}
              title={course.title}
              description={course.description}
              id={course._id}
            />
          );
        })}
    </Container>
    </div>
  );
};

export default CourseCardContainer;
