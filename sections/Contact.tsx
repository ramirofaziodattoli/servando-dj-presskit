"use client";
import { useRef, useState } from "react";
import RouteID from "../components/RouteID";
import { appRoutes } from "../contants/routes";
import * as Yup from "yup";
import { toast } from "sonner";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DefaultButton from "../components/Buttons/DefaultButton";
import { twMerge } from "tailwind-merge";
import AnimatedText from "../components/Text/AnimatedText";
import { motion, useScroll, useTransform } from "framer-motion";
import Text from "../components/Text/Text";
import { DJ_INFO } from "@/DATA";

export interface ContactoProps {}

const Contacto: React.FC<ContactoProps> = ({}) => {
  return (
    <div className="relative">
      <section className="bg-secondary-lighter section-mt">
        <RouteID id={appRoutes.contact} />
        <ContactForm />
      </section>
      <div
        className={
          "h-[60px] translate-y-[58px] w-full  absolute bottom-0 left-0 bg-gradient-to-b from-secondary to-transparent z-50"
        }
      ></div>
    </div>
  );
};

export type FormValues = {
  nombreCompleto: string;
  correoElectronico: string;
  tipoDeEvento: string;
  mensaje: string;
};

export interface ContactFormProps {}

const ContactForm: React.FC<ContactFormProps> = ({}) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: FormValues, resetForm: () => void) => {
    setLoading(true);
    const loadingToastId = toast.loading(
      "Espera un momento mientras validamos tus datos..."
    );

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values }),
      });

      const data = await response.json(); // Obtener el mensaje del backend

      console.log(data);

      if (response.ok) {
        resetForm();
        if (typeof window !== "undefined") {
          localStorage.removeItem("contactForm");
        }
        toast.success(
          "¡Hemos recibido tu consulta! Nos pondremos en contacto en breve.",
          { id: loadingToastId }
        );
      } else if (data.error === "El correo ya está registrado") {
        toast.error("¡El correo ya está registrado!", {
          id: loadingToastId,
        });
      } else {
        toast.error("¡Hubo un error al recibir tu consulta!", {
          id: loadingToastId,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("¡Hubo un error de conexion!", {
        id: loadingToastId,
      });
    } finally {
      setLoading(false);
    }
  };

  const loadFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const savedValues = localStorage.getItem("contactForm");
      if (savedValues) {
        return JSON.parse(savedValues);
      }
    }
  };

  const handleChange = (e: any, setFieldValue: any, values: FormValues) => {
    const { name, value } = e.target;
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "contactForm",
        JSON.stringify({ ...values, [name]: value })
      );
    }
    setFieldValue(name, value);
  };

  return (
    <section className="section-max-w section-px mx-auto !py-14 md:!py-20">
      <div className="flex flex-col items-center">
        <AnimatedText Tag={"h2"} variant="title" content="CONTACTO" />
        <Text variant="content" className="!text-center max-w-[800px] mx-auto">
          Completá el formulario con los detalles y nos pondremos en contacto lo
          antes posible. Ya sea para <strong>{DJ_INFO.eventTypes}</strong> cada
          fecha se adapta para crear una experiencia única.
        </Text>
      </div>
      <Formik
        initialValues={{
          nombreCompleto: "",
          correoElectronico: "",
          tipoDeEvento: "",
          mensaje: "",
          ...loadFromLocalStorage(),
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          onSubmit(values, resetForm);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, setFieldValue, values, isValid }) => {
          return (
            <Form className="w-full grid grid-cols-2 gap-10 mt-[10vh]">
              <CustomField
                value={values.nombreCompleto}
                onChange={(e: any) => handleChange(e, setFieldValue, values)}
                label="Nombre Completo*"
                errorName="nombreCompleto"
                fieldName="nombreCompleto"
                fieldType="text"
                containerClassName="md:col-span-1"
              />
              <CustomField
                value={values.correoElectronico}
                onChange={(e: any) => handleChange(e, setFieldValue, values)}
                label="Correo Electrónico*"
                errorName="correoElectronico"
                fieldName="correoElectronico"
                fieldType="email"
                containerClassName="md:col-span-1"
              />

              <CustomField
                value={values.tipoDeEvento}
                onChange={(e: any) => handleChange(e, setFieldValue, values)}
                label="Tipo de evento*"
                errorName="tipoDeEvento"
                fieldName="tipoDeEvento"
                fieldType="text"
              />

              <CustomField
                value={values.mensaje}
                onChange={(e: any) => handleChange(e, setFieldValue, values)}
                label="Mensaje*"
                errorName="mensaje"
                fieldName="mensaje"
                fieldType="textarea"
                fieldClassName="h-[200px]"
              />

              <DefaultButton
                type="submit"
                disabled={!isValid || isSubmitting || loading}
                variant="primary"
                className="mx-auto w-full md:w-fit col-span-2"
              >
                ENVIAR
              </DefaultButton>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

interface FieldProps {
  label: string;
  fieldType?: string;
  fieldName?: string;
  errorName: string;
  fieldClassName?: string;
  containerClassName?: string;
  onChange: any;
  value: any;
}

const CustomField: React.FC<FieldProps> = ({
  label,
  fieldType,
  fieldName,
  errorName,
  fieldClassName,
  containerClassName,
  onChange,
  value,
}) => {
  return (
    <div
      className={twMerge(
        "relative flex flex-col col-span-2",
        containerClassName
      )}
    >
      <label className="bg-secondary-lighter w-fit translate-y-3 translate-x-5 px-2">
        {label}
      </label>
      <Field
        maxLength={fieldType === "textarea" ? 100 : 30}
        type={fieldType}
        name={fieldName}
        autoComplete="off"
        className={twMerge(
          "w-full h-[60px] !border-[1px] focus:outline-none focus:border-accent rounded-sm tranisiton duration-300 pl-7",
          fieldClassName
        )}
        value={value}
        onChange={onChange}
      />

      <ErrorMessage
        name={errorName}
        component="p"
        className="text-xs text-red-600 font-normal transition duration-300 absolute -bottom-6 left-7"
      />
    </div>
  );
};

const validationSchema = Yup.object({
  nombreCompleto: Yup.string()
    .min(8, "El nombre no puede ser menor que 8 caracteres")
    .max(30, "El nombre excedió el límite de 30 caracteres")
    .required("Este campo es obligatorio"),
  correoElectronico: Yup.string()
    .max(30, "El correo electrónico excedió el límite de 30 caracteres")
    .min(6, "El correo electrónico debe tener al menos 6 caracteres")
    .email("Correo electrónico inválido")
    .required("Este campo es obligatorio"),
  tipoDeEvento: Yup.string()
    .max(30, "El tipo de evento excedió el límite de 30 caracteres")
    .min(6, "El tipo de evento debe tener al menos 4 caracteres")
    .required("Este campo es obligatorio"),
  mensaje: Yup.string()
    .required("Este campo es obligatorio")
    .min(5, "El mensaje no puede ser menor que 5 caracteres")
    .max(150, "El mensaje excedió el límite de 150 caracteres"),
});

export default Contacto;
