import Input from "../components/global/input";
import { useState } from "react";
import Button from "../components/global/Button";
import Select from "../components/global/select";
import DataSelect from "../components/global/dataSelect";
import { prices } from "../components/Home/utils";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useUser } from "../components/context/userContext";

type form = {
  exam?: string;
  phoneNumber?: number;
  pin?: number;
};

export default function Education() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [bundle, setBundle] = useState(prices[0].prices);

  const userContext = useUser();
  const user = userContext?.user!;

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<form>();
  const exam = [
    { name: "WAEC Card", amount: "N2000" },
    { name: "NECO Card", amount: "N950" },
    { name: "NABTEB Card", amount: "N900" },
    { name: "JAMB UTME Form", amount: "N3450 " },
  ];

  const submitForm = async (values: form) => {
    console.log(values);

    try {
      const { data } = await axios({
        method: "post",
        url: "/api/buyAirtime",
        data: { values, user },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowForm = () => {
    showForm ? setShowForm(false) : setShowForm(true);
  };

  return (
    <div className=" mb-40 mt-10   md:ml-20  ">
      <section className="my-5 ml-4 text-3xl  font-bold text-gray-800">
        Exam Card
      </section>
      <main className="flex  flex-wrap">
        <form
          onSubmit={handleSubmit((formValues) => submitForm(formValues))}
          className="w-96 rounded-md p-8 shadow-lg transition-all duration-700"
        >
          <Select
            register={register}
            name="exam"
            data={exam.map((item) => item.name + " - " + item.amount)}
            label="Choose Exam type"
            errors={errors}
          />

          <Input
            register={register}
            name="phoneNumber"
            label="Phone Number"
            type="number"
            errors={errors}
          />
          {/* <Select
            register={register}
            name="phoneNumber"
            data={list}
            label="Choose from beneficiary"
            errors={errors}
          /> */}
          <Input
            register={register}
            name="pin"
            label="PIN"
            type="password"
            errors={errors}
          />
          <Button label="continue" loading={loading} />
        </form>
        <section>
          <button className="ml-10 w-40" onClick={handleShowForm}>
            Save to Beneficiary
          </button>
          {showForm && <BeneficiaryForm />}
        </section>
      </main>
    </div>
  );
}

export function BeneficiaryForm() {
  const [loading, setLoading] = useState(false);
  type form = {
    phoneNumber?: number;
    name?: string;
  };

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<form>();
  const submitForm = (values: form) => {};

  return (
    <main className="  mt-5 ">
      <form
        onSubmit={handleSubmit((formValues) => submitForm(formValues))}
        className="w-96 rounded-md p-8 shadow-lg transition-all duration-700"
      >
        <Input
          register={register}
          name="phoneNumber"
          label="Phone Number"
          type="number"
          errors={errors}
        />
        <Input
          register={register}
          name="name"
          label="Name"
          type="name"
          errors={errors}
        />
        <Button label="Save" loading={loading} />
      </form>
    </main>
  );
}
