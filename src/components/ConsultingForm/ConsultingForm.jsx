import React from "react";
import styles from "./ConsultingForm.module.css";
import { cityData } from "../../DB/citidata";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../features/patientSlice";

function ConsultingForm() {

    // const data = useSelector((state) => state.data.value);
    // console.log(data)

    const dispatch = useDispatch();

  const schema = yup.object().shape({
    name: yup.string().required("Name is Required"),
    phone: yup
      .string()
      .matches(/^\d+$/, "Please Enter Only Numbers")
      .length(10, "Phone number must be 10 digits")
      .required("Phone number is Required"),
    age: yup
      .string()
      .matches(/^\d+$/, "Age must be a number")
      .test(
        "positive",
        "Age must be a positive number",
        (value) => parseInt(value, 10) > 0
      )
      .test(
        "lessThan120",
        "Age must be less than 120",
        (value) => parseInt(value, 10) < 120
      )
      .typeError("Age must be a number"),
    city: yup.string().optional(),
    company: yup.string().optional(),
    complaints: yup
      .string()
      .typeError("Complaints must be more than 200 Alphabets"),
    physioStatus: yup.boolean().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(update(data))
    reset();
  };

  return (
    <div className={styles.formContainer} id="consultation">
      <form className={styles.formSection} onSubmit={handleSubmit(onSubmit)}>
        <h2>Book an Appointment</h2>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter Your Name"
          size="large"
          {...register("name")}
        />
        <span className={styles.errorMessage}>{errors.name?.message}</span>
        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          name="phone"
          id="phone"
          placeholder="Enter Your Number"
          size="large"
          {...register("phone")}
        />
        <span className={styles.errorMessage}>{errors.phone?.message}</span>
        <label htmlFor="age">Age</label>
        <input
          type="text"
          name="age"
          id="age"
          placeholder="Enter Your Age"
          size="large"
          {...register("age")}
        />
        <span className={styles.errorMessage}>{errors.age?.message}</span>
        <select name="city" {...register("city")}>
          <option>Select your city</option>
          {cityData.map((city, index) => (
            <option value={city} key={index + 1}>
              {city}
            </option>
          ))}
        </select>
        <span className={styles.errorMessage}>{errors.city?.message}</span>
        <label htmlFor="company">Company</label>
        <input
          type="text"
          name="company"
          id="company"
          placeholder="Enter Your Company"
          size="large"
          {...register("company")}
        />
        <span className={styles.errorMessage}>{errors.company?.message}</span>
        <label htmlFor="complaints">Chief Complaints</label>
        <textarea
          rows={4}
          id="complaints"
          name="complaints"
          placeholder="What are your complaints?"
          {...register("complaints")}
        />
        <span className={styles.errorMessage}>
          {errors.complaints?.message}
        </span>
        <div>
          <input
            type="checkbox"
            id="physioStatus"
            {...register("physioStatus")}
            className={styles.checkboxInput}
          />
          <label htmlFor="physioStatus">
            Any previous experience with physiotherapy
          </label>
        </div>
        <span className={styles.errorMessage}>
          {errors.physioStatus?.message}
        </span>
        <button type="submit">Start Your Recovery</button>
      </form>
    </div>
  );
}

export default ConsultingForm;
