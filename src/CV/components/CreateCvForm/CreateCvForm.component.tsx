import { useForm, type SubmitHandler } from "react-hook-form";
import type { CreateCvInterface } from "../../interfaces/CreateCVInterface";
import InputComponent from "../../../shared/components/InputComponent/input.component";

function CreateCvForm() {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<CreateCvInterface>({
        mode: 'onChange',
        defaultValues: {
            fullname: '',
            email: '',
            phoneNumber: '',
            resume: '',
            education: [],
            profesionalLinks: {},
            residence: {city: '', country: ''},
            workExperience: []
        }
    });

    const onSubmit: SubmitHandler<CreateCvInterface> = (data) => console.log(data);
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputComponent<CreateCvInterface> 
                errors={errors} 
                label="Nombre completo" 
                name="fullname" 
                register={register} 
                type="text"
                validations={
                        {
                            required: "Este campo es requerido",
                        }
                    }
            />
            <InputComponent<CreateCvInterface> 
                errors={errors} 
                label="Correo electrónico" 
                name="email" 
                register={register} 
                type="text"
                validations={
                        {
                            required: "Este campo es requerido",
                            minLength: {message: "Debes colocar al menos 8 caracteres", value: 8},
                        }
                    }
            />
            <button className="btn btn-info">Generar CV</button>
        </form>
    );
}

export default CreateCvForm;